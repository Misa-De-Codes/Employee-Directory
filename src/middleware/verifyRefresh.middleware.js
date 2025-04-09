import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"

export default async(req, res, next) => {
    try {
        const token = req.cookies.refreshToken

        if (!token) {
            throw new ApiError(401, "Refresh token not found")
        }

        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(payload._id)

        if (!user || user.refreshToken !== token) {
            throw new ApiError(401, "Invalid refresh token")
        }

        req.user = user
        next();

    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Refresh token validation failed")
    }
}