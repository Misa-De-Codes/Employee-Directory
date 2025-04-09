import express, { json, urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import ApiError from "./utils/ApiError.js"
import ApiResponse from "./utils/ApiResponse.js"

const app = express()

// setting up universal middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5500",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"]
}))
app.use(cookieParser())

// Routers Import
import authRouter from "./routers/auth.routes.js"
import adminRouter from "./routers/admin.routes.js"

// Routers Declear
app.use('/users', authRouter)
app.use('/employees', adminRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    
    return res.status(500).json(
        new ApiResponse(500, "Internal server error")
    )
})

// 404 handler
app.use((req, res) => {
    return res.status(404).json(
        new ApiResponse(404, "Route not found")
    )
})

export default app