import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../context/Auth/AuthContext";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { useCart } from "../context/cart/CartContext";

function Navbar() {
  const { username, isAuthenticated, logout } = useAuth();

  const { cartItems } = useCart();

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#0f172a",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* LOGO */}

            <Button
              variant="text"
              sx={{
                color: "white",
                textTransform: "none",
              }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AdbIcon sx={{ mr: 1 }} />

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  Tech Store
                </Typography>
              </Box>
            </Button>

            {/* RIGHT SIDE */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* HOME */}

              <Button
                onClick={() => navigate("/")}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Home
              </Button>

              {/* MY ORDERS */}

              {isAuthenticated && (
                <Button
                  onClick={() => navigate("/myorder")}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  My Orders
                </Button>
              )}

              {/* DASHBOARD */}

              {isAuthenticated && (
                <Button
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Dashboard
                </Button>
              )}

              {/* CART */}
              {isAuthenticated && (
                <Button
                  onClick={() => navigate("/cart")}
                  sx={{
                    color: "white",
                    minWidth: "auto",
                  }}
                >
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </Button>
              )}

              {/* USERNAME */}

              {isAuthenticated && (
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {username}
                </Typography>
              )}

              {/* LOGIN / LOGOUT */}

              {isAuthenticated ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: "bold",
                    boxShadow: "none",
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: "bold",
                    boxShadow: "none",
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
