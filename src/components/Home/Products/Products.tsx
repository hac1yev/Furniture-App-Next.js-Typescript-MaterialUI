"use client";

import ProductItems from './ProductItems';
import './Products.css';
import { Box, Container, Grid, Typography } from '@mui/material';
// import Preloader from '@/components/LazyLoading/LazyLoading';
// import dynamic from 'next/dynamic';

// const ProductItems = dynamic(() => import("./ProductItems"), {
//   ssr: false,
//   loading: () => <Preloader/>
// });

type HookTypes = {
  addFavorites: (id: string) => void;
  removeFavorites: (id: string) => void;
};

const Products = ({ addFavorites,removeFavorites }: HookTypes) => {
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

export default Products;