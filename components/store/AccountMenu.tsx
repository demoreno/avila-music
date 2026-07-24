'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

export default function AccountMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    supabase.auth.getUser().then(({ data: { user } }) => setIsLoggedIn(!!user))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Link
      href={isLoggedIn ? '/cuenta' : '/cuenta/login'}
      className="group relative hidden sm:flex items-center gap-1.5 p-2.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-300"
      aria-label={isLoggedIn ? 'Mi cuenta' : 'Iniciar sesión'}
      title={isLoggedIn ? 'Mi cuenta' : 'Iniciar sesión'}
    >
      <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
    </Link>
  )
}
