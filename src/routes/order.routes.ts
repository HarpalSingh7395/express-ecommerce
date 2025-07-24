import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "@/controllers/order.controller";
import { authenticate, authorize } from "@/middlewares/auth.middleware";

const router = express.Router();

router.use(authenticate);

router.post("/", createOrder);
router.get("/my", getUserOrders);

router.get("/", authorize(["admin"]), getAllOrders);
router.put("/:id", authorize(["admin"]), updateOrderStatus);

export default router;
