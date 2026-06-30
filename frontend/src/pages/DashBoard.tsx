import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CssBaseline,
  useMediaQuery,
  Avatar,
  Chip,
  Divider,
  Card,
  CardContent,
} from "@mui/material";

import {
  HomeRounded,
  People,
  Inventory,
  Menu,
  StorefrontRounded,
  PersonAddRounded,
  AddBoxRounded,
  DeleteRounded,
  EditRounded,
  PeopleAltRounded,
  Inventory2Rounded,
  TrendingUpRounded,
  CloseRounded,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/Auth/AuthContext";
import { toast } from "react-hot-toast";
const API = import.meta.env.BACK_API;
const drawerWidth = 240;

const menuItems = [
  { text: "Home", icon: <HomeRounded /> },
  { text: "Users", icon: <People /> },
  { text: "Products", icon: <Inventory /> },
];

export default function Dashboard() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const { username, firstName } = useAuth()!;
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("user");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/user`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/product`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await fetch(`${API}/user/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`${API}/product/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const openAddUser = () => {
    setDialogType("user");
    setSelectedItem(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
    setOpen(true);
  };

  const openEditUser = (user: any) => {
    setDialogType("user");
    setSelectedItem(user);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      role: user.role || "",
    });
    setOpen(true);
  };

  const openAddProduct = () => {
    setDialogType("product");
    setSelectedItem(null);
    setFormData({
      title: "",
      image: "",
      price: "",
      stock: "",
      description: "",
    });
    setOpen(true);
  };

  const openEditProduct = (product: any) => {
    setDialogType("product");
    setSelectedItem(product);
    setFormData({
      title: product.title || "",
      image: product.image || "",
      price: product.price || "",
      stock: product.stock || "",
      description: product.description || "",
    });
    setOpen(true);
  };

  const addUser = async () => {
    try {
      await fetch(`${API}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchData();
      setOpen(false);
      toast.success("User added successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async () => {
    try {
      const res = await fetch(`${API}/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      fetchProducts();
      setOpen(false);
      toast.success("Product added successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    try {
      const res = await fetch(`${API}/user/${selectedItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updated = await res.json();
      setUsers((prev: any[]) =>
        prev.map((u) => (u._id === updated._id ? updated : u)),
      );
      setOpen(false);
      toast.success("User updated successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async () => {
    try {
      const res = await fetch(`${API}/product/${selectedItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      const updated = data.product || data;
      setProducts((prev: any[]) =>
        prev.map((p) => (p._id === updated._id ? updated : p)),
      );
      setOpen(false);
      toast.success("Product updated successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, []);

  // ===== SHARED STYLES =====
  const tableHeadSx = {
    backgroundColor: "rgba(99,102,241,0.08)",
    "& .MuiTableCell-root": {
      fontWeight: 700,
      fontSize: "0.8rem",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "rgba(148,163,184,0.9)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
  };

  const tableBodyRowSx = {
    "&:hover": { backgroundColor: "rgba(99,102,241,0.05)" },
    "& .MuiTableCell-root": {
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      color: "#e2e8f0",
    },
  };

  const actionBtnSx = (color: "error" | "primary") => ({
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.78rem",
    boxShadow: "none",
    minWidth: 0,
    px: 1.5,
    py: 0.7,
    ...(color === "error"
      ? {
          background: "rgba(239,68,68,0.12)",
          color: "#f87171",
          border: "1px solid rgba(239,68,68,0.25)",
          "&:hover": { background: "rgba(239,68,68,0.22)", boxShadow: "none" },
        }
      : {
          background: "rgba(99,102,241,0.12)",
          color: "#a5b4fc",
          border: "1px solid rgba(99,102,241,0.25)",
          "&:hover": { background: "rgba(99,102,241,0.22)", boxShadow: "none" },
        }),
  });

  // ===== DRAWER CONTENT =====
  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <Box sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 1.5 }}>
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
          <StorefrontRounded sx={{ color: "#fff", fontSize: 20 }} />
        </Box>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1rem",
            color: "#e2e8f0",
            letterSpacing: "-0.01em",
          }}
        >
          Tech Store
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mx: 2 }} />

      {/* Label */}
      <Typography
        sx={{
          px: 2.5,
          pt: 2.5,
          pb: 1,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "rgba(148,163,184,0.5)",
          textTransform: "uppercase",
        }}
      >
        Navigation
      </Typography>

      {/* Menu */}
      <List sx={{ px: 1.5, flex: 1 }}>
        {menuItems.map((item) => {
          const active = activePage === item.text;
          return (
            <ListItemButton
              key={item.text}
              onClick={() => {
                setActivePage(item.text);
                if (!isMdUp) setMobileOpen(false);
              }}
              sx={{
                borderRadius: "12px",
                mb: 0.5,
                px: 1.5,
                py: 1.1,
                background: active ? "rgba(99,102,241,0.15)" : "transparent",
                border: active
                  ? "1px solid rgba(99,102,241,0.3)"
                  : "1px solid transparent",
                "&:hover": {
                  background: active
                    ? "rgba(99,102,241,0.2)"
                    : "rgba(255,255,255,0.05)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "#a5b4fc" : "rgba(148,163,184,0.6)",
                  minWidth: 38,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#a5b4fc" : "#94a3b8",
                }}
              />
              {active && (
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#818cf8",
                    flexShrink: 0,
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      {/* User card at bottom */}
      <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mx: 2, mb: 2 }} />
      <Box
        sx={{
          mx: 1.5,
          mb: 2,
          px: 1.5,
          py: 1.2,
          borderRadius: "12px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          gap: 1.2,
        }}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: "0.8rem",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            fontWeight: 700,
          }}
        >
          {username?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#e2e8f0",
              lineHeight: 1.2,
            }}
          >
            {username}
          </Typography>
          <Typography
            sx={{ fontSize: "0.7rem", color: "rgba(148,163,184,0.55)" }}
          >
            Admin
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(160deg, #020617 0%, #0f172a 100%)",
      }}
    >
      <CssBaseline />

      {/* Mobile AppBar */}
      {!isMdUp && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.drawer + 1,
            background: "rgba(9,14,28,0.9)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            px: 2,
            height: 64,
          }}
        >
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{
              color: "white",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              width: 38,
              height: 38,
              mr: 1.5,
            }}
          >
            <Menu fontSize="small" />
          </IconButton>
          <Typography
            sx={{ fontWeight: 800, color: "#e2e8f0", fontSize: "1rem" }}
          >
            Dashboard
          </Typography>
        </Box>
      )}

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMdUp ? "permanent" : "temporary"}
          open={isMdUp ? true : mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background: "rgba(9,14,28,0.97)",
              backdropFilter: "blur(20px)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              color: "white",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          pt: { xs: "80px", md: 4 },
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* Top bar */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2.5,
            py: 1.8,
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#e2e8f0" }}
            >
              {activePage}
            </Typography>
            <Typography
              sx={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.6)" }}
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
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
            <Typography
              sx={{
                color: "#e2e8f0",
                fontWeight: 600,
                fontSize: "0.88rem",
                display: { xs: "none", sm: "block" },
              }}
            >
              {firstName}
            </Typography>
          </Box>
        </Box>

        {/* ===== HOME ===== */}
        {activePage === "Home" && (
          <Box>
            {/* Stats */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2,
                mb: 4,
              }}
            >
              {[
                {
                  label: "Total Users",
                  value: users.length,
                  icon: <PeopleAltRounded />,
                  color: "#6366f1",
                  bg: "rgba(99,102,241,0.12)",
                },
                {
                  label: "Total Products",
                  value: products.length,
                  icon: <Inventory2Rounded />,
                  color: "#8b5cf6",
                  bg: "rgba(139,92,246,0.12)",
                },
                {
                  label: "Total Revenue",
                  value: `$${products.reduce((a: number, p: any) => a + (p.price || 0), 0).toLocaleString()}`,
                  icon: <TrendingUpRounded />,
                  color: "#10b981",
                  bg: "rgba(16,185,129,0.12)",
                },
              ].map((stat) => (
                <Card
                  key={stat.label}
                  sx={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                    backdropFilter: "blur(12px)",
                    transition: "0.3s",
                    "&:hover": {
                      border: `1px solid ${stat.color}55`,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: "20px !important",
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background: stat.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: stat.color,
                        flexShrink: 0,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: "rgba(148,163,184,0.7)",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                        }}
                      >
                        {stat.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1.6rem",
                          fontWeight: 800,
                          color: "#e2e8f0",
                          lineHeight: 1.2,
                        }}
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Welcome */}
            <Box
              sx={{
                p: 4,
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "#e2e8f0",
                  mb: 0.5,
                }}
              >
                Welcome back
              </Typography>
              <Typography
                sx={{ color: "rgba(148,163,184,0.7)", fontSize: "0.95rem" }}
              >
                You have {users.length} users and {products.length} products in
                your store.
              </Typography>
            </Box>
          </Box>
        )}

        {/* ===== USERS ===== */}
        {activePage === "Users" && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Typography
                  sx={{ fontWeight: 800, fontSize: "1.3rem", color: "#e2e8f0" }}
                >
                  Users Management
                </Typography>
                <Typography
                  sx={{ color: "rgba(148,163,184,0.6)", fontSize: "0.82rem" }}
                >
                  {users.length} total users
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<PersonAddRounded />}
                onClick={openAddUser}
                sx={{
                  borderRadius: "12px",
                  px: 2.5,
                  py: 1.1,
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
                Add User
              </Button>
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "16px",
                overflow: "auto",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                boxShadow: "none",
              }}
            >
              <Table size={isMdUp ? "medium" : "small"}>
                <TableHead>
                  <TableRow sx={tableHeadSx}>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user: any, index: number) => (
                    <TableRow key={user._id} sx={tableBodyRowSx}>
                      <TableCell
                        sx={{
                          color: "rgba(148,163,184,0.5) !important",
                          fontWeight: 600,
                          fontSize: "0.82rem",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.2,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 30,
                              height: 30,
                              fontSize: "0.75rem",
                              background:
                                "linear-gradient(135deg, #6366f1, #8b5cf6)",
                              fontWeight: 700,
                            }}
                          >
                            {user.firstName?.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography
                            sx={{
                              fontSize: "0.88rem",
                              fontWeight: 600,
                              color: "#e2e8f0",
                            }}
                          >
                            {user.firstName} {user.lastName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.85rem",
                          color: "rgba(148,163,184,0.75) !important",
                        }}
                      >
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            height: 22,
                            background:
                              user.role === "admin"
                                ? "rgba(16,185,129,0.15)"
                                : "rgba(99,102,241,0.15)",
                            color:
                              user.role === "admin" ? "#34d399" : "#a5b4fc",
                            border: `1px solid ${user.role === "admin" ? "rgba(16,185,129,0.3)" : "rgba(99,102,241,0.3)"}`,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="contained"
                            startIcon={
                              <DeleteRounded
                                sx={{ fontSize: "15px !important" }}
                              />
                            }
                            onClick={() => deleteUser(user._id)}
                            sx={actionBtnSx("error")}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={
                              <EditRounded
                                sx={{ fontSize: "15px !important" }}
                              />
                            }
                            onClick={() => openEditUser(user)}
                            sx={actionBtnSx("primary")}
                          >
                            Edit
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* ===== PRODUCTS ===== */}
        {activePage === "Products" && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Typography
                  sx={{ fontWeight: 800, fontSize: "1.3rem", color: "#e2e8f0" }}
                >
                  Products Management
                </Typography>
                <Typography
                  sx={{ color: "rgba(148,163,184,0.6)", fontSize: "0.82rem" }}
                >
                  {products.length} total products
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddBoxRounded />}
                onClick={openAddProduct}
                sx={{
                  borderRadius: "12px",
                  px: 2.5,
                  py: 1.1,
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
                Add Product
              </Button>
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "16px",
                overflow: "auto",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                boxShadow: "none",
              }}
            >
              <Table size={isMdUp ? "medium" : "small"}>
                <TableHead>
                  <TableRow sx={tableHeadSx}>
                    <TableCell>#</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product: any, index: number) => (
                    <TableRow key={product._id} sx={tableBodyRowSx}>
                      <TableCell
                        sx={{
                          color: "rgba(148,163,184,0.5) !important",
                          fontWeight: 600,
                          fontSize: "0.82rem",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <Box
                          component="img"
                          src={product.image}
                          alt={product.title}
                          sx={{
                            width: 44,
                            height: 44,
                            objectFit: "cover",
                            borderRadius: "10px",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.88rem",
                          maxWidth: 180,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.title}
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            color: "#34d399 !important",
                          }}
                        >
                          ${product.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of stock"
                          }
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            height: 22,
                            background:
                              product.stock > 0
                                ? "rgba(99,102,241,0.15)"
                                : "rgba(239,68,68,0.12)",
                            color: product.stock > 0 ? "#a5b4fc" : "#f87171",
                            border: `1px solid ${product.stock > 0 ? "rgba(99,102,241,0.3)" : "rgba(239,68,68,0.25)"}`,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="contained"
                            startIcon={
                              <DeleteRounded
                                sx={{ fontSize: "15px !important" }}
                              />
                            }
                            onClick={() => deleteProduct(product._id)}
                            sx={actionBtnSx("error")}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={
                              <EditRounded
                                sx={{ fontSize: "15px !important" }}
                              />
                            }
                            onClick={() => openEditProduct(product)}
                            sx={actionBtnSx("primary")}
                          >
                            Edit
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* ===== DIALOG ===== */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              color: "white",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 1,
            }}
          >
            <Typography
              sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#balck" }}
            >
              {dialogType === "user"
                ? selectedItem
                  ? "Edit User"
                  : "Add User"
                : selectedItem
                  ? "Edit Product"
                  : "Add Product"}
            </Typography>
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                color: "rgba(148,163,184,0.6)",
                "&:hover": {
                  color: "#e2e8f0",
                  background: "rgba(255,255,255,0.06)",
                },
              }}
            >
              <CloseRounded fontSize="small" />
            </IconButton>
          </DialogTitle>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.07)" }} />

          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 3 }}
          >
            {/* Shared TextField styles */}
            {(() => {
              const inputSx = {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  color: "#black",
                  background: "rgba(255,255,255,0.03)",
                },
              };

              return dialogType === "user" ? (
                <>
                  <TextField
                    label="First Name"
                    value={formData.firstName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    fullWidth
                    sx={inputSx}
                  />
                  <TextField
                    label="Last Name"
                    value={formData.lastName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    fullWidth
                    sx={inputSx}
                  />
                  <TextField
                    label="Email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    fullWidth
                    sx={inputSx}
                  />
                  {!selectedItem && (
                    <TextField
                      label="Password"
                      type="password"
                      value={formData.password || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      fullWidth
                      sx={inputSx}
                    />
                  )}
                  <TextField
                    label="Role"
                    value={formData.role || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    fullWidth
                    sx={inputSx}
                  />
                </>
              ) : (
                <>
                  <TextField
                    label="Title"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    fullWidth
                    sx={inputSx}
                  />
                  <TextField
                    label="Image URL"
                    value={formData.image || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    fullWidth
                    sx={inputSx}
                  />
                  <TextField
                    label="Price"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    fullWidth
                    sx={inputSx}
                  />
                  <TextField
                    label="Stock"
                    value={formData.stock || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    fullWidth
                    sx={inputSx}
                  />
                  <TextField
                    label="Description"
                    multiline
                    rows={3}
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    fullWidth
                    sx={inputSx}
                  />
                </>
              );
            })()}
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                color: "black",
                border: "1px solid rgba(255,255,255,0.08)",
                px: 2.5,
                "&:hover": { background: "rgba(255,255,255,0.05)" },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (dialogType === "user") {
                  selectedItem ? updateUser() : addUser();
                } else {
                  selectedItem ? updateProduct() : addProduct();
                }
              }}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                },
              }}
            >
              {selectedItem ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
