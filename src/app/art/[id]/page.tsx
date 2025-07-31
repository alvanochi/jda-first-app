import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

async function getArtById(id: number) {
  const res = await prisma.art.findUnique({
  where: { art_id: id },
  include: {
    user: {
      select: {
        name: true,
      }
    }
  }
  });
  return res
}

export default async function DetailArt({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const art = await getArtById(parseInt(id))


    if(!art) {
        return (
            <div className="min-h-screen bg-blue-400 flex flex-col items-center justify-center p-8 font-mono">
              <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(255,0,0,1)] max-w-2xl w-full p-12 flex flex-col items-center transform -rotate-2">
                <h1 className="text-6xl font-black text-red-600 mb-6 tracking-tighter text-center">
                  NOT FOUND
                </h1>
                <div className="w-full h-4 bg-black mb-8 rotate-1" />
                <p className="text-2xl font-bold text-black text-center mb-8">
                  The art you are looking for does not exist.<br />
                  Please check the ID or return to the <Link href="/art" className="underline hover:text-blue-400">art list</Link>.
                </p>
                <span className="bg-black text-red-400 px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,0,0,1)] text-lg">
                  ERROR 404
                </span>
              </div>
            </div>
        )
    }
    
    
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 font-mono">
      <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full p-8 flex flex-col items-center transform -rotate-2">
        <div className="w-full flex justify-center mb-8">
          <Image
            src={art.image}
            alt={art.name}
            width={400}
            height={400}
            className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-blue-400 object-contain"
            priority
          />
        </div>
        <h1 className="text-5xl font-black text-black mb-4 tracking-tighter text-center">
          {art.name}
        </h1>
        <div className="w-full h-2 bg-black mb-6" />
        <p className="text-lg font-bold text-black mb-8 text-center">
          {art.description}
        </p>
        <div className="flex w-full justify-between">
          <span className="bg-black text-blue-400 px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {art.user.name}
          </span>
          <span className="bg-blue-400 text-black px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ART
          </span>
        </div>
      </div>

      <div className="mt-12 w-full max-w-lg">
        <div className="h-4 bg-black mb-2 rotate-1" />
        <div className="h-4 bg-black -rotate-2" />
      </div>
    </div>
  )
}