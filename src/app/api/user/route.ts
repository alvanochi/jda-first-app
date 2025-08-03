import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (id) {
    const detailUser = await prisma.user.findUnique({
      where: { user_id: Number(id) },
    })

    if (detailUser) {
      return NextResponse.json({ status: 200, message: "success", data: detailUser })
    } else {
      return NextResponse.json({ status: 404, message: "user not found", data: {} })
    }
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json({ status: 200, message: "success", data: users })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (existingUser) {
      return NextResponse.json({
        status: 400,
        message: "Email already exists",
        data: {},
        error: "Email must be unique",
      }, { status: 400 })
    }

    let hashedPassword = body.password
    if (body.password && body.password.trim() !== "") {
      hashedPassword = await hash(body.password, 10)
    }
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: body.role ?? "user",
        level: body.level ?? 1,
        point: body.point ?? 0,
        artCount: body.artCount ?? 0,
      },
    })
    return NextResponse.json({ status: 201, message: "user created", data: newUser })
  } catch (e: any) {
    return NextResponse.json({
      status: 400,
      message: "failed to create user",
      data: {},
      error: e?.message,
    })
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json()

  try {
    if (body.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: body.email,
          user_id: { not: Number(body.user_id ?? body.id) },
        },
      })

      if (existingUser) {
        return NextResponse.json({
          status: 400,
          message: "Email already exists",
          data: {},
          error: "Email must be unique",
        })
      }
    }

    const updateData: any = {
      name: body.name,
      email: body.email,
      role: body.role,
      level: body.level,
      point: body.point,
      artCount: body.artCount,
    }

    if (body.password && body.password.trim() !== "") {
      updateData.password = await hash(body.password, 10)
    }

    const updated = await prisma.user.update({
      where: { user_id: Number(body.user_id ?? body.id) },
      data: updateData,
    })
    return NextResponse.json({ status: 200, message: "user updated", data: updated })
  } catch (e: any) {
    return NextResponse.json({
      status: 404,
      message: "user not found",
      data: {},
      error: e?.message,
    })
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ status: 400, message: "user id required", data: {} })
  }

  try {
    const userArts = await prisma.art.findMany({
      where: { userId: Number(id) },
    })

    if (userArts.length > 0) {
      return NextResponse.json({
        status: 400,
        message: "Cannot delete user with existing artworks",
        data: {},
        error: "User has associated artworks",
      })
    }

    const deleted = await prisma.user.delete({
      where: { user_id: Number(id) },
    })
    return NextResponse.json({ status: 200, message: "user deleted", data: deleted })
  } catch (e: any) {
    return NextResponse.json({
      status: 404,
      message: "user not found",
      data: {},
      error: e?.message,
    })
  }
}
