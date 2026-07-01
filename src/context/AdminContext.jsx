import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("admin");

    if (stored) {
      setAdmin(JSON.parse(stored));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin", JSON.stringify(admin));
    } else {
      localStorage.removeItem("admin");
    }
  }, [admin]);

  const login = (name, sector) => {
    setAdmin({ name, sector });
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);