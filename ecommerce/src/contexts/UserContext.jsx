import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Define the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state

  // Function to set user after login
  // const userLogin = (userData) => {
  //   setUser(userData);
  //   // localStorage.setItem("currentUser",userData); // Optional: Persist user
  // };

  // Function to clear user on logout
  const userLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  // Return the context provider with the children
  return (
    <UserContext.Provider value={{ user, setUser, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
