import { Request, Response } from "express";
import { stripe } from "@/config/stripe";

// 1. Create Stripe Checkout Session
export const createCheckoutSession = async (req: Request, res: Response) => {
  const { products, customerEmail } = req.body;

  try {
    const line_items = products.map((product: any) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100, // ₹ to paise
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: customerEmail,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe session error", error);
    res.status(500).json({ error: "Unable to create checkout session" });
  }
};
