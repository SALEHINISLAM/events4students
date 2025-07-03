import { NextResponse } from "next/server";

const protectedRoutes = ['/admin','/admin/delete','admin/edit/[id]','/admin/edit'];

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.includes('/api/')) {
    return NextResponse.next();
  }
  // Retrieve cookies from the request, this works in middleware
  const token = request.cookies.get('__Secure-next-auth.session-token')?.value || request.cookies.get("next-auth.session-token");
  
  // If there's no token and the user is trying to access a protected route, redirect to login
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  // Allow the request to proceed if the user is authenticated or accessing non-protected routes
  return NextResponse.next();
}