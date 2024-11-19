import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dashboardRoutes from "./routes/dashboard.routes";
import productRoutes from "./routes/product.routes";
import { authMiddleware } from "./auth/auth.middleware";

// CONFIG
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(authMiddleware());

// ROUTES
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);

// SERVER
const port = Number(process.env.PORT) || 3001;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening to port ${port}`);
});
