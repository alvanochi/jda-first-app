'use client'

import { useUser } from '@/hooks/useUser'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import InfoBlock from '@/components/InfoBlock'
import SectionCard from '@/components/SectionCard'

export default function ProfileRolePage() {
  const { user, logoutUser } = useUser()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    logoutUser()
    localStorage.clear()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-lime-400 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-6xl font-black text-black mb-4 tracking-tighter">PROFILE</h1>
          <div className="w-full h-4 bg-black"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <InfoBlock title="Name" value={user?.name?.toUpperCase() || 'NOT LOGGED IN'} size="4xl" />
            <InfoBlock title="Role" value={user?.role?.toUpperCase() || 'GUEST'} size="3xl" />
            <InfoBlock title="Email" value={user?.email || 'No email'} size="2xl" />
            <InfoBlock
              title="Status"
              value={user?.isLoggedIn ? 'LOGGED IN' : 'NOT LOGGED IN'}
              statusColor={user?.isLoggedIn ? 'green' : 'red'}
            />
          </div>

          <div className="space-y-8">
            <SectionCard title="Account Actions">
              <div className="space-y-4">
                {user?.isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-3 font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xl hover:bg-red-600 transition-all w-full"
                  >
                    LOGOUT
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="bg-black text-white px-6 py-3 font-black border-2 border-black shadow-md text-xl hover:bg-gray-800 transition-all inline-block w-full text-center"
                  >
                    LOGIN
                  </Link>
                )}

                <Link
                  href="/register"
                  className="bg-blue-500 text-white px-6 py-3 font-black border-2 border-black shadow-md text-xl hover:bg-blue-600 transition-all inline-block w-full text-center"
                >
                  REGISTER
                </Link>
              </div>
            </SectionCard>
          </div>
        </div>

        <footer className="mt-12">
          <div className="w-full h-4 bg-black"></div>
          <p className="text-center text-black font-bold mt-4 text-lg">
            {user?.name?.toUpperCase() || 'GUEST'} - {user?.role?.toUpperCase() || 'VISITOR'}
          </p>
        </footer>
      </div>
    </div>
  )
}
