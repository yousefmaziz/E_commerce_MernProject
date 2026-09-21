import { Box, Typography, TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_BACK_API;

export default function Login() {
  const [error, setError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth()!;
  const navigate = useNavigate();

  // ================= LOGIN =================

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setError("");

    try {
      const response = await fetch(`${API}/user/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      if (!data.token) {
        setError("No token received. Please try again.");
        return;
      }

      login(email!, data.token, data.role, data.firstName);

      toast.success("Login successful!");

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      setError("Something went wrong. Please try again.");
    }
  };

  // ================= INPUT STYLE =================

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",

      backgroundColor: "#FAF7F4",

      transition: "all 0.2s ease",

      "& fieldset": {
        borderColor: "#DED0C4",
      },

      "&:hover fieldset": {
        borderColor: "#C69C72",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#6F4E37",
        borderWidth: "1.5px",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#806F64",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6F4E37",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#2F211C",

        overflow: "hidden",
        position: "relative",

        px: 2,
        py: 4,
      }}
    >
      {/* ================= DECORATION ================= */}

      <Box
        sx={{
          position: "absolute",

          width: 350,
          height: 350,

          borderRadius: "50%",

          backgroundColor: "rgba(198, 156, 114, 0.08)",

          top: -150,
          left: -120,
        }}
      />

      <Box
        sx={{
          position: "absolute",

          width: 300,
          height: 300,

          borderRadius: "50%",

          backgroundColor: "rgba(215, 176, 138, 0.06)",

          bottom: -120,
          right: -100,
        }}
      />

      {/* ================= LOGIN CARD ================= */}

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          width: "100%",
          maxWidth: 420,

          display: "flex",
          flexDirection: "column",

          gap: 2.3,

          p: {
            xs: 3,
            sm: 4,
          },

          borderRadius: "20px",

          backgroundColor: "#FFFDFC",

          border: "1px solid #E9DED4",

          boxShadow: "0 18px 50px rgba(47, 33, 28, 0.18)",

          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ================= TITLE ================= */}

        <Box
          sx={{
            textAlign: "center",
            mb: 1.5,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,

              color: "#2F211C",

              letterSpacing: "-0.025em",

              fontSize: {
                xs: "1.8rem",
                sm: "2rem",
              },

              mb: 0.8,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            sx={{
              color: "#806F64",

              fontSize: "0.9rem",
            }}
          >
            Sign in to continue shopping
          </Typography>
        </Box>

        {/* ================= EMAIL ================= */}

        <TextField
          inputRef={emailRef}
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          required
          autoComplete="email"
          sx={inputSx}
        />

        {/* ================= PASSWORD ================= */}

        <TextField
          inputRef={passwordRef}
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          required
          autoComplete="current-password"
          sx={inputSx}
        />

        {/* ================= ERROR ================= */}

        {error && (
          <Box
            sx={{
              backgroundColor: "#FFF1F0",

              border: "1px solid #F3CBC7",

              borderRadius: "10px",

              px: 2,
              py: 1.2,
            }}
          >
            <Typography
              sx={{
                color: "#B42318",

                textAlign: "center",

                fontWeight: 500,

                fontSize: "0.85rem",
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {/* ================= LOGIN BUTTON ================= */}

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            py: 1.35,

            mt: 0.5,

            borderRadius: "12px",

            textTransform: "none",

            fontSize: "0.95rem",

            fontWeight: 700,

            backgroundColor: "#6F4E37",

            color: "#FFFFFF",

            boxShadow: "none",

            transition: "all 0.2s ease",

            "&:hover": {
              backgroundColor: "#4E342E",

              transform: "translateY(-1px)",

              boxShadow: "0 7px 18px rgba(78, 52, 46, 0.22)",
            },

            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          Login
        </Button>

        {/* ================= REGISTER ================= */}

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",

            color: "#806F64",

            mt: 0.5,

            fontSize: "0.875rem",
          }}
        >
          Don't have an account?{" "}
          <Box
            component="span"
            onClick={() => navigate("/register")}
            sx={{
              cursor: "pointer",

              color: "#6F4E37",

              fontWeight: 700,

              transition: "color 0.2s ease",

              "&:hover": {
                color: "#4E342E",

                textDecoration: "underline",

                textUnderlineOffset: "3px",
              },
            }}
          >
            Sign up
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
