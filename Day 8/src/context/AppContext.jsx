// src/context/AppContext.jsx
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [user, setUser] = useState({ name: "Guest" });
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const value = {
    selectedPlan,
    setSelectedPlan,
    showPlanModal,
    setShowPlanModal,
    user,
    setUser,
    theme,
    toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    // Helpful runtime error if provider not mounted
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
};
