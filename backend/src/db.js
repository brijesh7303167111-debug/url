import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // loads .env

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected using Mongoose");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};
