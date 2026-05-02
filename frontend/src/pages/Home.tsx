import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardProduct from "../components/CardProduct";
import { useEffect, useState } from "react";
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
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid key={p._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <CardProduct {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
