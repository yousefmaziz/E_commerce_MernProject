import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { title } from "node:process";

export interface Iproduct extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
  description: string;
}

const produceSchema = new Schema<Iproduct>({
  title: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
});

const product = mongoose.model<Iproduct>("product", produceSchema);
export default product;
