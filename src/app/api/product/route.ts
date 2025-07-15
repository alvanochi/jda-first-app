import { NextRequest, NextResponse } from "next/server";

let products = [
  {
    id: 1,
    name: "Dreamland",
    price: 150000,
    description:
      "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
    image:
      "https://cdn.lospec.com/thumbnails/gallery/attomik/dreamland-default.png",
  },
  {
    id: 2,
    name: "Capybara",
    price: 180000,
    description:
      "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
    image:
      "https://cdn.lospec.com/thumbnails/gallery/redivivusdeer/capybara-default.png",
  },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (id) {
    const detailProduct = products.find((product) => product.id === Number(id))
    if (detailProduct) {
      return NextResponse.json({ status: 200, message: "success", data: detailProduct })
    } else {
      return NextResponse.json({ status: 404, message: "data not found", data: {} })
    }
  }

  return NextResponse.json({ status: 200, message: "success", data: products })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1
  const newProduct = { id: newId, ...body }
  products.push(newProduct)
  return NextResponse.json({ status: 201, message: "created", data: newProduct })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...rest } = body
  const idx = products.findIndex((p) => p.id === Number(id))
  if (idx === -1) {
    return NextResponse.json({ status: 404, message: "not found", data: {} })
  }
  products[idx] = { ...products[idx], ...rest }
  return NextResponse.json({ status: 200, message: "updated", data: products[idx] })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ status: 400, message: "id required", data: {} })
  }
  const idx = products.findIndex((p) => p.id === Number(id))
  if (idx === -1) {
    return NextResponse.json({ status: 404, message: "not found", data: {} })
  }
  const deleted = products.splice(idx, 1)[0]
  return NextResponse.json({ status: 200, message: "deleted", data: deleted })
}
