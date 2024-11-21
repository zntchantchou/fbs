import { Router } from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/products.controller.ts";
import { upload } from "../middleware/multer.middleware.ts";

const router = Router();

router.get("/", getProducts);
router.post("/", upload.array("pictures", 5), createProduct);

export default router;
