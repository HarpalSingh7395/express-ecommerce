import app from "@/app"
import logger from "@/utils/logger"
import connectDB from "./config/db"

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();