import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart/CartContext";

const API = import.meta.env.VITE_BACK_API;
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
  const navigate = useNavigate();
  const handleProductPage = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: "24px",
        overflow: "hidden",
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow:
            "0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.3)",
        },
        "&:hover .card-img": {
          transform: "scale(1.07)",
        },
        "&:hover .add-btn": {
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          borderColor: "transparent",
        },
      }}
    >
      {/* IMAGE */}
      <Box
        onClick={() => handleProductPage()}
        sx={{
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          height: 230,
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          className="card-img"
          sx={{
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
        />

        {/* Gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 50%)",
          }}
        />

        {/* Top badges */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            right: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            label="New"
            size="small"
            sx={{
              background: "rgba(99,102,241,0.85)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.7rem",
              height: 24,
              backdropFilter: "blur(8px)",
            }}
          />
        </Box>

        {/* Price tag on image bottom */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            background: "rgba(15,23,42,0.75)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(99,102,241,0.35)",
            borderRadius: "10px",
            px: 1.5,
            py: 0.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.1rem",
              background: "linear-gradient(135deg, #a5b4fc, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.3,
            }}
          >
            ${price.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ px: 2.5, pt: 2.5, pb: 1.5 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            color: "#e2e8f0",
            fontSize: "1rem",
            lineHeight: 1.4,
            minHeight: 56,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "rgba(148,163,184,0.75)",
            fontSize: "0.82rem",
            lineHeight: 1.6,
            minHeight: 40,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>
      </CardContent>

      {/* ACTIONS */}
      <CardActions sx={{ px: 2.5, pb: 2.5, pt: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          className="add-btn"
          startIcon={<ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />}
          onClick={() => addToCart(_id)}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            py: 1.3,
            fontSize: "0.92rem",
            border: "1px solid rgba(99,102,241,0.45)",
            color: "#a5b4fc",
            background: "rgba(99,102,241,0.08)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "1px solid transparent",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
