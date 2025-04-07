import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import verifyTokens from "../middleware/auth.middleware.js"

const router = express.Router();

// Auth routers
router.post('/users', registerUser);
router.post('/login', loginUser);

// secure routes
router.post('/logout', verifyTokens, logoutUser);

export default router;