import express, { json, urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// setting up universal middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin:"*", // ["http://localhost:5500"],
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"]
}))
app.use(cookieParser())



// Routers Import
import authRouter from "./routers/auth.routes.js"
import adminRouter from "./routers/admin.routes.js"


// Routers Declear
app.use('/auth', authRouter)
app.use('/employees', adminRouter)

export default app;