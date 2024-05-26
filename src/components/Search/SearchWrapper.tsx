"use client";

import { Container, Typography } from "@mui/material";
import SearchResult from "@/components/Search/SearchResult";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { navigation_data } from "@/dummy_data/data";
import PageNavigations from "@/components/PageNavigations/PageNavigations";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingSliceActions } from "@/store/loading-slice";

const SearchWrapper = ({ products, count, q }: SearchWrapperCompType) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loadingReducer.isLoading);


  useEffect(() => {
    if(isLoading) {
      dispatch(loadingSliceActions.itIsNotLoading(false));
    }
  }, [dispatch, isLoading]);

  return (
    <Container component="div" maxWidth={false} sx={{ mt: 8, width: "100%" }}>
      <PageNavigations arr={navigation_data} />
      <Typography variant="h1" sx={{ marginY: 5 }}>
        SEARCH RESULT
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ marginY: 5 }}
      >{`Your search results for ${q}.`}</Typography>
      <SearchResult products={products} />
      <PaginationComponent count={count} />
    </Container>
  );
};

export default SearchWrapper;