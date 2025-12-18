import mongoose from "mongoose";

const rechargeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mobileNumber: { type: String, required: true },
    operator: { type: String, required: true },
    planName: { type: String, required: true },
    price: { type: Number, required: true },
    validity: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'expired'], default: 'active' }
  },
  { timestamps: true }
);

export default mongoose.model("Recharge", rechargeSchema);
