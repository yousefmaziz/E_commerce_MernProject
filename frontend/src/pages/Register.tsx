import { Box, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
export default function Register() {
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
    const data = await response.json();
    console.log(data);
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
          <Typography variant="h4">Register New User</Typography>
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
              inputRef={firstNameRef}
              label="First Name"
              variant="outlined"
              name="firstName"
            />
            <TextField
              inputRef={lastNameRef}
              label="Last Name"
              variant="outlined"
              name="lastName"
            />
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
              Register
            </Button>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          </Box>
        </Box>
      </Container>
    </>
  );
}
