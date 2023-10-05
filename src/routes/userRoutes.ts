// src/routes/userRoutes.ts
import express from "express";
import { createUser, getUsers } from "../controllers/UserController";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUsers);

export default router;
