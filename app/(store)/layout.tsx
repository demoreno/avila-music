'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CartButton from './CartButton'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/productos?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  const navLinks = [
    { href: '/productos', label: 'Productos' },
    { href: '/productos?view=categorias', label: 'Categorías' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/envios', label: 'Envíos' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080c] border-b border-white/[0.04] shadow-2xl shadow-black/20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-amber-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/avila-logo.jpeg"
                  alt="Ávila Music"
                  width={36} height={36}
                  className="relative rounded-full object-cover ring-1 ring-white/[0.06] transition-all duration-500 group-hover:ring-amber-500/20"
                  priority
                />
              </div>
              <div className="hidden sm:block leading-none select-none">
                <span className="heading-serif text-lg font-bold text-white tracking-tight">Ávila Music</span>
                <p className="text-[9px] text-amber-400/40 uppercase tracking-[0.2em] mt-0.5">Accesorios Musicales</p>
              </div>
            </Link>

            {/* Nav - Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/" className="nav-link text-white/70">Inicio</Link>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link text-white/40 hover:text-white/80">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <button
                onClick={() => { setSearchOpen(!searchOpen); setIsMobileMenuOpen(false) }}
                className={`group relative p-2.5 rounded-full transition-all duration-300 ${
                  searchOpen ? 'bg-amber-500/10' : 'hover:bg-white/[0.04]'
                }`}
                aria-label="Buscar"
              >
                <svg className={`h-[18px] w-[18px] transition-all duration-300 ${
                  searchOpen ? 'text-amber-400' : 'text-white/40 group-hover:text-white/80'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <a
                href="https://wa.me/584138288674" target="_blank" rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 text-xs font-medium"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>
              
              <CartButton />
              
              <button
                onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setSearchOpen(false) }}
                className="lg:hidden p-2.5 rounded-full text-white/40 hover:text-white/80 hover:bg-white/[0.04] transition-all"
              >
                <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search Panel */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            searchOpen ? 'max-h-20 pb-4' : 'max-h-0'
          }`}>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  autoFocus
                  className="w-full h-11 pl-10 pr-24 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-amber-500/30 focus:bg-white/[0.05] transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-4 rounded-lg bg-amber-500 text-black text-xs font-semibold hover:bg-amber-400 transition-colors"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="bg-[#08080c] backdrop-blur-2xl border-t border-white/[0.04]">
            <nav className="mx-auto max-w-7xl px-6 py-5 space-y-1">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm text-white/60 hover:text-amber-400 transition-colors rounded-lg">Inicio</Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 text-sm text-white/40 hover:text-amber-400 transition-colors rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/584138288674" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 mt-3 py-3 px-4 bg-[#25D366]/10 text-[#25D366] rounded-xl text-sm font-medium"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Contactar por WhatsApp
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[68px]">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#1e4d6b] blur-md opacity-50" />
                  <Image
                    src="/avila-logo.jpeg"
                    alt="Ávila Music"
                    width={48}
                    height={48}
                    className="relative rounded-full object-cover ring-2 ring-white/20"
                  />
                </div>
                <span className="heading-serif text-2xl font-bold">Ávila Music</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Accesorios musicales de calidad para artistas y entusiastas. 
                Envíos seguros a todo el país.
              </p>
              <div className="flex gap-3">
                <a href="https://wa.me/584138288674" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-success transition-colors">
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a href="mailto:contacto@avilamusic.com" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#1e4d6b] transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a href="tel:+584138288674" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#1e4d6b] transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                <svg className="h-5 w-5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Tienda
              </h4>
              <ul className="space-y-3">
                <li><Link href="/productos" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Productos</Link></li>
                <li><Link href="/productos?view=categorias" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Categorías</Link></li>
                <li><Link href="/productos" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Más vendidos</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                <svg className="h-5 w-5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Información
              </h4>
              <ul className="space-y-3">
                <li><Link href="/nosotros" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Nosotros</Link></li>
                <li><Link href="/envios" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Envíos y entregas</Link></li>
                <li><Link href="/garantias" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Garantías</Link></li>
                <li><Link href="/faq" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Preguntas frecuentes</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                <svg className="h-5 w-5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Contáctanos
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <svg className="h-4 w-4 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div><a href="tel:+584138288674" className="text-slate-400 hover:text-white transition-colors">+58 413-8288674</a></div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <svg className="h-4 w-4 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div><a href="mailto:contacto@avilamusic.com" className="text-slate-400 hover:text-white transition-colors">contacto@avilamusic.com</a></div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <svg className="h-4 w-4 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-slate-400">Lun-Vie: 9am-6pm<br />Sáb: 9am-1pm</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-400">© {new Date().getFullYear()} Ávila Music. Todos los derechos reservados.</p>
              <div className="flex items-center gap-6">
                <Link href="/terminos" className="text-sm text-slate-400 hover:text-white transition-colors">Términos y condiciones</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.886 14.553c-.17-.085-1.009-.499-1.165-.556-.156-.057-.27-.085-.4.114-.127.199-.497.626-.61.754-.114.128-.228.142-.398.057-.17-.085-.723-.298-1.374-.878-.508-.453-.851-1.019-.95-1.19-.099-.17-.01-.262.085-.355.077-.076.17-.199.255-.298.085-.1.128-.17.185-.284.057-.113.028-.213-.014-.298-.043-.085-.383-.922-.525-1.262-.138-.332-.28-.287-.383-.293-.099-.005-.213-.005-.327-.005-.113 0-.298.043-.454.213-.156.17-.596.582-.596 1.423 0 .841.611 1.654.696 1.768.085.114 1.202 1.838 2.913 2.575.408.176.728.282.976.361.41.13.782.111 1.076.067.327-.049 1.009-.412 1.151-.813.142-.4.142-.74.085-.84-.057-.1-.213-.156-.454-.276m-3.103 4.253h-.003a5.675 5.675 0 01-2.888-.793l-.207-.122-2.149.564.572-2.1a5.654 5.654 0 01-.867-3.018c.001-3.127 2.549-5.674 5.678-5.674 1.514 0 2.937.59 4.007 1.662a5.633 5.633 0 011.653 4.011c-.002 3.127-2.551 5.674-5.679 5.674m4.84-10.513a6.788 6.788 0 00-4.796-1.988c-3.763 0-6.823 3.06-6.825 6.825 0 1.202.314 2.375.912 3.413L.635 20.5l4.568-1.198a6.817 6.817 0 003.268.832h.003c3.76 0 6.82-3.06 6.823-6.825a6.793 6.793 0 00-2.003-4.824" />
    </svg>
  )
}
