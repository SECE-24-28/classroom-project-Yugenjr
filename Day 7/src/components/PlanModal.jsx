// src/components/PlanModal.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";

const PlanModal = () => {
  const { showPlanModal, setShowPlanModal, selectedPlan } = useAppContext();
  if (!showPlanModal || !selectedPlan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowPlanModal(false)}>
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-2xl font-bold mb-2">{selectedPlan.planTitle}</h3>
        <p className="text-lg text-amber-500 mb-2">{selectedPlan.priceLine}</p>
        <p className="mb-4">{selectedPlan.subtitle}</p>

        <div className="flex gap-3 justify-end">
          <button className="px-4 py-2" onClick={() => setShowPlanModal(false)}>Cancel</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded">Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
