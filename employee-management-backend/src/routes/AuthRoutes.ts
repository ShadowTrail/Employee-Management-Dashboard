// routes/authRoutes.ts

import express from "express";
import { LoginController } from "../controllers/AuthController";

const router = express.Router();

// POST /api/login - Login route for admin authentication
router.post("/login", LoginController);

export default router;
