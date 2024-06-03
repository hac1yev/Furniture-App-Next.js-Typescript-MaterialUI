"use client";

import React, { memo, useEffect, useMemo } from "react";
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

const AllProducts = () => {
  const filteredProducts = useSelector((state: AllProductsTypes) => state.productsReducer.filteredProducts);
  const isLarge = useMediaQuery("(max-width:899.5px)");
  const searchParams = useSearchParams();
  const dispatch = useDispatch();  
  const router = useRouter();

  const productPage = useMemo(() => {
    return Number(searchParams.get("page")) || 1;
  }, [searchParams]);

  let paginationCount = useMemo(() => {
    return Math.ceil(filteredProducts.length / 9);
  }, [filteredProducts]);

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
      <ProductHead />
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
          <ProductsPagination paginationCount={paginationCount} productPage={productPage} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(AllProducts);