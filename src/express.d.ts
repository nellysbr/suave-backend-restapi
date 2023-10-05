// src/express.d.ts
import "express";
import { JwtPayload } from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: JwtPayload;
  }
}