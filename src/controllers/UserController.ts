// src/controllers/UserController.ts
import { Request, Response } from "express";
import { query } from "../utils/db";
import { User } from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = (await query("SELECT * FROM users")) as User[];
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const userResult: unknown = await query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    const user: User | undefined = (userResult as User[])[0];

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, address, phone } = req.body;

  try {
    const result = (await query(
      "INSERT INTO users (name, email, password, address, phone) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, address, phone]
    )) as { insertId?: number };

    if (result.insertId === undefined) {
      return res.status(500).json({ message: "Falha ao criar usuário" });
    }

    const insertedUserId = result.insertId;

    const newUser: User = {
      id: insertedUserId,
      name,
      email,
      password,
      address,
      phone,
      role: "customer", // Default role for a new user
    };

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
