import { Request, Response } from "express";
import OrderModel from "@/models/order.model";

export const createOrder = async (req: Request, res: Response) => {
  const { products, totalAmount } = req.body;

  const order = await OrderModel.create({
    user: req.user._id,
    products,
    totalAmount,
  });

  res.status(201).json({ order });
};

export const getUserOrders = async (req: Request, res: Response) => {
  const orders = await OrderModel.find({ user: req.user._id }).populate("products.product");
  res.status(200).json({ orders });
};

export const getAllOrders = async (_req: Request, res: Response) => {
  const orders = await OrderModel.find().populate("products.product").populate("user");
  res.status(200).json({ orders });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });

  if (!order) return res.status(404).json({ message: "Order not found" });

  res.status(200).json({ order });
};
