import express, { Request, Response } from "express";
import { createUser, getUsers } from "../controllers/UserController";
import { loginUser } from "../controllers/AuthController";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.post("/login", loginUser);

export default router;
