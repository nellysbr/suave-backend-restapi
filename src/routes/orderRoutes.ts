// src/routes/orderRoutes.ts
import express from "express";
import { createOrder, getOrders } from "../controllers/OrderController";

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);

export default router;
