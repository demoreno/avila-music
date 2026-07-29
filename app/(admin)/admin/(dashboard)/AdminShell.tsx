'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import AdminNav from './AdminNav'
import AdminLogout from './AdminLogout'

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode
  userEmail: string | undefined
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg-alt">
      {/* Mobile/tablet top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <Image
            src="/avila-logo.jpeg"
            alt="Ávila Music"
            width={30}
            height={30}
            className="rounded-full object-cover ring-1 ring-slate-200"
          />
          <span className="heading-serif text-sm font-bold text-[#1e4d6b]">Ávila Music Admin</span>
        </div>
      </div>

      {/* Backdrop, mobile/tablet only */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — fixed drawer on mobile/tablet (slides in), static column on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-60 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-4">
          <div className="flex items-center gap-3">
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
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <AdminNav onNavigate={() => setOpen(false)} />

        <div className="border-t border-slate-200 px-4 py-4">
          <p className="mb-3 truncate text-xs text-slate-500">{userEmail}</p>
          <AdminLogout />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto pt-14 lg:pt-0">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
