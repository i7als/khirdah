import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import Bank from "../models/Bank.js";

// See src/config/db.js for why this is needed on this machine.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// logoUrl points at files served from client/public/banks/. AUB's logo has
// not been supplied yet, so it stays empty and falls back to the colored badge.
const banks = [
  { name: "بيت التمويل الكويتي (KFH)", colorHex: "#00693c", logoUrl: "/banks/kfh.png" },
  { name: "بنك الكويت الوطني (NBK)", colorHex: "#003da5", logoUrl: "/banks/nbk.png" },
  { name: "البنك التجاري الكويتي (CBK)", colorHex: "#e30613", logoUrl: "/banks/cbk.png" },
  { name: "بنك بوبيان (Boubyan Bank)", colorHex: "#7a1f3d", logoUrl: "/banks/boubyan.png" },
  { name: "بنك الخليج (Gulf Bank)", colorHex: "#f7941d", logoUrl: "/banks/gulf-bank.png" },
  { name: "بنك وربة (Warba Bank)", colorHex: "#8dc63f", logoUrl: "/banks/warba.png" },
  { name: "البنك الأهلي الكويتي (ABK)", colorHex: "#0071ce", logoUrl: "/banks/abk.png" },
  { name: "البنك الأهلي المتحد (AUB)", colorHex: "#5c2d91", logoUrl: "" },
  { name: "بنك برقان (Burgan Bank)", colorHex: "#f5a623", logoUrl: "/banks/burgan.png" },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  // Upsert by name so existing Bank _ids are preserved — Account documents
  // (on this same database in both dev and production) reference these ids,
  // and a delete+reinsert would silently orphan every existing account's bank.
  for (const bank of banks) {
    await Bank.updateOne({ name: bank.name }, { $set: bank }, { upsert: true });
  }
  await Bank.deleteMany({ name: { $nin: banks.map((b) => b.name) } });

  console.log(`Seeded ${banks.length} banks`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
