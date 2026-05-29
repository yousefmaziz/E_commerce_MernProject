import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/cart/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, updateItem, removeItem, clearCart } =
    useCart()!;

  const handleIncrease = (productId: string, quantity: number) => {
    updateItem(productId, quantity + 1);
  };

  const handleDecrease = (productId: string, quantity: number) => {
    if (quantity > 1) {
      updateItem(productId, quantity - 1);
    }
  };

  const handleDelete = (productId: string) => {
    removeItem(productId);
  };
  const clearAll = () => {
    clearCart();
  };
  return (
    <Container sx={{ mt: 4 }}>
      {cartItems.length === 0 ? (
        <>
          <Typography variant="h4">Your Shopping Cart</Typography>
          <Typography sx={{ color: "text.secondary", mx: 1 }}>
            No items in cart
          </Typography>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4">Your Shopping Cart</Typography>
            <Button
              variant="contained"
              onClick={() => clearAll()}
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
              Clear
            </Button>
          </Box>
          {cartItems.map((item) => (
            <Box
              key={item.productId}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                mb: 2,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "rgba(255, 255, 255, 0.86)",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <img
                src={`${item.imageUrl}`}
                alt={item.title}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />

              <Box sx={{ flex: 1, minWidth: 150 }}>
                <Typography variant="h6">{item.title}</Typography>

                <Typography variant="body2" sx={{ color: "green" }}>
                  {item.unitPrice} $
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  px: 1,
                }}
              >
                <IconButton
                  onClick={() => handleDecrease(item.productId, item.quantity)}
                >
                  <RemoveIcon />
                </IconButton>

                <Typography>{item.quantity}</Typography>

                <IconButton
                  onClick={() => handleIncrease(item.productId, item.quantity)}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              <Typography
                sx={{ fontWeight: "bold", minWidth: 100, color: "green" }}
              >
                {(item.unitPrice * item.quantity).toFixed(2)} $
              </Typography>
              <IconButton
                onClick={() => handleDelete(item.productId)}
                sx={{ color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex ",
              flexDirection: "row ",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              Total: {totalPrice.toFixed(2)} $
            </Typography>

            <Button
              variant="contained"
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
              onClick={() => navigate("/checkout")}
            >
              GO TO CHECKOUT
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
