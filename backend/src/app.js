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
import forntendRouter from "./routers/frontend.routes.js"

// Routers Declear
app.use('/api/users', authRouter)
app.use('/api/employees', adminRouter)
// frontend pages
app.use('/users', forntendRouter)

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

export default app