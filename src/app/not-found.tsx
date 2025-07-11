import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-8 font-mono">
      <div className="bg-yellow-300 border-8 border-white shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] px-12 py-16 text-center transform -rotate-2">
        <h1 className="text-8xl font-black text-black mb-6 tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          404
        </h1>
        <h2 className="text-3xl font-bold text-black mb-4 uppercase tracking-wider">
          Page Not Found
        </h2>
        <p className="text-lg font-bold text-black mb-8">
          Oops! The page you are looking for does not exist.<br/>
          Maybe it was moved, deleted, or never existed at all.
        </p>
        <Link
          href="/"
          className="bg-black text-yellow-300 px-8 py-4 font-bold text-2xl border-4 border-black hover:bg-yellow-300 hover:text-black transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          GO HOME
        </Link>
      </div>
      <div className="mt-12 w-full max-w-lg">
        <div className="h-4 bg-yellow-300 mb-2 rotate-1"></div>
        <div className="h-4 bg-white -rotate-2"></div>
      </div>
    </div>
  )
} 