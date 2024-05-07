"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import './Header.css';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Search from './Search';

const Header = () => {    
    const {data: session} = useSession();
    const [openMenu, setOpenMenu] = useState(false);
    const [openSearch,setOpenSearch] = useState(false);

    const searchParams = useSearchParams(); 
    const router = useRouter();

    const handleClick = () => {
        setOpenMenu(prev => !prev)
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const searchText = data.get("search");

        const params = new URLSearchParams(searchParams);  

        if(typeof searchText === 'string') {
            params.set("q", searchText);
            params.set("page", "1");
        }

        router.push(`/search?${params}`);
        setOpenSearch(false);
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
                        <Link href={"/shopping-cart"} className='desktop-shopping'>
                            <Badge badgeContent={4} color={"primary"} >
                                <ShoppingCartOutlinedIcon color="action" />
                            </Badge>
                        </Link>
                        {!session && <Link href='/login'>
                            <Image width={20} height={20} className='user-img' src='/header/user-icon.svg' alt="user" />
                        </Link>}
                        {session && <Link href='/profile'>
                            <Image width={20} height={20} className='user-img' src='/header/user-icon.svg' alt="user" />
                        </Link>}
                    </div>
                    <div className="burger">
                        <Link href={"/shopping-cart"}>
                            <Badge badgeContent={4} color={"primary"} >
                                <ShoppingCartOutlinedIcon color="action" />
                            </Badge>
                        </Link>
                        <Image width={20} height={20} className='mobile-search-icon' src='/header/search.svg' alt="search-icon" />
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
                                Product
                            </Link>
                        </li>
                        <li>
                            <Link href="/collections">
                                Collections
                            </Link>
                        </li>
                        <li>
                            <Link href="/sale">
                                Sale
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
                            <Badge badgeContent={4} color="secondary">
                                <ShoppingCartOutlinedIcon color="action" />
                            </Badge>
                            <Link href="/login">
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
                                Product
                            </Link>
                        </li>
                        <li>
                            <Link href="/collections" onClick={handleClick}>
                                Collections
                            </Link>
                        </li>
                        <li>
                            <Link href="/sale" onClick={handleClick}>
                                Sale
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
                <Search openSearch={openSearch} handleSearchSubmit={handleSearchSubmit} setOpenSearch={setOpenSearch} />
            </Suspense>
        </> 
  )
}

export default Header