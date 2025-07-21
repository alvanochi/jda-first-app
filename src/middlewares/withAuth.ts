import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdminPages = ["/admin"]
const authPages = ["/login", "/register"]

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (requireAuth.includes(pathname)) {
      if (!token && !authPages.includes(pathname)) {
        const url = new URL("/login", req.url)
        url.searchParams.set("callbackUrl", encodeURI(req.url))
        return NextResponse.redirect(url)
      }
      if (pathname === "/admin" && token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    if (token) {
      if (authPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    return middleware(req, next)
  }
}