import { Request, Response } from "express";
import { query } from "../utils/db";
import { Order } from "../models/Order";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders: Order[] = (await query("SELECT * FROM orders")) as Order[];
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    const order = (await query("SELECT * FROM orders WHERE id = ?", [
      orderId,
    ])) as Order | undefined;

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { customer_id, pizza_id, quantity, total_price, order_status } =
    req.body;

  try {
    const result = (await query(
      "INSERT INTO orders (customer_id, pizza_id, quantity, total_price, order_status) VALUES (?, ?, ?, ?, ?)",
      [customer_id, pizza_id, quantity, total_price, order_status]
    )) as { insertId?: number };

    if (result.insertId === undefined) {
      return res.status(500).json({ message: "Failed to create order" });
    }

    const insertedOrderId = result.insertId;

    const newOrder: Order = {
      id: insertedOrderId,
      customer_id,
      pizza_id,
      quantity,
      total_price,
      order_status,
    };

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    const existingOrder = (await query("SELECT * FROM orders WHERE id = ?", [
      orderId,
    ])) as Order | undefined;

    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    await query("DELETE FROM orders WHERE id = ?", [orderId]);

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
