import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "@/routes/auth.routes"
import productRoutes from "@/routes/product.route"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "@/config/swagger";


dotenv.config();

const app = express();

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

export default app;