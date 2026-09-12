import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import { CATEGORIES, MERCHANTS_BY_CATEGORY } from "../utils/categories.js";

const EXPENSE_CATEGORIES = CATEGORIES.filter((c) => c !== "راتب");

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function randomMaskedNumber() {
  return `****${randomInt(1000, 9999)}`;
}

function randomDateWithinDays(days) {
  const past = Date.now() - randomInt(0, days) * 24 * 60 * 60 * 1000;
  return new Date(past);
}

/**
 * Fully mocked "connect a bank" flow — no real Open Banking call.
 * Creates one Account plus a seeded batch of plausible Transactions,
 * then reconciles the account balance against the generated history.
 */
export async function connectBank({ userId, bankId }) {
  const startingBalance = randomInt(50, 3000);

  const account = await Account.create({
    user: userId,
    bank: bankId,
    accountNumberMasked: randomMaskedNumber(),
    accountType: "checking",
    currency: "KWD",
    balance: startingBalance,
  });

  const transactionCount = randomInt(30, 60);
  const transactionsData = [];
  let net = 0;

  const salary = randomInt(300, 1800);
  transactionsData.push({
    user: userId,
    account: account._id,
    date: randomDateWithinDays(60),
    merchant: "جهة العمل",
    description: "راتب شهري",
    amount: salary,
    type: "income",
    category: "راتب",
    currency: "KWD",
  });
  net += salary;

  for (let i = 1; i < transactionCount; i++) {
    const isIncome = Math.random() < 0.05;
    const category = isIncome ? randomFrom(["راتب", "تحويلات"]) : randomFrom(EXPENSE_CATEGORIES);
    const merchant = randomFrom(MERCHANTS_BY_CATEGORY[category]);
    const amount = isIncome ? randomInt(20, 300) : randomInt(1, 80);

    transactionsData.push({
      user: userId,
      account: account._id,
      date: randomDateWithinDays(60),
      merchant,
      description: "",
      amount,
      type: isIncome ? "income" : "expense",
      category,
      currency: "KWD",
    });

    net += isIncome ? amount : -amount;
  }

  await Transaction.insertMany(transactionsData);

  account.balance = startingBalance + net;
  await account.save();

  return { account, transactionCount: transactionsData.length };
}
