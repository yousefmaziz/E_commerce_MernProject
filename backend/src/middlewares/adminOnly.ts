import { Request, Response, NextFunction } from "express";

interface ExtendedRequest extends Request {
  user?: any;
}

const adminOnly = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({
      message: "Access denied. Admins only",
    });
    return;
  }

  next();
};

export default adminOnly;
