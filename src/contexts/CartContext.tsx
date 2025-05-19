// src/contexts/CartContext.tsx
"use client";

import type { Part } from '@/lib/constants';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem extends Part {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (part: Part) => void;
  removeFromCart: (partId: string) => void;
  updateQuantity: (partId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  isCartLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Load cart from localStorage on client-side after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('autoConnectCart');
      if (localData) {
        try {
          setCartItems(JSON.parse(localData));
        } catch (error) {
          console.error("Error parsing cart data from localStorage", error);
          localStorage.removeItem('autoConnectCart'); // Clear corrupted data
        }
      }
      setIsCartLoaded(true); // Set cart as loaded
    }
  }, []); // Empty dependency array: run once on mount

  // Save cart to localStorage whenever it changes, only after initial load
  useEffect(() => {
    if (typeof window !== 'undefined' && isCartLoaded) {
      localStorage.setItem('autoConnectCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isCartLoaded]);

  const addToCart = (part: Part) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === part.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...part, quantity: 1 }];
    });
  };

  const removeFromCart = (partId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== partId));
  };

  const updateQuantity = (partId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(partId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === partId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
        isCartLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
