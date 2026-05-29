import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
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
  AppBar,
  IconButton,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";

import { Home, People, Inventory, Menu } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/Auth/AuthContext";

import { toast } from "react-hot-toast";

const drawerWidth = 220;

const menuItems = [
  {
    text: "Home",
    icon: <Home />,
  },
  {
    text: "Users",
    icon: <People />,
  },
  {
    text: "Products",
    icon: <Inventory />,
  },
];

export default function Dashboard() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const { username } = useAuth();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("user");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  // ================= FETCH USERS =================
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3002/user");
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3002/product");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3002/user/${id}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE PRODUCT =================
  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:3002/product/${id}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  // ================= OPEN ADD USER =================
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

  // ================= OPEN EDIT USER =================
  const openEditUser = (user) => {
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

  // ================= OPEN ADD PRODUCT =================
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

  // ================= OPEN EDIT PRODUCT =================
  const openEditProduct = (product) => {
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

  // ================= ADD USER =================
  const addUser = async () => {
    try {
      await fetch("http://localhost:3002/user/register", {
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
      await fetch("http://localhost:3002/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchProducts();
      setOpen(false);
      toast.success("Product added successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPDATE USER =================
  const updateUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/user/${selectedItem._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user._id === updatedUser._id ? updatedUser : user)),
      );
      setOpen(false);
      toast.success("User updated successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/product/${selectedItem._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      // handle different response shapes
      const updated = data.product || data;
      setProducts((prev) =>
        prev.map((product) =>
          product._id === updated._id ? updated : product,
        ),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  const drawerContent = (
    <Box>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold" noWrap>
          Dashboard
        </Typography>
      </Toolbar>
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => {
              setActivePage(item.text);
              if (!isMdUp) setMobileOpen(false);
            }}
            sx={{
              borderRadius: 2,
              mb: 1,
              backgroundColor:
                activePage === item.text ? "#1e293b" : "transparent",
              "&:hover": { backgroundColor: "#1e293b" },
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {!isMdUp && (
        <AppBar
          position="fixed"
          color="transparent"
          elevation={0}
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            background: "transparent",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => setMobileOpen(true)}
              aria-label="open drawer"
              sx={{
                backgroundColor: "#0f172a",
                "&:hover": {
                  backgroundColor: "#1e293b",
                },
              }}
            >
              <Menu sx={{ color: "white" }} />
            </IconButton>

            <Typography variant="h6" sx={{ ml: 1 }}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Temporary drawer for mobile */}
        <Drawer
          container={container}
          variant={isMdUp ? "permanent" : "temporary"}
          open={isMdUp ? true : mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "#0f172a",
              color: "white",
              border: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: "#f1f5f9",
          minHeight: "100vh",
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* add top spacing when mobile appbar is present */}

        {/* Navbar */}
        <Box
          sx={{
            backgroundColor: "white",
            p: { xs: 1.5, sm: 2 },
            borderRadius: 3,
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" noWrap>
            {activePage}
          </Typography>
          <Typography color="gray" sx={{ fontSize: { xs: 13, sm: 14 } }}>
            Welcome {username} 👋
          </Typography>
        </Box>

        {/* HOME */}
        {activePage === "Home" && (
          <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Welcome To Dashboard 👋
            </Typography>
            <Typography color="gray">
              Manage users and products easily.
            </Typography>
          </Paper>
        )}

        {/* USERS */}
        {activePage === "Users" && (
          <>
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                gap: 2,
              }}
            >
              <Typography variant="h4" fontWeight="bold" color="#0f172a">
                Users Management
              </Typography>

              <Button
                variant="contained"
                onClick={openAddUser}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none" },
                }}
              >
                Add User
              </Button>
            </Box>

            {/* Table */}
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "16px",
                overflow: "auto",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Table size={isMdUp ? "medium" : "small"}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      First Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Options</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={user._id} hover>
                      <TableCell sx={{ fontWeight: "bold", minWidth: 40 }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", minWidth: 100 }}>
                        {user.firstName}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", minWidth: 100 }}>
                        {user.lastName}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          minWidth: 150,
                          wordBreak: "break-all",
                        }}
                      >
                        {user.email}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: user.role === "admin" ? "#16a34a" : "#2563eb",
                          minWidth: 80,
                        }}
                      >
                        {user.role}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteUser(user._id)}
                            sx={{
                              borderRadius: "10px",
                              textTransform: "none",
                              fontWeight: "bold",
                              boxShadow: "none",
                              "&:hover": { boxShadow: "none" },
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => openEditUser(user)}
                            sx={{
                              borderRadius: "10px",
                              textTransform: "none",
                              fontWeight: "bold",
                              boxShadow: "none",
                              "&:hover": { boxShadow: "none" },
                            }}
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

        {/* PRODUCTS */}
        {activePage === "Products" && (
          <>
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                gap: 2,
              }}
            >
              <Typography variant="h4" fontWeight="bold" color="#0f172a">
                Products Management
              </Typography>

              <Button
                variant="contained"
                onClick={openAddProduct}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none" },
                }}
              >
                Add Product
              </Button>
            </Box>

            {/* Table */}
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "16px",
                overflow: "auto",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Table size={isMdUp ? "medium" : "small"}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Options</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={product._id} hover>
                      <TableCell sx={{ minWidth: 40 }}>{index + 1}</TableCell>

                      <TableCell sx={{ minWidth: 70 }}>
                        <Box
                          component="img"
                          src={product.image}
                          alt={product.title}
                          sx={{
                            width: { xs: 45, sm: 55 },
                            height: { xs: 45, sm: 55 },
                            objectFit: "cover",
                            borderRadius: 1.5,
                            bgcolor: "#f8fafc",
                          }}
                        />
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 600,
                          minWidth: 120,
                          wordBreak: "break-word",
                        }}
                      >
                        {product.title}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#16a34a",
                          minWidth: 80,
                        }}
                      >
                        ${product.price}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: product.stock > 0 ? "#2563eb" : "#dc2626",
                          minWidth: 60,
                        }}
                      >
                        {product.stock}
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteProduct(product._id)}
                            sx={{
                              borderRadius: "10px",
                              textTransform: "none",
                              fontWeight: "bold",
                              boxShadow: "none",
                              "&:hover": { boxShadow: "none" },
                            }}
                          >
                            Delete
                          </Button>

                          <Button
                            variant="contained"
                            onClick={() => openEditProduct(product)}
                            sx={{
                              borderRadius: "10px",
                              textTransform: "none",
                              fontWeight: "bold",
                              boxShadow: "none",
                              "&:hover": { boxShadow: "none" },
                            }}
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

        {/* DIALOG */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {dialogType === "user"
              ? selectedItem
                ? "Edit User"
                : "Add User"
              : selectedItem
                ? "Edit Product"
                : "Add Product"}
          </DialogTitle>

          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            {dialogType === "user" ? (
              <>
                <TextField
                  label="First Name"
                  value={formData.firstName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  value={formData.lastName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  fullWidth
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
                  />
                )}
                <TextField
                  label="Role"
                  value={formData.role || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  fullWidth
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
                />
                <TextField
                  label="Image (URL)"
                  value={formData.image || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Price"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Stock"
                  value={formData.stock || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  fullWidth
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
                />
              </>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => {
                if (dialogType === "user") {
                  selectedItem ? updateUser() : addUser();
                } else {
                  selectedItem ? updateProduct() : addProduct();
                }
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
