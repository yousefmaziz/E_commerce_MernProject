import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import { seedInitialProducts } from "./services/productServices.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";

const app = express();
const port = 3002;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(async () => {
    console.log("Connected to MongoDB");

    seedInitialProducts(); // Seed initial products if the collection is empty

    app.use("/user", userRoute);
    app.use("/product", productRoute);
    app.use("/cart", cartRoute);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));
