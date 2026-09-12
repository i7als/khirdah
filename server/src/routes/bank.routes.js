import { Router } from "express";
import { listBanks, connectBank } from "../controllers/bank.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/", listBanks);
router.post("/connect", connectBank);

export default router;
