"use client";

import { shoppingSliceActions } from "@/store/shopping-slice";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

type ProductType = {
    _id: string;
    title: string;
    price: number;
    image: string;
};

type MyShoppingProductsType = {
    _id: number;
    product: ProductType;
    count: number;
};

const SummaryCheckout = () => {
    const myShoppingProducts = useSelector((state: any) => state.shoppingReducer.myShoppingProducts);
    const dispatch = useDispatch();

    let totalCount = myShoppingProducts?.reduce((total: number, item: MyShoppingProductsType) => {
        total += item?.count;
        return total;
    }, 0);


    let totalPrice = myShoppingProducts?.reduce((total: number, item: MyShoppingProductsType) => {
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
                <Typography sx={{ fontWeight: "700", fontSize: '20px' }}>{totalCount}</Typography>
            </Box>
            <Box component={"div"} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>TOTAL PRICE</Typography>
                <Typography sx={{ fontWeight: "700", fontSize: '20px' }}>{totalPrice}$</Typography>
            </Box>
            <Button 
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
                onClick={() => dispatch(shoppingSliceActions.getOneItemPrice(0))}
            >
                <Link href="/checkout">
                    CHECKOUT
                </Link>
            </Button>
        </Box>
    );
};

export default SummaryCheckout;