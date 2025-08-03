
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

async function getAllArts() {
  const arts = await prisma.art.findMany({
    include: { user: {
        select: {
            name: true,
            role: true, 
            email: true
        }
    } },
  })
  return arts.map((art) => ({
    art_id: art.art_id,
    name: art.name,
    image: art.image,
    createdAt: art.createdAt,
    user_id: art.userId,
    user: art.user,
  }))
}

export default async function FeedPage() {
  const arts = await getAllArts()

  const cardHeight = 420
  const gridRows = Math.ceil((arts.length * cardHeight) / 32) // 32px per row
  return (
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {arts.length === 0 ? (
            <div className="col-span-3 text-center text-2xl text-black font-bold">No art found.</div>
          ) : (
            arts.map((art) => (
              <div
                key={art.art_id}
                className="flex flex-col bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0 transform hover:-rotate-2 hover:scale-105 transition-all duration-200 brutal-card"
              >
                <div className="flex items-center gap-3 px-6 pt-6 pb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black flex items-center justify-center">
                    <span className="font-black text-white text-lg">{art.user?.name?.charAt(0) ?? '?'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-black text-lg">{art.user?.name ?? 'Unknown'}</span>
                    <span className="text-xs text-gray-600 font-bold">{art.createdAt ? new Date(art.createdAt).toLocaleDateString() : '-'}</span>
                  </div>
                </div>
                <Link href={`/feed/${art.art_id}`} className="block">
                  <img
                    src={art.image}
                    alt={art.name}
                    width={400}
                    height={400}
                    className="border-2 border-black bg-blue-400 object-contain brutal-img w-full h-[300px] sm:h-[350px] lg:h-[400px] mb-4"
                  />
                </Link>
                <div className="px-6 pb-6">
                  <h2 className="text-3xl font-black text-black mb-2 text-left brutal-title">
                    {art.name}
                  </h2>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/feed/${art.art_id}`}
                      className="bg-black text-blue-400 px-4 py-2 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-400 hover:text-black transition-all"
                    >
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
  )
}
