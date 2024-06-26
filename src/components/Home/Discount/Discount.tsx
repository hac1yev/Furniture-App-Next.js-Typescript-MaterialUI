"use client";

import { Box, Button, Typography } from '@mui/material';
import './Discount.css';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Link from 'next/link';

const Discount = () => {
  return (
    <Box className="discount-section">
        <Typography variant='h1'>20% DISCOUNT</Typography>
        <Typography>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est 
            eligendi optio cumque nihil impedit quo 
        </Typography>
        <Link href="/products">
            <Button variant='contained' 
                sx={{
                    bgcolor: 'primary.main',
                    '&:hover': {
                        background: 'rgba(184, 146, 106, 0.8)',
                    }
                }}
            >
                <LocalGroceryStoreIcon />
                SHOP NOW
            </Button>
        </Link>
    </Box>
  )
}

export default Discount