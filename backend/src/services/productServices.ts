import { title } from "node:process";
import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const initialProducts = [
    { title: "Product 1", image: "image1.jpg", price: 100, stock: 10 },
    { title: "Product 2", image: "image2.jpg", price: 200, stock: 20 },
    { title: "Product 3", image: "image3.jpg", price: 300, stock: 30 },
  ];
  const productsCount = await getAllProducts();
  if (productsCount.length === 0) {
    await productModel.insertMany(initialProducts);
  }
};
