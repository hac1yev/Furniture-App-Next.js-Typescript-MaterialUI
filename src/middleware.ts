import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    let cookie = request.cookies.get('next-auth.session-token');

    if(cookie && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if(!cookie && request.nextUrl.pathname === "/profile") {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}