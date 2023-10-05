import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { authenticateJWT } from "./authMiddleware";

import userRoutes from "./routes/userRoutes";
import pizzaRoutes from "./routes/pizzaRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();
const port = 3000;

// adiciona middleware para o swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Main router
const router = express.Router();

// JWT authentication middleware
router.use(authenticateJWT);

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
