import { cartModel } from "../models/cartModel.js";
import product from "../models/productModel.js";
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
export interface clearCart {
  userId: string;
}
export interface UpdateCartItemInput {
  userId: string;
  productId: any;
  quantity: number;
}
export interface RemoveCartItemInput {
  userId: string;
  productId: any;
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

export const updateCartItem = async ({
  userId,
  productId,
  quantity,
}: UpdateCartItemInput) => {
  const cart = await getActiveCart({ userId });

  const exist = cart.items.find(
    (p) => p.product.toString() === productId.toString(),
  );

  if (!exist) {
    return { message: "Product not in cart", statusCode: 404 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { message: "Product not found", statusCode: 404 };
  }

  if (product.stock < quantity) {
    return { message: "Insufficient stock", statusCode: 400 };
  }

  const OtherItems = cart.items.filter(
    (p) => p.product.toString() !== productId.toString(),
  );
  let total = OtherItems.reduce((total, product) => {
    total + product.unitPrice * product.quantity;
    return total;
  }, 0);
  exist.quantity = quantity;

  total = total + exist.unitPrice * exist.quantity;
  cart.totalPrice = total;
  const updatedCart = await cart.save();

  return {
    data: updatedCart,
    message: "Cart item updated",
    statusCode: 200,
  };
};

export const removeCartItem = async ({
  userId,
  productId,
}: RemoveCartItemInput) => {
  const cart = await getActiveCart({ userId });
  const exist = cart.items.find(
    (p) => p.product.toString() === productId.toString(),
  );

  if (!exist) {
    return { message: "Product not in cart", statusCode: 404 };
  }
  const OtherItems = cart.items.filter(
    (p) => p.product.toString() !== productId.toString(),
  );

  let total = OtherItems.reduce((total, product) => {
    total + product.unitPrice * product.quantity;
    return total;
  }, 0);
  cart.items = OtherItems;
  cart.totalPrice = total;
  const updatedCart = await cart.save();

  return {
    data: updatedCart,
    message: "Cart item removed",
    statusCode: 200,
  };
};

export const clearCart = async ({ userId }: clearCart) => {
  const cart = await getActiveCart({ userId });

  cart.items = [];
  cart.totalPrice = 0;
  const updatedCart = await cart.save();
  return {
    data: updatedCart,
    message: "Cart cleared",
    statusCode: 200,
  };
};
