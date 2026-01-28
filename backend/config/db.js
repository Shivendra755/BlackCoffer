
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://atlas-sql-6976ff602b76b15ecfc0682c-st38mv.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin", {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.warn("MongoDB connection failed:", error.message);
    console.warn("Continuing without database connection...");
  }
};

