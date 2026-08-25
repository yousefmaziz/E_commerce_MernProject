import express from "express";

import {
  getUserCart,
  addItemToCart,
  checkoutCart,
  clearCart,
  removeCartItem,
  updateCartItem,
} from "../services/cartServices.js";

import validateJwt from "../middlewares/validateJwt.js";

const router = express.Router();

// =========================
// Get Cart
// =========================

router.get("/", validateJwt, async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const cart = await getUserCart({
      userId: user._id,
      populate: true,
    });

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// =========================
// Add Item
// =========================

router.post("/items", validateJwt, async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const { productId, quantity } = req.body;

    const response = await addItemToCart({
      userId: user._id,
      productId,
      quantity,
    });

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("Add cart item error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// =========================
// Update Item
// =========================

router.put("/items", validateJwt, async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const { productId, quantity } = req.body;

    const response = await updateCartItem({
      userId: user._id,
      productId,
      quantity,
    });

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("Update cart item error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// =========================
// Remove Item
// =========================

router.delete("/items/:productId", validateJwt, async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const { productId } = req.params;

    const response = await removeCartItem({
      userId: user._id,
      productId,
    });

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("Remove cart item error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// =========================
// Clear Cart
// =========================

router.delete("/", validateJwt, async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const response = await clearCart({
      userId: user._id,
    });

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("Clear cart error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// =========================
// Checkout
// =========================

router.post("/checkout", validateJwt, async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const { address } = req.body;

    if (!address || typeof address !== "string") {
      return res.status(400).json({
        message: "Address is required",
      });
    }

    const response = await checkoutCart({
      userId: user._id,
      address,
    });

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("Checkout error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
