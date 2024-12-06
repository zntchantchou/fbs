import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/product.routes.ts";
import categoryRoutes from "./routes/category.routes.ts";
import orderRoutes from "./routes/orders.routes.ts";
import { authMiddleware } from "middleware/auth.middleware.ts";

// CONFIG
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(authMiddleware());

// ROUTES
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", authMiddleware(), orderRoutes);

// SERVER
const port = Number(process.env.PORT) || 3001;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening to port ${port}`);
});
