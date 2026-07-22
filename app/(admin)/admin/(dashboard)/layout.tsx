import Image from 'next/image'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import AdminNav from './AdminNav'
import AdminLogout from './AdminLogout'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen bg-bg-alt">
      {/* Sidebar */}
      <aside className="flex w-60 flex-shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#1e4d6b] opacity-30 blur-sm" />
            <Image
              src="/avila-logo.jpeg"
              alt="Ávila Music"
              width={36}
              height={36}
              className="relative rounded-full object-cover ring-1 ring-slate-200"
            />
          </div>
          <div>
            <p className="heading-serif text-base font-bold text-[#1e4d6b] leading-none">Ávila Music</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-amber-600/80 mt-1">Admin Panel</p>
          </div>
        </div>

        <AdminNav />

        <div className="border-t border-slate-200 px-4 py-4">
          <p className="mb-3 truncate text-xs text-slate-500">{user?.email}</p>
          <AdminLogout />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
