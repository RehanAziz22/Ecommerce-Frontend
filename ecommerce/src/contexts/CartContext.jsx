import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQty, setCartQty] = useState(0); // Cart state

 
    // Return the context provider with the children
    return (
      <CartContext.Provider value={{ cartQty, setCartQty }}>
        {children}
      </CartContext.Provider>
    );
  };
