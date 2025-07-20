import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";


export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ status: 400, message: "Missing fields" }, { status: 400 })
    }
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ status: 409, message: "Email already registered" }, { status: 409 })
    }

    const hashed = await hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    })
    return NextResponse.json({ status: 201, message: "User created", data: { id: user.user_id, name: user.name, email: user.email } })
  } catch (e) {
    return NextResponse.json({ status: 500, message: "Server error" }, { status: 500 })
  }
}
