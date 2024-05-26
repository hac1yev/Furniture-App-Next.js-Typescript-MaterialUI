"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useFavorites from "@/hooks/useFavorites";
import "../Home/Products/Products.css";
import { useSelector } from "react-redux";

const SimilarProducts = ({ product, productId }: SimiliarProductTypes) => {
  const [products, setProducts] = useState<ProductListTypes | null>(null);
  const selectedId = useSelector((state: any) => state.favoriteReducer.selectedId);
  const { addFavorites, removeFavorites } = useFavorites();
  const { data: session } = useSession();
  const navigation = useRouter();    

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    slidesToShow: Array.isArray(products) && products?.length < 4 ? products?.length : 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Array.isArray(products) && products?.length < 3 ? products?.length : 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: Array.isArray(products) && products?.length < 2 ? products?.length : 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          navigation: false,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchproducts = async () => {
      const response = await fetch("/api/products");
      const { data } = await response.json();

      let similarproducts = data.filter((item: ProductTypes) => item.furniture === product);   
      let newFilteredproducts = similarproducts.filter((item: ProductTypes) => item._id !== productId)      

      setProducts(newFilteredproducts);
    };
    fetchproducts();
  }, [productId,product]);

  const handleAddFavorites = (id: string) => {
    if (session) {
      addFavorites(id);
    } else {
      navigation.push("/login");
    }
  };

  if (!products) {
    return (
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", marginTop: 8 }}
      >
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h3" sx={{ marginTop: 10, marginBottom: 2, }}>
        SIMILIAR PRODUCTS
      </Typography>
      <Slider {...settings} className="category-slider">
        {Array.isArray(products) &&
          products?.map((item: ProductTypes) => (
            <Grid
              className="product-item"
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={item._id}
              padding={1}
            >
              <Link href={`/products/${item._id}`}>
                <Box className="product-item-img">
                  <Image
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src={item.image}
                    alt={item.furniture}
                    priority
                    fill
                  />
                </Box>
                <Typography sx={{ marginTop: 1 }} variant="subtitle1">
                  {item.title}
                </Typography>
                <Box
                  sx={{ marginTop: 1 }}
                  component="span"
                >{`${item.price}$`}</Box>
              </Link>
              <Box className="heart-box">
                {selectedId?.includes(item._id) ? (
                  <FavoriteIcon onClick={() => removeFavorites(item._id)} />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    onClick={() => handleAddFavorites(item._id)}
                  />
                )}
              </Box>
            </Grid>
          ))}
      </Slider>
      {(Array.isArray(products) && products.length === 0) && (
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>There is no similar product!</Typography>
      )}
    </>
  );
};

export default SimilarProducts;