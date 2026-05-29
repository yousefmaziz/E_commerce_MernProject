import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery";

import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/cart/CartContext";

function Navbar() {
  const { username, isAuthenticated, logout } = useAuth()!;

  const { cartItems } = useCart()!;

  const navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      label: "Home",
      action: () => navigate("/"),
    },

    ...(isAuthenticated
      ? [
          {
            label: "My Orders",
            action: () => navigate("/myorder"),
          },

          {
            label: "Dashboard",
            action: () => navigate("/dashboard"),
          },

          {
            label: "Cart",
            action: () => navigate("/cart"),
          },
        ]
      : []),
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#0f172a",
          boxShadow: "none",
          zIndex: 1400,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: "70px",
            }}
          >
            {/* LEFT SIDE */}

            <Button
              variant="text"
              sx={{
                color: "white",
                textTransform: "none",
                p: 0,
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

            {/* DESKTOP MENU */}

            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
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

                {isAuthenticated && (
                  <>
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

                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {username}
                    </Typography>
                  </>
                )}

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
                    onClick={() => navigate("/login")}
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
            )}

            {/* MOBILE MENU BUTTON */}

            {isMobile && (
              <IconButton onClick={() => setOpenDrawer(true)}>
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{
            width: 260,
            height: "100%",
            backgroundColor: "#0f172a",
            color: "white",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: "bold",
            }}
          >
            Menu
          </Typography>

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.label}
                onClick={() => {
                  item.action();
                  setOpenDrawer(false);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,

                  "&:hover": {
                    backgroundColor: "#1e293b",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}

            {isAuthenticated && (
              <ListItemButton
                onClick={() => {
                  navigate("/cart");
                  setOpenDrawer(false);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,

                  "&:hover": {
                    backgroundColor: "#1e293b",
                  },
                }}
              >
                <Badge
                  badgeContent={cartItems.length}
                  color="error"
                  sx={{ mr: 2 }}
                >
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Badge>

                <ListItemText primary="Cart" />
              </ListItemButton>
            )}
          </List>

          {/* USER */}

          {isAuthenticated && (
            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                {username}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Logout
              </Button>
            </Box>
          )}

          {!isAuthenticated && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                navigate("/login");
                setOpenDrawer(false);
              }}
              sx={{
                mt: 2,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
