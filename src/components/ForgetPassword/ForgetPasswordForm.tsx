"use client";

import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import "../Login/LoginForm.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgetPasswordForm = () => {
  const [err,setErr] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 6 }}>
        <Typography variant="h3">RESET PASSWORD</Typography>
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
                type="email"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
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
                <Grid item>
                <Typography sx={{ fontSize: '14px' }}>Do not have an account?&nbsp;
                    <Link href="/register" style={{ color: "#B8926A", fontSize: "14px" }}>
                        {"Sign Up"}
                    </Link>
                </Typography>
                </Grid>
            </Grid>
        </Box>
    </Container>
  );
};

export default ForgetPasswordForm;
