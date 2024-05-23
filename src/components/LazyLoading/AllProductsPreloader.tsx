"use client";

import { Box, Grid, Typography } from "@mui/material";
import './LazyLoading.css';

const AllProductsPreloader = () => { 
    return (
      <Grid container sm={12} md={9} lg={9}>
          {[1,2,3,4,5,6,7,8,9].map((i) => (
              <>
                <Grid key={i} item xs={12} sm={6} md={6} lg={4} padding={1}>
                    <Box className='product-item'>
                        <Box className="product-item-img middle-skeleton"></Box>
                        <Typography className='middle-skeleton' sx={{ marginTop: 1, height: '20px' }} variant='subtitle1'></Typography>
                        <Typography className='middle-skeleton' sx={{ marginTop: 1, height: '20px', width: "40%" }} variant='subtitle1'></Typography>
                    </Box>
                </Grid>
              </>
          ))}
      </Grid>
    );
  };

export default AllProductsPreloader;