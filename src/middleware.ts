import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token') || request.cookies.get('__Host-next-auth.session-token');

    const protectedRoutes = ['/profile', '/shopping-cart', '/checkout'];

    if(!sessionCookie && protectedRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if(sessionCookie && [
        '/login',
        '/register',
        '/verify-email',
        '/change-password',
        '/forget-password',
        '/verification-code'
    ].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if(request.nextUrl.pathname === '/admin') {
        return NextResponse.redirect(new URL("https://homedecor-admin-panel.vercel.app", request.url));
    }
}

export const config = {
    matcher: [
        '/login',
        '/register',
        '/verify-email',
        '/change-password',
        '/forget-password',
        '/verification-code',
        '/profile', 
        '/shopping-cart',
        '/checkout',
        '/admin'
    ],
}
