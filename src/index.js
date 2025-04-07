import connectDB from "./config/db.js"
import app from "./app.js"
import dotenv from "dotenv"

dotenv.config()
// 5500 the problem is here with this port 5500

//console.log(PORT)

// Starting the serser and connecting to the Database
app.listen(process.env.PORT || 8000, async()=>{
    try {
        await connectDB()
        console.log(`✅ Server is running on port ${process.env.PORT || 8000}`);
    } catch (error){
        console.error(`❌ Failed to start server: ${error.message}`);
    }
})