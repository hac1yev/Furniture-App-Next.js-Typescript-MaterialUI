"use client";

import { Box, Grid } from "@mui/material";
import './LazyLoading.css';

const SliderPreloader = () => {
  return (
    <Grid container>
      {[1, 2, 3, 4].map((i) => (
        <>
          <Grid key={i} item xs={12} sm={6} md={4} lg={3} padding={1}>
            <Box className="product-item">
              <Box className="product-item-img middle-skeleton"></Box>
            </Box>
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default SliderPreloader;