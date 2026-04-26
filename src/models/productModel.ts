import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { title } from "node:process";

export interface Iproduct extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
}

const produceSchema = new Schema<Iproduct>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const product = mongoose.model<Iproduct>("product", produceSchema);
export default product;
