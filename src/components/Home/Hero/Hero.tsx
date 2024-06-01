"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './Hero.css';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Link from 'next/link';

const Hero = () => {
    const [imgChange,setImgChange] = useState(false);        

    useEffect(() => {
        if(window.innerWidth <= 992) {
            setImgChange(true);
        }else{
            setImgChange(false)
        }
        window.addEventListener('resize', () => {
            if(window.innerWidth <= 992) {
                setImgChange(true);
            }else{
                setImgChange(false)
            }
        });
    }, [imgChange]);

    return (
        <Container maxWidth={false} sx={{ width: '100%', my: 8 }} className='hero-section'>
            <Grid container sx={{ height: '100%' }} className="row mx-0">
                <Grid item xs={12} lg={4} className="hero-content-col">
                    <Box className='hero-content'>
                        <Typography variant="h1">THE FURNITURE THAT DEFINES YOU</Typography>
                        <Typography variant="subtitle2">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                            praesentium voluptatum
                        </Typography>
                        <Link href="/products">
                            <Button>
                                <LocalGroceryStoreIcon />
                                SHOP NOW
                            </Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={8} className="hero-img-col">
                    <Box sx={{ position: 'relative', height: '100%' }}>
                        <Image fill src={!imgChange ? "/hero/blur_hero.png" : "/hero/no_blur_hero.svg"} alt="blur_hero" />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Hero;