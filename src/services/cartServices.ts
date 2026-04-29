import { cartModel } from "../models/cartModel.js";
import productModel from "../models/productModel.js";

// ✅ Types
export interface CartInput {
  userId: string;
}

export interface AddItemInput {
  userId: string;
  productId: any;
  quantity: number;
}

// ✅ get active cart
export const getActiveCart = async ({ userId }: CartInput) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await cartModel.create({
      userId,
      items: [],
      totalPrice: 0,
      status: "active",
    });
  }

  return cart;
};

// ✅ add item
export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemInput) => {
  try {
    if (!productId || !quantity || quantity <= 0) {
      return { message: "Invalid input", statusCode: 400 };
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return { message: "Product not found", statusCode: 404 };
    }

    if (product.stock < quantity) {
      return { message: "Insufficient stock", statusCode: 400 };
    }
    const cart = await getActiveCart({ userId });

    const exists = cart.items.some(
      (item) => item.product.toString() === productId.toString(),
    );

    if (exists) {
      return { message: "Product already in cart", statusCode: 400 };
    }

    cart.items.push({
      product: productId,
      quantity,
      unitPrice: product.price,
    });

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    );

    const updatedCart = await cart.save();

    return {
      data: updatedCart,
      message: "Product added to cart",
      statusCode: 200,
    };
  } catch (err) {
    console.error("Add to cart error:", err);
    return { message: "Server error", statusCode: 500 };
  }
};
