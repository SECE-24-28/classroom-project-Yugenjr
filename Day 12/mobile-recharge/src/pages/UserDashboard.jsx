// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import { rechargeAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const [recharges, setRecharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    const fetchRecharges = async () => {
      if (!isLoggedIn || !user) {
        setLoading(false);
        return;
      }
      try {
        const data = await rechargeAPI.getUserRecharges();
        setRecharges(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch recharges:', error);
        setRecharges([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecharges();
  }, [isLoggedIn, user]);

  const daysLeft = (start, validity) => {
    const startDate = new Date(start);
    const today = new Date();
    const used = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return Math.max(0, validity - used);
  };



  if (loading) {
    return (
      <div className="w-screen min-h-screen bg-gray-100 pt-24 px-6 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gray-100 pt-24 px-6">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>

      {/* User Profile Section */}
      <div className="bg-white rounded-xl shadow p-8 mb-8 max-w-4xl">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
            <p className="text-gray-600 text-lg">{user?.email || 'No email'}</p>
            <p className="text-gray-600 text-lg">{user?.phone || 'No phone'}</p>
          </div>
        </div>
      </div>

      {/* Recharge History Section */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Recharge History</h2>
        </div>
        {recharges.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recharge history found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operator</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recharges.map((r, i) => {
                  const remaining = daysLeft(r.startDate, r.validity);
                  const isActive = remaining > 0;
                  return (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{r.planName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₹{r.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{r.mobileNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{r.operator}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(r.startDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isActive ? `Active (${remaining}d left)` : 'Expired'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
