import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const PersonalInfo = () => {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");

  useEffect(() => {
    try {
      const fetchProfileData = async () => {
        const response = await fetch("/api/profile")
        const data = await response.json();
        setFirstName(data?.user?.firstName);
        setLastName(data?.user?.lastName);
        setEmail(data?.user?.email);
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
          email
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
    <Box component="form" noValidate onSubmit={submitProfileInfo}>
      <TextField
        margin="dense"
        required
        fullWidth
        placeholder="Firstname *"
        id="firstname"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        name="firstname"
        autoComplete="firstname" 
      />
      <TextField
        margin="dense"
        required
        fullWidth
        placeholder="Lastname *"
        id="lastname"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        name="lastname"
        autoComplete="lastname"
      />
      <TextField
        margin="dense"
        fullWidth
        placeholder="Email *"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        autoComplete="email"
        disabled
      />
      <Button
        type="submit"
        fullWidth
        size="large"
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
        Update
      </Button>
    </Box>
  );
};

export default PersonalInfo;