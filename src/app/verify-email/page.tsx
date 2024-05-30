"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            const verifyUserEmail = async () => {
                try {
                    await axios.post('/api/verifyemail', {token})
                    setVerified(true);
                } catch (error:any) {
                    setError(error.response.data.error);
                    console.log(error.response.data.error);
                }
            };
            verifyUserEmail();
        }
    }, [token]);

    return(
        <Container 
            maxWidth="sm"   
            sx={{ paddingY: 5 }}  
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}
            >
                {verified && (
                <>
                    <Image 
                        src="/success.svg"
                        width={100}
                        height={100}
                        alt="success"
                    />
                    <Typography sx={{ paddingTop: 1 }} variant="h4">
                        Your email has been verified.
                    </Typography>
                    <Typography sx={{ paddingTop: 2 }} variant="subtitle2">
                        You can now sign in with your new account.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            paddingX: 0,
                            mt: 3,
                            mb: 2,
                            bgcolor: "primary.main",
                            color: "#fff",
                            maxWidth: '130px',
                            width: '100%',
                            "&:hover": {
                                bgcolor: "primary.main",
                            },
                        }}
                    >
                        <Link style={{ width: '100%', heigth: '100%' }} href="/login">SIGN IN</Link>
                    </Button>
                </>
                )}
                {error && (
                    <Typography variant="h4" className="text-2xl bg-red-500 text-black">{error}</Typography>
                )}
            </Box>
        </Container>
    )
}