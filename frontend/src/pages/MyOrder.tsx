import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
const API = import.meta.env.VITE_BACK_API;
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

      setOrders(result.orders || result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    myOrders();
  }, []);

  return (
    <>
      {orders.length === 0 ? (
        <Loading />
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "#F7F3EE",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              py: { xs: 5, md: 8 },
            }}
          >
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
                Order History
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#2F211C",
                  letterSpacing: "-0.02em",
                  mb: 1,
                }}
              >
                My Orders
              </Typography>

              <Typography
                sx={{
                  color: "#806F64",
                  fontSize: "0.95rem",
                }}
              >
                View your previous orders and purchase details.
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

            {/* ================= NO ORDERS ================= */}

            {orders.length === 0 ? (
              <Box
                sx={{
                  backgroundColor: "#FFFDFC",
                  border: "1px solid #E9DED4",
                  borderRadius: "20px",
                  p: 5,
                  textAlign: "center",
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
                  No Orders Found
                </Typography>

                <Typography
                  sx={{
                    color: "#806F64",
                    fontSize: "0.9rem",
                  }}
                >
                  You haven't placed any orders yet.
                </Typography>
              </Box>
            ) : (
              orders.map((order) => (
                <Box
                  key={order._id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",

                    p: {
                      xs: 2,
                      md: 3,
                    },

                    mb: 3,

                    borderRadius: "20px",

                    backgroundColor: "#FFFDFC",

                    border: "1px solid #E9DED4",

                    boxShadow: "0 8px 28px rgba(47, 33, 28, 0.08)",

                    gap: 3,

                    transition: "transform 0.25s ease, box-shadow 0.25s ease",

                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 14px 35px rgba(47, 33, 28, 0.12)",
                    },
                  }}
                >
                  {/* ================= ORDER TOP ================= */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,

                      borderBottom: "1px solid #E9DED4",

                      pb: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "#2F211C",
                        }}
                      >
                        Order #{order._id.slice(0, 8)}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#9A887C",
                          mt: 0.4,
                        }}
                      >
                        {order.orderItems.length}{" "}
                        {order.orderItems.length === 1 ? "item" : "items"}
                      </Typography>
                    </Box>

                    {/* STATUS */}

                    <Box
                      sx={{
                        px: 2.5,
                        py: 0.8,

                        borderRadius: "999px",

                        backgroundColor: "#EFE4D8",
                        color: "#6F4E37",

                        border: "1px solid #DFCAB7",

                        fontWeight: 700,
                        fontSize: "0.8rem",
                      }}
                    >
                      Ordered
                    </Box>
                  </Box>

                  {/* ================= PRODUCTS ================= */}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    {order.orderItems.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",

                          gap: {
                            xs: 2,
                            md: 3,
                          },

                          backgroundColor: "#F8F3EE",

                          border: "1px solid #EEE3D9",

                          p: 2,

                          borderRadius: "16px",
                        }}
                      >
                        {/* IMAGE */}

                        <Box
                          component="img"
                          src={item.productImage}
                          alt={item.productTitle}
                          sx={{
                            width: {
                              xs: 75,
                              sm: 90,
                            },

                            height: {
                              xs: 75,
                              sm: 90,
                            },

                            objectFit: "cover",

                            borderRadius: "12px",

                            border: "1px solid #E4D7CB",
                          }}
                        />

                        {/* PRODUCT INFO */}

                        <Box
                          sx={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: "#2F211C",

                              fontSize: {
                                xs: "0.95rem",
                                sm: "1.05rem",
                              },

                              mb: 0.7,
                            }}
                          >
                            {item.productTitle}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: "#806F64",
                              mb: 0.5,
                            }}
                          >
                            ${item.price.toFixed(2)} × {item.quantity}
                          </Typography>

                          <Typography
                            sx={{
                              color: "#6F4E37",
                              fontWeight: 800,
                              fontSize: "0.95rem",
                            }}
                          >
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {/* ================= SHIPPING ================= */}

                  <Box
                    sx={{
                      backgroundColor: "#F8F3EE",

                      border: "1px solid #EEE3D9",

                      borderRadius: "14px",

                      p: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#A47551",

                        fontSize: "0.75rem",
                        fontWeight: 700,

                        textTransform: "uppercase",
                        letterSpacing: "0.08em",

                        mb: 0.7,
                      }}
                    >
                      Shipping Address
                    </Typography>

                    <Typography
                      sx={{
                        color: "#2F211C",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                      }}
                    >
                      {order.address}
                    </Typography>
                  </Box>

                  {/* ================= TOTAL ================= */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      borderTop: "1px solid #E9DED4",

                      pt: 2.5,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#806F64",
                        fontWeight: 600,
                      }}
                    >
                      Total Amount
                    </Typography>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "#6F4E37",
                      }}
                    >
                      ${order.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Container>
        </Box>
      )}
    </>
  );
}
