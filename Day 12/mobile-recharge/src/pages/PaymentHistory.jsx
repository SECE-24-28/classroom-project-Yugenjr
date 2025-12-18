// src/pages/PaymentHistory.jsx
import React, { useEffect, useState } from "react";
import { rechargeAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!isLoggedIn || !user) {
        setLoading(false);
        return;
      }
      try {
        const data = await rechargeAPI.getUserRecharges();
        setHistory(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch payment history:', error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [isLoggedIn, user]);

  if (loading) {
    return (
      <div className="w-screen min-h-screen bg-gray-100 p-10 flex items-center justify-center">
        <div className="text-xl">Loading payment history...</div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gray-100 pt-24 px-6">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>

      {history.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">No payments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between"
            >
              <div className="space-y-1">
                <p className="font-semibold text-lg">{item.planName}</p>
                <p className="text-gray-600">Mobile: {item.mobileNumber}</p>
                <p className="text-gray-600">Operator: {item.operator}</p>
                <p className="text-gray-600">Validity: {item.validity} days</p>
                <p className="text-sm text-gray-500">
                  Paid on: {new Date(item.startDate || item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4 md:mt-0 text-right">
                <p className="text-xl font-bold text-green-600">
                  ₹{item.price}
                </p>
                <p className="text-sm text-green-500 font-semibold">
                  Successful
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
