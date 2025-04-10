import connectDB from "./config/db.js"
import app from "./app.js"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 8000

app.listen(PORT, async() => {
    try {
        await connectDB()
        console.log(`Server is running on port ${PORT}`);
    } catch (error){
        console.error("Server initialization failed:");
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
})