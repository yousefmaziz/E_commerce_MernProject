import { Box, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log({ firstName, lastName, email, password });

    const response = await fetch("http://localhost:3002/user/register", {
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
            Sign Up
          </Typography>

          <TextField
            inputRef={firstNameRef}
            label="First Name"
            variant="outlined"
            name="firstName"
            fullWidth
          />
          <TextField
            inputRef={lastNameRef}
            label="Last Name"
            variant="outlined"
            name="lastName"
            fullWidth
          />
          <TextField
            inputRef={emailRef}
            label="Email"
            variant="outlined"
            name="email"
            fullWidth
          />
          <TextField
            inputRef={passwordRef}
            label="Password"
            variant="outlined"
            name="password"
            fullWidth
            type="password"
          />
          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Sign Up
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
          >
            Already have an account?{" "}
            <a href="/login" style={{ color: "primary" }}>
              Log in
            </a>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
