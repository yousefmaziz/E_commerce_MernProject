import mongoose from "mongoose";
import { Schema } from "mongoose";
const cartStatusEnum = ["active", "completed", "cancelled"];
const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, required: true, default: 1 },
    unitPrice: { type: Number, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
});
const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 },
    status: {
        type: String,
        enum: cartStatusEnum,
    },
});
export const cartModel = mongoose.model("Cart", cartSchema);
//# sourceMappingURL=cartModel.js.map