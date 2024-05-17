"use client";

import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { collectionData } from "@/dummy_data/data";
import './CollectionSlide.css'

const CollectionItems = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
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

    return (
        <Slider {...settings} className="category-slider">
            {collectionData.map((item) => (
                <Grid className='product-item' key={item.id} xs={12} sm={6} md={4} lg={3} padding={1}>
                    <Link href={`/products`}>
                        <Box className="product-item-img">
                            <Image 
                                style={{objectFit: "cover", borderRadius: '10px'}} 
                                sizes="(max-width: 768px) 100vw, 33vw" 
                                src={item.img} 
                                alt={"collection-item"} 
                                priority
                                fill 
                            />
                            <Box component={"div"} className="furniture-slider-blur">
                                <Typography>{item.title}</Typography>
                            </Box>
                        </Box>
                    </Link>
                </Grid>
            ))}
        </Slider>
    );
};

export default CollectionItems;