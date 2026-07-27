import { NextResponse } from "next/server";

export async function middleware(req) {
  // 1. Check for BOTH local (HTTP) and secure (HTTPS) cookies
  const token = 
    req.cookies.get("next-auth.session-token")?.value || 
    req.cookies.get("__secure-next-auth.session-token")?.value;
    
  const pathname = req.nextUrl.pathname;
    console.log(token);
    console.log(pathname);

  // 2. Safely bypass internal API routes
  if (pathname.includes('api')) {
    return NextResponse.next();
  }

  // 3. Redirect unauthenticated users
  if (!token) {
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathname)}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-bookings/:path*",
    "/checkout/:path*",
    "/services/:path*",
  ],
};