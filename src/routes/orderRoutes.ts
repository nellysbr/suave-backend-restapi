import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
  updateOrderStatus,
} from "../controllers/OrderController";
import { authenticateJWT } from "../authMiddleware";

const router = express.Router();

// Somente usuários autenticados podem acessar essas rotas
router.use(authenticateJWT);

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.delete("/orders/:id", deleteOrderById);

// Apenas administradores podem atualizar o status do pedido
router.put("/orders/:id/status", updateOrderStatus);

export default router;
