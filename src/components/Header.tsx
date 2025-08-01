'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Grid3X3, User, LogOut, ChevronDown, Settings } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { user, logoutUser } = useUser()

  const pathname = usePathname()
  const displayHeader = ["/", "/profile", "/feed", "/my-art"]
  const displayText = ["/feed", "/my-art"]


  const handleLogout = async () => {
    await signOut({ redirect: false })
    logoutUser()
    setIsProfileMenuOpen(false)
  }

  if(!displayHeader.includes(pathname)) {
    return null
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)

  return (
    <header className="border-b-4 w-full sm:border-b-8 border-black bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-4">
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 border-2 sm:border-4 border-black flex items-center justify-center transform rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Grid3X3 className="w-4 h-4 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight text-black font-mono">
              PIX<span className="text-purple-600">ART</span>
            </h1>
          </Link>


          {displayText.includes(pathname) && (
            <h1 className="md:text-7xl mr-4 text-4xl font-black text-black tracking-tighter md:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              {pathname === "/feed" ? "FEED" : "MY ARTS"}
            </h1>
          )}

          <div className="hidden sm:flex gap-3 md:gap-4 items-center">
            {user?.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center text-black gap-2 px-4 md:px-6 py-2 md:py-3 border-2 md:border-4 border-black font-black text-sm md:text-base bg-green-400 hover:bg-green-300 transition-all duration-200 transform hover:scale-105 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <User className="w-4 h-4" />
                  {user.name.split(" ")[0]}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="block px-4 py-3 font-black text-black text-sm hover:bg-gray-100 border-b-2 border-black"
                    >
                      VIEW PROFILE
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block px-4 py-3 font-black text-black text-sm hover:bg-gray-100 border-b-2 border-black"
                      >
                        ADMIN SETTINGS
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 font-black text-sm hover:bg-red-100 text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      LOGOUT
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 md:px-8 py-2 md:py-4 border-2 md:border-4 border-black font-black text-sm md:text-lg bg-yellow-400 hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black"
                >
                  LOGIN
                </Link>
                <Link
                  href="/register"
                  className="px-4 md:px-8 py-2 md:py-4 border-2 md:border-4 border-black font-black text-sm md:text-lg bg-red-500 text-white hover:bg-red-400 transition-all duration-200 transform hover:scale-105 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  REGISTER
                </Link>
              </>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="sm:hidden p-2 border-2 border-black bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 relative z-50"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-1 left-0 w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 top-2.5" : ""}`}
              ></span>
              <span
                className={`absolute top-2.5 left-0 w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`absolute top-4 left-0 w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 top-2.5" : ""}`}
              ></span>
            </div>
          </button>
        </div>
        

        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="mt-4 flex flex-col gap-3 pb-4">
            {user?.isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="w-full text-black px-6 py-3 border-2 border-black font-black text-base bg-green-400 hover:bg-green-300 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform hover:scale-[0.98] text-center flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  PROFILE
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="w-full px-6 py-3 border-2 border-black font-black text-base bg-yellow-400 hover:bg-yellow-300 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform hover:scale-[0.98] text-center flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    ADMIN SETTINGS
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full px-6 py-3 border-2 border-black font-black text-base bg-red-500 text-white hover:bg-red-400 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform hover:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full px-6 py-3 border-2 border-black font-black text-black text-base bg-yellow-400 hover:bg-yellow-300 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform hover:scale-[0.98] text-center"
                >
                  LOGIN
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full px-6 py-3 border-2 border-black font-black text-base bg-red-500 text-white hover:bg-red-400 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform hover:scale-[0.98] text-center"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  )
}
