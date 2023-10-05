import express from "express";
import {
  createPizza,
  getPizzas,
  getPizzaById,
  deletePizzaById,
} from "../controllers/PizzaController";

const router = express.Router();

router.post("/pizzas", createPizza);
router.get("/pizzas", getPizzas);
router.get("/pizzas/:id", getPizzaById);
router.delete("/pizzas/:id", deletePizzaById);

export default router;
