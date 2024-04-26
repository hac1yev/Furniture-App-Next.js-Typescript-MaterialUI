"use client";

import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import "./LoginForm.css";
import Link from "next/link";
import PasswordInput from "../ProfileBody/PasswordInput";
import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginForm = () => {
    const [password,setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await signIn("credentials", {
        email: data.get("email"),
        password,
        callbackUrl: '/',
    });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };    

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <PasswordInput password={password} handlePassword={handlePassword} />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: "primary.main",
          color: "#fff",
          "&:hover": {
            bgcolor: "primary.main",
          },
        }}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" style={{ color: "#B8926A", fontSize: "14px" }}>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/register" style={{ color: "#B8926A", fontSize: "14px" }}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
