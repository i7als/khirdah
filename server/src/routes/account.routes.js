import { Router } from "express";
import { listAccounts, getAccount, deleteAccount } from "../controllers/account.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/", listAccounts);
router.get("/:id", getAccount);
router.delete("/:id", deleteAccount);

export default router;
