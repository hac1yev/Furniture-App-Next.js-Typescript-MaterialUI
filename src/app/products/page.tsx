"use client";

import { useEffect, useState } from 'react';
import '../../components/Home/Products/Products.css';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

type FurnitureType = {
    _id: string,
    description: string,
    title: string,
    price: number,
    furniture: string,
    image: string
  };
  
  type AllFurnituresType = {
    furnitures: FurnitureType[]
  };

  type HookTypes = {
    addFavorites: (id: string) => void;
    removeFavorites: (id: string) => void;
  };

const ProductsPage = ({ addFavorites, removeFavorites }: HookTypes) => {
    const selectedId = useSelector((state: any) => state.favoriteReducer.selectedId);
    const [furnitures,setFurnitures] = useState<AllFurnituresType | null>(null);
    const { data: session } = useSession();
    const navigation = useRouter();

    useEffect(() => {
        const fetchFurnitures = async () => {
          const response = await fetch("/api/products");
          const { data } = await response.json();
          setFurnitures(data);          
        }; 
        fetchFurnitures();
    }, []);

    const handleAddFavorites = (id: string) => {
      if(session) {
        addFavorites(id);
      }else{
        navigation.push("/login");
      }
    };

    if(!furnitures) {
        return <Typography variant="subtitle1" sx={{ textAlign: 'center', marginTop: 8 }}>Loading...</Typography>;
    };

    return (
      <Container 
        component="div"
        maxWidth={false}
        sx={{ mt: 4, width: "100%" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3} padding={1}>
          <Box className="product-title-item">
            <Typography variant="h3" className={"products-header"}>PRODUCTS</Typography>
          </Box>
        </Grid>
        <Grid container>
          {Array.isArray(furnitures) && furnitures?.map((item: FurnitureType) => (
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
      </Container>
    );
};

export default ProductsPage;