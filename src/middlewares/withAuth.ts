import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const onlyAdminPages = ["/admin"]

export default function withAuth(middleware: Function, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (requireAuth.includes(pathname)) {
      if (!token) {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url))
      }

      const role = token.role || "user"

      if (onlyAdminPages.includes(pathname) && role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    return middleware(req, next)
  }
}
