import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

export default async(req, res, next) => {
    try{
        // Checking if token exists.
        const token = req.cookies.refreshToken

        if (!token) {
            return res.status(404).json({message: "Token not found."})
        }

        // Checking if Token is valid.
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById( payload._id )

        if ( user.refreshToken !== token ) {
            return res.status(404).json({message: "Expired Token!"})
        }
        // If matched passing the user to the next middleware.
        req.user = user
        next();

    } catch (error) {
        console.log(`Error: ${error.message}`)
       return res.status(500).json({error: "Token validation failed."})
    }
}