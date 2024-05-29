"use client";

import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const PersonalInfo = () => {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");

  useEffect(() => {
    try {
      const fetchProfileData = async () => {
        const response = await fetch("/api/profile")
        const data = await response.json();
        setFirstName(data?.user?.firstName);
        setLastName(data?.user?.lastName);
        setEmail(data?.user?.email);
        setUsername(data?.user?.username);
      };  

      fetchProfileData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const submitProfileInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/api/profile", {
        method: 'PUT',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={submitProfileInfo} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            placeholder="Firstname *"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name="firstname"
            autoComplete="firstname" 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            placeholder="Lastname *"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastname"
            autoComplete="lastname" 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            placeholder="Username *"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Email *"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            autoComplete="email"
            disabled
          />
        </Grid>    
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{
              mb: 2,
              bgcolor: "primary.main",
              color: "#fff",
              "&:hover": {
                bgcolor: "primary.main",
              },
            }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfo;