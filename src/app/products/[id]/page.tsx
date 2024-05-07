"use client";

import PageNavigations from "@/components/PageNavigations/PageNavigations";
import SimilarProducts from "@/components/Products/SimilarProducts";
import { Box, Button, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navigation_data } from "@/dummy_data/data";

type ParamsType = {
  params: {
    id: string
  }
};

type ProductDataType = {
  _id: string;
  description: string;
  title: string;
  image: string;
  price: number;
  furniture: string;
  f_collection: string;
};

const ProductDetail = ({ params }: ParamsType) => {
  const matches = useMediaQuery('(max-width:899.5px)');
  const [count,setCount] = useState(1);

  const { id } = params;  
  const [productData,setProductData] = useState<ProductDataType | null>(null);


  useEffect(() => {
    (async function getProductDetail() {
      try {
        const response = await fetch(`/api/products/${id}`);

        const { data } = await response.json();

        setProductData(data);
        console.log("ilkin");
        
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  
  const handleIncrease = () => {      
    setCount(prev => prev + 1);
  };

  const handleDecrease = () => {
    if(count > 1) {
      setCount(prev => prev - 1);
    }
  };

  const addToCart = async () => {
    try {
      const response = await fetch(`/api/products/${id}/add-to-cart`, {
        method: 'POST',
        body: JSON.stringify({
          count
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
      <Container
          component="div"
          maxWidth={false}
          sx={{ mt: 8, width: "100%" }}
      >
        {productData && <>
          <PageNavigations arr={navigation_data} />
          <Box component={"div"}>
            <Grid container sx={{ marginTop: 6 }}>
              <Grid item xs={12} md={6} sx={{ paddingY: 2 }}>
                <Box sx={{ width: '100%', height: '68vh', position: 'relative' }}>
                  <Image 
                    src={productData.image || ""} 
                    alt={productData.title || ""}  
                    priority
                    sizes="(max-width: 768px) 100vw, 33vw"
                    fill 
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ paddingX: matches ? 0 : 6, paddingY: 2 }}>
                <Box component={"div"}>
                  <Typography variant="h3">{productData.title}</Typography>
                  <Typography variant="subtitle2" sx={{ marginY: 5 }}>{productData.description}</Typography>
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    <Button onClick={handleIncrease} sx={{ bgcolor: 'info.main', borderRadius: '10px', fontSize: '20px' }}>+</Button>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: "center", 
                        width: '61px', 
                        height: '45px',
                        color: '#B8926A', 
                        border: '1px solid #B8926A', 
                        borderRadius: '10px', 
                        fontSize: '20px' 
                      }}
                    >
                      {count}
                    </Box>
                    <Button disabled={count === 1} onClick={handleDecrease} sx={{ bgcolor: 'info.main', borderRadius: '10px', fontSize: '20px' }}>-</Button>
                  </Box>
                  <Typography sx={{ marginY: 6 }} variant="h2">{productData.price * count}$</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <Button size="large" 
                    sx={{ 
                      color: '#fff', 
                      width: '50%', 
                      bgcolor: 'primary.main', 
                      borderRadius: '10px', 
                      fontSize: '16px',
                      '&:hover': {
                        bgcolor: 'rgb(184, 146, 106, 0.9)'
                      }
                    }}
                  >
                    BUY NOW
                  </Button>
                  <Button onClick={addToCart} variant="outlined" size="large" sx={{ width: '50%', borderRadius: '10px', fontSize: '16px' }}>
                    ADD TO CART
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <SimilarProducts furniture={productData.furniture} productId={id}  />
        </>}
      </Container> 
  );
};

export default ProductDetail;