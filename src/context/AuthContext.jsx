import React, { createContext, useContext, useState, useEffect } from 'react';

import { loginUser, signupUser } from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('uniagent_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const resp = await loginUser(email, password);
      const userData = resp.data.user;
      
      const newUser = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        department: 'Computer Science', // placeholder
      };
      setUser(newUser);
      localStorage.setItem('uniagent_user', JSON.stringify(newUser));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Login failed' };
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const resp = await signupUser(name, email, password, role);
      const userData = resp.data.user;
      
      const newUser = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        department: 'Computer Science',
      };
      
      setUser(newUser);
      localStorage.setItem('uniagent_user', JSON.stringify(newUser));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('uniagent_user');
  };

  const updateProfile = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('uniagent_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
