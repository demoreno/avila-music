'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, ChevronDown, UserCircle2, LogOut } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

export default function AccountMenu() {
  const router = useRouter()
  const [fullName, setFullName] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const loadProfile = useCallback(async (userId: string) => {
    const { data } = await supabase.from('profiles').select('full_name').eq('id', userId).single()
    setFullName(data?.full_name ?? null)
  }, [supabase])

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user)
      if (user) loadProfile(user.id)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user)
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setFullName(null)
      }
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- supabase client is re-created per render but stable in behavior
  }, [loadProfile])

  useEffect(() => {
    if (!open) return

    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  async function handleLogout() {
    await supabase.auth.signOut()
    setOpen(false)
    router.push('/')
    router.refresh()
  }

  if (!isLoggedIn) {
    return (
      <Link
        href="/cuenta/login"
        className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300 text-xs font-medium"
      >
        <User className="h-[15px] w-[15px]" strokeWidth={1.5} />
        <span>Iniciar sesión</span>
      </Link>
    )
  }

  const firstName = fullName?.trim().split(' ')[0]

  return (
    <div ref={containerRef} className="relative hidden sm:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
          open ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
        }`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <User className="h-[15px] w-[15px]" strokeWidth={1.5} />
        <span className="max-w-[100px] truncate">{firstName || 'Mi cuenta'}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg"
        >
          <Link
            href="/cuenta"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1e4d6b] transition-colors"
          >
            <UserCircle2 className="h-4 w-4" />
            Mi cuenta
          </Link>
          <button
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
