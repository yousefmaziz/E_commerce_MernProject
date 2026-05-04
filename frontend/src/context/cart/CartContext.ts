import { createContext, useContext } from "react";
export interface CartItem {
  productId: string;
  title: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
}
export interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (productId: string) => void;
  updateItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}
export const CartContext = createContext<CartContextType | null>({
  cartItems: [],
  totalPrice: 0,
  addToCart: () => {},
  updateItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);
