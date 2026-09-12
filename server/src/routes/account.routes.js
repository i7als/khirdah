import { Router } from "express";
import { listAccounts, getAccount } from "../controllers/account.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/", listAccounts);
router.get("/:id", getAccount);

export default router;
