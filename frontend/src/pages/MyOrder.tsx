import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect, useState } from "react";
const API = import.meta.env.BACK_API;
export default function MyOrder() {
  const { token } = useAuth()!;

  const [orders, setOrders] = useState<Order[]>([]);
  const myOrders = async () => {
    try {
      const response = await fetch(`${API}/user/myorder`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      console.log(result);

      setOrders(result.orders || result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    myOrders();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(37,99,235,0.18) 0%, transparent 30%),
          radial-gradient(circle at bottom right, rgba(168,85,247,0.18) 0%, transparent 30%),
          linear-gradient(160deg, #020617 0%, #0f172a 45%, #111827 100%)
        `,
      }}
    >
      <Container sx={{ py: 5 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "white",
          }}
        >
          My Orders
        </Typography>

        {orders.length === 0 ? (
          <Typography color="white">No Orders Found</Typography>
        ) : (
          orders.map((order) => (
            <Box
              key={order._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 3,
                mb: 3,
                borderRadius: "24px",
                background: "rgba(15,23,42,0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                gap: 3,
                color: "white",
              }}
            >
              {/* TOP */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  pb: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Order #{order._id.slice(0, 5)}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                    }}
                  ></Typography>
                </Box>

                <Box
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: "999px",
                    backgroundColor: "#22c55e",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Ordered
                </Box>
              </Box>

              {/* PRODUCTS */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {order.orderItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      p: 2,
                      borderRadius: "18px",
                    }}
                  >
                    <img
                      src={item.productImage}
                      alt={item.productTitle}
                      style={{
                        width: 90,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 14,
                      }}
                    />

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {item.productTitle}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4ade80",
                          fontWeight: "bold",
                          mt: 0.5,
                        }}
                      >
                        ${item.price} × {item.quantity} =
                        {item.price * item.quantity} $
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* ADDRESS */}
              <Box>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    mb: 1,
                  }}
                >
                  Shipping Address
                </Typography>

                <Typography>{order.address}</Typography>
              </Box>

              {/* TOTAL */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  pt: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Total Amount
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#4ade80",
                  }}
                >
                  ${order.totalPrice}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
}
