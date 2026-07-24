import { redirect } from 'next/navigation'
import { User } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import AccountLogout from '@/components/store/AccountLogout'

export default async function CuentaPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/cuenta/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1e4d6b]/10">
          <User className="h-7 w-7 text-[#1e4d6b]" />
        </div>
        <div>
          <h1 className="heading-serif text-2xl font-bold text-[#1e4d6b]">
            {profile?.full_name || 'Mi cuenta'}
          </h1>
          <p className="text-sm text-text-muted">{profile?.email ?? user.email}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-lg font-bold text-slate-800">Mis pedidos</h2>
        <p className="text-sm text-text-muted">
          Todavía no tienes pedidos registrados. Muy pronto vas a poder ver acá el historial de todo lo que compres.
        </p>
      </div>

      <div className="mt-6">
        <AccountLogout />
      </div>
    </div>
  )
}
