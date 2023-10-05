import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a custom user type
interface User {
  id: string;
  username: string;
}

// jwt app secret key
const SECRET_KEY = process.env.TOKEN_SECRET_KEY as string; // Replace with a strong secret key

export const authenticateJWT = (
  req: Request & { user?: User }, // Extend Request type with user property
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Corrected header name

  if (!token) return res.status(401).json({ message: "Não autorizado" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.user = user as User;
    next();
  });
};
