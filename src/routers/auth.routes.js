import express from "express";
import { registerUser, loginUser, logoutUser, rotateToken } from "../controllers/auth.controller.js";
import verifyAccess from "../middleware/verifyAccess.middleware.js";
import verifyRefresh from "../middleware/verifyRefresh.middleware.js";


const router = express.Router();

// Auth routers
router.post('/users', registerUser);
router.post('/login', loginUser);

// secure routes
router.post('/logout', verifyAccess, logoutUser);
router.post('/refresh-token',verifyRefresh, rotateToken)

export default router;