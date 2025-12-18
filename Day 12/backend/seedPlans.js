import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "./models/Plan.js";

dotenv.config();

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Plan.deleteMany({});
    
    const plans = [
      { name: "Entertainment Pack", price: 149, validity: 30, operator: "Airtel", description: "Unlimited calls + 1GB/day" },
      { name: "OTT Combo Pack", price: 299, validity: 28, operator: "Jio", description: "Netflix + Prime + 2GB/day" },
      { name: "Data Booster", price: 199, validity: 28, operator: "Vi", description: "3GB/day + unlimited calls" },
      { name: "Talk Time", price: 99, validity: 28, operator: "Airtel", description: "Unlimited calls + 500MB/day" },
      { name: "Premium Pack", price: 599, validity: 84, operator: "Jio", description: "All OTT + 2GB/day + calls" }
    ];
    
    await Plan.insertMany(plans);
    console.log("✅ Plans seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding plans:", error);
    process.exit(1);
  }
};

seedPlans();