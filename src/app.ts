import express from "express"
import dotenv from "dotenv"
dotenv.config();
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import authRoutes from "@/routes/auth.routes"
import productRoutes from "@/routes/product.route"
import cartRoutes from "@/routes/cart.routes"
import orderRoutes from "@/routes/order.routes"
import userRoutes from "@/routes/user.routes"
import paymentRoutes from "@/routes/payment.routes"
import webhookRoutes from "@/routes/webhook.routes"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "@/config/swagger";




const app = express();

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes)
app.use("/api/user", userRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

export default app;