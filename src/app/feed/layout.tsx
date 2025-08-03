import { Plus } from "lucide-react";
import Link from "next/link";

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 font-mono relative">
      <div className="fixed inset-0 w-full h-full opacity-5 pointer-events-none z-0">
        <div className="grid grid-cols-10 sm:grid-cols-20 gap-1 w-full h-full">
          {Array.from({ length: 800 }).map((_, i) => (
            <div key={i} className="bg-black w-full h-4 sm:h-8"></div>
          ))}
        </div>
      </div>
      <div className="relative z-10 w-full">
        {children}
        <Link
          href="/create-art"
          className="fixed bottom-6 right-6 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-300 to-pink-300 border-4 border-black flex items-center justify-center text-white hover:from-purple-400 hover:to-pink-400 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0_0_50px_rgba(6,182,212,1)] z-50"
          title="Upload some art"
        >
          <Plus className="md:w-8 md:h-8 w-6 h-6 text-black" />
        </Link>
      </div>
    </div>
  )
}