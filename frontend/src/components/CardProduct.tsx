import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useCart } from "../context/cart/CartContext";

interface props {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
}

export default function CardProduct({
  _id,
  title,
  image,
  price,
  description,
}: props) {
  const { addToCart } = useCart();

  return (
    <Card
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "0.3s",
        color: "white",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* IMAGE */}

      <Box
        sx={{
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: 220,
            objectFit: "cover",
            transition: "0.4s",

            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>

      {/* CONTENT */}

      <CardContent
        sx={{
          background: "rgba(15,23,42,0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          fontWeight="bold"
          sx={{
            minHeight: "60px",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 2,
            minHeight: "45px",
          }}
        >
          {description.slice(0, 70)}...
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ color: "green" }}>
          {price}$
        </Typography>
      </CardContent>

      {/* ACTIONS */}

      <CardActions
        sx={{
          px: 2,
          pb: 2,
          background: "rgba(15,23,42,0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={() => addToCart(_id)}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            py: 1.2,
            fontSize: "15px",
            boxShadow: "none",
            color: "#fff",
            background: "rgba(15,23,42,0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.06)",
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
