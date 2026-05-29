import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderItemSchema = new Schema({
    productTitle: { type: String, required: true },
    productImage: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const orderSchema = new Schema({
    orderItems: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
//# sourceMappingURL=orderModel.js.map