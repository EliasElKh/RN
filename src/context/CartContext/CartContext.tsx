import React, { createContext, useContext, useState } from 'react';

export type CartItem = {
  product: any;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const found = prev.find(item => item.product._id === product._id);
      if (found) {
        return prev.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product._id !== productId));
  };

  const increment = (productId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrement = (productId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.product._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increment, decrement, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {throw new Error('useCart must be used within a CartProvider');}
  return context;
};
