import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  username: string;
}

export const authenticateJWT = (
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Não autorizado" });

  jwt.verify(
    token,
    process.env.NODE_ENV_TOKEN_SECRET_KEY as string,
    (err, user) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      req.user = user as User;
      next();
    }
  );
};
