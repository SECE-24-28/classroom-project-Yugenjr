import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    validity: { type: Number, required: true }, // days
    description: { type: String },
    operator: { type: String, required: true },
    category: { type: String, default: 'general' }
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);