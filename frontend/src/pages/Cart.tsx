import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/cart/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, updateItem, removeItem, clearCart } =
    useCart()!;

  const handleIncrease = (productId: string, quantity: number) => {
    updateItem(productId, quantity + 1);
  };

  const handleDecrease = (productId: string, quantity: number) => {
    if (quantity > 1) {
      updateItem(productId, quantity - 1);
    }
  };

  const handleDelete = (productId: string) => {
    removeItem(productId);
  };
  const clearAll = () => {
    clearCart();
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F7F3EE",
        py: { xs: 4, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        {/* ================= HEADER ================= */}

        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              color: "#A47551",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              mb: 1,
            }}
          >
            Your Selection
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "#2F211C",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              mb: 1,
            }}
          >
            Shopping Cart
          </Typography>

          <Typography
            sx={{
              color: "#806F64",
              fontSize: "0.95rem",
            }}
          >
            Review your items before checkout.
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

        {/* ================= EMPTY CART ================= */}

        {cartItems.length === 0 ? (
          <Box
            sx={{
              backgroundColor: "#FFFDFC",
              border: "1px solid #E9DED4",
              borderRadius: "20px",
              p: { xs: 4, md: 6 },
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(47,33,28,0.06)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#2F211C",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Your cart is empty
            </Typography>

            <Typography
              sx={{
                color: "#806F64",
                mb: 3,
              }}
            >
              Looks like you haven't added anything yet.
            </Typography>

            <Button
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

                "&:hover": {
                  backgroundColor: "#4E342E",
                  boxShadow: "none",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            {/* ================= CART TOP ================= */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  color: "#806F64",
                  fontWeight: 600,
                }}
              >
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                in your cart
              </Typography>

              <Button
                onClick={clearAll}
                sx={{
                  color: "#A94A43",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "10px",
                  px: 2,

                  "&:hover": {
                    backgroundColor: "#FFF1F0",
                  },
                }}
              >
                Clear Cart
              </Button>
            </Box>

            {/* ================= PRODUCTS ================= */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {cartItems.map((item) => (
                <Box
                  key={item.productId}
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    p: {
                      xs: 2,
                      sm: 2.5,
                    },

                    borderRadius: "18px",

                    backgroundColor: "#FFFDFC",

                    border: "1px solid #E9DED4",

                    boxShadow: "0 6px 20px rgba(47,33,28,0.06)",

                    gap: {
                      xs: 2,
                      md: 3,
                    },

                    flexWrap: {
                      xs: "wrap",
                      md: "nowrap",
                    },

                    transition: "all 0.25s ease",

                    "&:hover": {
                      borderColor: "#D5B89D",
                      boxShadow: "0 10px 28px rgba(47,33,28,0.1)",
                    },
                  }}
                >
                  {/* IMAGE */}

                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.title}
                    sx={{
                      width: {
                        xs: 85,
                        sm: 105,
                      },

                      height: {
                        xs: 85,
                        sm: 105,
                      },

                      objectFit: "cover",

                      borderRadius: "14px",

                      backgroundColor: "#F3EDE7",

                      border: "1px solid #EEE3D9",
                    }}
                  />

                  {/* PRODUCT INFO */}

                  <Box
                    sx={{
                      flex: 1,
                      minWidth: {
                        xs: 150,
                        md: 220,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#2F211C",
                        fontWeight: 700,
                        fontSize: {
                          xs: "1rem",
                          md: "1.1rem",
                        },
                        mb: 0.7,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#6F4E37",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                      }}
                    >
                      ${item.unitPrice.toFixed(2)}
                    </Typography>
                  </Box>

                  {/* ================= QUANTITY ================= */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",

                      border: "1px solid #DED0C4",

                      borderRadius: "12px",

                      backgroundColor: "#FAF7F4",

                      px: 0.5,
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        handleDecrease(item.productId, item.quantity)
                      }
                      disabled={item.quantity <= 1}
                      size="small"
                      sx={{
                        color: "#6F4E37",

                        "&:hover": {
                          backgroundColor: "#EFE4D8",
                        },
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>

                    <Typography
                      sx={{
                        minWidth: 35,
                        textAlign: "center",
                        color: "#2F211C",
                        fontWeight: 700,
                      }}
                    >
                      {item.quantity}
                    </Typography>

                    <IconButton
                      onClick={() =>
                        handleIncrease(item.productId, item.quantity)
                      }
                      size="small"
                      sx={{
                        color: "#6F4E37",

                        "&:hover": {
                          backgroundColor: "#EFE4D8",
                        },
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* ================= SUBTOTAL ================= */}

                  <Typography
                    sx={{
                      fontWeight: 800,
                      minWidth: 100,
                      textAlign: {
                        xs: "left",
                        md: "right",
                      },
                      color: "#6F4E37",
                      fontSize: "1rem",
                    }}
                  >
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </Typography>

                  {/* DELETE */}

                  <IconButton
                    onClick={() => handleDelete(item.productId)}
                    sx={{
                      color: "#B42318",

                      "&:hover": {
                        backgroundColor: "#FFF1F0",
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>

            {/* ================= ORDER SUMMARY ================= */}

            <Box
              sx={{
                mt: 4,

                backgroundColor: "#FFFDFC",

                border: "1px solid #E9DED4",

                borderRadius: "18px",

                p: {
                  xs: 2.5,
                  md: 3,
                },

                boxShadow: "0 8px 25px rgba(47,33,28,0.07)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#2F211C",
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                Order Summary
              </Typography>

              <Divider
                sx={{
                  borderColor: "#E9DED4",
                  mb: 2.5,
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    color: "#806F64",
                    fontWeight: 600,
                  }}
                >
                  Total
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: "#6F4E37",
                    fontWeight: 800,
                  }}
                >
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/checkout")}
                sx={{
                  backgroundColor: "#6F4E37",

                  borderRadius: "12px",

                  py: 1.4,

                  textTransform: "none",

                  fontSize: "1rem",
                  fontWeight: 700,

                  boxShadow: "none",

                  transition: "all 0.25s ease",

                  "&:hover": {
                    backgroundColor: "#4E342E",

                    transform: "translateY(-1px)",

                    boxShadow: "0 8px 20px rgba(78,52,46,0.2)",
                  },
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
