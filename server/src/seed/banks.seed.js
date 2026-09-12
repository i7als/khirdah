import "dotenv/config";
import mongoose from "mongoose";
import Bank from "../models/Bank.js";

const banks = [
  { name: "بيت التمويل الكويتي (KFH)", colorHex: "#00693c" },
  { name: "بنك الكويت الوطني (NBK)", colorHex: "#003da5" },
  { name: "البنك التجاري الكويتي (CBK)", colorHex: "#e30613" },
  { name: "بنك بوبيان (Boubyan Bank)", colorHex: "#7a1f3d" },
  { name: "بنك الخليج (Gulf Bank)", colorHex: "#f7941d" },
  { name: "بنك وربة (Warba Bank)", colorHex: "#8dc63f" },
  { name: "البنك الأهلي الكويتي (ABK)", colorHex: "#0071ce" },
  { name: "البنك الأهلي المتحد (AUB)", colorHex: "#5c2d91" },
  { name: "بنك برقان (Burgan Bank)", colorHex: "#f5a623" },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  // Full catalog replacement rather than upsert-by-name, so a bank list
  // change (like this Saudi -> Kuwait swap) doesn't leave stale entries behind.
  await Bank.deleteMany({});
  await Bank.insertMany(banks);

  console.log(`Seeded ${banks.length} banks`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
