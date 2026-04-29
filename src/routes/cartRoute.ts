import express from "express";
import {
  addItemToCart,
  clearCart,
  getActiveCart,
  removeCartItem,
  updateCartItem,
} from "../services/cartServices.js";
import validateJwt from "../middlewares/validateJwt.js";
import { send } from "process";

const router = express.Router();

router.get("/", validateJwt, async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const cart = await getActiveCart({ userId: user._id });

    return res.send(cart);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/items", validateJwt, async (req, res) => {
  try {
    const user = (req as any).user;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({
      userId: user._id,
      productId,
      quantity,
    });
    return res.status(response.statusCode).send(response);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/items", validateJwt, async (req, res) => {
  const userId = (req as any).user._id;

  const { productId, quantity } = req.body;
  const response = await updateCartItem({
    userId,
    productId,
    quantity,
  });
  return res.status(response.statusCode).send(response);
});

router.delete("/items/:productId", validateJwt, async (req, res) => {
  try {
    const userId = (req as any).user._id;
    const { productId } = req.params;
    const response = await removeCartItem({
      userId,
      productId,
    });
    return res.status(response.statusCode).send(response);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});
router.delete("/", validateJwt, async (req, res) => {
  try {
    const userId = (req as any).user._id;
    const response = await clearCart({
      userId,
    });
    return res.status(response.statusCode).send(response);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});
export default router;
