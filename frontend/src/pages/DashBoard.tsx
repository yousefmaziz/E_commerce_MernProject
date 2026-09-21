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
  {
    text: "Home",
    icon: <HomeRounded fontSize="small" />,
  },
  {
    text: "Users",
    icon: <People fontSize="small" />,
  },
  {
    text: "Products",
    icon: <Inventory fontSize="small" />,
  },
];

export default function Dashboard() {
  const theme = useTheme();

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [activePage, setActivePage] = useState("Home");

  const { username, firstName, token } = useAuth()!;

  const [users, setUsers] = useState<any[]>([]);

  const [products, setProducts] = useState<any[]>([]);

  const [open, setOpen] = useState(false);

  const [dialogType, setDialogType] = useState("user");

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [formData, setFormData] = useState<any>({});

  // =====================================================
  // FETCH USERS
  // =====================================================

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

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

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

  // =====================================================
  // DELETE USER
  // =====================================================

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

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

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

  // =====================================================
  // OPEN ADD USER
  // =====================================================

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

  // =====================================================
  // OPEN EDIT USER
  // =====================================================

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

  // =====================================================
  // OPEN ADD PRODUCT
  // =====================================================

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

  // =====================================================
  // OPEN EDIT PRODUCT
  // =====================================================

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

  // =====================================================
  // ADD USER
  // =====================================================

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

  // =====================================================
  // ADD PRODUCT
  // =====================================================

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

  // =====================================================
  // UPDATE USER
  // =====================================================

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

      setUsers((prev) =>
        prev.map((u) => (u._id === updated._id ? updated : u)),
      );

      setOpen(false);

      toast.success("User updated successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  // =====================================================
  // UPDATE PRODUCT
  // =====================================================

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

      setProducts((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p)),
      );

      setOpen(false);

      toast.success("Product updated successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  // =====================================================
  // INITIAL DATA
  // =====================================================

  useEffect(() => {
    fetchData();

    fetchProducts();
  }, []);

  // =====================================================
  // SHARED STYLES
  // =====================================================

  const tableHeadSx = {
    backgroundColor: "#F3EDE7",

    "& .MuiTableCell-root": {
      fontWeight: 700,

      fontSize: "0.8rem",

      letterSpacing: "0.05em",

      textTransform: "uppercase",

      color: "#6F4E37",

      borderBottom: "1px solid #E9DED4",
    },
  };

  const tableBodyRowSx = {
    transition: "background-color 0.2s ease",

    "&:hover": {
      backgroundColor: "#FAF7F4",
    },

    "& .MuiTableCell-root": {
      borderBottom: "1px solid #EEE3D9",

      color: "#2F211C",
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
          backgroundColor: "#FFF1F0",

          color: "#B42318",

          border: "1px solid #F3CBC7",

          "&:hover": {
            backgroundColor: "#FDE4E1",

            boxShadow: "none",
          },
        }
      : {
          backgroundColor: "#F0E6DD",

          color: "#6F4E37",

          border: "1px solid #DFCAB7",

          "&:hover": {
            backgroundColor: "#E8D8CA",

            boxShadow: "none",
          },
        }),
  });

  const primaryButtonSx = {
    borderRadius: "12px",

    px: 2.5,

    py: 1.1,

    textTransform: "none",

    fontWeight: 700,

    backgroundColor: "#6F4E37",

    color: "#FFFFFF",

    boxShadow: "none",

    "&:hover": {
      backgroundColor: "#4E342E",

      boxShadow: "0 6px 18px rgba(78,52,46,0.2)",
    },
  };

  const tableContainerSx = {
    borderRadius: "16px",

    overflow: "auto",

    backgroundColor: "#FFFDFC",

    border: "1px solid #E9DED4",

    boxShadow: "0 6px 20px rgba(47,33,28,0.06)",
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundColor: "#F7F3EE",
      }}
    >
      <CssBaseline />

      {/* =================================================
                          TOP NAVBAR
      ================================================= */}

      <Box
        component="header"
        sx={{
          position: "sticky",

          top: 0,

          zIndex: theme.zIndex.appBar,

          backgroundColor: "#2F211C",

          borderBottom: "1px solid rgba(255,255,255,0.06)",

          boxShadow: "0 3px 18px rgba(47,33,28,0.14)",
        }}
      >
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            justifyContent: "space-between",

            px: {
              xs: 2,
              md: 4,
            },

            height: 64,

            gap: 2,
          }}
        >
          {/* LOGO */}

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

                backgroundColor: "#C69C72",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                flexShrink: 0,
              }}
            >
              <StorefrontRounded
                sx={{
                  color: "#2F211C",

                  fontSize: 18,
                }}
              />
            </Box>

            {isMdUp && (
              <Typography
                sx={{
                  fontWeight: 800,

                  fontSize: "1rem",

                  color: "#FFF9F3",

                  letterSpacing: "-0.01em",

                  whiteSpace: "nowrap",
                }}
              >
                Tech Store
              </Typography>
            )}
          </Box>

          {/* NAVIGATION */}

          <List
            sx={{
              display: "flex",

              gap: 0.75,

              p: 0,

              overflowX: "auto",

              flex: 1,

              justifyContent: {
                xs: "flex-start",

                md: "center",
              },

              "&::-webkit-scrollbar": {
                display: "none",
              },
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

                    backgroundColor: active
                      ? "rgba(198,156,114,0.18)"
                      : "transparent",

                    border: active
                      ? "1px solid rgba(198,156,114,0.25)"
                      : "1px solid transparent",

                    transition: "all 0.2s ease",

                    "&:hover": {
                      backgroundColor: active
                        ? "rgba(198,156,114,0.22)"
                        : "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: active ? "#C69C72" : "#CDBEB4",

                      display: "flex",
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "0.85rem",

                      fontWeight: active ? 700 : 500,

                      color: active ? "#FFF9F3" : "#CDBEB4",

                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              );
            })}
          </List>

          {/* USER */}

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

                backgroundColor: "#C69C72",

                color: "#2F211C",

                fontWeight: 800,
              }}
            >
              {username?.charAt(0).toUpperCase()}
            </Avatar>

            {isMdUp && (
              <Typography
                sx={{
                  color: "#FFF9F3",

                  fontWeight: 600,

                  fontSize: "0.88rem",
                }}
              >
                {firstName}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* =================================================
                              MAIN
      ================================================= */}

      <Box
        component="main"
        sx={{
          p: {
            xs: 2,

            sm: 3,

            md: 4,
          },

          maxWidth: 1400,

          mx: "auto",
        }}
      >
        {/* PAGE TITLE */}

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 800,

              fontSize: "1.3rem",

              color: "#2F211C",
            }}
          >
            {activePage}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.78rem",

              color: "#806F64",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",

              month: "long",

              day: "numeric",
            })}
          </Typography>
        </Box>

        {/* =================================================
                              HOME
        ================================================= */}

        {activePage === "Home" && (
          <Box>
            {/* STATS */}

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

                  color: "#6F4E37",

                  bg: "#F0E6DD",
                },

                {
                  label: "Total Products",

                  value: products.length,

                  icon: <Inventory2Rounded />,

                  color: "#A47551",

                  bg: "#F4EAE1",
                },

                {
                  label: "Total Revenue",

                  value: `$${products
                    .reduce(
                      (
                        a: number,

                        p: any,
                      ) => a + (p.price || 0),

                      0,
                    )
                    .toLocaleString()}`,

                  icon: <TrendingUpRounded />,

                  color: "#8B684D",

                  bg: "#EFE4D8",
                },
              ].map((stat) => (
                <Card
                  key={stat.label}
                  elevation={0}
                  sx={{
                    backgroundColor: "#FFFDFC",

                    border: "1px solid #E9DED4",

                    borderRadius: "16px",

                    boxShadow: "0 6px 20px rgba(47,33,28,0.06)",

                    transition: "all 0.25s ease",

                    "&:hover": {
                      borderColor: "#D5B89D",

                      transform: "translateY(-2px)",

                      boxShadow: "0 10px 28px rgba(47,33,28,0.1)",
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

                        backgroundColor: stat.bg,

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

                          color: "#806F64",

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

                          color: "#2F211C",

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

            {/* WELCOME */}

            <Box
              sx={{
                p: {
                  xs: 3,

                  md: 4,
                },

                borderRadius: "20px",

                backgroundColor: "#FFFDFC",

                border: "1px solid #E9DED4",

                boxShadow: "0 8px 25px rgba(47,33,28,0.06)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.6rem",

                  fontWeight: 800,

                  color: "#2F211C",

                  mb: 0.5,
                }}
              >
                Welcome back
              </Typography>

              <Typography
                sx={{
                  color: "#806F64",

                  fontSize: "0.95rem",
                }}
              >
                You have {users.length} users and {products.length} products in
                your store.
              </Typography>
            </Box>
          </Box>
        )}

        {/* =================================================
                              USERS
        ================================================= */}

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
                  sx={{
                    fontWeight: 800,

                    fontSize: "1.3rem",

                    color: "#2F211C",
                  }}
                >
                  Users Management
                </Typography>

                <Typography
                  sx={{
                    color: "#806F64",

                    fontSize: "0.82rem",
                  }}
                >
                  {users.length} total users
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<PersonAddRounded />}
                onClick={openAddUser}
                sx={primaryButtonSx}
              >
                Add User
              </Button>
            </Box>

            <TableContainer component={Paper} sx={tableContainerSx}>
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
                  {users.map(
                    (
                      user: any,

                      index: number,
                    ) => (
                      <TableRow key={user._id} sx={tableBodyRowSx}>
                        <TableCell
                          sx={{
                            color: "#9A887C !important",

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

                                backgroundColor: "#C69C72",

                                color: "#2F211C",

                                fontWeight: 800,
                              }}
                            >
                              {user.firstName?.charAt(0).toUpperCase()}
                            </Avatar>

                            <Typography
                              sx={{
                                fontSize: "0.88rem",

                                fontWeight: 600,

                                color: "#2F211C",
                              }}
                            >
                              {user.firstName} {user.lastName}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "0.85rem",

                            color: "#806F64 !important",
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

                              height: 24,

                              backgroundColor:
                                user.role === "admin" ? "#E9F4EA" : "#F0E6DD",

                              color:
                                user.role === "admin" ? "#41734A" : "#6F4E37",

                              border: `1px solid ${
                                user.role === "admin" ? "#C9E0CC" : "#DFCAB7"
                              }`,
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",

                              gap: 1,
                            }}
                          >
                            <Button
                              variant="contained"
                              startIcon={
                                <DeleteRounded
                                  sx={{
                                    fontSize: "15px !important",
                                  }}
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
                                  sx={{
                                    fontSize: "15px !important",
                                  }}
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
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* =================================================
                            PRODUCTS
        ================================================= */}

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
                  sx={{
                    fontWeight: 800,

                    fontSize: "1.3rem",

                    color: "#2F211C",
                  }}
                >
                  Products Management
                </Typography>

                <Typography
                  sx={{
                    color: "#806F64",

                    fontSize: "0.82rem",
                  }}
                >
                  {products.length} total products
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<AddBoxRounded />}
                onClick={openAddProduct}
                sx={primaryButtonSx}
              >
                Add Product
              </Button>
            </Box>

            <TableContainer component={Paper} sx={tableContainerSx}>
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
                  {products.map(
                    (
                      product: any,

                      index: number,
                    ) => (
                      <TableRow key={product._id} sx={tableBodyRowSx}>
                        <TableCell
                          sx={{
                            color: "#9A887C !important",

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

                              border: "1px solid #E9DED4",

                              backgroundColor: "#F3EDE7",
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

                            color: "#2F211C !important",
                          }}
                        >
                          {product.title}
                        </TableCell>

                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 700,

                              fontSize: "0.9rem",

                              color: "#6F4E37",
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

                              height: 24,

                              backgroundColor:
                                product.stock > 0 ? "#F0E6DD" : "#FFF1F0",

                              color: product.stock > 0 ? "#6F4E37" : "#B42318",

                              border: `1px solid ${
                                product.stock > 0 ? "#DFCAB7" : "#F3CBC7"
                              }`,
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",

                              gap: 1,
                            }}
                          >
                            <Button
                              variant="contained"
                              startIcon={
                                <DeleteRounded
                                  sx={{
                                    fontSize: "15px !important",
                                  }}
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
                                  sx={{
                                    fontSize: "15px !important",
                                  }}
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
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* =================================================
                            DIALOG
        ================================================= */}

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              backgroundColor: "#FFFDFC",

              border: "1px solid #E9DED4",

              borderRadius: "20px",

              color: "#2F211C",

              boxShadow: "0 20px 60px rgba(47,33,28,0.2)",
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
              sx={{
                fontWeight: 800,

                fontSize: "1.1rem",

                color: "#2F211C",
              }}
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
                color: "#806F64",

                "&:hover": {
                  color: "#2F211C",

                  backgroundColor: "#F3EDE7",
                },
              }}
            >
              <CloseRounded fontSize="small" />
            </IconButton>
          </DialogTitle>

          <Divider
            sx={{
              borderColor: "#E9DED4",
            }}
          />

          <DialogContent
            sx={{
              display: "flex",

              flexDirection: "column",

              gap: 2,

              pt: 3,
            }}
          >
            {(() => {
              const inputSx = {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",

                  color: "#2F211C",

                  backgroundColor: "#FAF7F4",

                  "& fieldset": {
                    borderColor: "#DED0C4",
                  },

                  "&:hover fieldset": {
                    borderColor: "#C69C72",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#6F4E37",
                  },
                },

                "& .MuiInputLabel-root": {
                  color: "#806F64",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#6F4E37",
                },
              };

              return dialogType === "user" ? (
                <>
                  <TextField
                    label="First Name"
                    value={formData.firstName || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        firstName: e.target.value,
                      })
                    }
                    fullWidth
                    sx={inputSx}
                  />

                  <TextField
                    label="Last Name"
                    value={formData.lastName || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        lastName: e.target.value,
                      })
                    }
                    fullWidth
                    sx={inputSx}
                  />

                  <TextField
                    label="Email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        email: e.target.value,
                      })
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
                        setFormData({
                          ...formData,

                          password: e.target.value,
                        })
                      }
                      fullWidth
                      sx={inputSx}
                    />
                  )}

                  <TextField
                    label="Role"
                    value={formData.role || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        role: e.target.value,
                      })
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
                      setFormData({
                        ...formData,

                        title: e.target.value,
                      })
                    }
                    fullWidth
                    sx={inputSx}
                  />

                  <TextField
                    label="Image URL"
                    value={formData.image || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        image: e.target.value,
                      })
                    }
                    fullWidth
                    sx={inputSx}
                  />

                  <TextField
                    label="Price"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        price: e.target.value,
                      })
                    }
                    fullWidth
                    sx={inputSx}
                  />

                  <TextField
                    label="Stock"
                    value={formData.stock || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        stock: e.target.value,
                      })
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
                      setFormData({
                        ...formData,

                        description: e.target.value,
                      })
                    }
                    fullWidth
                    sx={inputSx}
                  />
                </>
              );
            })()}
          </DialogContent>

          {/* DIALOG ACTIONS */}

          <DialogActions
            sx={{
              px: 3,

              pb: 3,

              gap: 1,
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: "10px",

                textTransform: "none",

                fontWeight: 600,

                color: "#6F4E37",

                border: "1px solid #DED0C4",

                px: 2.5,

                "&:hover": {
                  backgroundColor: "#F3EDE7",

                  borderColor: "#C69C72",
                },
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

                backgroundColor: "#6F4E37",

                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#4E342E",

                  boxShadow: "none",
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
