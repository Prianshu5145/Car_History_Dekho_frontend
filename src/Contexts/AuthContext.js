import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

// Create AuthContext
const AuthContext = createContext();

// Custom hook to access AuthContext easily
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();  // Use useNavigate

  useEffect(() => {
    // Load token and role from localStorage if available on mount
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    if (savedToken && savedRole) {
      setToken(savedToken);
      setRole(savedRole);
    }
  }, []);

  const login = (token, role) => {
    // Save token and role to state and localStorage
    setToken(token);
    setRole(role);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.clear();

  };

  const logout = () => {
    // Clear token and role from state and localStorage
    setToken(null);
    setRole(null);
   
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');  // Use navigate instead of history.push
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
