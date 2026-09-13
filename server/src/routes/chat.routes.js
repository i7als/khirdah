import { Router } from "express";
import { getHistory, sendMessage } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/messages", getHistory);
router.post("/message", sendMessage);

export default router;
