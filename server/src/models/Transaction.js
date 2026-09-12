import mongoose from "mongoose";
import { CATEGORIES } from "../utils/categories.js";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true, index: true },
    date: { type: Date, required: true },
    merchant: { type: String, required: true },
    description: { type: String, default: "" },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    currency: { type: String, default: "KWD" },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
