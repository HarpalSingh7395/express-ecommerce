import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "@/controllers/cart.controller";
import { authenticate } from "@/middlewares/auth.middleware";

const router = express.Router();

router.use(authenticate);
router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:productId", removeFromCart);
router.delete("/", clearCart);

export default router;
