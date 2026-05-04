import { cartModel } from "../models/cartModel.js";
import orderModel, { Order } from "../models/orderModel.js";
import product from "../models/productModel.js";
import productModel from "../models/productModel.js";

// ✅ Types
export interface CartInput {
  userId: string;
  populate?: boolean;
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
export const getActiveCart = async ({ userId, populate }: CartInput) => {
  let cart;
  if (populate) {
    await cartModel
      .findOne({ userId, status: "active" })
      .populate("items.product");
  }
  cart = await cartModel.findOne({ userId, status: "active" });

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
      title: product.title,
      imageUrl: product.image,
    });

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    );

    await cart.save();

    return {
      data: await getActiveCart({ userId, populate: true }),
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
  await cart.save();

  return {
    data: await getActiveCart({ userId, populate: true }),
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
  await cart.save();

  return {
    data: await getActiveCart({ userId, populate: true }),
    message: "Cart item removed",
    statusCode: 200,
  };
};

export const clearCart = async ({ userId }: clearCart) => {
  const cart = await getActiveCart({ userId });

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();
  return {
    data: await getActiveCart({ userId, populate: true }),
    message: "Cart cleared",
    statusCode: 200,
  };
};

// ✅ checkout
// ✅ checkout
// ✅ checkout
// ✅ checkout
// ✅ checkout
export interface checkoutInput {
  userId: string;
}

export const checkoutCart = async ({ userId }: checkoutInput) => {
  const cart = await getActiveCart({ userId });
  const orderItems: Order[] = [];
  for (const item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return {
        message: `Product with id ${item.product} not found`,
        statusCode: 404,
      };
    }
    const orderItem: Order = {
      productTitle: product.title || "",
      productImage: product.image || "",
      price: item.unitPrice,
      quantity: item.quantity,
    };
    orderItems.push(orderItem);
  }
  const order = await orderModel.create({
    orderItems,
    totalPrice: cart.totalPrice,
    adress: "some address",
    userId,
  });
  await order.save();
  cart.status = "completed";
  await cart.save();
  return {
    data: order,
    message: "Checkout successful",
    statusCode: 200,
  };
};
