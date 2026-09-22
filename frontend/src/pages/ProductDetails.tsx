import { useParams, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
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
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 4, md: 8 },
        px: 2,
        backgroundColor: "#F7F3EE",
      }}
    >
      {/* ================= BREADCRUMBS ================= */}

      <Breadcrumbs
        separator={
          <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#B7A695" }} />
        }
        sx={{ maxWidth: 1050, width: "100%", mb: 2.5, px: 0.5 }}
      >
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          sx={{ fontSize: "0.85rem", color: "#8A7364", fontWeight: 600 }}
        >
          Home
        </Link>
        <Typography
          sx={{ fontSize: "0.85rem", color: "#2F211C", fontWeight: 700 }}
        >
          {product?.title || "Product"}
        </Typography>
      </Breadcrumbs>

      <Card
        elevation={0}
        sx={{
          maxWidth: 760,
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#FFFDFC",
          border: "1px solid #E9DED4",
          boxShadow: "0 14px 40px rgba(47, 33, 28, 0.10)",
        }}
      >
        {/* ================= IMAGE ================= */}

        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            minHeight: { xs: 260, md: 400 },
            background:
              "radial-gradient(120% 120% at 50% 20%, #FAF6F1 0%, #F0E8DF 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: { xs: 3.5, md: 5 },
            px: { xs: 3, md: 4.5 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Stock badge over image */}
          <Box
            sx={{
              position: "absolute",
              top: 18,
              left: 18,
              zIndex: 2,
              px: 1.4,
              py: 0.55,
              borderRadius: "999px",
              backgroundColor: inStock ? "#FFFFFF" : "#FFF1F0",
              border: inStock ? "1px solid #DFCAB7" : "1px solid #F3CBC7",
              boxShadow: "0 4px 10px rgba(47,33,28,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 0.6,
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: inStock ? "#4F8A5B" : "#B42318",
              }}
            />
            <Typography
              sx={{
                fontSize: "0.68rem",
                letterSpacing: "0.06em",
                color: inStock ? "#4F8A5B" : "#B42318",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </Typography>
          </Box>

          <CardMedia
            component="img"
            image={product?.image}
            alt={product?.title}
            sx={{
              width: "100%",
              maxWidth: 230,
              maxHeight: 280,
              objectFit: "contain",
              position: "relative",
              zIndex: 1,
              filter: "drop-shadow(0 18px 24px rgba(47,33,28,0.15))",
              transition: "transform 0.4s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        </Box>

        {/* ================= DETAILS ================= */}

        <Box
          sx={{
            flex: 1,
            p: { xs: 2.5, sm: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* PRODUCT TITLE */}

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: "#2F211C",
              mb: 0.8,
            }}
          >
            {product?.title || "Loading…"}
          </Typography>

          {/* PRICE */}

          <Stack
            direction="row"
            alignItems="baseline"
            spacing={1}
            sx={{ mb: 2 }}
          >
            <Typography
              sx={{ fontWeight: 800, fontSize: "1.25rem", color: "#6F4E37" }}
            >
              ${product?.price?.toFixed(2)}
            </Typography>
          </Stack>
          {/* DESCRIPTION */}

          <Typography
            sx={{
              fontSize: "0.85rem",
              lineHeight: 1.7,
              color: "#7A6A5E",
              mb: 2.5,
              maxWidth: 400,
            }}
          >
            {product?.description}
          </Typography>

          {/* ADD TO CART */}

          <Button
            disabled={!inStock}
            variant="contained"
            disableElevation
            startIcon={<ShoppingCartIcon sx={{ fontSize: 18 }} />}
            onClick={() => id && addToCart(id)}
            sx={{
              alignSelf: { xs: "stretch", sm: "flex-start" },
              px: 3,
              py: 1.1,
              minWidth: 160,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "11px",
              backgroundColor: "#6F4E37",
              color: "#FFFFFF",
              boxShadow: "0 8px 20px rgba(111,78,55,0.22)",
              transition: "all 0.25s ease",
              mb: 3,
              "&:hover": {
                backgroundColor: "#4E342E",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 24px rgba(78, 52, 46, 0.28)",
              },
              "&.Mui-disabled": {
                backgroundColor: "#E7DED7",
                color: "#A99B91",
                boxShadow: "none",
              },
            }}
          >
            {inStock ? "Add to Cart" : "Unavailable"}
          </Button>

          {/* DIVIDER */}

          <Box
            sx={{
              width: "100%",
              height: "1px",
              backgroundColor: "#EEE3D9",
              mb: 3,
            }}
          />

          {/* TRUST / BENEFITS ROW */}

          <Stack spacing={1.5}>
            {[
              {
                icon: LocalShippingOutlinedIcon,
                text: "Free shipping on this item",
              },
              { icon: ReplayOutlinedIcon, text: "Easy 14-day returns" },
              {
                icon: VerifiedUserOutlinedIcon,
                text: "Secure checkout, every time",
              },
            ].map(({ icon: Icon, text }) => (
              <Stack
                key={text}
                direction="row"
                alignItems="center"
                spacing={1.3}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "10px",
                    backgroundColor: "#F8F3EE",
                    border: "1px solid #EEE3D9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ fontSize: 17, color: "#A47551" }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#6F4E37",
                    fontWeight: 600,
                  }}
                >
                  {text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
