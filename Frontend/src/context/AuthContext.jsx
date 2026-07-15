import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const profile = await authService.getProfile();
          setUser(profile);
        } catch (err) {
          console.error("Token verification failed:", err);
          authService.logout();
        }
      } else {
        const stored = authService.getCurrentUser();
        if (stored) setUser(stored);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  async function login(credentials) {
    const loggedIn = await authService.login(credentials);
    setUser(loggedIn);
    return loggedIn;
  }

  async function signup(data) {
    const newUser = await authService.signup(data);
    setUser(newUser);
    return newUser;
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  async function updateUser(updates) {
    const updated = await authService.updateProfile(updates);
    setUser(updated);
    return updated;
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
