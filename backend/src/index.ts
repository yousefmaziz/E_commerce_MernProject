import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import { seedInitialProducts } from "./services/productServices.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log("DB:", mongoose.connection.db?.databaseName);

    await seedInitialProducts();

    // يشغل السيرفر لوكال فقط
    if (!process.env.VERCEL) {
      const PORT = process.env.PORT || 3002;

      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });

export default app;
