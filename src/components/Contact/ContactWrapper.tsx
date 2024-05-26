"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "../../components/Contact/Contact.css";
import { useState } from "react";
import Image from "next/image";
import PageNavigations from "@/components/PageNavigations/PageNavigations";
import Swal from "sweetalert2";

const ContactWrapper = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const navigation_data = [
    {
      id: "p1",
      title: "Home",
      pathname: "/",
    },
    {
      id: "p2",
      title: "Contact",
      pathname: "/contact",
    },
  ];

  console.log(errMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          email,
          fullName,
          theme,
          message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!data?.error) {
        Swal.fire(
          `${"Your message has been sent successfully."}`,
          "",
          "success"
        );
      }

      if (data?.error) {
        setErrMessage(data.error);
      }
    } catch (error) {
      Swal.fire("Message could not be sent!", "", "error");
      console.log(error);
    }

    setFullName("");
    setEmail("");
    setTheme("");
    setMessage("");
  };

  return (
    <Container
      component="div"
      maxWidth={false}
      sx={{ marginTop: 8, marginBottom: 5, width: "100%" }}
    >
      <PageNavigations arr={navigation_data} />
      <Grid item xs={12} sm={6} md={4} lg={3} padding={1} sx={{ marginTop: 3 }}>
        <Box className="product-title-item">
          <Typography variant="h3" className={"products-header"}>
            CONTACT
          </Typography>
        </Box>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          {errMessage && (
            <Box
              sx={{
                bgcolor: "rgb(243, 195, 195)",
                height: "50px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                marginY: 2,
              }}
            >
              <Typography
                sx={{
                  color: "rgb(249, 66, 66)",
                  fontSize: "18px",
                  fontWeight: "700",
                  paddingX: 1,
                }}
              >
                {errMessage}
              </Typography>
            </Box>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              type="text"
              fullWidth
              label="Name Surname"
              name="fullName"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <TextField
              margin="dense"
              type="email"
              fullWidth
              label="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              margin="dense"
              type="text"
              fullWidth
              label="Theme"
              name="theme"
              onChange={(e) => setTheme(e.target.value)}
              value={theme}
            />
            <TextField
              multiline
              rows={4}
              maxRows={5}
              margin="dense"
              fullWidth
              label="Your Messsage"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ color: "#fff", width: "100%", marginTop: 2 }}
              size="large"
            >
              SEND
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ paddingX: 8 }}>
          <Box sx={{ position: "relative", height: "100%" }}>
            <Image fill src={"/Contact_Img.png"} alt="furniture19" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactWrapper;
