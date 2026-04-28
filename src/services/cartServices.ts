import { cartModel } from "../models/cartModel.js";

export interface Cart {
  userId: string;
}
export interface getActiveCart {
  userId: string;
}
// هنا بعمل كارت جديده لو هو معندوش
const createCart = async ({ userId }: Cart) => {
  const cart = await cartModel.create({ userId });
  await cart.save();
  return cart;
};
// هنا بجيب الكارت النشيطه لو موجوده او بعمل كارت جديده لو مش موجوده
export const getActiveCart = async ({ userId }: getActiveCart) => {
  let cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createCart({ userId });
  }
  return cart;
};
