"use client";

import { Container, Typography } from '@mui/material';

import SearchResult from '@/components/Search/SearchResult';
import PaginationComponent from '@/components/Pagination/PaginationComponent';
import { navigation_data } from '@/dummy_data/data';
import PageNavigations from '@/components/PageNavigations/PageNavigations';

type ProductType = {
    _id: string;
    description: string;
    title: string;
    price: number;
    furniture: string;
    image: string;
  };
  
  type AllProductsCountType = {
    products: ProductType[];
    count: number;
    q:string;
  };

const SearchWrapper = ({ products,count,q }: AllProductsCountType) => {
  return (
    <Container
            component="div"
            maxWidth={false}
            sx={{ mt: 8, width: "100%" }}
        >
            <PageNavigations arr={navigation_data} />
            <Typography variant='h1' sx={{ marginY: 5 }}>SEARCH RESULT</Typography>
            <Typography variant='subtitle2' sx={{ marginY: 5 }}>{`Your search results for ${q}.`}</Typography>
            <SearchResult products={products} />
            <PaginationComponent count={count} />
        </Container>
  )
}

export default SearchWrapper