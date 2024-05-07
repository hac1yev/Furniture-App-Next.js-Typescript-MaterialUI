import Image from 'next/image';
import React from 'react'

type SearchType = {
    openSearch: boolean;
    handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setOpenSearch:  React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({ openSearch, handleSearchSubmit, setOpenSearch }: SearchType) => {
  return (
    <div className={openSearch ? 'search-overlay' : 'hide-search-overlay'}>
        <form className='search-form' onSubmit={handleSearchSubmit}>
            <input type="text" name='search' placeholder='SEARCH OUR STORE' />
            <button>
                <Image width={20} height={20} className='search-icon' src='/header/search.svg' alt="search-icon" />
            </button>
            <Image width={20} height={20} src='/header/close-img.svg' className='search-close' onClick={() => setOpenSearch(false)} alt="close-icon" />
        </form>
    </div>
  );
};

export default Search;