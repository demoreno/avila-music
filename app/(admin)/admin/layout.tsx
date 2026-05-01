import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import AdminLogout from './AdminLogout'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/productos', label: 'Productos', icon: '🎸' },
  { href: '/admin/inventario', label: 'Inventario', icon: '📦' },
  { href: '/admin/ventas', label: 'Ventas', icon: '💰' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="flex w-60 flex-shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
          <Image
            src="/avila-logo.jpeg"
            alt="Ávila Music"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-bold text-slate-900">Ávila Music</p>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-[#e8f1f5] hover:text-[#1e4d6b]"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

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
