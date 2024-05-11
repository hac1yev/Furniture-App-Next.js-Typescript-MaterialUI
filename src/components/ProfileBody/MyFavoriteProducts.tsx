"use client";

import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../Home/Products/Products.css';
import useFavorites from "@/hooks/useFavorites";
import { useDispatch, useSelector } from "react-redux";
import { favoriteSliceAction } from "@/store/favorite-slice";

const MyFavoriteProducts = () => {
    const myFavProducts = useSelector((state: any) => state.favoriteReducer.allFavorites);
    const { removeFavorites } = useFavorites();
    const [isLoading,setIsLoading] = useState(true);
    const dispatch = useDispatch();    

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            try {
                const response = await fetch("/api/profile/favorites");
                const { favorites } = await response.json();

                dispatch(favoriteSliceAction.getAllFavorites(favorites));
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        fetchFavoriteProducts();
    }, [dispatch]);

    if(isLoading) {
        return (
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>Loading...</Typography>
        )
    }
    
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