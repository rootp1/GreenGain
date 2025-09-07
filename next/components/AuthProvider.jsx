"use client";
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { api1 } from './api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSession = useCallback(async () => {
    try {
      setError(null);
      const { data } = await api1.get('/auth/checkauth', { withCredentials: true });
      if (data?.authenticated) setUser(data.user);
      else setUser(null);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSession(); }, [fetchSession]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      setError(null);
      const { data } = await api1.post('/auth/login', { username, password }, { withCredentials: true });
      setUser(data.user);
      return { ok: true };
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed');
      setUser(null);
      return { ok: false, error: e.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ email, username, password }) => {
    setLoading(true);
    try {
      setError(null);
      const { data } = await api1.post('/auth/signup', { email, username, password }, { withCredentials: true });
      setUser(data.user);
      return { ok: true };
    } catch (e) {
      setError(e.response?.data?.message || 'Signup failed');
      setUser(null);
      return { ok: false, error: e.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api1.post('/auth/logout', {}, { withCredentials: true });
    } catch (_) { /* ignore */ }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, error, login, logout, signup, refresh: fetchSession }}>
      {children}
    </AuthContext.Provider>
  );
}
