import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * AuthContext
 * - isLoggedIn: boolean
 * - user: object | null
 * - login({ user }): sets logged in
 * - logout(): clears auth
 *
 * Simple local state auth. If you want persistence add localStorage, tokens, etc.
 */

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  // Basic auth state. Replace with real auth logic as needed.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Optional: persist basic state in sessionStorage so refresh doesn't immediately log out.
  useEffect(() => {
    const saved = sessionStorage.getItem("rx_auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.isLoggedIn) {
          setIsLoggedIn(true);
          setUser(parsed.user ?? null);
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("rx_auth", JSON.stringify({ isLoggedIn, user }));
  }, [isLoggedIn, user]);

  const login = ({ user } = {}) => {
    setIsLoggedIn(true);
    setUser(user ?? { name: "User" });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    // clear storage
    sessionStorage.removeItem("rx_auth");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// convenience hook
export const useAuth = () => {
  return useContext(AuthContext);
};
