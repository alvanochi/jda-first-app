import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-lime-400 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-6xl font-black text-black mb-4 tracking-tighter">
           DEV PROFILE
          </h1>
          <div className="w-full h-4 bg-black"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
                Name
              </h2>
              <p className="text-4xl font-black text-black leading-tight">
                ALVANO HASTAGINA
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
                Role
              </h2>
              <p className="text-3xl font-black text-black leading-tight">
                FRONTEND DEVELOPER
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
                Skills
              </h2>
              <div className="space-y-2">
                <div className="bg-black text-white px-3 py-2 inline-block font-bold">
                  REACT
                </div>
                <div className="bg-black text-white px-3 py-2 inline-block font-bold mx-2">
                  NEXT.JS
                </div>
                <div className="bg-black text-white px-3 py-2 inline-block font-bold">
                  TYPESCRIPT
                </div>
                <div className="bg-black text-white px-3 py-2 inline-block font-bold mr-2">
                  TAILWIND CSS
                </div>
                <div className="bg-black text-white px-3 py-2 inline-block font-bold">
                  KOTLIN
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
                About
              </h2>
              <p className="text-lg font-bold text-black leading-relaxed">
                Frontend & Mobile Developer with hands-on experience in building responsive applications using React, Kotlin, and Tailwind.
                Passionate about UI/UX design and API integration.
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
                Contact
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="bg-black text-white px-3 py-1 font-bold mr-3">
                    EMAIL
                  </span>
                  <span className="font-bold text-black">alvanhastagina@gmail.com</span>
                </div>
                <Link href={"https://github.com/alvanochi"} className="flex items-center">
                  <span className="bg-black text-white px-3 py-1 font-bold mr-3">
                    GITHUB
                  </span>
                  <span className="font-bold text-black">@alvanochi</span>
                </Link>
                <Link href={"https://linkedin.com/in/alvanoh"} className="flex items-center">
                  <span className="bg-black text-white px-3 py-1 font-bold mr-3">
                    LINKEDIN
                  </span>
                  <span className="font-bold text-black">alvanoh</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        <footer className="mt-12">
          <div className="w-full h-4 bg-black"></div>
          <p className="text-center text-black font-bold mt-4 text-lg">
            © {new Date().getFullYear()} ALVANO HASTAGINA - FRONTEND DEVELOPER
          </p>
        </footer>
      </div>
    </div>
  )
} 