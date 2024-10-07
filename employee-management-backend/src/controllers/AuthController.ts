// src/controllers/AuthController.ts
import { Request, Response } from "express";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../config/DB";

// Login controller for admin authentication
export const LoginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  try {
    const [rows] = await connection.query(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    );

    if ((rows as any).length === 0) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const admin = (rows as any)[0];
    const isPasswordValid = await password === admin.password;
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    // Generate JWT token with secret key from environment variables
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Send success response with token
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
