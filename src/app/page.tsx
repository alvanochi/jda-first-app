import { ArrowRight, Brush, GamepadIcon, Grid3X3, Palette, Star, Trophy, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-300 w-full font-mono">
       <section className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 sm:grid-cols-20 gap-1 h-full">
            {Array.from({ length: 200 }).map((_, i) => (
              <div key={i} className="bg-black w-full h-4 sm:h-8"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black mb-8 sm:mb-12 tracking-tight leading-none font-mono">
              <span className="text-black">CREATE.</span>
              <br />
              <span className="text-blue-600">SHARE.</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-6 py-2 sm:py-4 inline-block transform -rotate-2 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                DOMINATE.
              </span>
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-16 max-w-3xl mx-auto leading-tight text-gray-800">
              Social media platform for{" "}
              <span className="bg-yellow-300 px-1 sm:px-2 py-1 border border-black ml-4 sm:ml-0 sm:border-2">pixel art</span>{" "}
              artists. Create artwork, collect points, and become a{" "}
              <span className="text-red-500 font-black">pixel legend!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
              <Link href="/register" className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-green-500 to-blue-500 border-2 sm:border-4 border-black font-black text-lg sm:text-2xl text-white hover:from-green-400 hover:to-blue-400 transition-all duration-200 transform hover:scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3">
                START CREATING
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </Link>
              <Link href="/art" className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 border-2 sm:border-4 border-black text-black font-black text-lg sm:text-2xl bg-orange-400 hover:bg-orange-300 transition-all duration-200 transform hover:scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                VIEW ART
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-purple-100 to-pink-100 border-t-4 border-b-4 sm:border-t-8 sm:border-b-8 border-black">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-center mb-12 sm:mb-20 tracking-tight text-black font-mono">
            MAIN <span className="text-purple-600">FEATURES</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <div className="bg-white border-4 sm:border-6 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1 sm:hover:-translate-x-2 sm:hover:-translate-y-2 p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-orange-500 border-2 sm:border-4 border-black flex items-center justify-center mb-4 sm:mb-6 transform rotate-3">
                <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 text-black font-mono">PIXEL EDITOR</h4>
              <p className="text-base sm:text-xl font-bold text-gray-700 leading-relaxed">
                <span className="bg-yellow-300 px-1 border border-black">Powerful</span> pixel art editor with complete
                tools to create your masterpiece.
              </p>
            </div>

            <div className="bg-white border-4 sm:border-6 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1 sm:hover:-translate-x-2 sm:hover:-translate-y-2 p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-blue-500 border-2 sm:border-4 border-black flex items-center justify-center mb-4 sm:mb-6 transform -rotate-3">
                <GamepadIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 text-black font-mono">GAMIFICATION</h4>
              <p className="text-base sm:text-xl font-bold text-gray-700 leading-relaxed">
                <span className="bg-green-300 px-1 border border-black">Points</span> system, levels, achievements, and
                leaderboards to motivate your creativity.
              </p>
            </div>

            <div className="bg-white border-4 sm:border-6 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1 sm:hover:-translate-x-2 sm:hover:-translate-y-2 p-6 sm:p-8 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 border-2 sm:border-4 border-black flex items-center justify-center mb-4 sm:mb-6 transform rotate-2">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 text-black font-mono">COMMUNITY</h4>
              <p className="text-base sm:text-xl font-bold text-gray-700 leading-relaxed">
                Join the <span className="bg-pink-300 px-1 border border-black">community</span> of pixel art artists
                and inspire each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-center mb-12 sm:mb-20 tracking-tight text-black font-mono">
            PLATFORM <span className="text-blue-600">STATISTICS</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            <div className="text-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-red-500 to-pink-500 border-4 sm:border-6 border-black mx-auto mb-4 sm:mb-8 flex items-center justify-center transform rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Brush className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-5xl font-black mb-2 sm:mb-4 text-red-600 font-mono">
                1,234
              </div>
              <div className="text-sm sm:text-lg md:text-2xl font-bold text-black">ARTWORKS</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-500 border-4 sm:border-6 border-black mx-auto mb-4 sm:mb-8 flex items-center justify-center transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Users className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-5xl font-black mb-2 sm:mb-4 text-blue-600 font-mono">
                567
              </div>
              <div className="text-sm sm:text-lg md:text-2xl font-bold text-black">ARTISTS</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-yellow-500 to-orange-500 border-4 sm:border-6 border-black mx-auto mb-4 sm:mb-8 flex items-center justify-center transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Trophy className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-5xl font-black mb-2 sm:mb-4 text-yellow-600 font-mono">
                89
              </div>
              <div className="text-sm sm:text-lg md:text-2xl font-bold text-black">CONTESTS</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-green-500 to-teal-500 border-4 sm:border-6 border-black mx-auto mb-4 sm:mb-8 flex items-center justify-center transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Star className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-5xl font-black mb-2 sm:mb-4 text-green-600 font-mono">
                12K
              </div>
              <div className="text-sm sm:text-lg md:text-2xl font-bold text-black">LIKES</div>
            </div>
          </div>
        </div>
      </section>

       <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-purple-600 to-pink-600 text-white border-t-4 sm:border-t-8 border-black">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 sm:mb-12 tracking-tight font-mono">
            READY TO BECOME A{" "}
            <span className="bg-yellow-400 text-black px-2 sm:px-4 py-1 sm:py-2 border-2 sm:border-4 border-black inline-block transform rotate-2">
              PIXEL LEGEND?
            </span>
          </h3>
          <p className="text-lg sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-16 max-w-4xl mx-auto leading-relaxed">
            Join the largest pixel art community and start your creative journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
            <Link href={"/register"} className="w-full sm:w-auto px-8 sm:px-16 py-4 sm:py-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-4 sm:border-6 border-black font-black text-lg sm:text-2xl hover:from-yellow-300 hover:to-orange-300 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-4">
              REGISTER NOW
              <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
            </Link>
            <button className="w-full sm:w-auto px-8 sm:px-16 py-4 sm:py-8 border-4 sm:border-6 border-white text-white font-black text-lg sm:text-2xl bg-transparent transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] sm:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)]">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t-4 sm:border-t-8 border-black bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 border-2 sm:border-4 border-black flex items-center justify-center transform rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Grid3X3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-black font-mono">
                PIX<span className="text-purple-600">ART</span>
              </span>
            </div>
            <div className="text-base sm:text-lg md:text-xl font-bold text-gray-700 text-center md:text-right">
              © {new Date().getFullYear()} PixArt. 
              <span className="block mt-2 md:mt-0 md:inline"> Platform for{" "}
                <span className="bg-yellow-300 px-1 sm:px-2 py-1 border border-black sm:border-2">pixel art</span>
                {" "}artists.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
