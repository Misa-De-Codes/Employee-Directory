import mongoose from "mongoose"
import ApiError from "../utils/ApiError.js"

export default async function connectDB(){
    try {
        const MONGO_URI = process.env.MONGO_URI
        if (!MONGO_URI) {
            throw new ApiError(500, "MONGO_URI environment variable is not defined")
        } 
        await mongoose.connect(MONGO_URI)
        console.log(`Database connected successfully on host: ${mongoose.connection.host}`);
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, `Database connection failed: ${error.message}`)
    }
}