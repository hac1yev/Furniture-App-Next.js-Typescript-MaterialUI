"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

const SummaryCheckout = () => {
    const myShoppingProducts = useSelector((state: any) => state.shoppingReducer.myShoppingProducts);

    let totalCount = myShoppingProducts?.reduce((total: number, item: MyShoppingProductTypes) => {
        total += item?.count;
        return total;
    }, 0);


    let totalPrice = myShoppingProducts?.reduce((total: number, item: MyShoppingProductTypes) => {
        total += (item?.product?.price * item?.count);
        return total;   
    }, 0);

    const summaryStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        gap: '25px',
        bgcolor: 'secondary.main',
        padding: '45px 25px',
        borderRadius: '10px'
    };

    return (
        <Box sx={{...summaryStyle }}>
            <Typography variant="h4">SUMMARY</Typography>
            <Box component={"div"} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>ITEM COUNT</Typography>
                <Typography sx={{ fontWeight: "700", fontSize: '20px' }}>{totalCount ? totalCount : 0}</Typography>
            </Box>
            <Box component={"div"} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>TOTAL PRICE</Typography>
                <Typography sx={{ fontWeight: "700", fontSize: '20px' }}>{totalPrice ? totalPrice : 0}$</Typography>
            </Box>
            <Button 
                className="checkout-button"
                size="large"
                sx={{ 
                    bgcolor: 'primary.main', 
                    color: '#fff',
                    marginTop: 2, 
                    "&:hover": {
                        bgcolor: 'primary.main', 
                        opacity: 0.8
                    } 
                }}            
            >
                <Link href="/checkout">
                    CHECKOUT
                </Link>
            </Button>
        </Box>
    );
};

export default SummaryCheckout;