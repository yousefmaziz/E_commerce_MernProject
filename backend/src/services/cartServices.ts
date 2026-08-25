import mongoose from "mongoose";

import cartModel from "../models/cartModel.js";
import orderModel, { IOrderItem } from "../models/orderModel.js";
import productModel from "../models/productModel.js";

// =========================
// Types
// =========================

export interface CartInput {
  userId: string;
  populate?: boolean;
}

export interface AddItemInput {
  userId: string;
  productId: string;
  quantity: number;
}

export interface ClearCartInput {
  userId: string;
}

export interface UpdateCartItemInput {
  userId: string;
  productId: string;
  quantity: number;
}

export interface RemoveCartItemInput {
  userId: string;
  productId: string;
}

export interface CheckoutInput {
  userId: string;
  address: string;
}

// =========================
// Get User Cart
// =========================

export const getUserCart = async ({ userId, populate = false }: CartInput) => {
  let query = cartModel.findOne({
    userId,
  });

  if (populate) {
    query = query.populate("items.product");
  }

  let cart = await query;

  if (!cart) {
    cart = await cartModel.create({
      userId,
      items: [],
      totalPrice: 0,
    });
  }

  return cart;
};

// =========================
// Add Item To Cart
// =========================

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemInput) => {
  try {
    // =========================
    // Validate input
    // =========================

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return {
        message: "Invalid product ID",
        statusCode: 400,
      };
    }

    if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
      return {
        message: "Quantity must be a positive integer",
        statusCode: 400,
      };
    }

    // =========================
    // Find Product
    // =========================

    const product = await productModel.findById(productId);

    if (!product) {
      return {
        message: "Product not found",
        statusCode: 404,
      };
    }

    // =========================
    // Check Stock
    // =========================

    if (product.stock <= 0) {
      return {
        message: "Product is out of stock",
        statusCode: 400,
      };
    }

    if (quantity > product.stock) {
      return {
        message: `Only ${product.stock} items available`,
        statusCode: 400,
      };
    }

    // =========================
    // Get Cart
    // =========================

    const cart = await getUserCart({
      userId,
    });

    // =========================
    // Check Existing Item
    // =========================

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId.toString(),
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.stock) {
        return {
          message: `Only ${product.stock} items available`,
          statusCode: 400,
        };
      }

      existingItem.quantity = newQuantity;
    } else {
      // =========================
      // Add New Item
      // =========================

      cart.items.push({
        product: product._id,
        quantity,
        unitPrice: product.price,
        title: product.title,
        imageUrl: product.image,
      });
    }

    // =========================
    // Recalculate Total
    // =========================

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    );

    await cart.save();

    // =========================
    // Return Cart
    // =========================

    const updatedCart = await getUserCart({
      userId,
      populate: true,
    });

    return {
      data: updatedCart,
      message: "Product added to cart",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Add to cart error:", error);

    return {
      message: "Server error",
      statusCode: 500,
    };
  }
};

// =========================
// Update Cart Item
// =========================

export const updateCartItem = async ({
  userId,
  productId,
  quantity,
}: UpdateCartItemInput) => {
  try {
    // =========================
    // Validate Input
    // =========================

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return {
        message: "Invalid product ID",
        statusCode: 400,
      };
    }

    if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
      return {
        message: "Quantity must be a positive integer",
        statusCode: 400,
      };
    }

    // =========================
    // Get Cart
    // =========================

    const cart = await getUserCart({
      userId,
    });

    // =========================
    // Find Item
    // =========================

    const item = cart.items.find(
      (item) => item.product.toString() === productId.toString(),
    );

    if (!item) {
      return {
        message: "Product not in cart",
        statusCode: 404,
      };
    }

    // =========================
    // Get Product
    // =========================

    const product = await productModel.findById(productId);

    if (!product) {
      return {
        message: "Product not found",
        statusCode: 404,
      };
    }

    // =========================
    // Check Stock
    // =========================

    if (quantity > product.stock) {
      return {
        message: `Only ${product.stock} items available`,
        statusCode: 400,
      };
    }

    // =========================
    // Update Quantity
    // =========================

    item.quantity = quantity;

    // =========================
    // Recalculate Total
    // =========================

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    );

    await cart.save();

    // =========================
    // Return Updated Cart
    // =========================

    const updatedCart = await getUserCart({
      userId,
      populate: true,
    });

    return {
      data: updatedCart,
      message: "Cart item updated",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Update cart item error:", error);

    return {
      message: "Server error",
      statusCode: 500,
    };
  }
};

