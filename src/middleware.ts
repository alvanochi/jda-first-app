import withAuth from "@/middlewares/withAuth";
import { NextResponse } from "next/server";

export function mainMiddleware() {
    return NextResponse.next()
}

export default withAuth(mainMiddleware, ["/my-art", "/admin", "/profile", "/create-art"])