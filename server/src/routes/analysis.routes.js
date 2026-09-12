import { Router } from "express";
import { getSummary, getByCategory, getTrend } from "../controllers/analysis.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/summary", getSummary);
router.get("/by-category", getByCategory);
router.get("/trend", getTrend);

export default router;
