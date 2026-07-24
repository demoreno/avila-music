'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Guitar, Package, ClipboardList, Receipt, DollarSign, TrendingUp, Newspaper } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Guitar },
  { href: '/admin/inventario', label: 'Inventario', icon: Package },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ClipboardList },
  { href: '/admin/facturacion', label: 'Facturación', icon: Receipt },
  { href: '/admin/ventas', label: 'Ventas', icon: DollarSign },
  { href: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 px-3 py-4">
      {navItems.map((item) => {
        const isActive = pathname?.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mb-1 flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'border-amber-500 bg-[#1e4d6b]/10 text-[#1e4d6b]'
                : 'border-transparent text-slate-500 hover:bg-[#1e4d6b]/5 hover:text-[#1e4d6b]'
            }`}
          >
            <item.icon className="h-4 w-4" strokeWidth={1.75} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
