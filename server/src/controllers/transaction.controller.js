import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";
import { CATEGORIES } from "../utils/categories.js";

export async function listTransactions(req, res, next) {
  try {
    const { accountId, category, type, from, to, search, page = 1, limit = 20 } = req.query;
    const filter = { user: req.userId };

    if (accountId) {
      const account = await Account.findOne({ _id: accountId, user: req.userId });
      if (!account) {
        return res.status(404).json({ message: "الحساب غير موجود" });
      }
      filter.account = accountId;
    }
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (search) {
      const safe = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.merchant = { $regex: safe, $options: "i" };
    }
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

    const [items, total] = await Promise.all([
      Transaction.find(filter)
        .sort("-date")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Transaction.countDocuments(filter),
    ]);

    res.json({ items, total, page: pageNum, limit: limitNum });
  } catch (err) {
    next(err);
  }
}

export async function getTransaction(req, res, next) {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.userId });
    if (!transaction) {
      return res.status(404).json({ message: "المعاملة غير موجودة" });
    }
    res.json(transaction);
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { category } = req.body;
    if (!CATEGORIES.includes(category)) {
      return res.status(400).json({ message: "تصنيف غير صالح" });
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { category },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: "المعاملة غير موجودة" });
    }

    res.json(transaction);
  } catch (err) {
    next(err);
  }
}
