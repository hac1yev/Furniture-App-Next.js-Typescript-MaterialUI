"use client";

import { loadingSliceActions } from "@/store/loading-slice";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

const Search = ({ openSearch, setOpenSearch }: SearchType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loadingSliceActions.itIsLoading(true));

    const data = new FormData(e.currentTarget);

    const searchText = data.get("search");

    const params = new URLSearchParams(searchParams);

    if (typeof searchText === "string") {
      params.set("q", searchText);
      params.set("page", "1");
    }

    router.push(`/search?${params}`);
    setOpenSearch(false);
  };

  return (
    <div className={openSearch ? "search-overlay" : "hide-search-overlay"}>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input type="text" name="search" placeholder="SEARCH OUR STORE" />
        <button>
          <Image
            width={20}
            height={20}
            className="search-icon"
            src="/header/search.svg"
            alt="search-icon"
          />
        </button>
        <Image
          width={20}
          height={20}
          src="/header/close-img.svg"
          className="search-close"
          onClick={() => setOpenSearch(false)}
          alt="close-icon"
        />
      </form>
    </div>
  );
};

export default Search;
