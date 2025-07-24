// src/controllers/stripe.controller.ts
import { Request, Response } from "express";
import { stripe } from "@/config/stripe";
import Cart from "@/models/cart.model";

export const createCheckoutSession = async (req: Request, res: Response) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
        images: [item.product.image], // Optional
      },
      unit_amount: Math.round(item.product.price * 100), // in cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
    metadata: {
      userId: req.user.id,
    },
  });

  res.json({ url: session.url });
};
