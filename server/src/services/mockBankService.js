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
 * Generates a plausible transaction history for one account. Expenses (and any
 * incidental extra income) are generated first, then the salary is sized to
 * comfortably cover them plus a positive margin — so net is always positive
 * by construction, never by adjusting the income/expense/net arithmetic itself.
 */
function generateBalancedTransactionBatch({ userId, accountId }) {
  const transactionCount = randomInt(30, 60);
  const transactionsData = [];
  let expenseSum = 0;
  let extraIncomeSum = 0;

  for (let i = 1; i < transactionCount; i++) {
    const isIncome = Math.random() < 0.05;
    const category = isIncome ? randomFrom(["راتب", "تحويلات"]) : randomFrom(EXPENSE_CATEGORIES);
    const merchant = randomFrom(MERCHANTS_BY_CATEGORY[category]);
    const amount = isIncome ? randomInt(20, 300) : randomInt(1, 80);

    transactionsData.push({
      user: userId,
      account: accountId,
      date: randomDateWithinDays(60),
      merchant,
      description: "",
      amount,
      type: isIncome ? "income" : "expense",
      category,
      currency: "KWD",
    });

    if (isIncome) {
      extraIncomeSum += amount;
    } else {
      expenseSum += amount;
    }
  }

  const margin = randomInt(100, 500);
  const salary = Math.max(300, expenseSum - extraIncomeSum + margin);

  transactionsData.push({
    user: userId,
    account: accountId,
    date: randomDateWithinDays(60),
    merchant: "جهة العمل",
    description: "راتب شهري",
    amount: salary,
    type: "income",
    category: "راتب",
    currency: "KWD",
  });

  const net = salary + extraIncomeSum - expenseSum;
  return { transactionsData, net };
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

  const { transactionsData, net } = generateBalancedTransactionBatch({
    userId,
    accountId: account._id,
  });
  await Transaction.insertMany(transactionsData);

  account.balance = startingBalance + net;
  await account.save();

  return { account, transactionCount: transactionsData.length };
}

export async function regenerateTransactions({ userId, accountId, startingBalance }) {
  await Transaction.deleteMany({ account: accountId });

  const { transactionsData, net } = generateBalancedTransactionBatch({ userId, accountId });
  await Transaction.insertMany(transactionsData);

  return { transactionCount: transactionsData.length, balance: startingBalance + net };
}
