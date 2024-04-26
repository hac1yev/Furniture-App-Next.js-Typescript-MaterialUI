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

type FurnitureType = {
  _id: string;
  description: string;
  title: string;
  price: number;
  furniture: string;
  image: string;
};

type AllFurnituresType = {
  furnitures: FurnitureType[];
};

type PropsType = {
    furniture: string;
    productId: string
};  

const SimilarProducts = ({ furniture, productId }: PropsType) => {
  const [furnitures, setFurnitures] = useState<AllFurnituresType | null>(null);
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
    slidesToShow: Array.isArray(furnitures) && furnitures?.length < 4 ? furnitures?.length : 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Array.isArray(furnitures) && furnitures?.length < 3 ? furnitures?.length : 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Array.isArray(furnitures) && furnitures?.length < 2 ? furnitures?.length : 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          navigation: false,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchFurnitures = async () => {
      const response = await fetch("/api/products");
      const { data } = await response.json();

      let similarFurnitures = data.filter((item: FurnitureType) => item.furniture === furniture);   
      let newFilteredFurnitures = similarFurnitures.filter((item: FurnitureType) => item._id !== productId)      

      setFurnitures(newFilteredFurnitures);
    };
    fetchFurnitures();
  }, [productId,furniture]);

  const handleAddFavorites = (id: string) => {
    if (session) {
      addFavorites(id);
    } else {
      navigation.push("/login");
    }
  };

  if (!furnitures) {
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
        {Array.isArray(furnitures) &&
          furnitures?.map((item: FurnitureType) => (
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
    </>
  );
};

export default SimilarProducts;
