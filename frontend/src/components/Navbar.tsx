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
function Navbar() {
  const { username, isAuthenticated, logout, role } = useAuth()!;
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
  // Active button styles
  const activeNavBtn = {
    color: "#FFF9F3",
    fontWeight: 700,
    backgroundColor: "rgba(198, 156, 114, 0.18)",
    borderRadius: "10px",
    px: 1.8,
  };

  const inactiveNavBtn = {
    color: "#CDBEB4",
    fontWeight: 500,
    px: 1.8,
    borderRadius: "10px",

    "&:hover": {
      color: "#FFF9F3",
      backgroundColor: "rgba(255,255,255,0.06)",
    },
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#2F211C",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 3px 18px rgba(47,33,28,0.12)",
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
              sx={{
                p: 0,
                textTransform: "none",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,

                    borderRadius: "10px",

                    backgroundColor: "#C69C72",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StorefrontRoundedIcon
                    sx={{
                      color: "#2F211C",
                      fontSize: 20,
                    }}
                  />
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "#FFF9F3",
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

                      color: isActive("/cart") ? "#FFF9F3" : "#CDBEB4",

                      backgroundColor: isActive("/cart")
                        ? "rgba(198,156,114,0.18)"
                        : "transparent",

                      borderRadius: "10px",

                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.06)",
                      },
                    }}
                  >
                    <Badge
                      badgeContent={0}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "#C69C72",
                          color: "#2F211C",

                          fontWeight: 800,
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

                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 26,
                        height: 26,

                        fontSize: "0.75rem",

                        backgroundColor: "#C69C72",
                        color: "#2F211C",

                        fontWeight: 800,
                      }}
                    >
                      {username?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography
                      sx={{
                        color: "#FFF9F3",
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

                      backgroundColor: "#C69C72",
                      color: "#2F211C",

                      boxShadow: "none",

                      "&:hover": {
                        backgroundColor: "#D7B08A",
                        boxShadow: "none",
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
                  ></IconButton>
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

            backgroundColor: "#2F211C",

            borderLeft: "1px solid rgba(255,255,255,0.07)",

            color: "#FFF9F3",
          },
        }}
      ></Drawer>
    </>
  );
}

export default Navbar;
