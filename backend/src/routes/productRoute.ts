import express from "express";
import { getAllProducts } from "../services/productServices.js";
import product from "../models/productModel.js";
import { isValidObjectId } from "mongoose";
import adminOnly from "../middlewares/adminOnly.js";
import validateJwt from "../middlewares/validateJwt.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.status(200).send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // تحقق إن الـ ID صيغته صح قبل ما تروح للـ DB
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const foundProduct = await product.findById(id);

    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(foundProduct);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});
router.delete("/:id", validateJwt, adminOnly, async (req, res) => {
  try {
    const productId = req.params.id;
    await product.findByIdAndDelete(productId);
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    return res.status(404).json({
      message: "Server error",
    });
  }
});
router.put("/:id", validateJwt, adminOnly, async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true },
    );
    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Server error",
    });
  }
});

router.post("/", validateJwt, adminOnly, async (req, res) => {
  try {
    const newProduct = new product(req.body);
    await newProduct.save();
    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err: any) {
    console.error(err);

    return res.status(400).json({
      message: err.message,
      error: err,
    });
  }
});
export default router;
