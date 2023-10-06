import { Request, Response } from "express";
import { query } from "../utils/db";
import { Order, PizzaDetail } from "../models/Order";

export const getOrders = async (req: Request, res: Response) => {
  try {
    // Adicione a verificação se o usuário é um administrador
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Apenas administradores podem visualizar todas as ordens",
      });
    }

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
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { customerId, pizzaDetails } = req.body;

  try {
    // Adicione a verificação se o usuário está autenticado
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    // Fetch pizza details including prices based on the pizza IDs
    const pizzas: { id: number; price: number }[] = (await query(
      "SELECT id, price FROM pizzas WHERE id IN (?)",
      [pizzaDetails.map((pizza: PizzaDetail) => pizza.pizzaId)]
    )) as { id: number; price: number }[];

    // Calculate total price based on pizza quantities and prices
    const totalPrice = pizzaDetails.reduce(
      (total: number, pizza: PizzaDetail) => {
        const pizzaInfo = pizzas.find((p) => p.id === pizza.pizzaId);
        if (pizzaInfo) {
          return total + pizzaInfo.price * pizza.quantity;
        }
        return total;
      },
      0
    );

    // Insert the order into the database
    const result = (await query(
      "INSERT INTO orders (customer_id, total_price, order_status) VALUES (?, ?, ?)",
      [customerId, totalPrice, "Aguardando"]
    )) as { insertId?: number };

    if (result.insertId === undefined) {
      return res.status(500).json({ message: "Failed to create order" });
    }

    const insertedOrderId = result.insertId;

    // Insert order details into the database
    await Promise.all(
      pizzaDetails.map(async (pizza: PizzaDetail) => {
        await query(
          "INSERT INTO order_details (order_id, pizza_id, quantity) VALUES (?, ?, ?)",
          [insertedOrderId, pizza.pizzaId, pizza.quantity]
        );
      })
    );

    const newOrder: Order = {
      id: insertedOrderId,
      customer_id: customerId,
      pizzaDetails,
      totalPrice,
      order_status: "Aguardando",
    };

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { orderStatus } = req.body;

  try {
    // Adicione a verificação se o usuário é um administrador
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Apenas administradores podem atualizar o status do pedido",
      });
    }

    // Verifique se o pedido existe
    const existingOrder = (await query("SELECT * FROM orders WHERE id = ?", [
      orderId,
    ])) as Order | undefined;

    if (!existingOrder) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    // Verifique se o status do pedido é válido
    const validOrderStatuses = [
      "Aguardando",
      "Em preparo",
      "Pronto para retirada",
      "Entregue",
    ];
    if (!validOrderStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: "Status do pedido inválido" });
    }

    // Atualize o status do pedido
    await query("UPDATE orders SET order_status = ? WHERE id = ?", [
      orderStatus,
      orderId,
    ]);

    res
      .status(200)
      .json({ message: "Status do pedido atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    // Adicione a verificação se o usuário é um administrador
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Apenas administradores podem deletar pedidos" });
    }

    // Verifique se o pedido existe
    const existingOrder = (await query("SELECT * FROM orders WHERE id = ?", [
      orderId,
    ])) as Order | undefined;

    if (!existingOrder) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    // Delete order details first
    await query("DELETE FROM order_details WHERE order_id = ?", [orderId]);

    // Then, delete the order
    await query("DELETE FROM orders WHERE id = ?", [orderId]);

    res.status(200).json({ message: "Pedido deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
