import express from "express";
import { createRecharge, getUserRecharges, getAllPlans, createPlan, deletePlan } from "../controllers/rechargeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createRecharge);
router.get("/user", protect, getUserRecharges);
router.get("/plans", getAllPlans);
router.post("/plans", createPlan);
router.delete("/plans/:id", deletePlan);

export default router;
