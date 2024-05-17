"use client";

import PageNavigations from "@/components/PageNavigations/PageNavigations";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import './About.css';
import CountUp from "react-countup";

const AboutWrapper = () => {
    const navigation_data = [
        {
          id: "p1",
          title: "Home",
          pathname: "/",
        },
        {
          id: "p2",
          title: "About",
          pathname: "/about",
        },
    ];

  return (
    <Container
      component="div"
      maxWidth={false}
      sx={{ marginTop: 8, marginBottom: 5, width: "100%" }}
    >
      <PageNavigations arr={navigation_data} />
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
      <Grid container spacing={1} sx={{ marginY: 5 }}> 
        <Grid item xs={12} md={6} lg={3}>
            <Box component="div" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: 1,
                marginY: 2
            }}>
                <Typography variant="h2" sx={{ fontFamily: '__Prata_cba903' }}>
                    <CountUp duration={4} end={500} />+
                </Typography>
                <Typography variant="subtitle2" sx={{ fontFamily: '__Prata_cba903' }}>
                    PROJECTS
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
            <Box component="div" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: 1,
                marginY: 2
            }}>
                <Typography variant="h2" sx={{ fontFamily: '__Prata_cba903' }}>
                    <CountUp duration={4} end={70} />+
                </Typography>
                <Typography variant="subtitle2" sx={{ fontFamily: '__Prata_cba903' }}>
                    PARTNERS
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
            <Box component="div" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: 1,
                marginY: 2
            }}>
                <Typography variant="h2" sx={{ fontFamily: '__Prata_cba903' }}>
                    <CountUp duration={4} end={30000} />+
                </Typography>
                <Typography variant="subtitle2" sx={{ fontFamily: '__Prata_cba903' }}>
                    FOLLOWERS
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
            <Box component="div" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: 1,
                marginY: 2
            }}>
                <Typography variant="h2" sx={{ fontFamily: '__Prata_cba903' }}>
                    <CountUp duration={4} end={25} />+
                </Typography>
                <Typography variant="subtitle2" sx={{ fontFamily: '__Prata_cba903' }}>
                    YEARS
                </Typography>
            </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AboutWrapper