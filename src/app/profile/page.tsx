import { Calendar, Crown, Palette, Star, Trophy, User } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import Link from 'next/link'

async function getUsers() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) return null

  const res = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  return res
}

export default async function ProfileRolePage() {
  const user = await getUsers()

  const totalArt = await prisma.art.count({
    where: { userId: user?.user_id },
  })

  return (
    <div className="min-h-screen bg-white">
      <main className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-black mb-8 tracking-tight font-mono">
              USER <span className="text-purple-600">PROFILE</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
          </div>

          <div className="bg-white border-4 sm:border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-500 to-purple-500 border-4 sm:border-6 border-black flex items-center justify-center transform rotate-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <User className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                </div>
                {user?.role === "admin" && (
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 border-2 border-black flex items-center justify-center transform rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Crown className="w-6 h-6 text-black" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl sm:text-4xl font-black text-black mb-2 font-mono">{user?.name}</h3>
                <p className="text-xl font-bold text-gray-600 mb-4">{user?.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div
                    className={`px-4 py-2 border-2 border-black font-black text-black text-sm transform -rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      user?.role === "admin" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                    }`}
                  >
                    {user?.role.toUpperCase()}
                  </div>
                  <div className="px-4 py-2 bg-green-400 border-2 border-black font-black text-black text-sm transform rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    LEVEL {user?.level}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-black mx-auto mb-4 flex items-center justify-center transform rotate-3">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-black text-black mb-2 font-mono text-blue-600">
              </div>
              <div className="text-2xl font-black text-black mb-2 font-mono text-red-600">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
              </div>
              <div className="text-sm font-bold text-gray-700">JOINED</div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 border-4 border-black mx-auto mb-4 flex items-center justify-center transform -rotate-2">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-black text-black mb-2 font-mono text-red-600">{totalArt}</div>
              <div className="text-sm font-bold text-gray-700">ARTWORKS</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 border-4 border-black mx-auto mb-4 flex items-center justify-center transform rotate-1">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-black text-black mb-2 font-mono text-yellow-600">{user?.point.toLocaleString()}</div>
              <div className="text-sm font-bold text-gray-700">POINTS</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 border-4 border-black mx-auto mb-4 flex items-center justify-center transform -rotate-1">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-black text-black mb-2 font-mono text-green-600">{user?.level}</div>
              <div className="text-sm font-bold text-gray-700">LEVEL</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 sm:border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 mb-12">
            <h3 className="text-3xl sm:text-4xl font-black text-black mb-8 text-center font-mono">
              PROFILE <span className="text-purple-600">DETAILS</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-black text-black mb-4 font-mono">ACCOUNT INFO</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white border-2 border-black">
                    <span className="font-bold text-black">Full Name:</span>
                    <span className="font-black text-black">{user?.name}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white border-2 border-black">
                    <span className="font-bold text-black">Email:</span>
                    <span className="font-black text-black">{user?.email}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white border-2 border-black">
                    <span className="font-bold text-black">Role:</span>
                    <span className={`font-black text-black ${user?.role === "admin" ? "text-red-600" : "text-blue-600"}`}>
                      {user?.role.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-black text-black mb-4 font-mono">ACHIEVEMENTS</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white border-2 border-black">
                    <span className="font-bold text-black">Current Level:</span>
                    <span className="font-black text-black text-green-600">LEVEL {user?.level}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white border-2 border-black">
                    <span className="font-bold text-black">Total Points:</span>
                    <span className="font-black text-black text-yellow-600">{user?.point.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white border-2 border-black">
                    <span className="font-bold text-black">Artworks Created:</span>
                    <span className="font-black text-black text-red-600">{totalArt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/profile/edit"} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-4 border-black font-black text-black text-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                EDIT PROFILE
              </Link>
              <Link href={"/my-art"} className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white border-4 border-black font-black text-black text-lg hover:from-green-400 hover:to-blue-400 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                VIEW MY ARTWORKS
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
