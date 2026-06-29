import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardProduct from "../components/CardProduct";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3002/product");
        const data = await res.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return <div>Failed to load products. Please try again later.</div>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(37,99,235,0.18) 0%, transparent 30%),
          radial-gradient(circle at bottom right, rgba(168,85,247,0.18) 0%, transparent 30%),
          linear-gradient(160deg, #020617 0%, #0f172a 45%, #111827 100%)
        `,
      }}
    >
      {/* ===== HERO SECTION ===== */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 10, md: 14 },
          pb: { xs: 8, md: 12 },
        }}
      >
        {/* Decorative blobs */}
        <Box
          sx={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: 360,
            height: 360,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-60px",
            right: "-60px",
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg">
          <Stack alignItems="center" spacing={3} textAlign="center">
            {/* Badge */}
            <Chip
              label="✦ New Collection 2025"
              sx={{
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.35)",
                color: "#a5b4fc",
                fontWeight: 600,
                fontSize: "0.78rem",
                letterSpacing: "0.04em",
                px: 1,
              }}
            />

            {/* Headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.4rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                background:
                  "linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 40%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                maxWidth: 780,
              }}
            >
              Discover Products You'll Love
            </Typography>

            {/* Subtext */}
            <Typography
              variant="h6"
              sx={{
                color: "rgba(148,163,184,0.9)",
                fontWeight: 400,
                fontSize: { xs: "1rem", md: "1.2rem" },
                maxWidth: 520,
                lineHeight: 1.7,
              }}
            >
              Curated collections, unbeatable prices — shop smarter with our
              handpicked catalog.
            </Typography>

            {/* CTAs */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} pt={1}>
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  document
                    .getElementById("products-grid")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                sx={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    boxShadow: "0 6px 30px rgba(99,102,241,0.55)",
                  },
                }}
              >
                Shop Now
              </Button>
            </Stack>

            {/* Stats row */}
            <Stack
              direction="row"
              spacing={{ xs: 3, sm: 5 }}
              pt={3}
              divider={
                <Box
                  sx={{
                    width: "1px",
                    background: "rgba(255,255,255,0.1)",
                    my: 0.5,
                  }}
                />
              }
            >
              {[
                { value: `${products.length}+`, label: "Products" },
                { value: "99%", label: "Happy Customers" },
                { value: "24/7", label: "Support" },
              ].map((stat) => (
                <Stack key={stat.label} alignItems="center" spacing={0.3}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      color: "#e0e7ff",
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      color: "rgba(148,163,184,0.7)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ===== PRODUCTS GRID ===== */}
      <Container sx={{ mt: 2, pb: 8 }} id="products-grid">
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid key={p._id} size={{ xs: 12, sm: 6, md: 3 }}>
              <CardProduct {...p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
