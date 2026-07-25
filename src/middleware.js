import { NextResponse } from "next/server";

export async function middleware(req) {
  // 1. Read the token directly from the request object cookies
  const token = req.cookies.get("next-auth.session-token");
  const pathname = req.nextUrl.pathname;

  // 2. Safely bypass internal API routes
  if (pathname.includes('api')) {
    return NextResponse.next();
  }

  // 3. Redirect unauthenticated users
  if (!token) {
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.url));
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
