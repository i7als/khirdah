import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import Account from "../models/Account.js";
import { regenerateTransactions } from "../services/mockBankService.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const accounts = await Account.find({});
  for (const account of accounts) {
    const startingBalance = randomInt(50, 3000);
    const { transactionCount, balance } = await regenerateTransactions({
      userId: account.user,
      accountId: account._id,
      startingBalance,
    });
    account.balance = balance;
    await account.save();
    console.log(`Account ${account._id}: ${transactionCount} transactions, balance ${balance} KWD`);
  }

  console.log(`Rebalanced ${accounts.length} account(s).`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
