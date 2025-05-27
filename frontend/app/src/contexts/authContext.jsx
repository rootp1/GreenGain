import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api1 } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    const checkAuth = async () => {
      try {
        const response = await api1.get("/auth/checkauth");
        if (response.status === 200) {
          setUser(response.data.user);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signup = async (email, username, password) => {
    try {
      const response = await api1.post("/auth/signup", {
        email,
        username,
        password,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api1.post("/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const logout = async () => {
    try {
      const response = await api1.post("/auth/logout");
      if (response.status === 200) {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, signup, login, logout }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
