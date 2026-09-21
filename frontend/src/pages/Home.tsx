import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardProduct from "../components/CardProduct";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
const API = import.meta.env.VITE_BACK_API;
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
        const res = await fetch(`${API}/product`);
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
        backgroundColor: "#F7F3EE",
      }}
    >
      {/* ===== HERO SECTION ===== */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 10, md: 14 },
          pb: { xs: 8, md: 11 },
          backgroundColor: "#2F211C",
        }}
      >
        {/* Decorative Circle */}
        <Box
          sx={{
            position: "absolute",
            top: "-120px",
            left: "-100px",
            width: 380,
            height: 380,
            backgroundColor: "rgba(196, 164, 132, 0.08)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "-140px",
            right: "-100px",
            width: 360,
            height: 360,
            backgroundColor: "rgba(215, 190, 165, 0.07)",
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
                backgroundColor: "rgba(215, 190, 165, 0.12)",
                border: "1px solid rgba(215, 190, 165, 0.3)",
                color: "#E8D5C4",
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
                fontSize: {
                  xs: "2.4rem",
                  sm: "3.5rem",
                  md: "4.5rem",
                },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#FFF9F3",
                maxWidth: 780,
              }}
            >
              Discover Products You'll Love
            </Typography>

            {/* Subtext */}
            <Typography
              variant="h6"
              sx={{
                color: "#CDBEB4",
                fontWeight: 400,
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                maxWidth: 520,
                lineHeight: 1.7,
              }}
            >
              Curated collections, unbeatable prices — shop smarter with our
              handpicked catalog.
            </Typography>

            {/* CTA */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} pt={1}>
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  document.getElementById("products-grid")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                sx={{
                  backgroundColor: "#C69C72",
                  color: "#241914",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.18)",

                  "&:hover": {
                    backgroundColor: "#D7B08A",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                  },

                  transition: "all 0.25s ease",
                }}
              >
                Shop Now
              </Button>
            </Stack>

            {/* Stats */}
            <Stack
              direction="row"
              spacing={{ xs: 3, sm: 5 }}
              pt={3}
              divider={
                <Box
                  sx={{
                    width: "1px",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    my: 0.5,
                  }}
                />
              }
            >
              {[
                {
                  value: `${products.length}+`,
                  label: "Products",
                },
                {
                  value: "99%",
                  label: "Happy Customers",
                },
                {
                  value: "24/7",
                  label: "Support",
                },
              ].map((stat) => (
                <Stack key={stat.label} alignItems="center" spacing={0.3}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      color: "#FFF9F3",
                    }}
                  >
                    {stat.value}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      color: "#AFA097",
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

      {/* ===== PRODUCTS SECTION ===== */}
      <Container
        id="products-grid"
        maxWidth="lg"
        sx={{
          pt: { xs: 6, md: 8 },
          pb: { xs: 8, md: 12 },
        }}
      >
        {/* Section Header */}
        <Box
          sx={{
            mb: 5,
          }}
        >
          {/* Small label */}
          <Typography
            sx={{
              color: "#A47551",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              mb: 1,
            }}
          >
            Shop Collection
          </Typography>

          {/* Main title */}
          <Typography
            variant="h4"
            sx={{
              color: "#2F211C",
              fontWeight: 800,
              fontSize: {
                xs: "1.8rem",
                md: "2.3rem",
              },
              letterSpacing: "-0.02em",
              mb: 1,
            }}
          >
            Our Products
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: "#806F64",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              maxWidth: 500,
            }}
          >
            Explore our latest collection and find something you'll love.
          </Typography>

          {/* Accent line */}
          <Box
            sx={{
              width: 55,
              height: 3,
              backgroundColor: "#C69C72",
              borderRadius: "10px",
              mt: 2.5,
            }}
          />
        </Box>

        {/* Products */}
        <Grid
          container
          spacing={{
            xs: 2.5,
            md: 3,
          }}
        >
          {products.map((p) => (
            <Grid
              key={p._id}
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <CardProduct {...p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
