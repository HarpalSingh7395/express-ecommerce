import mongoose from "mongoose";
import logger from "@/utils/logger";


const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        logger.error("MONGO_URI not found in environment variables.");
        process.exit(1);
    }

    try {
    await mongoose.connect(mongoUri);
    logger.info("✅ MongoDB connected successfully");
  } catch (err) {
    logger.error("❌ MongoDB connection failed");
    logger.error(err);
    process.exit(1);
  }
}

export default connectDB;