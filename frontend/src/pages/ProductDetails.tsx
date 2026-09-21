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
        alignItems: "center",

        py: { xs: 5, md: 9 },
        px: 2,

        backgroundColor: "#F7F3EE",
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 1050,
          width: "100%",

          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },

          borderRadius: "22px",
          overflow: "hidden",

          backgroundColor: "#FFFDFC",

          border: "1px solid #E9DED4",

          boxShadow: "0 18px 50px rgba(47, 33, 28, 0.12)",
        }}
      >
        {/* ================= IMAGE ================= */}

        <Box
          sx={{
            width: {
              xs: "100%",
              md: "50%",
            },

            minHeight: {
              xs: 350,
              md: 560,
            },

            backgroundColor: "#F3EDE7",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            py: {
              xs: 5,
              md: 7,
            },

            px: {
              xs: 4,
              md: 7,
            },

            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Product Image */}

          <CardMedia
            component="img"
            image={product?.image}
            alt={product?.title}
            sx={{
              width: "100%",
              maxWidth: 330,
              maxHeight: 400,

              objectFit: "contain",

              position: "relative",
              zIndex: 1,

              transition: "transform 0.4s ease",

              "&:hover": {
                transform: "scale(1.04)",
              },
            }}
          />
        </Box>

        {/* ================= DETAILS ================= */}

        <Box
          sx={{
            flex: 1,

            p: {
              xs: 3,
              sm: 4,
              md: 6,
            },

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* STOCK */}

          <Box
            sx={{
              alignSelf: "flex-start",

              px: 1.5,
              py: 0.6,

              mb: 2.5,

              borderRadius: "999px",

              backgroundColor: inStock ? "#F0E8DF" : "#FFF1F0",

              border: inStock ? "1px solid #DFCAB7" : "1px solid #F3CBC7",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",

                letterSpacing: "0.08em",

                color: inStock ? "#6F4E37" : "#B42318",

                textTransform: "uppercase",

                fontWeight: 700,
              }}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </Typography>
          </Box>

          {/* PRODUCT TITLE */}

          <Typography
            sx={{
              fontWeight: 800,

              fontSize: {
                xs: "1.7rem",
                md: "2.2rem",
              },

              lineHeight: 1.25,

              letterSpacing: "-0.02em",

              color: "#2F211C",

              mb: 2,
            }}
          >
            {product?.title || "Loading…"}
          </Typography>

          {/* PRICE */}

          <Typography
            sx={{
              fontWeight: 800,

              fontSize: "1.6rem",

              color: "#6F4E37",

              mb: 3,
            }}
          >
            ${product?.price?.toFixed(2)}
          </Typography>

          {/* DIVIDER */}

          <Box
            sx={{
              width: "100%",
              height: "1px",

              backgroundColor: "#E9DED4",

              mb: 3,
            }}
          />

          {/* DESCRIPTION */}

          <Typography
            sx={{
              fontSize: "0.95rem",

              lineHeight: 1.8,

              color: "#806F64",

              mb: 4,

              maxWidth: 450,
            }}
          >
            {product?.description}
          </Typography>

          {/* SHIPPING */}

          <Stack
            direction="row"
            alignItems="center"
            spacing={1.2}
            sx={{
              mb: 4,

              backgroundColor: "#F8F3EE",

              border: "1px solid #EEE3D9",

              borderRadius: "12px",

              px: 2,
              py: 1.4,

              alignSelf: "flex-start",
            }}
          >
            <LocalShippingOutlinedIcon
              sx={{
                fontSize: 19,
                color: "#A47551",
              }}
            />

            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#6F4E37",
                fontWeight: 600,
              }}
            >
              Free shipping
            </Typography>
          </Stack>

          {/* ADD TO CART */}

          <Button
            disabled={!inStock}
            variant="contained"
            disableElevation
            startIcon={
              <ShoppingCartIcon
                sx={{
                  fontSize: 18,
                }}
              />
            }
            onClick={() => id && addToCart(id)}
            sx={{
              alignSelf: {
                xs: "stretch",
                sm: "flex-start",
              },

              px: 4,
              py: 1.4,

              minWidth: 180,

              fontSize: "0.95rem",
              fontWeight: 700,

              textTransform: "none",

              borderRadius: "12px",

              backgroundColor: "#6F4E37",
              color: "#FFFFFF",

              transition: "all 0.25s ease",

              "&:hover": {
                backgroundColor: "#4E342E",

                transform: "translateY(-2px)",

                boxShadow: "0 8px 20px rgba(78, 52, 46, 0.25)",
              },

              "&.Mui-disabled": {
                backgroundColor: "#E7DED7",
                color: "#A99B91",
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
