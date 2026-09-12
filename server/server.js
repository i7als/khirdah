import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error("Server will still start, but /api/health will report db as disconnected.");
  }

  app.listen(PORT, () => {
    console.log(`Server on :${PORT}`);
  });
}

start();
