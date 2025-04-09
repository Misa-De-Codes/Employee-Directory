import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js"

export default async(req, res, next) => {
    try {
        const token = req.cookies.accessToken

        if (!token) {
            throw new ApiError(401, "Access token not found")
        }
 
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = payload
        next();

    } catch (error) {
        if(error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Invalid access token")
        } 
        throw new ApiError(401, "Expired access token")
    }
}