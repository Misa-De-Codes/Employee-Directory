import mongoose from "mongoose"

export default async function connectDB(){
    try{
        const MONGO_URI = process.env.MONGO_URI
        if (!MONGO_URI) {
            console.error("Error: MONGO_URI environment variable is not defined.");
            console.log("Please ensure the .env file is properly configured.");
            return;
        } 
        await mongoose.connect(MONGO_URI)
        console.log(`✅ Database connected successfully on host: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`❌ Database connection failed: ${error.message}`);
        process.exit(1);
    }
}