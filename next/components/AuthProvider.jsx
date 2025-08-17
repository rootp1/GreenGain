"use client";
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setLoading(false); }, []);

  const login = async (username, password) => {
    setUser({ username, fullname: username, points: 0, credits: 0 });
  };
  const logout = () => setUser(null);
  const signup = async (data) => { setUser({ username: data.username, fullname: data.username, points: 0, credits:0}); };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
