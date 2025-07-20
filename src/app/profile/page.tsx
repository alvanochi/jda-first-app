'use client'

import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileRolePage() {
  const { user, logoutUser } = useUser()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    logoutUser()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-lime-400 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-6xl font-black text-black mb-4 tracking-tighter">
            PROFILE
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
                {user.isLoggedIn ? user.name.toUpperCase() : "NOT LOGGED IN"}
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
                Role
              </h2>
              <p className="text-3xl font-black text-black leading-tight">
                {user.isLoggedIn ? user.role.toUpperCase() : "GUEST"}
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
                Email
              </h2>
              <p className="text-2xl font-black text-black leading-tight">
                {user.isLoggedIn ? user.email : "No email"}
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
                Status
              </h2>
              <div className="space-y-2">
                <div className={`px-3 py-2 inline-block font-bold ${
                  user.isLoggedIn 
                    ? "bg-green-500 text-white" 
                    : "bg-red-500 text-white"
                }`}>
                  {user.isLoggedIn ? "LOGGED IN" : "NOT LOGGED IN"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
                Account Actions
              </h2>
              <div className="space-y-4">
                {user.isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-3 font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xl hover:bg-red-600 transition-all w-full"
                  >
                    LOGOUT
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="bg-black text-white px-6 py-3 font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xl hover:bg-gray-800 transition-all inline-block w-full text-center"
                  >
                    LOGIN
                  </Link>
                )}
                <Link
                  href="/register"
                  className="bg-blue-500 text-white px-6 py-3 font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xl hover:bg-blue-600 transition-all inline-block w-full text-center"
                >
                  REGISTER
                </Link>
              </div>
            </div>

          </div>
        </div>

        <footer className="mt-12">
          <div className="w-full h-4 bg-black"></div>
          <p className="text-center text-black font-bold mt-4 text-lg">
            © {new Date().getFullYear()} {user.isLoggedIn ? user.name.toUpperCase() : "GUEST"} - {user.isLoggedIn ? user.role.toUpperCase() : "VISITOR"}
          </p>
        </footer>
      </div>
    </div>
  )
} 