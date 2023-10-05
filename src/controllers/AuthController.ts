import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { query } from "../utils/db";

const SECRET_KEY = process.env.TOKEN_SECRET_KEY as string;

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check user credentials against the database
    const results = await query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    // Use type assertion to assert that results is an array
    const user = results as any[];

    if (!user || user.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Assuming user is an array, but you should check the actual structure
    const firstUser = user[0];

    // Generate a JWT token
    const token = jwt.sign(
      { id: firstUser.id, email: firstUser.email },
      SECRET_KEY
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
