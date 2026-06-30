import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const API = import.meta.env.BACK_API;
export default function Register() {
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth()!;
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log({ firstName, lastName, email, password });

    const response = await fetch(`${API}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    if (!response.ok) {
      setError("Registration failed. Please try again.");
      return;
    }
    const token = await response.json();

    if (!token) {
      setError("No token received. Please try again.");
      return;
    }
    login(email, token);
    toast.success("Registration successful!");
    navigate("/login");
  };
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          background: `
  radial-gradient(circle at top left, rgba(37,99,235,0.18) 0%, transparent 30%),
  radial-gradient(circle at bottom right, rgba(168,85,247,0.18) 0%, transparent 30%),
  linear-gradient(160deg, #020617 0%, #0f172a 45%, #111827 100%)
`,

          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: 420 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            px: { xs: 3, sm: 5 },
            py: 4,
            borderRadius: "24px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          {/* TITLE */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#0f172a",
                mb: 1,
              }}
            >
              Create Account
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "gray",
              }}
            >
              Sign up to get started
            </Typography>
          </Box>

          {/* FIRST NAME */}
          <TextField
            inputRef={firstNameRef}
            label="First Name"
            variant="outlined"
            name="firstName"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "white",
              },
            }}
          />

          {/* LAST NAME */}
          <TextField
            inputRef={lastNameRef}
            label="Last Name"
            variant="outlined"
            name="lastName"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "white",
              },
            }}
          />

          {/* EMAIL */}
          <TextField
            inputRef={emailRef}
            label="Email"
            variant="outlined"
            name="email"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "white",
              },
            }}
          />

          {/* PASSWORD */}
          <TextField
            inputRef={passwordRef}
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "white",
              },
            }}
          />

          {/* BUTTON */}
          <Button
            onClick={onSubmit}
            variant="contained"
            type="submit"
            sx={{
              py: 1.5,
              borderRadius: "14px",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 8px 20px rgba(37,99,235,0.3)",

              "&:hover": {
                background: "linear-gradient(135deg, #1d4ed8, #1e40af)",
                boxShadow: "0 10px 25px rgba(37,99,235,0.4)",
              },
            }}
          >
            Sign Up
          </Button>

          {/* ERROR */}
          {error && (
            <Typography
              sx={{
                color: "#dc2626",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {error}
            </Typography>
          )}

          {/* LOGIN */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "gray",
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Log in
            </a>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
