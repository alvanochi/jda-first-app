import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-red-400 p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            ABOUT THIS PROJECT
          </h1>
          <div className="w-full h-6 bg-black transform rotate-1"></div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              <h2 className="text-xl font-bold text-black mb-3 uppercase tracking-wider">
                Project Type
              </h2>
              <p className="text-3xl font-black text-black leading-tight">
                FULLSTACK ASSIGNMENT
              </p>
            </div>

            <div className="bg-black text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transform rotate-1">
              <h2 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">
                Institution
              </h2>
              <p className="text-2xl font-black text-white leading-tight">
                JABAR DIGITAL ACADEMY
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-bold text-black mb-3 uppercase tracking-wider">
                Course
              </h2>
              <p className="text-2xl font-black text-black leading-tight">
                FULLSTACK DEVELOPMENT
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-bold text-black mb-3 uppercase tracking-wider">
                Purpose
              </h2>
              <p className="text-sm font-bold text-black leading-relaxed">
                This website serves as a fullstack development assignment for the Jabar Digital Academy program. 
                It demonstrates proficiency in modern web technologies and showcases the student's ability to create functional and
                responsive web applications.
              </p>
            </div>

            <div className="bg-black text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transform -rotate-1">
              <h2 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">
                Learning Objectives
              </h2>
              <p className="text-sm font-bold text-white leading-relaxed">
                MASTERING FULLSTACK DEVELOPMENT WITH MODERN TOOLS AND FRAMEWORKS. 
                UNDERSTANDING RESPONSIVE DESIGN, COMPONENT ARCHITECTURE, AND DEPLOYMENT STRATEGIES.
              </p>
            </div>

            
          </div>

          <div className="space-y-6">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <h2 className="text-xl font-bold text-black mb-3 uppercase tracking-wider">
                Technologies Used
              </h2>
              <div className="space-y-2">
                <div className="bg-black text-white px-2 py-1 inline-block font-bold text-xs">
                  NEXT.JS 15
                </div>
                <div className="bg-black text-white px-2 py-1 inline-block font-bold text-xs mr-1">
                  REACT 19
                </div>
                <div className="bg-black text-white px-2 py-1 inline-block font-bold text-xs">
                  TYPESCRIPT
                </div>
                <div className="bg-black text-white px-2 py-1 inline-block font-bold text-xs mr-1">
                  TAILWIND CSS
                </div>
                <div className="bg-black text-white px-2 py-1 inline-block font-bold text-xs">
                  NODE.JS
                </div>
              </div>
            </div>

            <div className="bg-black text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <h2 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">
                About
              </h2>
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <span className="bg-white text-black px-2 py-1 font-bold mr-2">
                    DESIGN
                  </span>
                  <span className="font-bold text-white">Brutalism Style UI</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-white text-black px-2 py-1 font-bold mr-2">
                    STYLING
                  </span>
                  <span className="font-bold text-white">Tailwind CSS</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-white text-black px-2 py-1 font-bold mr-2">
                    FRAMEWORK
                  </span>
                  <span className="font-bold text-white">Next.js 15</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-white text-black px-2 py-1 font-bold mr-2">
                    STACK
                  </span>
                  <span className="font-bold text-white">NextAuth, Prisma, Vercel Blob, Neon, PostgreSQL</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              <h2 className="text-xl font-bold text-black mb-3 uppercase tracking-wider">
                Project Status
              </h2>
              <div className="bg-yellow-500 text-white px-3 py-2 font-bold text-center">
                IN PROGRESS
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider text-center">
            Student Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-lg font-bold text-black mb-2">Student</h3>
              <p className="text-xl font-black text-black">ALVANO HASTAGINA</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black mb-2">Program</h3>
              <p className="text-xl font-black text-black">FULLSTACK DEVELOPMENT</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black mb-2">Year</h3>
              <p className="text-xl font-black text-black">2025</p>
            </div>
          </div>
        </div>

        <footer className="mt-12">
          <div className="w-full h-6 bg-black transform -rotate-1"></div>
          <div className="flex justify-between items-center mt-6">
            <p className="text-white font-bold text-lg drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              © {new Date().getFullYear()} JABAR DIGITAL ACADEMY ASSIGNMENT
            </p>
            <Link href="/about/profile" className="bg-black text-white px-6 py-3 font-bold border-4 border-white hover:bg-white hover:text-black hover:border-black transition-all transform hover:scale-105">
              VIEW DEV PROFILE
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
