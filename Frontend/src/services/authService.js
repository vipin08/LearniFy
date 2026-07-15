import axios from "axios";
import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";

const API_URL = "http://localhost:5000/api/auth";

// Interceptor to attach JWT token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  getCurrentUser() {
    return getItem(STORAGE_KEYS.USER, null);
  },

  async login(credentials) {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { user, token } = response.data.data;
    localStorage.setItem("token", token);
    setItem(STORAGE_KEYS.USER, user);
    return user;
  },

  async signup(data) {
    const response = await axios.post(`${API_URL}/signup`, data);
    const { user, token } = response.data.data;
    localStorage.setItem("token", token);
    setItem(STORAGE_KEYS.USER, user);
    return user;
  },

  async getProfile() {
    const response = await axios.get(`${API_URL}/profile`);
    const { user } = response.data.data;
    setItem(STORAGE_KEYS.USER, user);
    return user;
  },

  logout() {
    localStorage.removeItem("token");
    setItem(STORAGE_KEYS.USER, null);
  },

  async updateProfile(updates) {
    const user = { ...this.getCurrentUser(), ...updates };
    setItem(STORAGE_KEYS.USER, user);
    
    try {
      await axios.put("http://localhost:5000/api/users/profile", updates);
    } catch (err) {
      console.error("Backend profile update error:", err);
    }

    return user;
  },
};
