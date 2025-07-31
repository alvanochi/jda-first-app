'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 font-mono">
      <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 sm:grid-cols-20 gap-1 h-full">
            {Array.from({ length: 200 }).map((_, i) => (
              <div key={i} className="bg-black w-full h-4 sm:h-8"></div>
            ))}
          </div>
        </div>
        <div className="bg-white p-8 text-black border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md transform -rotate-2">
            {children}
            <div className="mt-6 md:flex md:justify-center md:items-center md:gap-4 block text-center">
                <p className="text-black mb-4 md:mb-0 font-bold">{pathname === '/login' ? 'Don\'t have an account?' : 'Already have an account?'}</p>
                <Link href={pathname === '/login' ? '/register' : '/login'} className="font-black text-yellow-300 bg-black px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:text-black transition-all">{pathname === '/login' ? 'Sign up' : 'Sign in'}</Link>
            </div>
        </div>
    </div>
  );
}
