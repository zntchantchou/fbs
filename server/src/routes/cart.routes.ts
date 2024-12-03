import { Router } from "express";
import {
  addItemToCart,
  deleteItemFromCart,
} from "../controllers/cart.controller.ts";
import { authMiddleware } from "middleware/auth.middleware.ts";

const router = Router();

router.post("/", authMiddleware(), addItemToCart);
router.delete("/", deleteItemFromCart);

export default router;
