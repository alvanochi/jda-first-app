'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import { useEffect } from 'react'
import { logout, setUser } from '@/store/slicer/userSlice'

function SyncUserToRedux() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const user = session.user as any
      store.dispatch(setUser({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user'
      }))
    } else if (status === 'unauthenticated') {
      store.dispatch(logout())
    }
  }, [session, status])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SyncUserToRedux />
          {children}
        </PersistGate>
      </ReduxProvider>
    </SessionProvider>
  )
}
