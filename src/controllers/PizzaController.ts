import { Request, Response } from "express";
import { query } from "../utils/db";
import { Pizza } from "../models/Pizza";

export const getPizzas = async (req: Request, res: Response) => {
  try {
    const pizzas: Pizza[] = (await query("SELECT * FROM pizzas")) as Pizza[];
    res.json(pizzas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getPizzaById = async (req: Request, res: Response) => {
  const pizzaId = req.params.id;

  try {
    const pizza = (await query("SELECT * FROM pizzas WHERE id = ?", [
      pizzaId,
    ])) as Pizza | undefined;

    if (!pizza) {
      return res.status(404).json({ message: "Pizza não encontrada" });
    }

    res.json(pizza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createPizza = async (req: Request, res: Response) => {
  const { type, size, price } = req.body;

  try {
    const result = (await query(
      "INSERT INTO pizzas (type, size, price) VALUES (?, ?, ?)",
      [type, size, price]
    )) as { insertId?: number };

    if (result.insertId === undefined) {
      return res.status(500).json({ message: "Falha ao criar pizza" });
    }

    const insertedPizzaId = result.insertId;

    const newPizza: Pizza = {
      id: insertedPizzaId,
      type,
      size,
      price,
    };

    res.status(201).json(newPizza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePizzaById = async (req: Request, res: Response) => {
  const pizzaId = req.params.id;

  try {
    const existingPizza = (await query("SELECT * FROM pizzas WHERE id = ?", [
      pizzaId,
    ])) as Pizza | undefined;

    if (!existingPizza) {
      return res.status(404).json({ message: "Pizza não encontrada" });
    }

    await query("DELETE FROM pizzas WHERE id = ?", [pizzaId]);

    res.status(200).json({ message: "Pizza deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
