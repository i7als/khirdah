import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

export async function getAccountsData(userId) {
  return Account.find({ user: userId }).populate("bank", "name colorHex logoUrl").sort("-createdAt");
}

export async function listAccounts(req, res, next) {
  try {
    res.json(await getAccountsData(req.userId));
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

export async function deleteAccount(req, res, next) {
  try {
    const account = await Account.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!account) {
      return res.status(404).json({ message: "الحساب غير موجود" });
    }
    await Transaction.deleteMany({ account: account._id });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
