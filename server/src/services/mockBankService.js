import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import { CATEGORIES, MERCHANTS_BY_CATEGORY } from "../utils/categories.js";

const EXPENSE_CATEGORIES = CATEGORIES.filter((c) => c !== "راتب");
const HISTORY_MONTHS = 12;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function randomMaskedNumber() {
  return `****${randomInt(1000, 9999)}`;
}

// A random date within the given calendar month (0 = current month, capped at
// today; 1..N = that many full months back), instead of a flat "within the
// last N days" window — spreading transactions across a real year is what
// makes the analysis page's date-range presets (3mo/6mo/year/all) actually
// differ from one another.
function randomDateInMonthsAgo(monthsAgo) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() - monthsAgo;
  const target = new Date(year, month, 1);
  const daysInMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  const maxDay = monthsAgo === 0 ? now.getDate() : daysInMonth;
  const day = randomInt(1, maxDay);
  const hour = randomInt(0, 23);
  const minute = randomInt(0, 59);
  return new Date(target.getFullYear(), target.getMonth(), day, hour, minute);
}

/**
 * Generates a plausible transaction history for one account, spread across
 * the last 12 calendar months (not a flat 60-day window) so date-range
 * filtering on the analysis page has real history to differentiate.
 * Each month's expenses (and any incidental extra income) are generated
 * first, then that month's salary is sized to comfortably cover them plus a
 * positive margin — so net is positive both per month and overall, by
 * construction rather than by adjusting the arithmetic itself.
 */
function generateBalancedTransactionBatch({ userId, accountId }) {
  const transactionsData = [];
  let totalNet = 0;

  for (let monthsAgo = 0; monthsAgo < HISTORY_MONTHS; monthsAgo++) {
    const monthlyCount = randomInt(12, 20);
    let expenseSum = 0;
    let extraIncomeSum = 0;

    for (let i = 0; i < monthlyCount; i++) {
      const isIncome = Math.random() < 0.05;
      const category = isIncome ? randomFrom(["راتب", "تحويلات"]) : randomFrom(EXPENSE_CATEGORIES);
      const merchant = randomFrom(MERCHANTS_BY_CATEGORY[category]);
      const amount = isIncome ? randomInt(20, 300) : randomInt(1, 80);

      transactionsData.push({
        user: userId,
        account: accountId,
        date: randomDateInMonthsAgo(monthsAgo),
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
      date: randomDateInMonthsAgo(monthsAgo),
      merchant: "جهة العمل",
      description: "راتب شهري",
      amount: salary,
      type: "income",
      category: "راتب",
      currency: "KWD",
    });

    totalNet += salary + extraIncomeSum - expenseSum;
  }

  return { transactionsData, net: totalNet };
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
