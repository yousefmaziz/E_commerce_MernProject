import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useCart } from "../context/cart/CartContext";
const API = import.meta.env.BACK_API;
interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  description: string;
}
export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product>();
  const getSingleProduct = async () => {
    const response = await fetch(`${API}/product/${id}`);
    const data = await response.json();
    setProduct(data);
    console.log(data);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getSingleProduct();
  }, [id]);
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#111827 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 1100,
            mx: 2,
            mt: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: "28px",
            overflow: "hidden",
            background: "rgba(255,255,255,.06)",
            backdropFilter: "blur(25px)",
            border: "1px solid rgba(255,255,255,.1)",
            boxShadow:
              "0 25px 50px rgba(0,0,0,.45),0 0 40px rgba(99,102,241,.15)",

            transition: ".35s",

            "&:hover": {
              transform: "translateY(-6px)",
            },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              bgcolor: "#fff",
              px: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={product?.image}
              alt={product?.title}
              sx={{
                width: "113%",

                objectFit: "contain",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2,
              color: "#fff",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mb: 2,
              }}
            >
              {product?.title}
            </Typography>

            <Stack direction="row" spacing={1} mb={3}>
              <Chip
                icon={<LocalShippingIcon />}
                label="Free Shipping"
                color="success"
              />
            </Stack>

            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#22c55e",
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              ${product?.price}
            </Typography>

            <Typography
              sx={{
                fontSize: 18,
                lineHeight: 2,
                color: "#cbd5e1",
                mb: 4,
              }}
            >
              {product?.description}
            </Typography>

            <Chip
              label={
                product?.stock ? `${product.stock} In Stock` : "Out Of Stock"
              }
              color={product?.stock ? "success" : "error"}
              sx={{
                fontWeight: "bold",
                fontSize: 12,
                px: 1,
                mb: 3,
              }}
            />

            <Stack spacing={3} mt={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={() => addToCart(id)}
                sx={{
                  mt: 2,
                  height: 60,
                  fontSize: 18,
                  fontWeight: "bold",
                  borderRadius: "16px",

                  background: "linear-gradient(135deg,#6366F1,#8B5CF6)",

                  transition: ".35s",

                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 15px 30px rgba(99,102,241,.5)",
                    background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
                  },
                }}
              >
                Add To Cart
              </Button>
            </Stack>
          </Box>
        </Card>
      </Box>
    </>
  );
}
