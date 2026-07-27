import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // 1. Safely bypass internal API routes
  if (pathname.includes("api")) {
    return NextResponse.next();
  }

  // 2. Use NextAuth's built-in helper to check for a valid session token
  // NEXTAUTH_SECRET must be set in your production environment variables (e.g., Vercel)
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  });

  // 3. Redirect unauthenticated users
  if (!token) {
    const loginUrl = new URL(
      `/login?redirect=${encodeURIComponent(pathname)}`,
      req.url
    );
    return NextResponse.redirect(loginUrl);
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