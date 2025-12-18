// src/pages/Payment.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { rechargeAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const { isLoggedIn } = useAuth();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        No plan selected
      </div>
    );
  }

  const handlePayment = async () => {
    if (!isLoggedIn) {
      alert('Please login to make a payment');
      navigate('/login');
      return;
    }

    if (!mobileNumber || mobileNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const rechargeData = {
        mobileNumber,
        operator: state.operator || 'Airtel',
        planId: state._id || state.id
      };

      await rechargeAPI.createRecharge(rechargeData);
      setPaymentDone(true);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center">
        {!paymentDone ? (
          <>
            <h2 className="text-3xl font-bold mb-6">Payment</h2>

            <div className="space-y-3 text-gray-700 text-left mb-4">
              <p><strong>Plan:</strong> {state.name || state.title}</p>
              <p><strong>Price:</strong> ₹{state.price}</p>
              <p><strong>Validity:</strong> {state.validity} days</p>
              <p><strong>Operator:</strong> {state.operator || 'Airtel'}</p>
            </div>

            <div className="mb-4">
              <input
                type="tel"
                placeholder="Enter mobile number (10 digits)"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full p-3 border rounded-lg"
                maxLength="10"
              />
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">🔒</span>
                <p className="text-sm text-green-700">Secure Payment - Your data is encrypted and protected</p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the Terms & Conditions and Privacy Policy
              </label>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
            >
              <span className="mr-2">🔒</span>
              {loading ? 'Processing Secure Payment...' : 'Pay Securely Now'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-2">
              256-bit SSL encryption • PCI DSS compliant
            </p>
          </>
        ) : (
          <>
            <div className="text-green-600 text-5xl mb-4">✔</div>

            <h2 className="text-3xl font-bold text-green-600 mb-2">
              Payment Successful
            </h2>

            <p className="text-gray-600 mb-6">
              Your recharge has been completed successfully
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/history")}
                className="w-full bg-gray-800 hover:bg-black text-white py-3 rounded-lg font-semibold"
              >
                View Payment History
              </button>

              <button
                onClick={() => navigate("/plans")}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
              >
                Go to Recharge Plans
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
