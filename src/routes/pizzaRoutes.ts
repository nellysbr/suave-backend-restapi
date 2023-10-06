import express from "express";
import {
  createPizza,
  getPizzas,
  getPizzaById,
  deletePizzaById,
} from "../controllers/PizzaController";
import { authenticateJWT } from "../authMiddleware";

const router = express.Router();

// Somente usuários autenticados podem acessar essas rotas
router.use(authenticateJWT);

// Apenas administradores podem criar, listar, obter detalhes e excluir pizzas
router.post("/pizzas", createPizza);
router.get("/pizzas", getPizzas);
router.get("/pizzas/:id", getPizzaById);
router.delete("/pizzas/:id", deletePizzaById);

export default router;
