// contexts/cartContext.js
import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); 
  const [wishlist, setWishlist] = useState([]); 

  
  // CART FUNCTIONS
  

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id: product.id, product, qty }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const increaseQty = (productId) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  const decreaseQty = (productId) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setItems([]);

  const getTotalItems = () => items.reduce((sum, i) => sum + i.qty, 0);

  const getTotalPrice = () =>
    items.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  
  // WISHLIST FUNCTIONS

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev; // ignore duplicates
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  
  // CONTEXT VALUE


  const value = useMemo(
    () => ({
      // cart
      items,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      getTotalItems,
      getTotalPrice,
      wishlist,
      addToWishlist,
      removeFromWishlist,
    }),
    [items, wishlist]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
