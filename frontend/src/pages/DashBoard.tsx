import {
  Box,
  List,
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
const API = import.meta.env.VITE_BACK_API;

const menuItems = [
  { text: "Home", icon: <HomeRounded fontSize="small" /> },
  { text: "Users", icon: <People fontSize="small" /> },
  { text: "Products", icon: <Inventory fontSize="small" /> },
];

export default function Dashboard() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [activePage, setActivePage] = useState("Home");
  const { username, firstName, token } = useAuth()!;
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("user");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await fetch(`${API}/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`${API}/product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      const res = await fetch(`${API}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to add user");
        return;
      }

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const updated = await res.json();

      if (!res.ok) {
        toast.error(updated.message || "Failed to update user");
        return;
      }

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update product");
        return;
      }

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #020617 0%, #0f172a 100%)",
      }}
    >
      <CssBaseline />

      {/* ===== TOP NAVBAR ===== */}
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: theme.zIndex.appBar,
          background: "rgba(9,14,28,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            height: 64,
            gap: 2,
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
                flexShrink: 0,
              }}
            >
              <StorefrontRounded sx={{ color: "#fff", fontSize: 18 }} />
            </Box>
            {isMdUp && (
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "#e2e8f0",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                Tech Store
              </Typography>
            )}
          </Box>

          {/* Nav items — scrollable on mobile */}
          <List
            sx={{
              display: "flex",
              gap: 0.75,
              p: 0,
              overflowX: "auto",
              flex: 1,
              justifyContent: { xs: "flex-start", md: "center" },
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {menuItems.map((item) => {
              const active = activePage === item.text;
              return (
                <Box
                  key={item.text}
                  onClick={() => setActivePage(item.text)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                    cursor: "pointer",
                    px: 1.6,
                    py: 0.9,
                    borderRadius: "10px",
                    flexShrink: 0,
                    background: active
                      ? "rgba(99,102,241,0.15)"
                      : "transparent",
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
                  <Box
                    sx={{
                      color: active ? "#a5b4fc" : "rgba(148,163,184,0.6)",
                      display: "flex",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: active ? 700 : 500,
                      color: active ? "#a5b4fc" : "#94a3b8",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              );
            })}
          </List>

          {/* User */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              flexShrink: 0,
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
            {isMdUp && (
              <Typography
                sx={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.88rem" }}
              >
                {firstName}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* ===== MAIN ===== */}
      <Box
        component="main"
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {/* Page title row */}
        <Box sx={{ mb: 3 }}>
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
              sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#e2e8f0" }}
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
            {(() => {
              const inputSx = {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  color: "#e2e8f0",
                  background: "rgba(255,255,255,0.03)",
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(148,163,184,0.7)",
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
                color: "#e2e8f0",
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
