import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (id) {
    const detailArt = await prisma.arts.findUnique({
      where: { art_id: Number(id) },
    })
    if (detailArt) {
      return NextResponse.json({ status: 200, message: "success", data: detailArt })
    } else {
      return NextResponse.json({ status: 404, message: "data not found", data: {} })
    }
  }

  const arts = await prisma.arts.findMany()
  return NextResponse.json({ status: 200, message: "success", data: arts })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    const newArt = await prisma.arts.create({
      data: {
        name: body.name,
        price: Number(body.price),
        description: body.description ?? null,
        image: body.image,
        art_id: body.art_id ?? undefined,
      },
    })
    return NextResponse.json({ status: 201, message: "created", data: newArt })
  } catch (e: any) {
    return NextResponse.json({ status: 400, message: "failed to create", data: {}, error: e?.message })
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  try {
    const updated = await prisma.arts.update({
      where: { art_id: Number(body.art_id ?? body.id) },
      data: {
        name: body.name,
        price: Number(body.price),
        description: body.description ?? null,
        image: body.image,
      },
    })
    return NextResponse.json({ status: 200, message: "updated", data: updated })
  } catch (e: any) {
    return NextResponse.json({ status: 404, message: "not found", data: {}, error: e?.message })
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ status: 400, message: "id required", data: {} })
  }
  try {
    const deleted = await prisma.arts.delete({
      where: { art_id: Number(id) },
    })
    return NextResponse.json({ status: 200, message: "deleted", data: deleted })
  } catch (e: any) {
    return NextResponse.json({ status: 404, message: "not found", data: {}, error: e?.message })
  }
}
