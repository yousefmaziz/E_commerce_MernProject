import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/cart/CartContext";
function Navbar() {
  const { username, isAuthenticated, logout, role } = useAuth()!;
  const { cartItems } = useCart()!;

  const cartCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity ?? 1), 0) ?? 0;

  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = React.useState(false);

  // ============================================
  // ACTIVE PAGE
  // ============================================

  const isActive = (path: string) => location.pathname === path;

  // ============================================
  // MOBILE NAVIGATION
  // ============================================

  const handleMobileNavigate = (path: string) => {
    navigate(path);
    setOpenDrawer(false);
  };

  // ============================================
  // LOGOUT
  // ============================================

  const handleLogout = () => {
    logout();
    setOpenDrawer(false);
    navigate("/login");
  };

  // ============================================
  // NAV LINKS
  // ============================================

  const navLinks = [
    {
      label: "Home",
      path: "/",
      icon: <HomeRoundedIcon fontSize="small" />,
    },

    ...(isAuthenticated
      ? [
          {
            label: "My Orders",
            path: "/myorder",
            icon: <ReceiptLongIcon fontSize="small" />,
          },
        ]
      : []),

    ...(isAuthenticated && role === "admin"
      ? [
          {
            label: "Dashboard",
            path: "/dashboard",
            icon: <DashboardRoundedIcon fontSize="small" />,
          },
        ]
      : []),
  ];

  // ============================================
  // DESKTOP STYLES
  // ============================================

  const activeNavBtn = {
    color: "#FFFFFF",
    fontWeight: 700,

    backgroundColor: "#6F4E37",

    border: "1px solid #8A684F",

    borderRadius: "10px",

    px: 1.8,

    "&:hover": {
      backgroundColor: "#806047",
    },
  };

  const inactiveNavBtn = {
    color: "#F1E7DF",

    fontWeight: 600,

    px: 1.8,

    borderRadius: "10px",

    "&:hover": {
      color: "#FFFFFF",

      backgroundColor: "rgba(255,255,255,0.10)",
    },
  };

  return (
    <>
      {/* ============================================
                          NAVBAR
      ============================================ */}

      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#2F211C",

          borderBottom: "1px solid #4A352D",

          boxShadow: "0 4px 18px rgba(47,33,28,0.18)",

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

              minHeight: {
                xs: "64px",
                md: "68px",
              },
            }}
          >
            {/* ====================================
                            LOGO
            ==================================== */}

            <Button
              variant="text"
              onClick={() => navigate("/")}
              sx={{
                p: 0,

                textTransform: "none",

                minWidth: 0,

                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: {
                    xs: 0.9,
                    sm: 1.2,
                  },
                }}
              >
                {/* LOGO ICON */}

                <Box
                  sx={{
                    width: {
                      xs: 35,
                      sm: 38,
                    },

                    height: {
                      xs: 35,
                      sm: 38,
                    },

                    borderRadius: "10px",

                    backgroundColor: "#D7B08A",

                    border: "1px solid #E7C9AA",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                  }}
                >
                  <StorefrontRoundedIcon
                    sx={{
                      color: "#2F211C",

                      fontSize: {
                        xs: 20,
                        sm: 21,
                      },
                    }}
                  />
                </Box>

                {/* STORE NAME */}

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,

                    letterSpacing: "-0.02em",

                    color: "#FFFFFF",

                    fontSize: {
                      xs: "1rem",
                      sm: "1.2rem",
                    },
                  }}
                >
                  Tech Store
                </Typography>
              </Box>
            </Button>

            {/* ====================================
                         DESKTOP MENU
            ==================================== */}

            {!isMobile && (
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 0.6,
                }}
              >
                {navLinks.map((item) => (
                  <Button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    startIcon={item.icon}
                    sx={{
                      textTransform: "none",

                      fontSize: "0.9rem",

                      transition: "all 0.2s ease",

                      ...(isActive(item.path) ? activeNavBtn : inactiveNavBtn),
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                {/* ================================
                              CART
                ================================ */}

                {isAuthenticated && (
                  <IconButton
                    aria-label="cart"
                    onClick={() => navigate("/cart")}
                    sx={{
                      mx: 0.5,

                      width: 42,

                      height: 42,

                      color: isActive("/cart") ? "#2F211C" : "#FFFFFF",

                      backgroundColor: isActive("/cart")
                        ? "#D7B08A"
                        : "rgba(255,255,255,0.10)",

                      border: isActive("/cart")
                        ? "1px solid #E7C9AA"
                        : "1px solid rgba(255,255,255,0.14)",

                      borderRadius: "10px",

                      "&:hover": {
                        backgroundColor: "#D7B08A",

                        color: "#2F211C",
                      },
                    }}
                  >
                    <Badge
                      badgeContent={cartCount}
                      max={99}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "#FFFFFF",

                          color: "#4E342E",

                          border: "1px solid #4E342E",

                          fontWeight: 800,

                          fontSize: "0.65rem",

                          minWidth: 17,

                          height: 17,
                        },
                      }}
                    >
                      <ShoppingCartIcon
                        sx={{
                          fontSize: 21,
                        }}
                      />
                    </Badge>
                  </IconButton>
                )}

                {/* ================================
                              USER
                ================================ */}

                {isAuthenticated && (
                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      gap: 1,

                      mx: 0.5,

                      px: 1.4,

                      py: 0.6,

                      borderRadius: "10px",

                      backgroundColor: "#3C2A23",

                      border: "1px solid #594037",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 28,

                        height: 28,

                        fontSize: "0.76rem",

                        backgroundColor: "#D7B08A",

                        color: "#2F211C",

                        fontWeight: 800,
                      }}
                    >
                      {username?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography
                      sx={{
                        color: "#FFFFFF",

                        fontSize: "0.88rem",

                        fontWeight: 600,
                      }}
                    >
                      {username}
                    </Typography>
                  </Box>
                )}

                {/* ================================
                         LOGIN / LOGOUT
                ================================ */}

                {isAuthenticated ? (
                  <Button
                    variant="outlined"
                    onClick={handleLogout}
                    startIcon={
                      <LogoutRoundedIcon
                        sx={{
                          fontSize: 17,
                        }}
                      />
                    }
                    sx={{
                      borderRadius: "10px",

                      textTransform: "none",

                      fontWeight: 700,

                      fontSize: "0.88rem",

                      color: "#FF8A80",

                      border: "1px solid #B85C57",

                      "&:hover": {
                        color: "#FFFFFF",

                        backgroundColor: "#B42318",

                        borderColor: "#B42318",
                      },
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    startIcon={
                      <LoginRoundedIcon
                        sx={{
                          fontSize: 17,
                        }}
                      />
                    }
                    sx={{
                      borderRadius: "10px",

                      textTransform: "none",

                      fontWeight: 800,

                      backgroundColor: "#D7B08A",

                      color: "#2F211C",

                      boxShadow: "none",

                      "&:hover": {
                        backgroundColor: "#E4C19E",

                        boxShadow: "none",
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            )}

            {/* ====================================
                        MOBILE ICONS
            ==================================== */}

            {isMobile && (
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 1,
                }}
              >
                {/* ================================
                         MOBILE CART
                ================================ */}

                {isAuthenticated && (
                  <IconButton
                    aria-label="cart"
                    onClick={() => navigate("/cart")}
                    sx={{
                      width: 42,

                      height: 42,

                      color: "#2F211C",

                      backgroundColor: isActive("/cart")
                        ? "#FFFFFF"
                        : "#D7B08A",

                      border: "1px solid #E9C9AA",

                      borderRadius: "11px",

                      boxShadow: "0 3px 10px rgba(0,0,0,0.15)",

                      transition: "all 0.2s ease",

                      "&:hover": {
                        backgroundColor: "#FFFFFF",

                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <Badge
                      badgeContent={cartCount}
                      max={99}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "#6F4E37",

                          color: "#FFFFFF",

                          border: "1px solid #FFF9F3",

                          fontWeight: 800,

                          fontSize: "0.62rem",

                          minWidth: 17,

                          height: 17,
                        },
                      }}
                    >
                      <ShoppingCartIcon
                        sx={{
                          fontSize: 22,
                        }}
                      />
                    </Badge>
                  </IconButton>
                )}

                {/* ================================
                          MENU
                ================================ */}

                <IconButton
                  aria-label="open menu"
                  onClick={() => setOpenDrawer(true)}
                  sx={{
                    width: 42,

                    height: 42,

                    color: "black",

                    backgroundColor: "#FFF9F3",

                    border: "1px solid #E9DED4",

                    borderRadius: "11px",

                    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",

                    transition: "all 0.2s ease",

                    "&:hover": {
                      backgroundColor: "#D7B08A",

                      borderColor: "#D7B08A",

                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <MenuIcon
                    sx={{
                      fontSize: 24,

                      fontWeight: 800,
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* ============================================
             MOBILE DRAWER — REDESIGNED
      ============================================ */}

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: 290, sm: 320 },
            background:
              "linear-gradient(165deg, #241A16 0%, #1A120F 55%, #120C0A 100%)",
            color: "black",
            p: 0,
            display: "flex",
            flexDirection: "column",
            borderLeft: "1px solid rgba(215,176,138,0.18)",
            boxShadow: "-12px 0 40px rgba(0,0,0,0.45)",
            overflow: "hidden",
          },
        }}
        ModalProps={{
          BackdropProps: {
            sx: {
              backgroundColor: "rgba(18,12,10,0.55)",
              backdropFilter: "blur(3px)",
            },
          },
        }}
      >
        {/* Decorative glow */}
        <Box
          sx={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(215,176,138,0.28) 0%, rgba(215,176,138,0) 70%)",
            pointerEvents: "none",
          }}
        />

        {/* ====================================
                      DRAWER HEADER
        ==================================== */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.4,
            pt: 2.6,
            pb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                background: "linear-gradient(145deg, #E7C9AA 0%, #C79A6C 100%)",
                border: "1px solid rgba(255,255,255,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(199,154,108,0.35)",
              }}
            >
              <StorefrontRoundedIcon sx={{ color: "#2F211C", fontSize: 22 }} />
            </Box>

            <Typography
              sx={{
                fontWeight: 800,
                color: "#FFFFFF",
                fontSize: "1.08rem",
                letterSpacing: "-0.01em",
              }}
            >
              Tech Store
            </Typography>
          </Box>

          <IconButton
            aria-label="close menu"
            onClick={() => setOpenDrawer(false)}
            sx={{
              width: 36,
              height: 36,
              color: "#F1E7DF",
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.14)",
              },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </Box>

        {/* ====================================
                       USER CARD
        ==================================== */}

        {isAuthenticated && (
          <Box
            sx={{
              mx: 2.4,
              mb: 1,
              p: 1.6,
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: 1.4,
              background:
                "linear-gradient(135deg, rgba(215,176,138,0.16) 0%, rgba(215,176,138,0.05) 100%)",
              border: "1px solid rgba(215,176,138,0.25)",
            }}
          >
            <Avatar
              sx={{
                width: 44,
                height: 44,
                fontWeight: 800,
                fontSize: "1rem",
                background: "linear-gradient(145deg, #E7C9AA 0%, #B4835A 100%)",
                color: "#2F211C",
                border: "2px solid rgba(255,255,255,0.25)",
              }}
            >
              {username?.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  color: "black",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {username}
              </Typography>

              <Box
                sx={{
                  display: "inline-flex",
                  mt: 0.4,
                  px: 1,
                  py: 0.15,
                  borderRadius: "999px",
                  backgroundColor: "rgba(215,176,138,0.18)",
                }}
              >
                <Typography
                  sx={{
                    color: "black",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    letterSpacing: "0.02em",
                  }}
                >
                  {role || "user"}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Divider
          sx={{ borderColor: "rgba(255,255,255,0.08)", my: 1.2, mx: 2.4 }}
        />

        {/* ====================================
                        NAV LINKS
        ==================================== */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.6,
            px: 1.8,
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              px: 1,
              mb: 0.4,
            }}
          >
            Menu
          </Typography>

          {navLinks.map((item) => {
            const active = isActive(item.path);

            return (
              <Button
                key={item.path}
                onClick={() => handleMobileNavigate(item.path)}
                startIcon={item.icon}
                endIcon={
                  <ChevronRightRoundedIcon
                    sx={{
                      fontSize: 18,
                      ml: "auto",
                      opacity: active ? 0.9 : 0.35,
                    }}
                  />
                }
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  borderRadius: "13px",
                  px: 1.6,
                  py: 1.25,
                  fontSize: "0.94rem",
                  fontWeight: active ? 800 : 600,
                  color: active ? "#2F211C" : "black",
                  background: active
                    ? "linear-gradient(120deg, #E7C9AA 0%, #C79A6C 100%)"
                    : "rgba(255,255,255,0.045)",
                  border: active
                    ? "1px solid rgba(255,255,255,0.3)"
                    : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: active
                    ? "0 6px 16px rgba(199,154,108,0.3)"
                    : "none",
                  transition: "all 0.18s ease",
                  "& .MuiButton-startIcon": {
                    color: active ? "#2F211C" : "black",
                  },
                  "& .MuiButton-endIcon": {
                    color: active ? "#2F211C" : "black",
                  },
                  "&:hover": {
                    background: active
                      ? "linear-gradient(120deg, #EFD6B8 0%, #D2A578 100%)"
                      : "rgba(255,255,255,0.09)",
                    transform: "translateX(2px)",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}

          {isAuthenticated && (
            <Button
              onClick={() => handleMobileNavigate("/cart")}
              startIcon={
                <Badge
                  badgeContent={cartCount}
                  max={99}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#6F4E37",
                      color: "#FFFFFF",
                      border: "1px solid #FFF9F3",
                      fontWeight: 800,
                      fontSize: "0.6rem",
                      minWidth: 15,
                      height: 15,
                    },
                  }}
                >
                  <ShoppingCartIcon fontSize="small" />
                </Badge>
              }
              endIcon={
                <ChevronRightRoundedIcon
                  sx={{
                    fontSize: 18,
                    ml: "auto",
                    opacity: isActive("/cart") ? 0.9 : 0.35,
                  }}
                />
              }
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                borderRadius: "13px",
                px: 1.6,
                py: 1.25,
                fontSize: "0.94rem",
                fontWeight: isActive("/cart") ? 800 : 600,
                color: isActive("/cart") ? "#2F211C" : "black",
                background: isActive("/cart")
                  ? "linear-gradient(120deg, #E7C9AA 0%, #C79A6C 100%)"
                  : "rgba(255,255,255,0.045)",
                border: isActive("/cart")
                  ? "1px solid rgba(255,255,255,0.3)"
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: isActive("/cart")
                  ? "0 6px 16px rgba(199,154,108,0.3)"
                  : "none",
                transition: "all 0.18s ease",
                "& .MuiButton-startIcon": {
                  color: isActive("/cart") ? "#2F211C" : "black",
                },
                "& .MuiButton-endIcon": {
                  color: isActive("/cart") ? "#2F211C" : "black",
                },
                "&:hover": {
                  background: isActive("/cart")
                    ? "linear-gradient(120deg, #EFD6B8 0%, #D2A578 100%)"
                    : "rgba(255,255,255,0.09)",
                  transform: "translateX(2px)",
                },
              }}
            >
              Cart
            </Button>
          )}
        </Box>

        {/* ====================================
                       BOTTOM AREA
        ==================================== */}

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ px: 2.4, pb: 2.6 }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

          {isAuthenticated ? (
            <Button
              fullWidth
              startIcon={<LogoutRoundedIcon />}
              onClick={handleLogout}
              sx={{
                py: 1.25,
                borderRadius: "13px",
                textTransform: "none",
                fontWeight: 800,
                fontSize: "0.95rem",
                color: "#FFFFFF",
                background: "linear-gradient(120deg, #C0392B 0%, #922B21 100%)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 6px 16px rgba(146,43,33,0.35)",
                "&:hover": {
                  background:
                    "linear-gradient(120deg, #D35045 0%, #A5352A 100%)",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              fullWidth
              startIcon={<LoginRoundedIcon />}
              onClick={() => handleMobileNavigate("/login")}
              sx={{
                py: 1.25,
                borderRadius: "13px",
                textTransform: "none",
                fontWeight: 800,
                fontSize: "0.95rem",
                background: "linear-gradient(120deg, #E7C9AA 0%, #C79A6C 100%)",
                color: "#2F211C",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 6px 16px rgba(199,154,108,0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(120deg, #EFD6B8 0%, #D2A578 100%)",
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
