import express from "express";
import { getActiveCart } from "../services/cartServices.js";
import validateJwt from "../middlewares/validateJwt.js";

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

export default router;
