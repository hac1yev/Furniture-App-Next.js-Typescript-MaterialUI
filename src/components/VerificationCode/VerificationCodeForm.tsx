"use client";

import { Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VerificationInput from "react-verification-input";
import Swal from "sweetalert2";

const VerificationCodeForm = () => {
    const [token,setToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const handleComplete = async (code: string) => {
        try {
            const response = await fetch("/api/auth/verification-code", {
                method: 'POST',
                body: JSON.stringify({ verificationCode: code, token }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            if(data?.status === 200){
                router.push(`/change-password?token=${token}`);
            }

            if(data?.status === 404) {
                Swal.fire(
                    `${data?.message}`,
                    '',
                    'error'
                  );
            }
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h3" sx={{ marginY: 3 }}>Enter your verification code</Typography>
        <VerificationInput onComplete={handleComplete} />
    </Container>
  )
}

export default VerificationCodeForm