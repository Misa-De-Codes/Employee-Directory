import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

export default async(req, res, next) => {
    try{
        // Checking if token exists.
        const token = req.cookies.accessToken

        if (!token) { // here the front end work starts, after they recive this they have to hit the rotate-token route to show that they have the refresh token an if they dont have the refresh token then let them have SEX?
            return res.status(404).json({message: "Access Token not found."})
        }
 
        // Checking if Token is valid.
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.user = payload
        next();

    } catch (error) {
        if( error.name === "JsonWebTokenError") {
            return res.status(404)
            .json({error: "Invalid Access Token."})
            
        } else {
            return res.status(404)
            .json({error: "Expired Access Token."})
    
        }
    }
}