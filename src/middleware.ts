import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token') || request.cookies.get('__Host-next-auth.session-token');

    if (sessionCookie && (
        request.nextUrl.pathname === "/login" || 
        request.nextUrl.pathname === "/register" || 
        request.nextUrl.pathname === "/verify-email" || 
        request.nextUrl.pathname === "/change-password" || 
        request.nextUrl.pathname === "/forget-password" ||
        request.nextUrl.pathname === "/verification-code" 
    )) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    
    if (!sessionCookie && request.nextUrl.pathname === "/profile") {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}