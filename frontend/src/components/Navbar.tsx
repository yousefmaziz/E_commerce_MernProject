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
import ListItemIcon from "@mui/material/ListItemIcon";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";

import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/cart/CartContext";

function Navbar() {
  const { username, isAuthenticated, logout } = useAuth()!;
  const { cartItems } = useCart()!;
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ===== NAV LINKS (Desktop + Mobile) =====
  const navLinks = [
    { label: "Home", path: "/", icon: <HomeRoundedIcon fontSize="small" /> },
    ...(isAuthenticated
      ? [
          {
            label: "My Orders",
            path: "/myorder",
            icon: <ReceiptLongIcon fontSize="small" />,
          },
          {
            label: "Dashboard",
            path: "/dashboard",
            icon: <DashboardRoundedIcon fontSize="small" />,
          },
        ]
      : []),
  ];

  // Active button styles
  const activeNavBtn = {
    color: "#a5b4fc",
    fontWeight: 700,
    background: "rgba(99,102,241,0.12)",
    borderRadius: "10px",
    px: 1.8,
  };

  const inactiveNavBtn = {
    color: "rgba(203,213,225,0.8)",
    fontWeight: 500,
    px: 1.8,
    borderRadius: "10px",
    "&:hover": {
      color: "#e2e8f0",
      background: "rgba(255,255,255,0.06)",
    },
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "rgba(9,14,28,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
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
              minHeight: "68px",
            }}
          >
            {/* ===== LOGO ===== */}
            <Button
              variant="text"
              onClick={() => navigate("/")}
              sx={{ p: 0, textTransform: "none", minWidth: 0 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
                  }}
                >
                  <StorefrontRoundedIcon sx={{ color: "#fff", fontSize: 20 }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    background: "linear-gradient(135deg, #e0e7ff, #a5b4fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Tech Store
                </Typography>
              </Box>
            </Button>

            {/* ===== DESKTOP MENU ===== */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {navLinks.map((item) => (
                  <Button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    startIcon={item.icon}
                    sx={{
                      textTransform: "none",
                      fontSize: "0.9rem",
                      transition: "all 0.2s",
                      ...(isActive(item.path) ? activeNavBtn : inactiveNavBtn),
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                {/* Cart */}
                {isAuthenticated && (
                  <IconButton
                    onClick={() => navigate("/cart")}
                    sx={{
                      mx: 0.5,
                      color: isActive("/cart")
                        ? "#a5b4fc"
                        : "rgba(203,213,225,0.7)",
                      background: isActive("/cart")
                        ? "rgba(99,102,241,0.12)"
                        : "transparent",
                      borderRadius: "10px",
                      "&:hover": { background: "rgba(255,255,255,0.06)" },
                    }}
                  >
                    <Badge
                      badgeContent={cartItems.length}
                      sx={{
                        "& .MuiBadge-badge": {
                          background:
                            "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.65rem",
                        },
                      }}
                    >
                      <ShoppingCartIcon fontSize="small" />
                    </Badge>
                  </IconButton>
                )}

                {/* Username avatar */}
                {isAuthenticated && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mx: 1,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 26,
                        height: 26,
                        fontSize: "0.75rem",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        fontWeight: 700,
                      }}
                    >
                      {username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      sx={{
                        color: "#e2e8f0",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                      }}
                    >
                      {username}
                    </Typography>
                  </Box>
                )}

                {/* Login / Logout */}
                {isAuthenticated ? (
                  <Button
                    variant="outlined"
                    onClick={handleLogout}
                    startIcon={<LogoutRoundedIcon sx={{ fontSize: 17 }} />}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      color: "#f87171",
                      border: "1px solid rgba(239,68,68,0.35)",
                      "&:hover": {
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.6)",
                      },
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    startIcon={<LoginRoundedIcon sx={{ fontSize: 17 }} />}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        boxShadow: "0 6px 20px rgba(99,102,241,0.5)",
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            )}

            {/* ===== MOBILE MENU BUTTON ===== */}
            {isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {isAuthenticated && (
                  <IconButton
                    onClick={() => navigate("/cart")}
                    sx={{ color: "rgba(203,213,225,0.8)" }}
                  >
                    <Badge
                      badgeContent={cartItems.length}
                      sx={{
                        "& .MuiBadge-badge": {
                          background:
                            "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          color: "#fff",
                          fontWeight: 700,
                        },
                      }}
                    ></Badge>
                  </IconButton>
                )}
                <IconButton
                  onClick={() => setOpenDrawer(true)}
                  sx={{
                    color: "white",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    width: 40,
                    height: 40,
                    "&:hover": { background: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <MenuIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* ===== MOBILE DRAWER ===== */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            width: 270,
            background: "rgba(9,14,28,0.97)",
            backdropFilter: "blur(20px)",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            color: "white",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 2.5,
          }}
        >
          {/* Drawer Header */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StorefrontRoundedIcon sx={{ color: "#fff", fontSize: 20 }} />
            </Box>
            <Typography
              sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#e2e8f0" }}
            >
              Tech Store
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 2 }} />

          {/* Nav Links */}
          <List disablePadding sx={{ flex: 1 }}>
            {navLinks.map((item) => (
              <ListItemButton
                key={item.path}
                onClick={() => {
                  item.action?.();
                  navigate(item.path);
                  setOpenDrawer(false);
                }}
                sx={{
                  borderRadius: "12px",
                  mb: 0.5,
                  px: 1.5,
                  py: 1.1,
                  background: isActive(item.path)
                    ? "rgba(99,102,241,0.15)"
                    : "transparent",
                  border: isActive(item.path)
                    ? "1px solid rgba(99,102,241,0.3)"
                    : "1px solid transparent",
                  "&:hover": { background: "rgba(255,255,255,0.06)" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive(item.path)
                      ? "#a5b4fc"
                      : "rgba(148,163,184,0.7)",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.92rem",
                    fontWeight: isActive(item.path) ? 700 : 500,
                    color: isActive(item.path) ? "#a5b4fc" : "#cbd5e1",
                  }}
                />
                {isActive(item.path) && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#818cf8",
                    }}
                  />
                )}
              </ListItemButton>
            ))}

            {/* Cart in drawer */}
            {isAuthenticated && (
              <ListItemButton
                onClick={() => {
                  navigate("/cart");
                  setOpenDrawer(false);
                }}
                sx={{
                  borderRadius: "12px",
                  mb: 0.5,
                  px: 1.5,
                  py: 1.1,
                  background: isActive("/cart")
                    ? "rgba(99,102,241,0.15)"
                    : "transparent",
                  border: isActive("/cart")
                    ? "1px solid rgba(99,102,241,0.3)"
                    : "1px solid transparent",
                  "&:hover": { background: "rgba(255,255,255,0.06)" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive("/cart")
                      ? "#a5b4fc"
                      : "rgba(148,163,184,0.7)",
                  }}
                >
                  <Badge
                    badgeContent={cartItems.length}
                    sx={{
                      "& .MuiBadge-badge": {
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        color: "#fff",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                      },
                    }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary="Cart"
                  primaryTypographyProps={{
                    fontSize: "0.92rem",
                    fontWeight: isActive("/cart") ? 700 : 500,
                    color: isActive("/cart") ? "#a5b4fc" : "#cbd5e1",
                  }}
                />
              </ListItemButton>
            )}
          </List>

          {/* Bottom: User + Auth */}
          <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 2 }} />

          {isAuthenticated ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1.5,
                  py: 1,
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: "0.85rem",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    fontWeight: 700,
                  }}
                >
                  {username?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: "#e2e8f0",
                    }}
                  >
                    {username}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.72rem", color: "rgba(148,163,184,0.6)" }}
                  >
                    Logged in
                  </Typography>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleLogout}
                startIcon={<LogoutRoundedIcon />}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  color: "#f87171",
                  border: "1px solid rgba(239,68,68,0.35)",
                  py: 1.1,
                  "&:hover": {
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.6)",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                navigate("/login");
                setOpenDrawer(false);
              }}
              startIcon={<LoginRoundedIcon />}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                py: 1.2,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                },
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
