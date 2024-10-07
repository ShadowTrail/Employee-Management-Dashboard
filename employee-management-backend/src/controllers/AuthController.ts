import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../config/DB";

// Login controller for admin authentication
export const LoginController = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Check if the admin exists in the database
    const [rows] = await connection.query("SELECT * FROM admin WHERE username = ?", [username]);

    // If no rows are returned, the user doesn't exist
    if ((rows as any).length === 0) {
      res.status(401).json({ message: "Invalid username or password" });
      return; // Ensure you return after sending the response to avoid further execution
    }

    const admin = (rows as any)[0];

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return; // Ensure you return after sending the response to avoid further execution
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    // Send success response with the token
    res.json({ message: "Login successful", token });
  } catch (error) {
    // Log the error and send a 500 response
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
