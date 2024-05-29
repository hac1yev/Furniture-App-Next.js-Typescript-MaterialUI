"use client";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import "./LoginForm.css";
import Link from "next/link";
import PasswordInput from "../ProfileBody/PasswordInput";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const ChangePasswordForm = () => {
  const [password,setPassword] = useState("");
  const [err,setErr] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
        username: data.get("username"),
        password,
        redirect: false
    });    

    if(response?.status === 200) {
      router.push("/");
    }
    else if(response?.status === 401) {
      setErr(response?.error)
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };    

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {err && (
        <Box sx={{ 
          bgcolor: 'rgb(243, 195, 195)', 
          height: '50px', 
          width: "100%",
          display: 'flex',
          alignItems: 'center',
          marginY: 2
        }}>
          <Typography sx={{
            color: 'rgb(249, 66, 66)', 
            fontSize: '18px', 
            fontWeight: '700',
            paddingX: 1
          }}>
            {err}
          </Typography>
        </Box>
      )}
      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <PasswordInput password={password} handlePassword={handlePassword} />
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
          <Link href="/forget-password" style={{ color: "#B8926A", fontSize: "14px" }}>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: '14px' }}>Do not have an account?&nbsp;
            <Link href="/register" style={{ color: "#B8926A", fontSize: "14px" }}>
              {"Sign Up"}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChangePasswordForm;
