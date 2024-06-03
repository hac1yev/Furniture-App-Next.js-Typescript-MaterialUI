"use client";

import './Products.css';
import { Box, Container, Grid, Typography } from '@mui/material';
import Preloader from '@/components/LazyLoading/LazyLoading';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const ProductItems = dynamic(() => import("./ProductItems"), {
  ssr: false,
  loading: () => <Preloader/>
});

const Products = ({ addFavorites,removeFavorites }: FavoriteHookTypes) => {
    return (
      <Container 
        component="div"
        maxWidth={false}
        sx={{ mt: 6, width: "100%" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3} padding={1}>
          <Box className="product-title-item">
            <Typography variant="h3" className={"products-header"}>PRODUCTS</Typography>
          </Box>
        </Grid>
        <ProductItems addFavorites={addFavorites} removeFavorites={removeFavorites} />
      </Container>
    );
};

export default memo(Products);