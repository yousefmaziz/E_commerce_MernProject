import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardMedia, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useCart } from "../context/cart/CartContext";

const API = import.meta.env.VITE_BACK_API;

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
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getSingleProduct();
  }, [id]);

  const inStock = !!product?.stock;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: { xs: 5, md: 10 },
        px: 2,
        background: `
          radial-gradient(circle at top left, rgba(37,99,235,0.18) 0%, transparent 30%),
          radial-gradient(circle at bottom right, rgba(168,85,247,0.18) 0%, transparent 30%),
          linear-gradient(160deg, #020617 0%, #0f172a 45%, #111827 100%)
        `,
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 1040,
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "20px",
          overflow: "hidden",
          bgcolor: "#FCFBF9",
          boxShadow:
            "0 30px 70px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.04)",
        }}
      >
        {/* Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            bgcolor: "#F3F1EC",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: { xs: 6, md: 0 },
            px: { xs: 4, md: 8 },
          }}
        >
          <CardMedia
            component="img"
            image={product?.image}
            alt={product?.title}
            sx={{
              width: "100%",
              maxWidth: 260,
              objectFit: "contain",
              transition: "transform .4s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          />
        </Box>

        {/* Details */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 7 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              letterSpacing: "0.14em",
              color: inStock ? "#5B7A63" : "#B4463C",
              mb: 2,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </Typography>

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: 26, md: 30 },
              lineHeight: 1.3,
              color: "#1C1C1A",
              mb: 1.5,
            }}
          >
            {product?.title || "Loading…"}
          </Typography>

          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 20,
              color: "#1C1C1A",
              mb: 4,
            }}
          >
            ${product?.price?.toFixed(2)}
          </Typography>

          <Typography
            sx={{
              fontSize: 14.5,
              lineHeight: 1.9,
              color: "#6B6862",
              mb: 5,
              maxWidth: 420,
            }}
          >
            {product?.description}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 5 }}>
            <LocalShippingOutlinedIcon
              sx={{ fontSize: 16, color: "#A6A39C" }}
            />
            <Typography sx={{ fontSize: 13, color: "#A6A39C" }}>
              Free shipping
            </Typography>
          </Stack>

          <Button
            disabled={!inStock}
            variant="contained"
            disableElevation
            startIcon={<ShoppingCartIcon sx={{ fontSize: 18 }} />}
            onClick={() => addToCart(id)}
            sx={{
              alignSelf: "flex-start",
              px: 4,
              height: 46,
              fontSize: 13.5,
              fontWeight: 500,
              letterSpacing: "0.03em",
              textTransform: "none",
              borderRadius: "999px",
              bgcolor: "#1C1C1A",
              "&:hover": { bgcolor: "#000000" },
              "&.Mui-disabled": {
                bgcolor: "#F0EFEC",
                color: "#BDBAB3",
              },
            }}
          >
            {inStock ? "Add to Cart" : "Unavailable"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
