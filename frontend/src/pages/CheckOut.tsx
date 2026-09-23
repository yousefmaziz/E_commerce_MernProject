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
import toast from "react-hot-toast";
const API = import.meta.env.VITE_BACK_API;

export default function CheckoutPage() {
  const { token } = useAuth()!;
  const { cartItems, totalPrice, clearCart } = useCart()!;

  const addressRef = useRef<HTMLInputElement>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [addressError, setAddressError] = useState("");

  const navigate = useNavigate();

  const Checkout = async () => {
    const address = addressRef.current?.value;
    // ✅ validation
    if (!address || address.trim() === "") {
      setAddressError("Address is required");
      return;
    }

    setAddressError("");

    try {
      const response = await fetch(`${API}/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address,
          paymentMethod,
        }),
      });

      const result = await response.json();
      console.log("Checkout response:", result);

      if (!response.ok) {
        console.log("SERVER:", result);
        toast.error("Failed to place order. out of stock");
        return;
      }

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/order");
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(
        "An error occurred while placing the order. Please try again.",
      );
    }
  };

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#F7F3EE",
          py: { xs: 5, sm: 7 },
          px: { xs: 2, sm: 0 },
        }}
      >
        <Container maxWidth="lg" disableGutters={false}>
          <Box
            sx={{
              backgroundColor: "#FFFDFC",
              border: "1px solid #E9DED4",
              borderRadius: { xs: "16px", md: "20px" },
              p: { xs: 3, sm: 4, md: 6 },
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(47,33,28,0.06)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#2F211C",
                fontWeight: 800,
                mb: 1,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Your cart is empty
            </Typography>

            <Typography
              sx={{
                color: "#806F64",
                mb: 3,
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
              }}
            >
              Add some products before proceeding to checkout.
            </Typography>

            <Button
              fullWidth={true}
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                backgroundColor: "#6F4E37",
                borderRadius: "12px",
                px: 3,
                py: 1.2,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "none",
                maxWidth: { xs: "100%", sm: 260 },
                mx: "auto",

                "&:hover": {
                  backgroundColor: "#4E342E",
                  boxShadow: "none",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F7F3EE",
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* ================= HEADER ================= */}

        <Box sx={{ mb: { xs: 3, md: 5 } }}>
          <Typography
            sx={{
              color: "#A47551",
              fontSize: { xs: "0.7rem", sm: "0.78rem" },
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              mb: 1,
            }}
          >
            Almost There
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "#2F211C",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              mb: 1,
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.125rem" },
            }}
          >
            Checkout
          </Typography>

          <Typography
            sx={{
              color: "#806F64",
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
            }}
          >
            Review your order and complete your delivery details.
          </Typography>

          <Box
            sx={{
              width: 55,
              height: 3,
              backgroundColor: "#C69C72",
              borderRadius: "10px",
              mt: 2.5,
            }}
          />
        </Box>

        {/* ================= CONTENT ================= */}

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: "flex-start",
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {/* ================= ORDER SUMMARY ================= */}

          <Paper
            elevation={0}
            sx={{
              flex: 1,
              width: "100%",

              p: {
                xs: 2,
                sm: 3,
              },

              borderRadius: { xs: "14px", md: "18px" },

              backgroundColor: "#FFFDFC",

              border: "1px solid #E9DED4",

              boxShadow: "0 8px 25px rgba(47,33,28,0.07)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#2F211C",
                fontWeight: 800,
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "1.05rem", sm: "1.25rem" },
              }}
            >
              Order Summary
            </Typography>

            {/* PRODUCTS */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              {cartItems.map((item) => (
                <Box
                  key={item.productId}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",

                    gap: 1,

                    backgroundColor: "#F8F3EE",

                    border: "1px solid #EEE3D9",

                    borderRadius: "12px",

                    p: { xs: 1.5, sm: 2 },
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: "#2F211C",
                        fontWeight: 700,
                        fontSize: { xs: "0.88rem", sm: "0.95rem" },
                        mb: 0.4,
                        wordBreak: "break-word",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#806F64",
                        fontSize: { xs: "0.75rem", sm: "0.8rem" },
                      }}
                    >
                      ${item.unitPrice.toFixed(2)} × {item.quantity}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      color: "#6F4E37",
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                      fontSize: { xs: "0.88rem", sm: "1rem" },
                    }}
                  >
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider
              sx={{
                my: { xs: 2, sm: 3 },
                borderColor: "#E9DED4",
              }}
            />

            {/* TOTAL */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#806F64",
                  fontWeight: 600,
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                }}
              >
                Total Amount
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "#6F4E37",
                  fontWeight: 800,
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Paper>

          {/* ================= SHIPPING & PAYMENT ================= */}

          <Paper
            elevation={0}
            sx={{
              flex: 1,
              width: "100%",

              p: {
                xs: 2,
                sm: 3,
              },

              borderRadius: { xs: "14px", md: "18px" },

              backgroundColor: "#FFFDFC",

              border: "1px solid #E9DED4",

              boxShadow: "0 8px 25px rgba(47,33,28,0.07)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#2F211C",
                fontWeight: 800,
                mb: 1,
                fontSize: { xs: "1.05rem", sm: "1.25rem" },
              }}
            >
              Shipping & Payment
            </Typography>

            <Typography
              sx={{
                color: "#806F64",
                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                mb: { xs: 2, sm: 3 },
              }}
            >
              Enter your delivery information to complete the order.
            </Typography>

            {/* ADDRESS */}

            <Typography
              sx={{
                color: "#2F211C",
                fontWeight: 700,
                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                mb: 1,
              }}
            >
              Shipping Address
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter your delivery address"
              inputRef={addressRef}
              error={!!addressError}
              helperText={addressError}
              multiline
              minRows={2}
              sx={{
                mb: { xs: 2, sm: 3 },

                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#FAF7F4",
                  fontSize: { xs: "0.9rem", sm: "1rem" },

                  "& fieldset": {
                    borderColor: "#DED0C4",
                  },

                  "&:hover fieldset": {
                    borderColor: "#C69C72",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#6F4E37",
                  },
                },
              }}
            />

            {/* PAYMENT */}

            <Typography
              sx={{
                color: "#2F211C",
                fontWeight: 700,
                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                mb: 1,
              }}
            >
              Payment Method
            </Typography>

            <TextField
              fullWidth
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="cash / card"
              sx={{
                mb: { xs: 3, sm: 4 },

                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#FAF7F4",
                  fontSize: { xs: "0.9rem", sm: "1rem" },

                  "& fieldset": {
                    borderColor: "#DED0C4",
                  },

                  "&:hover fieldset": {
                    borderColor: "#C69C72",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#6F4E37",
                  },
                },
              }}
            />

            {/* CONFIRM BUTTON */}

            <Button
              fullWidth
              variant="contained"
              onClick={Checkout}
              sx={{
                backgroundColor: "#6F4E37",
                color: "#FFFFFF",

                py: { xs: 1.2, sm: 1.4 },

                borderRadius: "12px",

                textTransform: "none",

                fontSize: { xs: "0.9rem", sm: "1rem" },
                fontWeight: 700,

                boxShadow: "none",

                transition: "all 0.25s ease",

                "&:hover": {
                  backgroundColor: "#4E342E",

                  transform: "translateY(-1px)",

                  boxShadow: "0 8px 20px rgba(78,52,46,0.22)",
                },
              }}
            >
              Confirm Order
            </Button>

            <Typography
              sx={{
                color: "#9A887C",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                textAlign: "center",
                mt: 2,
              }}
            >
              Please review your order details before confirming.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
