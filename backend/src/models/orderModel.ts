import mongoose, { Schema, Document } from "mongoose";

export interface Order {
  productId: mongoose.Types.ObjectId;
  productTitle: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface OrderDocument extends Document {
  orderItems: Order[];
  totalPrice: number;
  address: string;
  userId: mongoose.Types.ObjectId;
}

const orderItemSchema = new Schema<Order>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productTitle: {
      type: String,
      required: true,
    },

    productImage: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<OrderDocument>(
  {
    orderItems: {
      type: [orderItemSchema],
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    address: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const orderModel = mongoose.model<OrderDocument>("Order", orderSchema);

export default orderModel;
