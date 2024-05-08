"use client";

import { Box, Grid, Typography } from "@mui/material";
import './LazyLoading.css';

const PopularPreloader = () => {
  return (
    <Grid container>
      {[1, 2, 3, 4].map((i) => (
        <>
          <Grid key={i} item xs={12} sm={6} md={4} lg={3} padding={1}>
            <Box className="product-item">
              <Box className="product-item-img middle-skeleton"></Box>
              <Typography
                className="middle-skeleton"
                sx={{ marginTop: 1, height: "20px" }}
                variant="subtitle1"
              ></Typography>
              <Typography
                className="middle-skeleton"
                sx={{ marginTop: 1, height: "20px", width: "40%" }}
                variant="subtitle1"
              ></Typography>
            </Box>
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default PopularPreloader;
