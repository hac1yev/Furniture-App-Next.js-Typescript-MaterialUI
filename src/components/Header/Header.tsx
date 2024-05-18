"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import './Header.css';
import { useSession } from 'next-auth/react';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingSliceActions } from '@/store/shopping-slice';

const Header = () => {    
    const {data: session} = useSession();
    const [openMenu, setOpenMenu] = useState(false);
    const [openSearch,setOpenSearch] = useState(false);
    const myShoppingProducts = useSelector((state: any) => state.shoppingReducer.myShoppingProducts);    
    const dispatch = useDispatch();    

    useEffect(() => {
        (async function() {
            try {
                const response = await fetch("/api/shopping");

                const {data} = await response.json();

                dispatch(shoppingSliceActions.getAllShoppingProducts({ products: data?.products, isLoading: false  }));
                
            } catch (error) {
                console.log(error);
                
            }
        })()
    }, [dispatch]);

    const handleClick = () => {
        setOpenMenu(prev => !prev)
    };

    return (
        <>
            <header>
                <div className='header-top'>
                    <div className='header-left'>
                        <div className='lang'>Az</div>
                        <Image width={20} height={20} className='search-icon' onClick={() => setOpenSearch(true)} src='/header/search.svg' alt="search-icon" />
                    </div>
                    <div className="logo"><Link href="/"><strong>HomeDecor</strong></Link></div>
                    <div className='header-right'>
                        <Link href={!session ? '/login' : '/shopping-cart'} className='desktop-shopping'>
                            <Badge badgeContent={myShoppingProducts?.length} color={"primary"} >
                                <ShoppingCartOutlinedIcon color="action" />
                            </Badge>
                        </Link>
                        <Link href={!session ? '/login' : '/profile'}>
                            <Image width={20} height={20} className='user-img' src='/header/user-icon.svg' alt="user" />
                        </Link>
                    </div>
                    <div className="burger">
                        <Link href={!session ? '/login' : '/shopping-cart'}>
                            <Badge badgeContent={myShoppingProducts?.length} color={"primary"} >
                                <ShoppingCartOutlinedIcon color="action" />
                            </Badge>
                        </Link>
                        <Image onClick={() => setOpenSearch(true)} width={20} height={20} className='mobile-search-icon' src='/header/search.svg' alt="search-icon" />
                        <Image width={20} height={20} onClick={handleClick} src='/header/hamburger.svg' alt="hamburger-icon" />
                    </div>
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
                        <Link href={!session ? '/login' : '/shopping-cart'} onClick={handleClick}>
                            <Badge badgeContent={myShoppingProducts?.length} color={"primary"} >
                                <ShoppingCartOutlinedIcon color="action" />
                            </Badge>
                        </Link>
                        <Link onClick={handleClick} href={!session ? '/login' : '/profile'}>
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
            <Suspense fallback={<div>Loading...</div>}>
                <Search openSearch={openSearch} setOpenSearch={setOpenSearch} />
            </Suspense>
        </> 
  )
}

export default Header