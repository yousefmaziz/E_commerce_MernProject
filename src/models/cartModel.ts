import mongoose, { ObjectId } from "mongoose";
import { Schema, Document } from "mongoose";
import { Iproduct } from "./productModel.js";

const cartStatusEnum = ["active", "completed", "cancelled"] as const;
export interface IcartItem extends Document {
  product: Iproduct;
  quantity: number;
  unitPrice: number;
}

export interface Icart extends Document {
  userId: ObjectId | string;
  items: IcartItem[];
  totalPrice: number;
  status: "active" | "completed" | "cancelled";
}

const cartItemSchema = new Schema<IcartItem>({
  product: { type: Schema.Types.ObjectId, ref: "product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
});

const cartSchema = new Schema<Icart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  totalPrice: { type: Number, default: 0 },
  status: {
    type: String,
    enum: cartStatusEnum,
  },
});

export const cartModel = mongoose.model<Icart>("Cart", cartSchema);
