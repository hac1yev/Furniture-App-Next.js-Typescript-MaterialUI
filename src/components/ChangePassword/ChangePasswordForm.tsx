"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import PasswordInput from "../ProfileBody/PasswordInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ChangePasswordForm = () => {
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [err,setErr] = useState<string | null>(null);
  const [token,setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
  }, []);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if(newPassword !== confirmPassword) {
      setErr("Passwords are not equal!");
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: 'POST',
        body: JSON.stringify({ newPassword, token }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if(data?.status === 200) {
        Swal.fire(
          `${data?.message}`,
          '',
          'success'
        );

        router.push("/login");
      }

      if(data?.status === 404) {
        setErr(data?.message);
      }
      
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };    
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };    

  return (
    <Container maxWidth="sm" sx={{ marginTop: 6 }}>
      <Typography variant="h3">NEW PASSWORD</Typography>
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
        <PasswordInput password={newPassword} handlePassword={handleNewPassword} placeholder="New password" />
        <PasswordInput password={confirmPassword} handlePassword={handleConfirmPassword} placeholder="Confirm password" />
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
      </Box>
    </Container>
  );
};

export default ChangePasswordForm;
