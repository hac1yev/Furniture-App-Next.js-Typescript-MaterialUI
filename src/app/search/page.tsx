import SearchWrapper from '@/components/Search/SearchWrapper';
import { fetchSearchResult } from '@/lib/data';

const Search = async ({ searchParams }: any) => {
    const { q, page } = searchParams;

    const { products, count } = await fetchSearchResult(q, page);

    return (
        <SearchWrapper products={products} count={count} q={q} />
    );
};

export default Search;