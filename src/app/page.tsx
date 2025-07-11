import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col items-center justify-center p-8 font-mono">
      <header className="mb-16 w-full max-w-3xl mx-auto text-center">
        <h1 className="text-8xl font-black text-black tracking-tighter mb-4 drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] transform -rotate-2">
          WELCOME!
        </h1>
        <div className="w-full h-6 bg-black rotate-1 mb-2"></div>
        <p className="text-2xl font-bold text-black uppercase tracking-widest bg-white border-4 border-black inline-block px-8 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
          Explore the site
        </p>
      </header>
      <nav className="flex flex-col md:flex-row gap-12 w-full max-w-4xl justify-center items-center">
        <Link
          href="/profile"
          className="group flex-1 bg-white border-8 border-black p-10 flex flex-col items-center justify-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-rotate-2 hover:scale-105 transition-all duration-200 transform"
        >
          <span className="text-5xl font-black text-black mb-4 group-hover:text-yellow-300 transition-colors">PROFILE</span>
          <span className="bg-black text-yellow-300 px-6 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-lg">See my role</span>
        </Link>
        <Link
          href="/about"
          className="group flex-1 bg-black border-8 border-white p-10 flex flex-col items-center justify-center shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:rotate-2 hover:scale-105 transition-all duration-200 transform"
        >
          <span className="text-5xl font-black text-white mb-4 group-hover:text-yellow-300 transition-colors">ABOUT</span>
          <span className="bg-yellow-300 text-black px-6 py-2 font-bold border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-lg">What is this?</span>
        </Link>
        <Link
          href="/product"
          className="group flex-1 bg-yellow-300 border-8 border-black p-10 flex flex-col items-center justify-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-rotate-3 hover:scale-105 transition-all duration-200 transform"
        >
          <span className="text-5xl font-black text-black mb-4 group-hover:text-white transition-colors">PRODUCTS</span>
          <span className="bg-black text-yellow-300 px-6 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-lg">Shop now</span>
        </Link>
      </nav>
      <footer className="mt-24 w-full max-w-3xl mx-auto">
        <div className="w-full h-6 bg-black -rotate-1"></div>
        <p className="text-center text-black font-bold mt-4 text-lg">
          © {new Date().getFullYear()} ALVANO HASTAGINA - WEB JDA DEMO
        </p>
      </footer>
    </div>
  )
}
