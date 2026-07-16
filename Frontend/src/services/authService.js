import axios from "axios";
import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";
import { API_URL } from "../config/api";

const AUTH_API_URL = `${API_URL}/api/auth`;

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
    const response = await axios.post(`${AUTH_API_URL}/login`, credentials);
    const { user, token } = response.data.data;
    localStorage.setItem("token", token);
    setItem(STORAGE_KEYS.USER, user);
    return user;
  },

  async signup(data) {
    const response = await axios.post(`${AUTH_API_URL}/signup`, data);
    const { user, token } = response.data.data;
    localStorage.setItem("token", token);
    setItem(STORAGE_KEYS.USER, user);
    return user;
  },

  async getProfile() {
    const response = await axios.get(`${AUTH_API_URL}/profile`);
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
      await axios.put(`${API_URL}/api/users/profile`, updates);
    } catch (err) {
      console.error("Backend profile update error:", err);
    }

    return user;
  },
};
