"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import '../../About/About.css';

const About = () => {
  return (
    <Container
      component="div"
      maxWidth={false}
      sx={{ marginY: 10, width: "100%" }}
    >
      <Typography variant="h1" sx={{ marginTop: 4 }}>ABOUT US</Typography>
      <Grid container spacing={1} sx={{ marginY: 2 }}> 
        <Grid item xs={12} md={6} sx={{ paddingX: 1 }} className="about-grid">
          <Box sx={{ position: "relative", height: "100%" }} className="about-img">
            <Image fill src={"/about-img.svg"} alt="about" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingX: 2 }}>
            <Typography variant="subtitle2">
                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est 
                eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas 
                assumenda est, omnis dolor repellendus.
            </Typography>
            <Typography variant="subtitle2">
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et 
                voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente 
                delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus 
                asperiores repellat.  
            </Typography>
            <Typography variant="subtitle2">
                Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias non
                consequatur aut perferendis doloribus asperiores repellat et voluptates repudiandae sint et molestiae. 
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default About