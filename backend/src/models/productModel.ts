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
  title: { type: String },
  image: { type: String },
  price: { type: Number },
  stock: { type: Number, default: 0 },
  description: { type: String },
});

const product = mongoose.model<Iproduct>("product", produceSchema);
export default product;
