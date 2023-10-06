// src/index.ts
import express, { Router } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import cors from "cors";
import dotenv from "dotenv";

import { authenticateJWT } from "./authMiddleware";

import userRoutes from "./routes/userRoutes";
import pizzaRoutes from "./routes/pizzaRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// adiciona middleware para o swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// JWT authentication middleware
app.use(authenticateJWT);

// Main router
const router: Router = express.Router();

// Use the main router for all routes
router.use("/api", userRoutes);
router.use("/api", pizzaRoutes);
router.use("/api", orderRoutes);

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
