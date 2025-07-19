import Image from "next/image";
import Link from "next/link";
import { IArt } from "@/types/IArt";
import { prisma } from "@/lib/prisma";

async function getArts() {
  const res = await prisma.arts.findMany()
  return res
}

export default async function ArtPage() {
  const arts = await getArts()
  
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
            {arts.map((art: IArt) => (
              <Link
                key={art.art_id}
                href={`/art/${art.art_id}`}
                className="block bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transform hover:-rotate-2 hover:scale-105 transition-all duration-200"
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={art.image}
                    alt={art.name}
                    width={300}
                    height={300}
                    className="border-2 border-black bg-blue-400 object-contain mb-4"
                  />
                  <h2 className="text-3xl font-black text-black mb-2 text-center">
                    {art.name}
                  </h2>
                  <p className="text-xl font-bold text-black mb-2">
                    Rp {art.price.toLocaleString("id-ID")}
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
