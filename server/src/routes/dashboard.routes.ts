import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboard.controller.ts";

const router = Router();

router.get("/", getDashboardMetrics);

export default router;
