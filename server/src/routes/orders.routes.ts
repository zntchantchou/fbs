import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orders.controller.ts";

const router = Router();

router.get("/", getOrders).post("/", createOrder);

export default router;
