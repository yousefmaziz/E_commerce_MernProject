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
} from "@mui/material";

import { Home, People, Inventory } from "@mui/icons-material";

import { useEffect, useState } from "react";
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
  const [activePage, setActivePage] = useState("Home");
  const { username } = useAuth();
  const [users, setUsers] = useState([]);

  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);

  const [dialogType, setDialogType] = useState("user");

  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({});

  // ================= FETCH USERS =================

  const fetechdata = async () => {
    try {
      const response = await fetch("http://localhost:3002/user");

      const data = await response.json();

      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3002/product");

      const data = await res.json();

      setProducts(data);
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

      setUsers(users.filter((user) => user._id !== id));
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

      setProducts(products.filter((product) => product._id !== id));
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
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
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
      title: product.title,
      image: product.image,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });

    setOpen(true);
  };

  // ================= ADD USER =================

  const addUser = async () => {
    try {
      await fetch("http://localhost:3002/user/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      fetechdata();

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

        headers: {
          "Content-Type": "application/json",
        },

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

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
      );

      const updatedUser = await response.json();

      setUsers(
        users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user,
        ),
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

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      setProducts(
        products.map((product) =>
          product._id === data.product._id ? data.product : product,
        ),
      );

      setOpen(false);
      toast.success("Product updated successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ADD PRODUCT =================

  useEffect(() => {
    fetechdata();

    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#0f172a",
            color: "white",
            border: "none",

            position: "sticky",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h5" fontWeight="bold">
            Dashboard
          </Typography>
        </Toolbar>

        <List sx={{ px: 1 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => setActivePage(item.text)}
              sx={{
                borderRadius: 2,
                mb: 1,

                backgroundColor:
                  activePage === item.text ? "#1e293b" : "transparent",

                "&:hover": {
                  backgroundColor: "#1e293b",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        {/* Navbar */}

        <Box
          sx={{
            backgroundColor: "white",
            p: 2,
            borderRadius: 3,
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {activePage}
          </Typography>

          <Typography color="gray">Welcome {username} 👋</Typography>
        </Box>

        {/* HOME */}

        {activePage === "Home" && (
          <Paper
            sx={{
              p: 5,
              borderRadius: 4,
            }}
          >
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
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
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

                  "&:hover": {
                    boxShadow: "none",
                  },
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
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#f8fafc",
                    }}
                  >
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
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {index + 1}
                      </TableCell>

                      <TableCell sx={{ fontWeight: "bold" }}>
                        {user.firstName}
                      </TableCell>

                      <TableCell sx={{ fontWeight: "bold" }}>
                        {user.lastName}
                      </TableCell>

                      <TableCell sx={{ fontWeight: "bold" }}>
                        {user.email}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: user.role === "admin" ? "#16a34a" : "#2563eb",
                        }}
                      >
                        {user.role}
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteUser(user._id)}
                            sx={{
                              borderRadius: "10px",
                              textTransform: "none",
                              fontWeight: "bold",
                              boxShadow: "none",

                              "&:hover": {
                                boxShadow: "none",
                              },
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

                              "&:hover": {
                                boxShadow: "none",
                              },
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
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
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

                  "&:hover": {
                    boxShadow: "none",
                  },
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
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#f8fafc",
                    }}
                  >
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
                      <TableCell>{index + 1}</TableCell>

                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{
                            width: 55,
                            height: 55,
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        {product.title}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#16a34a",
                        }}
                      >
                        ${product.price}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: product.stock > 0 ? "#2563eb" : "#dc2626",
                        }}
                      >
                        {product.stock}
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteProduct(product._id)}
                            sx={{
                              borderRadius: "10px",
                              textTransform: "none",
                              fontWeight: "bold",
                              boxShadow: "none",

                              "&:hover": {
                                boxShadow: "none",
                              },
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

                              "&:hover": {
                                boxShadow: "none",
                              },
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
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
          >
            {dialogType === "user" ? (
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
                />

                <TextField
                  label="Image"
                  value={formData.image || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.value,
                    })
                  }
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
