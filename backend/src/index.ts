import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import { seedInitialProducts } from "./services/productServices.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// ✅ سجل الـ routes برا الـ mongoose connect
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.get("/test", (req, res) => {
  res.send("TEST");
});

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(async () => {
    console.log("Connected to MongoDB");
    await seedInitialProducts();

    app.listen(process.env.PORT || 3002, () => {
      console.log("🚀 MY SERVER IS RUNNING");
    });
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));
