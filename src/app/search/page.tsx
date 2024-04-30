import PageNavigations from '@/components/PageNavigations/PageNavigations';
import { fetchSearchResult } from '@/lib/data';
import { Container, Typography } from '@mui/material';

import SearchResult from '@/components/Search/SearchResult';
import PaginationComponent from '@/components/Pagination/PaginationComponent';
import { navigation_data } from '@/dummy_data/data';

const Search = async ({ searchParams }: any) => {
    const { q, page } = searchParams;

    const { products, count } = await fetchSearchResult(q, page);
    

    return (
        <Container
            component="div"
            maxWidth={false}
            sx={{ mt: 8, width: "100%" }}
        >
            <PageNavigations arr={navigation_data} />
            <Typography variant='h1' sx={{ marginY: 5 }}>SEARCH RESULT</Typography>
            <Typography variant='subtitle2' sx={{ marginY: 5 }}>Your search results for “sofa”.</Typography>
            <SearchResult products={products} />
            <PaginationComponent count={count} />
        </Container>
    );
};

export default Search;