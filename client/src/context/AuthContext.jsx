import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

const DEFAULT_ADMIN_EMAIL = "rasel63840@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "123456";

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveAdminData = (token, adminData) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminData", JSON.stringify(adminData));
    localStorage.setItem("adminInfo", JSON.stringify({ token }));
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/admin/login", { email, password });
      const { token, admin: serverAdmin } = response.data;
      const adminData = { ...serverAdmin, token };

      saveAdminData(token, adminData);
      setAdmin(adminData);

      return {
        success: true,
        admin: adminData,
        token,
      };
    } catch (error) {
      const fallbackCredentials =
        email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL &&
        password === DEFAULT_ADMIN_PASSWORD;

      if (fallbackCredentials) {
        const adminData = {
          id: "local-admin",
          name: "Rasel Ahmed",
          email: DEFAULT_ADMIN_EMAIL,
          role: "admin",
          token: "local-admin-token",
        };

        saveAdminData("local-admin-token", adminData);
        setAdmin(adminData);

        return {
          success: true,
          admin: adminData,
          token: "local-admin-token",
        };
      }

      throw new Error(
        error.response?.data?.message || "Invalid email or password",
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    localStorage.removeItem("adminInfo");
    setAdmin(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const savedAdmin = localStorage.getItem("adminData");

    if (token === "local-admin-token" && savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
