import "dotenv/config";
import mongoose from "mongoose";
import app from "../server/src/app.js";
import { connectDB } from "../server/src/config/db.js";

let connecting;

export default async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    if (!connecting) connecting = connectDB();
    await connecting;
  }
  return app(req, res);
}
