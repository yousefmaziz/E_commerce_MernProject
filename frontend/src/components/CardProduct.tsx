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

interface Props {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  stock: number;
}

export default function CardProduct({
  _id,
  title,
  image,
  price,
  description,
  stock,
}: Props) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleProductPage = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",

        borderRadius: "20px",
        overflow: "hidden",

        backgroundColor: "#FFFDFC",

        border: "1px solid #E9DED4",

        boxShadow: "0 6px 22px rgba(47, 33, 28, 0.08)",

        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",

        "&:hover": {
          transform: "translateY(-7px)",
          boxShadow: "0 18px 40px rgba(47, 33, 28, 0.15)",
          borderColor: "#D5B89D",
        },

        "&:hover .card-img": {
          transform: "scale(1.05)",
        },
      }}
    >
      {/* ================= IMAGE ================= */}

      <Box
        onClick={handleProductPage}
        sx={{
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          height: 230,
          backgroundColor: "#F3EDE7",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          className="card-img"
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
        />

        {/* NEW BADGE */}

        <Chip
          label={`${stock > 0 ? `${stock} In Stock` : "Out of Stock"}`}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,

            backgroundColor: "#2F211C",
            color: "white",

            fontWeight: 700,
            fontSize: "0.7rem",
            height: 25,

            border: "1px solid rgba(255,255,255,0.15)",
          }}
        />

        {/* PRICE */}

        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,

            backgroundColor: "#FFF9F3",

            border: "1px solid #E3D4C7",
            borderRadius: "10px",

            px: 1.5,
            py: 0.6,

            boxShadow: "0 4px 12px rgba(47,33,28,0.12)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.05rem",
              color: "#6F4E37",
              lineHeight: 1.3,
            }}
          >
            ${price.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {/* ================= CONTENT ================= */}

      <CardContent
        sx={{
          px: 2.5,
          pt: 2.5,
          pb: 1.5,

          flexGrow: 1,
        }}
      >
        {/* TITLE */}

        <Typography
          variant="h6"
          sx={{
            color: "#2F211C",

            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.4,

            minHeight: 45,

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",

            mb: 1,
          }}
        >
          {title}
        </Typography>

        {/* DESCRIPTION */}

        <Typography
          variant="body2"
          sx={{
            color: "#806F64",

            fontSize: "0.82rem",
            lineHeight: 1.6,

            minHeight: 42,

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>
      </CardContent>

      {/* ================= ACTIONS ================= */}

      <CardActions
        sx={{
          px: 2.5,
          pb: 2.5,
          pt: 1,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={
            <ShoppingCartOutlinedIcon
              sx={{
                fontSize: 18,
              }}
            />
          }
          onClick={() => addToCart(_id)}
          sx={{
            borderRadius: "11px",

            textTransform: "none",

            fontWeight: 700,
            fontSize: "0.92rem",

            py: 1.25,

            backgroundColor: "#6F4E37",
            color: "#FFFFFF",

            boxShadow: "none",

            transition: "all 0.25s ease",

            "&:hover": {
              backgroundColor: "#4E342E",

              transform: "translateY(-1px)",

              boxShadow: "0 7px 18px rgba(78, 52, 46, 0.25)",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
