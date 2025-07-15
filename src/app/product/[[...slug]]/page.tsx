import Image from "next/image";
import Link from "next/link";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/product", { cache: "no-store" })
  const data = await res.json()
  return data.data
}

async function getProductById(id: number) {
  const res = await fetch(`http://localhost:3000/api/product?id=${id}`, { cache: "no-store" })
  const data = await res.json()
  return data.data
}

interface ProductPageProps {
  params: { slug?: string[] }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const slug = params.slug

  if (!slug || slug.length === 0) {
    const products = await getProducts()
    return (
      <div className="min-h-screen bg-blue-400 p-8 font-mono">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-7xl font-black text-black mb-4 tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              ART LIST
            </h1>
            <div className="w-full h-6 bg-black transform rotate-1" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transform hover:-rotate-2 hover:scale-105 transition-all duration-200"
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="border-2 border-black bg-blue-400 object-contain mb-4"
                  />
                  <h2 className="text-3xl font-black text-black mb-2 text-center">
                    {product.name}
                  </h2>
                  <p className="text-xl font-bold text-black mb-2">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <span className="bg-black text-blue-400 px-4 py-2 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    VIEW DETAILS
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const id = parseInt(slug[0])
  const product = await getProductById(id)
  const isNotFound = !product || (typeof product === 'object' && Object.keys(product).length === 0)
  if (isNotFound) {
    return (
      <div className="min-h-screen bg-blue-400 flex flex-col items-center justify-center p-8 font-mono">
        <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(255,0,0,1)] max-w-2xl w-full p-12 flex flex-col items-center transform -rotate-2">
          <h1 className="text-6xl font-black text-red-600 mb-6 tracking-tighter text-center">
            NOT FOUND
          </h1>
          <div className="w-full h-4 bg-black mb-8 rotate-1" />
          <p className="text-2xl font-bold text-black text-center mb-8">
            The product you are looking for does not exist.<br />
            Please check the ID or return to the <Link href="/product" className="underline hover:text-blue-400">product list</Link>.
          </p>
          <span className="bg-black text-red-400 px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,0,0,1)] text-lg">
            ERROR 404
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-400 flex flex-col items-center justify-center p-8 font-mono">
      <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full p-8 flex flex-col items-center transform -rotate-2">
        <div className="w-full flex justify-center mb-8">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-blue-400 object-contain"
            priority
          />
        </div>
        <h1 className="text-5xl font-black text-black mb-4 tracking-tighter text-center">
          {product.name}
        </h1>
        <div className="w-full h-2 bg-black mb-6" />
        <p className="text-3xl font-bold text-black mb-2">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
        <p className="text-lg font-bold text-black mb-8 text-center">
          {product.description}
        </p>
        <div className="flex w-full justify-between">
          <span className="bg-black text-blue-400 px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            PIXEL-ART
          </span>
          <span className="bg-blue-400 text-black px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            PRODUCT
          </span>
        </div>
      </div>

      <div className="mt-12 w-full max-w-lg">
        <div className="h-4 bg-black mb-2 rotate-1" />
        <div className="h-4 bg-white -rotate-2" />
      </div>
    </div>
  )
}
