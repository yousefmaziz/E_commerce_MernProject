import mongoose from "mongoose";
import { Schema } from "mongoose";
const produceSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
});
const product = mongoose.model("product", produceSchema);
export default product;
//# sourceMappingURL=productModel.js.map