// =========================
// Remove Cart Item
// =========================

export const removeCartItem = async ({
  userId,
  productId,
}: RemoveCartItemInput) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return {
        message: "Invalid product ID",
        statusCode: 400,
      };
    }

    const cart = await getUserCart({
      userId,
    });

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId.toString(),
    );

    if (!itemExists) {
      return {
        message: "Product not in cart",
        statusCode: 404,
      };
    }

    // =========================
    // Remove Item
    // =========================

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId.toString(),
    );

    // =========================
    // Recalculate Total
    // =========================

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    );

    await cart.save();

    const updatedCart = await getUserCart({
      userId,
      populate: true,
    });

    return {
      data: updatedCart,
      message: "Cart item removed",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Remove cart item error:", error);

    return {
      message: "Server error",
      statusCode: 500,
    };
  }
};

// =========================
// Clear Cart
// =========================

export const clearCart = async ({ userId }: ClearCartInput) => {
  try {
    const cart = await getUserCart({
      userId,
    });

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    const updatedCart = await getUserCart({
      userId,
      populate: true,
    });

    return {
      data: updatedCart,
      message: "Cart cleared",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Clear cart error:", error);

    return {
      message: "Server error",
      statusCode: 500,
    };
  }
};

// =========================
// Checkout
// =========================

export const checkoutCart = async ({ userId, address }: CheckoutInput) => {
  // =========================
  // Validate Address
  // =========================

  if (!address || typeof address !== "string" || !address.trim()) {
    return {
      message: "Address is required",
      statusCode: 400,
    };
  }

  const session = await mongoose.startSession();

  try {
    // =========================
    // START TRANSACTION
    // =========================

    session.startTransaction();

    // =========================
    // 1. Get Cart
    // =========================

    const cart = await cartModel
      .findOne({
        userId,
      })
      .session(session);

    if (!cart) {
      throw new Error("Cart not found");
    }

    if (cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // =========================
    // 2. Validate Products
    // =========================

    const orderItems: IOrderItem[] = [];

    for (const item of cart.items) {
      const product = await productModel
        .findById(item.product)
        .session(session);

      if (!product) {
        throw new Error(`Product with id ${item.product} not found`);
      }

      // =========================
      // Check Stock
      // =========================

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.title}`);
      }

      // =========================
      // Snapshot
      // =========================

      const orderItem: IOrderItem = {
        productId: product._id,
        productTitle: product.title,
        productImage: product.image,
        price: item.unitPrice,
        quantity: item.quantity,
      };

      orderItems.push(orderItem);
    }

    // =========================
    // 3. Create Order
    // =========================

    const [order] = await orderModel.create(
      [
        {
          orderItems,
          totalPrice: cart.totalPrice,
          address: address.trim(),
          userId,
        },
      ],
      {
        session,
      },
    );

    // =========================
    // 4. Decrease Stock
    // =========================
    for (const item of cart.items) {
      const result = await productModel.updateOne(
        {
          _id: item.product,
        },
        {
          $inc: {
            stock: -item.quantity,
          },
        },
        {
          session,
        },
      );

      console.log("================================");
      console.log("PRODUCT ID:", item.product);
      console.log("QUANTITY:", item.quantity);
      console.log("UPDATE RESULT:", result);
      console.log("================================");

      if (result.matchedCount !== 1) {
        throw new Error(`Failed to update stock for product ${item.product}`);
      }
    }

    // =========================
    // 5. Clear Cart
    // =========================

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save({
      session,
    });

    // =========================
    // 6. COMMIT
    // =========================

    await session.commitTransaction();

    return {
      data: order,
      message: "Checkout successful",
      statusCode: 200,
    };
  } catch (error) {
    // =========================
    // ROLLBACK
    // =========================

    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    console.error("Checkout error:", error);

    return {
      message: error instanceof Error ? error.message : "Checkout failed",
      statusCode: 400,
    };
  } finally {
    // =========================
    // END SESSION
    // =========================

    await session.endSession();
  }
};
