import app from "@/app";
import { handleStripeWebhook } from "@/controllers/webhook.controller";
import { raw } from "express";

const router = app.router;

router.post(
  "/webhook",
  raw({ type: "application/json" }),
  handleStripeWebhook
);

export default router;