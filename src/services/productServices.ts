import { title } from "node:process";
import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const initialProducts = [
    { title: "Product 1", image: "image1.jpg", price: 10, stock: 100 },
  ];
  const productsCount = await getAllProducts();
  if (productsCount.length === 0) {
    await productModel.insertMany(initialProducts);
  }
};
