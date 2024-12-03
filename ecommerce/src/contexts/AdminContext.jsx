import { createContext, useState } from "react";

// Create the context
export const AdminContext = createContext();

// Define the provider component
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // Admin state

  // Function to set admin after login
  const adminLogin = (adminData) => {
    setAdmin(adminData);
    // localStorage.setItem("currentAdmin",adminData); // Optional: Persist admin
  };

  // Function to clear admin on logout
  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem("currentAdmin");
  };

  // Return the context provider with the children
  return (
    <AdminContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};
