import { Box, Button, Container, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* ✅ Icon */}
        <CheckCircleIcon sx={{ fontSize: 100, color: "green", mb: 2 }} />

        {/* 🎉 Message */}
        <Typography variant="h4" gutterBottom>
          Order Placed Successfully!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your order has been placed successfully 🎉
        </Typography>

        {/* 🔙 Button */}
        <Button
          variant="contained"
          sx={{ color: "white", px: 4, py: 1.5 }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
