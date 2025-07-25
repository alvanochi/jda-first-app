import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdminPages = ["/admin"]

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname
    const isLogin = req.cookies.get("isLogin")?.value === "true"
    const role = req.cookies.get("role")?.value || "user"

    if (requireAuth.includes(pathname)) {
      if (isLogin) {
        if(role !== "admin" && onlyAdminPages.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url))
        }
      } else {
        return NextResponse.redirect(new URL("/login", req.url))
      }
      
    }

    return middleware(req, next)
  }
}