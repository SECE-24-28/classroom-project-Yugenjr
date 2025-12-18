import Recharge from "../models/Recharge.js";
import Plan from "../models/Plan.js";

export const createRecharge = async (req, res) => {
  try {
    const { mobileNumber, operator, planId } = req.body;
    const userId = req.user.id;
    
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    
    const recharge = await Recharge.create({
      userId,
      mobileNumber,
      operator,
      planName: plan.name,
      price: plan.price,
      validity: plan.validity
    });
    
    res.json({ message: "Recharge successful", recharge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserRecharges = async (req, res) => {
  try {
    const userId = req.user.id;
    const recharges = await Recharge.find({ userId }).sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.json({ message: "Plan created", plan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
