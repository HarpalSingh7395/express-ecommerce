// src/controllers/webhook.controller.ts
import { Request, Response } from "express";
import { stripe } from "@/config/stripe";
import OrderModel from "@/models/order.model";
import Cart from "@/models/cart.model";

export const stripeWebhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    await OrderModel.create({
      user: userId,
      products: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
      status: "paid",
    });

    await Cart.findOneAndUpdate({ user: userId }, { items: [] });
  }

  res.status(200).send("Received");
};
