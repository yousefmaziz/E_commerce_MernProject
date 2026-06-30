import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import { seedInitialProducts } from "./services/productServices.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

// MongoDB Connections
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    await seedInitialProducts();
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });

// Export app for Vercel
export default app;
