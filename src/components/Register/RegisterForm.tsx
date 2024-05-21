"use client";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordInput from "../ProfileBody/PasswordInput";

const RegisterForm = () => {
  const [password,setPassword] = useState("");
  const [err,setErr] = useState<string | null>(null);
  const navigate = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                firstName: data.get("firstName"),
                lastName: data.get("lastName"),
                email: data.get("email"),
                password
            })
        });

        const resData = await response.json();
        
        if(resData?.status === 201) {
          navigate.push("/login")
        }
        else if(resData?.status === 409) {
          setErr(resData?.message);
        }
        else if(resData?.status === 400) {
          setErr(resData?.message);
        }
        
    } catch (error) {
        console.log(error);
    }
  };

  
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };    

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordInput password={password} handlePassword={handlePassword} />
        </Grid>
      </Grid>
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
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/login" style={{ color: "#B8926A", fontSize: "14px" }}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterForm;
