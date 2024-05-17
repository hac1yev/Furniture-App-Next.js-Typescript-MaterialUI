"use client"

import About from "@/components/Home/About/About";
import CollectionSlide from "@/components/Home/CollectionSlide/CollectionSlide";
import Discount from "@/components/Home/Discount/Discount";
import Hero from "@/components/Home/Hero/Hero";
import Popular from "@/components/Home/Popular/Popular";
import Products from "@/components/Home/Products/Products";
import useFavorites from "@/hooks/useFavorites";

export default function Home() {
  const { addFavorites,removeFavorites } = useFavorites();
  
  return (
    <>  
      <Hero />
      <CollectionSlide />
      <About />
      <Discount />
      <Products addFavorites={addFavorites} removeFavorites={removeFavorites} />
      <Popular addFavorites={addFavorites} removeFavorites={removeFavorites} />
    </>
  );
};