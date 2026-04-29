import mongoose, { ObjectId } from "mongoose";
import { Schema, Document } from "mongoose";

export interface Order {
  productTitle: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface OrderDocument extends Document {
  orderItems: Order[];
  totalPrice: number;
  adress: string;
  userId: ObjectId | string;
}
const orderItemSchema = new Schema<Order>({
  productTitle: { type: String, required: true },
  productImage: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<OrderDocument>({
  orderItems: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  adress: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const orderModel = mongoose.model<OrderDocument>("Order", orderSchema);
export default orderModel;
