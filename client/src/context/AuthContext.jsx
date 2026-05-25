import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const DEFAULT_ADMIN_EMAIL = "rasel63840@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "123456";

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    if (
      email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL &&
      password === DEFAULT_ADMIN_PASSWORD
    ) {
      const adminData = {
        id: "local-admin",
        name: "Rasel Ahmed",
        email: DEFAULT_ADMIN_EMAIL,
        role: "admin",
        token: "local-admin-token",
      };

      localStorage.setItem("adminToken", "local-admin-token");
      localStorage.setItem("adminData", JSON.stringify(adminData));
      localStorage.setItem(
        "adminInfo",
        JSON.stringify({ token: "local-admin-token" }),
      );

      setAdmin(adminData);

      return {
        success: true,
        admin: adminData,
        token: "local-admin-token",
      };
    }

    throw new Error("Invalid email or password");
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
