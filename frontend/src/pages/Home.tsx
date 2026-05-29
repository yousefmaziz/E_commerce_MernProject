import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardProduct from "../components/CardProduct";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        background: `
  radial-gradient(circle at top left, rgba(37,99,235,0.18) 0%, transparent 30%),
  radial-gradient(circle at bottom right, rgba(168,85,247,0.18) 0%, transparent 30%),
  linear-gradient(160deg, #020617 0%, #0f172a 45%, #111827 100%)
`,
      }}
    >
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid key={p._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <CardProduct {...p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
