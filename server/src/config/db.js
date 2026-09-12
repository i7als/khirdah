import mongoose from "mongoose";

const RETRY_DELAY_MS = 3000;
const MAX_ATTEMPTS = 5;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not set in .env");
  }

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await mongoose.connect(uri);
      return;
    } catch (err) {
      if (attempt === MAX_ATTEMPTS) throw err;
      console.error(
        `MongoDB connect attempt ${attempt}/${MAX_ATTEMPTS} failed: ${err.message}. Retrying in ${RETRY_DELAY_MS}ms...`
      );
      await wait(RETRY_DELAY_MS);
    }
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

export function dbStatus() {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  return states[mongoose.connection.readyState] || "unknown";
}
