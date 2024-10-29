import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expenses.controller";

const router = Router();

router.get("/", getExpensesByCategory);

export default router;
