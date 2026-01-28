
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://hello:hello123@cluster0.rkad4ob.mongodb.net/Cluster0?retryWrites=true&w=majority", {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.warn("MongoDB connection failed:", error.message);
    console.warn("Continuing without database connection...");
  }
};

