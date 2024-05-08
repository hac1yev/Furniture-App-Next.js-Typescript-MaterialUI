"use client";

import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../Home/Products/Products.css';
import useFavorites from "@/hooks/useFavorites";

type FurnitureType = {
    _id: string,
    description: string,
    price: number,
    furniture: string,
    image: string
  };
  
  type AllFurnituresType = {
    furnitures: FurnitureType[],
    length: number;
  };

const MyFavoriteProducts = () => {
    const [myFavProducts,setMyFavProducts] = useState<AllFurnituresType | null>(null);
    const { removeFavorites } = useFavorites();
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            try {
                const response = await fetch("/api/profile/favorites");
                const { favorites } = await response.json();

                setMyFavProducts(favorites);
            } catch (error) {
                console.log(error);
                setMyFavProducts(null);
            }
            setIsLoading(false);
        };

        fetchFavoriteProducts();
    }, []);

    if(isLoading) {
        return (
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>Loading...</Typography>
        )
    }

    console.log("isLoading", isLoading);
    console.log("myFavProducts", myFavProducts);
    
    if(!isLoading && myFavProducts?.length === 0) {
        return (
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>There is no favorite Product!!!</Typography>
        )
    }

    return (
        <Grid container className="profile-product-wrapper">
            {Array.isArray(myFavProducts) && myFavProducts.map((item) => (
                <Grid className='profile-product-item' item lg={12} key={item._id} padding={1}>
                    <Link href={`/products/${item._id}`}>
                        <Box className="profile-product-item-img">
                            <Image 
                            style={{objectFit: "cover", borderRadius: '10px'}} 
                            sizes="(max-width: 768px) 100vw, 33vw" 
                            src={item.image} 
                            alt={item.furniture} 
                            priority
                            fill 
                            />
                        </Box>
                        <Box component={"div"} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ marginTop: 1 }} variant='subtitle1'>{item.title}</Typography>
                            <Box sx={{ marginTop: 1 }} component="span">{`${item.price}$`}</Box>
                        </Box>
                    </Link>
                    <Box className="profile-heart-box">
                        <FavoriteIcon onClick={() => removeFavorites(item._id)} /> 
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default MyFavoriteProducts;