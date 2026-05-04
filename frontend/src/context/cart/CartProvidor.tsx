import { type PropsWithChildren, type FC, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../cart/CartContext";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // ✅ mapping
  const mapCart = (cartData: any): CartItem[] => {
    return cartData.items.map((item: any) => ({
      productId: item.product,
      title: item.title,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    }));
  };

  // ✅ helper موحد للتعامل مع response
  const handleCartResponse = (result: any) => {
    const cart = result.data;

    if (!cart?.items) {
      setError("Invalid response");
      return;
    }

    setCartItems(mapCart(cart));
    setTotalPrice(cart.totalPrice || 0);
  };

  // ✅ fetch cart
  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:3002/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Failed to fetch cart");
          return;
        }

        const result = await response.json();

        // ⚠️ endpoint ده بيرجع cart مباشرة (مش data)
        if (!result?.items) {
          setError("Invalid response");
          return;
        }

        setCartItems(mapCart(result));
        setTotalPrice(result.totalPrice || 0);
      } catch (err) {
        console.error("Fetch cart error:", err);
        setError("Something went wrong");
      }
    };

    fetchCart();
  }, [token]);

  // ✅ add item
  const addToCart = async (productId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3002/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("SERVER:", result);
        setError(result.message || "Failed to add to cart");
        return;
      }

      handleCartResponse(result);
    } catch (err) {
      console.error("Add error:", err);
      setError("Something went wrong");
    }
  };

  // ✅ update item
  const updateItem = async (productId: string, quantity: number) => {
    if (!token) return;
    if (quantity <= 0) return;

    try {
      const response = await fetch(`http://localhost:3002/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("SERVER:", result);
        setError(result.message || "Failed to update cart");
        return;
      }

      handleCartResponse(result);
    } catch (err) {
      console.error("Update error:", err);
      setError("Something went wrong");
    }
  };

  // ✅ remove item
  const RemoveItem = async (productId: string) => {
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3002/cart/items/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.log("SERVER:", result);
        setError(result.message || "Failed to delete item");
        return;
      }

      handleCartResponse(result);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Something went wrong");
    }
  };

  const clearCart = async () => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3002/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("SERVER:", result);
        setError(result.message || "Failed to clear cart");
        return;
      }

      handleCartResponse(result);
    } catch (err) {
      console.error("Clear error:", err);
      setError("Something went wrong");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        addToCart,
        updateItem,
        RemoveItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
