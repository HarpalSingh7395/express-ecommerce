import express from "express";
import { createCheckoutSession } from "@/controllers/payment.controller";

const router = express.Router();

/**
 * @swagger
 * /payments/create-checkout-session:
 *   post:
 *     summary: Create a Stripe Checkout session
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *             required:
 *               - products
 *     responses:
 *       200:
 *         description: Stripe Checkout session URL returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
router.post("/create-checkout-session", createCheckoutSession);

export default router;
