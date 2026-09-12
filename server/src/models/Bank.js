import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  colorHex: { type: String, default: "#2563eb" },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Bank", bankSchema);
