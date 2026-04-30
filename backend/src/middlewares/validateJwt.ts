import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
interface extendedRequest extends Request {
  user?: any;
}

const validateJwt = (
  req: extendedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(403).send("Authorization header missing");
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("Token missing");
    return;
  }
  jwt.verify(token, "2000", async (err, payload) => {
    if (err) {
      res.status(403).send("Invalid token");
      return;
    }
    if (!payload) {
      res.status(403).send("Invalid token payload");
      return;
    }
    const userPayload = payload as any;
    const user = await userModel.findOne({ email: userPayload.email });
    if (!user) {
      res.status(403).send("User not found");
      return;
    }
    req.user = user;
    next();
  });
};
export default validateJwt;
