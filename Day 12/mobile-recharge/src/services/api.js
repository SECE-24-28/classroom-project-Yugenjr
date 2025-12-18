const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authAPI = {
  register: async (userData) => {
    try {
      console.log('Register API call with:', userData);
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      console.log('Register API response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      return data;
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      console.log('Login API call with:', credentials);
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      console.log('Login API response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  }
};

export const rechargeAPI = {
  getPlans: async () => {
    const response = await fetch(`${API_BASE}/recharges/plans`);
    return response.json();
  },

  createRecharge: async (rechargeData) => {
    const response = await fetch(`${API_BASE}/recharges/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(rechargeData)
    });
    return response.json();
  },

  getUserRecharges: async () => {
    try {
      const headers = getAuthHeaders();
      console.log('API Headers:', headers);
      
      const response = await fetch(`${API_BASE}/recharges/user`, {
        headers
      });
      
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('getUserRecharges API error:', error);
      throw error;
    }
  }
};