'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import PasswordInput from '@/components/store/PasswordInput'

export default function RegistroPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setLoading(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (signUpError) {
      const friendlyMessages: Record<string, string> = {
        user_already_exists: 'Ya existe una cuenta con ese correo.',
        email_address_invalid: 'Ese correo no es válido.',
        over_email_send_rate_limit: 'Se enviaron demasiados correos en poco tiempo. Espera unos minutos e intenta de nuevo.',
        weak_password: 'La contraseña es muy débil. Usa al menos 6 caracteres.',
      }
      setError(friendlyMessages[signUpError.code ?? ''] ?? signUpError.message)
      setLoading(false)
      return
    }

    // No session yet means Supabase Auth has "confirm email" turned on —
    // the account exists but can't log in until the link is clicked.
    if (!data.session) {
      setNeedsEmailConfirmation(true)
      setLoading(false)
      return
    }

    if (fullName.trim() && data.user) {
      await supabase.from('profiles').update({ full_name: fullName.trim() }).eq('id', data.user.id)
    }

    router.push('/cuenta')
    router.refresh()
  }

  if (needsEmailConfirmation) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="heading-serif text-2xl font-bold text-[#1e4d6b]">Revisa tu correo</h1>
          <p className="mt-3 text-sm text-text-muted">
            Te enviamos un enlace de confirmación a <strong>{email}</strong>. Ábrelo para activar tu cuenta.
          </p>
          <Link href="/cuenta/login" className="mt-6 inline-block text-sm font-semibold text-[#1e4d6b] hover:text-[#0f7a5f]">
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="heading-serif mb-8 text-center text-2xl font-bold text-[#1e4d6b]">Crear cuenta</h1>

        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Nombre completo</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              placeholder="Tu nombre"
            />
          </div>

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

          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Contraseña</label>
            <PasswordInput value={password} onChange={setPassword} placeholder="••••••••" autoComplete="new-password" />
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirma tu contraseña</label>
            <PasswordInput value={confirmPassword} onChange={setConfirmPassword} placeholder="••••••••" autoComplete="new-password" />
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1e4d6b] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#153a52] disabled:opacity-60"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>

          <p className="mt-5 text-center text-sm text-text-muted">
            ¿Ya tienes cuenta?{' '}
            <Link href="/cuenta/login" className="font-semibold text-[#1e4d6b] hover:text-[#0f7a5f]">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
