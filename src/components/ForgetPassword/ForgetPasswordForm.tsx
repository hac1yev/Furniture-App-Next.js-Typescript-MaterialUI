"use client";

import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import "../Login/LoginForm.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loadingSliceActions } from "@/store/loading-slice";

const ForgetPasswordForm = () => {
  const [err,setErr] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget)

        dispatch(loadingSliceActions.itIsLoading(true));

        const response = await fetch("/api/auth/reset-password", {
            method: 'POST',
            body: JSON.stringify({
                email: formData.get("email"),
                username: formData.get("username")
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();        

        if(data?.status === 200) {
            Swal.fire(
                `${'We send your email verification code. Please check your email.'}`,
                '',
                'success'
            );
        }

        if(data?.status === 404) {
            setErr(data?.message);
        }

        dispatch(loadingSliceActions.itIsNotLoading(false));
    } catch (error) {
        console.log(error);
    }
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
            />
            <TextField
                margin="dense"
                type="username"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
                Submit
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
