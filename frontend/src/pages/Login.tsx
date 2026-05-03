import { Box, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
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
    navigate("/");
  };
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Typography variant="h4">Login</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 3,
              gap: 2,
              p: 3,
              border: "1px solid #ccc",
              borderRadius: 2,
            }}
          >
            <TextField
              inputRef={emailRef}
              label="Email"
              variant="outlined"
              name="email"
            />
            <TextField
              inputRef={passwordRef}
              label="Password"
              variant="outlined"
              type="password"
              name="password"
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
          </Box>
        </Box>
      </Container>
    </>
  );
}
