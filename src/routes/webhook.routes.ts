import express from "express";
import { stripeWebhookHandler } from "@/controllers/webhook.controller";
import { raw } from "express";

const router = express.Router();

router.post(
  "/webhook",
  raw({ type: "application/json" }),
  stripeWebhookHandler
);

export default router;