import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { useCart } from "../context/cart/CartContext";
import { useAuth } from "../context/Auth/AuthContext";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { token } = useAuth();
  const { cartItems, totalPrice } = useCart();

  const addressRef = useRef<HTMLInputElement>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [addressError, setAddressError] = useState("");

  const navigate = useNavigate();

  const Checkout = async () => {
    const adress = addressRef.current?.value;

    // ✅ validation
    if (!adress || adress.trim() === "") {
      setAddressError("Address is required");
      return;
    }

    setAddressError("");

    try {
      const response = await fetch("http://localhost:3002/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          adress,
          paymentMethod,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("SERVER:", result);
        return;
      }

      navigate("/order");
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  // ❌ لو الكارت فاضي
  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5">Your cart is empty 🛒</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        {/* 🧾 Order Summary */}
        <Paper sx={{ flex: 1, p: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          {cartItems.map((item) => (
            <Box
              key={item.productId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography>
                {item.title} x {item.quantity}
              </Typography>
              <Typography>
                {(item.unitPrice * item.quantity).toFixed(2)} EGP
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">
            Total: {totalPrice.toFixed(2)} EGP
          </Typography>
        </Paper>

        {/* 📦 Checkout Form */}
        <Paper sx={{ flex: 1, p: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            Shipping & Payment
          </Typography>

          {/* 📍 Address */}
          <TextField
            fullWidth
            label="Address"
            inputRef={addressRef}
            error={!!addressError}
            helperText={addressError}
            sx={{ mb: 2 }}
          />

          {/* 💳 Payment */}
          <TextField
            fullWidth
            label="Payment Method (cash / card)"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* ✅ Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{ color: "white", py: 1.5 }}
            onClick={Checkout}
          >
            Confirm Order
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
