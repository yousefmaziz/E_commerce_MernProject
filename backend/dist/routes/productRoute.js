import express from "express";
import { getAllProducts } from "../services/productServices.js";
import product from "../models/productModel.js";
const router = express.Router();
router.get("/", async (req, res) => {
    const products = await getAllProducts();
    res.status(200).send(products);
});
router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        await product.findByIdAndDelete(productId);
        return res.status(200).json({
            message: "Product deleted successfully",
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Server error",
        });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await product.findByIdAndUpdate(productId, req.body, { new: true });
        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Server error",
        });
    }
});
router.post("/", async (req, res) => {
    try {
        const newProduct = new product(req.body);
        await newProduct.save();
        return res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        });
    }
    catch (err) {
        return res.status(400).json({
            message: "Bad request",
        });
    }
});
export default router;
//# sourceMappingURL=productRoute.js.map