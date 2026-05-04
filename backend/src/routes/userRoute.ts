import express from "express";
import { register, login, getMyOrder } from "../services/userServices.js";
import validateJwt from "../middlewares/validateJwt.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { data, statusCode } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  res.status(statusCode).json(data);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, statusCode } = await login({ email, password });
  res.status(statusCode).json(data);
});

router.get("/myorder", validateJwt, async (req, res) => {
  try {
    const user = (req as any).user;

    const { data, statusCode } = await getMyOrder({ userId: user._id });

    return res.status(statusCode).send(data);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
