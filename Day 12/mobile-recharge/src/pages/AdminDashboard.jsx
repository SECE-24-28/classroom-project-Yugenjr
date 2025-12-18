import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { rechargeAPI } from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "₹149", users: 120 },
  { name: "₹199", users: 200 },
  { name: "₹299", users: 80 },
  { name: "₹499", users: 60 },
];

const AdminDashboard = () => {
  const isAdmin = localStorage.getItem("adminAuth");
  if (!isAdmin) return <Navigate to="/admin-login" />;

  // ---------------- STATE ----------------
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", validity: "", operator: "", description: "" });

  // ---------------- FETCH PLANS ----------------
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await rechargeAPI.getPlans();
      setPlans(data);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- HANDLERS ----------------
  const openAddModal = () => {
    setEditingPlan(null);
    setForm({ name: "", price: "", validity: "", operator: "", description: "" });
    setShowModal(true);
  };

  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setForm(plan);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.validity || !form.operator) {
      alert("Name, price, validity, and operator are required");
      return;
    }

    try {
      const planData = {
        name: form.name,
        price: Number(form.price),
        validity: Number(form.validity),
        operator: form.operator,
        description: form.description
      };

      await fetch('http://localhost:5000/api/recharges/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData)
      });

      await fetchPlans(); // Refresh plans
      setShowModal(false);
      alert('Plan added successfully!');
    } catch (error) {
      alert('Failed to save plan');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this plan?")) {
      try {
        await fetch(`http://localhost:5000/api/recharges/plans/${id}`, {
          method: 'DELETE'
        });
        await fetchPlans(); // Refresh plans
        alert('Plan deleted successfully!');
      } catch (error) {
        alert('Failed to delete plan');
        console.error(error);
      }
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen w-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Stat title="Total Recharges" value="1,245" />
        <Stat title="Active Plans" value={plans.length} />
        <Stat title="Revenue" value="₹92,000" />
      </div>

      {/* GRAPH */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Recharge Statistics
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PLANS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Manage Recharge Plans</h2>
          <button
            onClick={openAddModal}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            + Add New Plan
          </button>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Plan</th>
              <th>Price</th>
              <th>Validity</th>
              <th>Operator</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan._id} className="text-center border-t">
                <td>{plan.name}</td>
                <td>₹{plan.price}</td>
                <td>{plan.validity} days</td>
                <td>{plan.operator}</td>
                <td className="space-x-3">
                  <button
                    onClick={() => openEditModal(plan)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <Modal
          form={form}
          setForm={setForm}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editing={!!editingPlan}
        />
      )}
    </div>
  );
};

// ---------------- COMPONENTS ----------------

const Stat = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
  </div>
);

const Modal = ({ form, setForm, onClose, onSave, editing }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">
        {editing ? "Edit Plan" : "Add Plan"}
      </h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Plan Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Validity (days)"
        type="number"
        value={form.validity}
        onChange={(e) => setForm({ ...form, validity: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Operator (e.g. Airtel, Jio, Vi)"
        value={form.operator}
        onChange={(e) => setForm({ ...form, operator: e.target.value })}
      />

      <textarea
        className="w-full border p-2 mb-4"
        placeholder="Description (optional)"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
