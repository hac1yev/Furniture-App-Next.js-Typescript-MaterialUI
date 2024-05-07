"use client"

import { Box, Button, Typography } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from "next/image";
import { useEffect, useState } from "react";
import './Shopping.css'

const ShoppingProducts = () => {
    const [count,setCount] = useState(1);

    useEffect(() => {
        (async function() {
            try {
                const response = await fetch("/api/shopping");

                const data = await response.json();

                console.log(data);
                
            } catch (error) {
                console.log(error);
                
            }
        })()
    }, []);

    const arr = [
        {
            id: 'c1',
            img: '/collection/office.png',
            title: 'Grayson Premium Grey Wash Nest of Tables',
            count: 1,
            price: 140
        },
        {
            id: 'c2',
            img: '/collection/office.png',
            title: 'Grayson Premium Grey Wash Nest of Tables',
            count: 1,
            price: 140
        },
        {
            id: 'c3',
            img: '/collection/office.png',
            title: 'Grayson Premium Grey Wash Nest of Tables',
            count: 1,
            price: 140
        },
    ]

    const handleIncrease = () => {      
        setCount(prev => prev + 1);
      };
    
      const handleDecrease = () => {
        if(count > 1) {
          setCount(prev => prev - 1);
        }
      };

    return (
        <Box component={"div"} className="shopping-wrap">
            {arr.map((item) => (
                <Box component={"div"} className="shopping-item" key={item.id}>
                    <Box component={"div"} className="shopping-img-wrap">
                        <CloseOutlinedIcon className="shop-close-icon" />
                        <Box className="shopping-img" sx={{ position: 'relative' }}>
                            <Image fill src={item.img} alt={item.title} />
                        </Box>
                    </Box>
                    <Box component={"div"}>
                        <Typography>{item.title}</Typography>
                    </Box>
                    <Box component={"div"}>
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
                    </Box>
                    <Box component={"div"}>
                        <Typography>{item.price}$</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ShoppingProducts;