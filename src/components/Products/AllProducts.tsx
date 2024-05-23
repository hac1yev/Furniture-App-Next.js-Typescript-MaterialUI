"use client";

import React, { Suspense, useEffect } from "react";
import "../../components/Home/Products/Products.css";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import PageNavigations from "@/components/PageNavigations/PageNavigations";
import { navigation_data } from "@/dummy_data/data";
import ProductsPagination from "./ProductsPagination";
import ProductCategories from "./ProductCategories";
import ProductCollections from "./ProductCollections";
import ProductHead from "./ProductHead";
import { useDispatch, useSelector } from "react-redux";
import { productsSliceAction } from "@/store/products-slice";
import AllProductsPreloader from '@/components/LazyLoading/AllProductsPreloader';
import dynamic from 'next/dynamic';

const ProductList = dynamic(() => import("./ProductList"), {
  ssr: false,
  loading: () => <AllProductsPreloader />
});

type ProductType = {
  _id: string;
  description: string;
  title: string;
  price: number;
  furniture: string;
  image: string;
  f_collection: string;
};

type AllProductsType = {
  filteredProducts: ProductType[];
  productsReducer: AllProductsType;
};

const AllProducts = () => {
  const filteredProducts = useSelector((state: AllProductsType) => state.productsReducer.filteredProducts);
  const isLarge = useMediaQuery("(max-width:899.5px)");
  const searchParams = useSearchParams();
  const dispatch = useDispatch();  
  const router = useRouter();

  const productPage = Number(searchParams.get("page")) || 1;
  let paginationCount = Math.ceil(filteredProducts.length / 9);

  useEffect(() => {
    const fetchFurnitures = async () => {
      const response = await fetch("/api/products");
      const { data } = await response.json();
      dispatch(productsSliceAction.getAllProducts(data))
    };

    fetchFurnitures();
  }, [dispatch]);

  useEffect(() => {
    if(productPage > paginationCount) {
      router.replace(`/products?page=1`);
    }else{
      router.replace(`/products?page=${productPage}`);
    }
  }, [productPage, router, paginationCount]);


  return (
    <Container component="div" maxWidth={false} sx={{ mt: 4, width: "100%" }}>
      <PageNavigations arr={navigation_data} />
      <ProductHead filteredProducts={filteredProducts} />
      <Grid container sx={!isLarge ? { marginY: 8 } : { marginY: 4 }}>
        <Grid container sm={12} md={3} lg={3}>
          <Box component={"div"}>
            {!isLarge && (
              <>
                <ProductCategories />
                <ProductCollections />
              </>
            )}
          </Box>
        </Grid>
        <ProductList filteredProducts={filteredProducts} productPage={productPage} />
        <Grid container sm={12} md={3} lg={3}></Grid>
        <Grid container sm={12} md={9} lg={9}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginY: 8,
          }}
        >
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsPagination paginationCount={paginationCount} productPage={productPage} />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AllProducts;