import express from "express";
import { createUser, getUsers } from "../controllers/UserController";
import { loginUser } from "../controllers/AuthController";
import { authenticateJWT } from "../authMiddleware";

const router = express.Router();

router.post("/users", createUser);

// Rota para login
router.post("/login", loginUser);

// Somente administradores podem listar todos os usuários
router.get("/users", authenticateJWT, getUsers);

export default router;
