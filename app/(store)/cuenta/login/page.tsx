'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import PasswordInput from '@/components/store/PasswordInput'

export default function CuentaLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function redirectIfLoggedIn() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) router.replace('/cuenta')
    }

    redirectIfLoggedIn()

    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) redirectIfLoggedIn()
    }

    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- supabase client is re-created per render but stable in behavior
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Correo o contraseña incorrectos.')
      setLoading(false)
      return
    }

    router.push('/cuenta')
    router.refresh()
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="heading-serif mb-8 text-center text-2xl font-bold text-[#1e4d6b]">Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              placeholder="tu@correo.com"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Contraseña</label>
            <PasswordInput value={password} onChange={setPassword} placeholder="••••••••" autoComplete="current-password" />
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1e4d6b] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#153a52] disabled:opacity-60"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          <p className="mt-5 text-center text-sm text-text-muted">
            ¿No tienes cuenta?{' '}
            <Link href="/cuenta/registro" className="font-semibold text-[#1e4d6b] hover:text-[#0f7a5f]">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
