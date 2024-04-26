"use client"

import Popular from "@/components/Home/Popular/Popular";
import Products from "@/components/Home/Products/Products";
import useFavorites from "@/hooks/useFavorites";

export default function Home() {
  const { addFavorites,removeFavorites } = useFavorites();
  
  return (
    <>  
      <Products addFavorites={addFavorites} removeFavorites={removeFavorites} />
      <Popular addFavorites={addFavorites} removeFavorites={removeFavorites} />
    </>
  );
}
