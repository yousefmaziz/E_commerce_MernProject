import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Login() {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await fetch("http://localhost:3002/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      setError("Login failed. Please try again.");
      return;
    }
    const token = await response.json();

    if (!token) {
      setError("No token received. Please try again.");
      return;
    }
    login(email, token);
    toast.success("Login successful!");
    navigate("/");
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
            display: "flex",
            flexDirection: "column",
            width: 400,
            gap: 2,
            px: 8,
            py: 3,
            border: "1px solid #ccc",
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.86)",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
            Login
          </Typography>
          <TextField
            inputRef={emailRef}
            label="Email"
            variant="outlined"
            name="email"
          />
          <TextField
            sx={{ width: "100%" }}
            inputRef={passwordRef}
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            fullWidth
          />
          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
          >
            Don't have an account?{" "}
            <a href="/register" style={{ color: "primary" }}>
              Sign up
            </a>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
