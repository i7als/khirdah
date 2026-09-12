import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

function parseDateRange(query) {
  const match = {};
  if (query.from || query.to) {
    match.date = {};
    if (query.from) match.date.$gte = new Date(query.from);
    if (query.to) match.date.$lte = new Date(query.to);
  }
  return match;
}

export async function getSummary(req, res, next) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const dateMatch = parseDateRange(req.query);

    const results = await Transaction.aggregate([
      { $match: { user: userId, ...dateMatch } },
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;
    for (const r of results) {
      if (r._id === "income") totalIncome = r.total;
      if (r._id === "expense") totalExpense = r.total;
    }

    res.json({ totalIncome, totalExpense, net: totalIncome - totalExpense });
  } catch (err) {
    next(err);
  }
}

export async function getByCategory(req, res, next) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const dateMatch = parseDateRange(req.query);
    const type = req.query.type === "income" ? "income" : "expense";

    const results = await Transaction.aggregate([
      { $match: { user: userId, type, ...dateMatch } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
      { $project: { _id: 0, category: "$_id", total: 1 } },
    ]);

    res.json(results);
  } catch (err) {
    next(err);
  }
}

export async function getTrend(req, res, next) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const months = Math.min(Math.max(parseInt(req.query.months, 10) || 6, 1), 24);

    const since = new Date();
    since.setMonth(since.getMonth() - (months - 1));
    since.setDate(1);
    since.setHours(0, 0, 0, 0);

    const results = await Transaction.aggregate([
      { $match: { user: userId, date: { $gte: since } } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" }, type: "$type" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const byMonth = new Map();
    for (const r of results) {
      const key = `${r._id.year}-${String(r._id.month).padStart(2, "0")}`;
      if (!byMonth.has(key)) byMonth.set(key, { month: key, income: 0, expense: 0 });
      byMonth.get(key)[r._id.type] = r.total;
    }

    res.json(Array.from(byMonth.values()));
  } catch (err) {
    next(err);
  }
}
