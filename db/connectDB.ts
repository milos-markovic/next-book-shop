import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
  try {
    if (isConnected) {
      console.log("MongoDB is already connected");
      return;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    throw err;
  }
};

export default connectDb;
