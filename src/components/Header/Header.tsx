"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import './Header.css';
import { useSession } from 'next-auth/react';
import { Badge, Box, IconButton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingSliceActions } from '@/store/shopping-slice';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Header = () => {    
    const {data: session} = useSession();
    const [openMenu, setOpenMenu] = useState(false);
    const [openSearch,setOpenSearch] = useState(false);
    const myShoppingProducts = useSelector((state: any) => state.shoppingReducer.myShoppingProducts);    
    const dispatch = useDispatch();    

    useEffect(() => {
        if(session) {
            (async function() {
                try {
                    const response = await fetch("/api/shopping");
    
                    const {data} = await response.json();
    
                    dispatch(shoppingSliceActions.getAllShoppingProducts({ products: data?.products, isLoading: false  }));                    
                } catch (error) {
                    console.log(error);
                    
                }
            })()
        }
    }, [dispatch, session]);

    const handleClick = () => {
        setOpenMenu(prev => !prev)
    };

    return (
        <>
            <header>
                <div className='header-top'>
                    <div className='header-left'>
                        {/* <div className='lang'>Az</div> */}
                        <IconButton onClick={() => setOpenSearch(true)}>
                            <SearchOutlinedIcon className='search-icon' />
                        </IconButton>
                    </div>
                    <div className="logo"><Link href="/"><strong>HomeDecor</strong></Link></div>
                    <div className='header-right'>
                        <Link href={'/shopping-cart'} className='desktop-shopping'>
                            <IconButton>
                                <Badge badgeContent={myShoppingProducts?.length} color={"primary"} >
                                    <ShoppingCartOutlinedIcon color="action" className='shopping-img' />
                                </Badge>
                            </IconButton>
                        </Link>
                        <Link href={!session ? '/login' : '/profile'} style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton>
                                <Person2OutlinedIcon className='user-img' />
                            </IconButton>
                        </Link>
                    </div>
                    <Box component={"div"} className="burger">
                        <IconButton onClick={() => setOpenSearch(true)}>
                            <SearchOutlinedIcon width={20} height={20} className='mobile-search-icon' />
                        </IconButton>
                        <IconButton onClick={handleClick}>
                            <MenuOutlinedIcon width={20} height={20} />
                        </IconButton>
                    </Box>
                </div>
                <nav className="navbar">
                    <ul className="links">
                        <li>
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/products">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/collections">
                                Collections
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                <nav className={openMenu ? "mobile-menu" : "mobile-menu deactive-mobile-menu"} id='mobile_menu'>
                    <div className='header-top'>
                        <div className='header-mobile-left'>
                        <Link href={'/shopping-cart'} onClick={handleClick}>
                            <Badge badgeContent={myShoppingProducts?.length} color={"primary"} >
                                <ShoppingCartOutlinedIcon color="action" />
                            </Badge>
                        </Link>
                        <Link onClick={handleClick} href={!session ? '/login' : '/profile'} style={{ display: 'flex', alignItems: 'center' }}>
                            <Image width={20} height={20} src='/header/user-icon.svg' alt="user-icon" />
                        </Link>
                        </div>
                        <div className="mobile-close">
                            <Image width={20} height={20} onClick={handleClick} src='/header/close-img.svg' alt="close-icon" />
                        </div>
                    </div>
                    <ul className="links">
                        <li>
                            <Link href="/" onClick={handleClick}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" onClick={handleClick}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/products" onClick={handleClick}>
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/collections" onClick={handleClick}>
                                Collections
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" onClick={handleClick}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Suspense>
                <Search openSearch={openSearch} setOpenSearch={setOpenSearch} />
            </Suspense>
        </> 
  )
}

export default Header