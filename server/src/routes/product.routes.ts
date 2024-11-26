import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
} from "../controllers/products.controller.ts";
import { upload } from "middleware/multer.middleware.ts";
import { authMiddleware } from "middleware/auth.middleware.ts";

const router = Router();

router.get("/:id", getProduct);
router.get("/", getProducts);
router.post("/", authMiddleware(), upload.array("pictures", 5), createProduct);

export default router;
