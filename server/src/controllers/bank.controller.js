import Bank from "../models/Bank.js";
import { connectBank as connectBankService } from "../services/mockBankService.js";

export async function listBanks(req, res, next) {
  try {
    const banks = await Bank.find({ isActive: true }).sort("name");
    res.json(banks);
  } catch (err) {
    next(err);
  }
}

export async function connectBank(req, res, next) {
  try {
    const { bankId } = req.body;
    if (!bankId) {
      return res.status(400).json({ message: "bankId مطلوب" });
    }

    const bank = await Bank.findById(bankId);
    if (!bank) {
      return res.status(404).json({ message: "البنك غير موجود" });
    }

    const result = await connectBankService({ userId: req.userId, bankId: bank._id });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
