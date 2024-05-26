"use client";

import Image from 'next/image';
import Link from 'next/link';
import '../Home/Products/Products.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import useFavorites from '@/hooks/useFavorites';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SearchResult = ({ products }: ProductListTypes) => {
    const selectedId = useSelector((state: any) => state.favoriteReducer.selectedId);
    const { addFavorites, removeFavorites } = useFavorites();
    const session = useSession();
    const navigation = useRouter();

    const handleAddFavorites = (id: string) => {
        if(session) {
          addFavorites(id);
        }else{
          navigation.push("/login");
        }
      };

    return (
        <Grid container>
          {Array.isArray(products) && products?.map((item: ProductTypes) => (
            <Grid className='product-item' item xs={12} sm={6} md={4} lg={3} key={item._id} padding={1}>
              <Link href={`/products/${item._id}`}>
                <Box className="product-item-img">
                  <Image 
                    style={{objectFit: "cover", borderRadius: '10px'}} 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                    src={item.image} 
                    alt={item.furniture} 
                    priority
                    fill 
                  />
                </Box>
                <Typography sx={{ marginTop: 1 }} variant='subtitle1'>{item.title}</Typography>
                <Box sx={{ marginTop: 1 }} component="span">{`${item.price}$`}</Box>
              </Link>
                <Box className="heart-box">
                  {selectedId?.includes(item._id)
                    ? <FavoriteIcon onClick={() => removeFavorites(item._id)} /> 
                    : <FavoriteBorderOutlinedIcon onClick={() => handleAddFavorites(item._id)} />
                  }
                </Box>
            </Grid>
          ))}
        </Grid>
    );
};

export default SearchResult;