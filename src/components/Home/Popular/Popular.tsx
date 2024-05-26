"use client";

import '../Products/Products.css';
import { Box, Container, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import PopularPreloader from '@/components/LazyLoading/PopularPreloader';

const PopularItems = dynamic(() => import("./PopularItems"), {
  ssr: false,
  loading: () => <PopularPreloader />
})

const Popular = ({ addFavorites, removeFavorites }: FavoriteHookTypes) => {
    return (
      <Container 
        component="div"
        maxWidth={false}
        sx={{ mt: 8, width: "100%" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3} padding={1}>
          <Box className="product-title-item">
            <Typography variant="h3" className={"products-header"}>MOST POPULAR</Typography>
          </Box>
        </Grid>
        <PopularItems addFavorites={addFavorites} removeFavorites={removeFavorites} />
      </Container>
    );
};

export default Popular;