import { Request, Response } from "express";
import Cart from "@/models/cart.model";

export const getCart = async (req: Request, res: Response) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  res.status(200).json(cart || { items: [] });
};

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  res.status(200).json(cart);
};

export const removeFromCart = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  await cart.save();
  res.status(200).json(cart);
};

export const clearCart = async (req: Request, res: Response) => {
  await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });
  res.status(200).json({ message: "Cart cleared" });
};
