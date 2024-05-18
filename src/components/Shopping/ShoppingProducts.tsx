"use client"

import { Box, Button, Typography } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from "next/image";
import './Shopping.css'
import { useDispatch, useSelector } from "react-redux";
import { shoppingSliceActions } from "@/store/shopping-slice";
import Swal from "sweetalert2";

type ProductType = {
    _id: string;
    title: string;
    price: number;
    image: string;
};

type MyShoppingProductsType = {
    _id: string;
    product: ProductType;
    count: number;
};

const ShoppingProducts = () => {
    const myShoppingProducts = useSelector((state: any) => state.shoppingReducer.myShoppingProducts);
    const isLoading = useSelector((state: any) => state.shoppingReducer.isLoading);
    
    const dispatch = useDispatch();

    const handleRemoveFromShopList = async (id: string) => {
        try {
            
            await fetch(`/api/shopping/${id}`, {
                method: 'DELETE',
            });

            dispatch(shoppingSliceActions.deleteShoppingProduct(id));  
            Swal.fire(
                `${'Product removed from the cart!'}`,
                '',
                'success'
            );      
        } catch (error) {
            console.log(error);
        }
    };

    const handleIncrease = async (id: string) => {      
        dispatch(shoppingSliceActions.increaseCount(id));

        await fetch("/api/shopping", {
            method: 'PUT',
            body: JSON.stringify({ id, count_type: 'increase' }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };    
    
    const handleDecrease = async (id: string) => {
        const findedIndex = myShoppingProducts.findIndex((item: MyShoppingProductsType) => item.product._id === id);

        if(findedIndex !== -1) {
            if(myShoppingProducts[findedIndex].count > 1) {            
                dispatch(shoppingSliceActions.decreaseCount(id));

                await fetch("/api/shopping", {
                    method: 'PUT',
                    body: JSON.stringify({ id, count_type: 'decrease' }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }
    };  

    if(myShoppingProducts?.length === 0 && isLoading) {
        return (
            <Typography variant="subtitle1" sx={{ textAlign: 'center', marginY: 4 }}>Loading...</Typography>
        );
    }
    

    return (
        <Box component={"div"} className="shopping-wrap">
            {(Array.isArray(myShoppingProducts) && myShoppingProducts.length > 0) ? myShoppingProducts.map((item) => (
                <Box component={"div"} className="shopping-item" key={item.product._id}>
                    <Box component={"div"} className="shopping-img-wrap">
                        <CloseOutlinedIcon sx={{ cursor: 'pointer' }} className="shop-close-icon" onClick={handleRemoveFromShopList.bind(null, item.product._id)} />
                        <Box className="shopping-img" sx={{ position: 'relative' }}>
                            <Image 
                                fill 
                                priority
                                sizes="(min-width: 808px) 50vw, 100vw" 
                                src={item.product.image} 
                                alt={item.product.title} 
                            />
                        </Box>
                    </Box>
                    <Box component={"div"}>
                        <Typography variant="subtitle1">{item.product.title}</Typography>
                    </Box>
                    <Box component={"div"}>
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                            <Button onClick={handleIncrease.bind(null, item.product._id)} sx={{ bgcolor: 'info.main', borderRadius: '10px', fontSize: '20px' }}>+</Button>
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
                            {item.count}
                            </Box>
                            <Button disabled={item.count === 1} onClick={handleDecrease.bind(null, item.product._id)} sx={{ bgcolor: 'info.main', borderRadius: '10px', fontSize: '20px' }}>-</Button>
                        </Box>
                    </Box>
                    <Box component={"div"}>
                        <Typography sx={{ fontSize: '24px', lineHeigth: '32px', fontWeight: '700' }}>{item.product.price * item.count}$</Typography>
                    </Box>
                </Box>
            )): <Typography variant="subtitle1" sx={{ textAlign: 'center', marginY: 4 }}>There is No product!!!</Typography>}
        </Box>
    );
};

export default ShoppingProducts;