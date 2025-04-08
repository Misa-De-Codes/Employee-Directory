import express, { json, urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"

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

app.use(express.static('public'))

// Path Module















// Routers Import
import authRouter from "./routers/auth.routes.js";
import adminRouter from "./routers/admin.routes.js";



// Routers Declear
app.use('/users', authRouter)
app.use('/employees', adminRouter)

export default app;