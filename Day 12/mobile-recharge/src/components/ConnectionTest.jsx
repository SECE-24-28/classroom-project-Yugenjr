import { useState } from 'react';

const ConnectionTest = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/recharges/plans');
      if (response.ok) {
        const data = await response.json();
        setStatus(`✅ Connected! Found ${data.length} plans`);
      } else {
        setStatus('❌ Backend responded but with error');
      }
    } catch (error) {
      setStatus('❌ Cannot connect to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
      <button 
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
};

export default ConnectionTest;