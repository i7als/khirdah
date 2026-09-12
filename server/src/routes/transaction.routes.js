import { Router } from "express";
import { listTransactions, getTransaction, updateCategory } from "../controllers/transaction.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/", listTransactions);
router.get("/:id", getTransaction);
router.patch("/:id/category", updateCategory);

export default router;
