import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    bank: { type: mongoose.Schema.Types.ObjectId, ref: "Bank", required: true },
    nickname: { type: String, default: "" },
    accountNumberMasked: { type: String, required: true },
    accountType: { type: String, enum: ["checking", "savings", "credit"], default: "checking" },
    currency: { type: String, default: "KWD" },
    balance: { type: Number, required: true },
    status: { type: String, enum: ["active", "disconnected"], default: "active" },
    connectedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
