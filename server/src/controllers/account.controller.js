import Account from "../models/Account.js";

export async function listAccounts(req, res, next) {
  try {
    const accounts = await Account.find({ user: req.userId })
      .populate("bank", "name colorHex logoUrl")
      .sort("-createdAt");
    res.json(accounts);
  } catch (err) {
    next(err);
  }
}

export async function getAccount(req, res, next) {
  try {
    const account = await Account.findOne({ _id: req.params.id, user: req.userId }).populate(
      "bank",
      "name colorHex logoUrl"
    );
    if (!account) {
      return res.status(404).json({ message: "الحساب غير موجود" });
    }
    res.json(account);
  } catch (err) {
    next(err);
  }
}
