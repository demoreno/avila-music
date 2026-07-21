'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, Menu, X, Mail, Phone, Clock, ChevronRight, CirclePlus, Info, MessageCircle, ShoppingCart } from 'lucide-react'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'
import CartHydration from '@/components/store/CartHydration'
import { useCartCount } from '@/lib/cart/store'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const router = useRouter()
  const cartCount = useCartCount()

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
    { href: '/productos/categoria', label: 'Categorías' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/envios', label: 'Envíos' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <CartHydration />
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
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
                  className="relative rounded-full object-cover ring-1 ring-slate-200 transition-all duration-500 group-hover:ring-amber-500/40"
                  priority
                />
              </div>
              <div className="hidden sm:block leading-none select-none">
                <span className="heading-serif text-lg font-bold text-[#1e4d6b] tracking-tight">Ávila Music</span>
                <p className="text-[9px] text-amber-600/70 uppercase tracking-[0.2em] mt-0.5">Accesorios Musicales</p>
              </div>
            </Link>

            {/* Nav - Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/" className="nav-link text-slate-700">Inicio</Link>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link text-slate-500 hover:text-slate-900">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <button
                onClick={() => { setSearchOpen(!searchOpen); setIsMobileMenuOpen(false) }}
                className={`group relative p-2.5 rounded-full transition-all duration-300 ${
                  searchOpen ? 'bg-amber-500/10' : 'hover:bg-slate-100'
                }`}
                aria-label="Buscar"
              >
                <Search className={`h-[18px] w-[18px] transition-all duration-300 ${
                  searchOpen ? 'text-amber-500' : 'text-slate-400 group-hover:text-slate-700'
                }`} strokeWidth={1.5} />
              </button>

              <a
                href="https://wa.me/584128288674" target="_blank" rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-whatsapp/10 text-whatsapp hover:bg-whatsapp/20 transition-all duration-300 text-xs font-medium"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>

              <Link
                href="/carrito"
                aria-label={`Carrito de compras${cartCount > 0 ? `, ${cartCount} producto${cartCount === 1 ? '' : 's'}` : ''}`}
                className="relative p-2.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-black">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setSearchOpen(false) }}
                className="lg:hidden p-2.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-[18px] w-[18px]" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {/* Search Panel */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            searchOpen ? 'max-h-20 pb-4' : 'max-h-0'
          }`}>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" strokeWidth={1.5} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  autoFocus
                  className="w-full h-11 pl-10 pr-24 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:bg-white transition-all duration-300"
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
        <div id="mobile-menu" className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-2xl border-t border-slate-200">
            <nav className="mx-auto max-w-7xl px-6 py-5 space-y-1">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm text-slate-700 hover:text-amber-600 transition-colors rounded-lg">Inicio</Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 text-sm text-slate-600 hover:text-amber-600 transition-colors rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/carrito"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 px-3 text-sm text-slate-600 hover:text-amber-600 transition-colors rounded-lg"
              >
                <ShoppingCart className="h-4 w-4" />
                Carrito{cartCount > 0 ? ` (${cartCount})` : ''}
              </Link>
              <a
                href="https://wa.me/584128288674" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 mt-3 py-3 px-4 bg-whatsapp/10 text-whatsapp rounded-xl text-sm font-medium"
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
      <footer className="bg-[#150e08] text-white">
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
              <p className="text-slate-400 leading-relaxed mb-4">
                Accesorios musicales de calidad para artistas y entusiastas.
                Envíos seguros a todo el país.
              </p>
              <div className="text-sm text-slate-500 leading-relaxed mb-6 space-y-1">
                <p>Centro de Operaciones y Despacho — Av. Urdaneta, Torre Alfa, Of. 8A, Caracas, Distrito Capital, Venezuela</p>
              </div>
              <div className="flex gap-3">
                <a href="https://wa.me/584128288674" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-whatsapp transition-colors">
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a href="mailto:contacto@avilamusic.shop" aria-label="Enviar correo a contacto@avilamusic.shop" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#1e4d6b] transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="tel:+584128288674" aria-label="Llamar al +58 412-8288674" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#1e4d6b] transition-colors">
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                <CirclePlus className="h-5 w-5 text-[#f59e0b]" />
                Tienda
              </h4>
              <ul className="space-y-3">
                <li><Link href="/productos" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />Productos</Link></li>
                <li><Link href="/productos/categoria" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />Categorías</Link></li>
                <li><Link href="/productos" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />Más vendidos</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                <Info className="h-5 w-5 text-[#f59e0b]" />
                Información
              </h4>
              <ul className="space-y-3">
                <li><Link href="/nosotros" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />Nosotros</Link></li>
                <li><Link href="/envios" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />Envíos y entregas</Link></li>
                <li><Link href="/garantias" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />Garantías</Link></li>
                <li><Link href="/faq" className="text-slate-400 hover:text-[#f59e0b] transition-colors flex items-center gap-2 group"><ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />Preguntas frecuentes</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-[#f59e0b]" />
                Contáctanos
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <Phone className="h-4 w-4 text-[#f59e0b]" />
                  </div>
                  <div><a href="tel:+584128288674" className="text-slate-400 hover:text-white transition-colors">+58 412-8288674</a></div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <Mail className="h-4 w-4 text-[#f59e0b]" />
                  </div>
                  <div><a href="mailto:contacto@avilamusic.shop" className="text-slate-400 hover:text-white transition-colors">contacto@avilamusic.shop</a></div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <Clock className="h-4 w-4 text-[#f59e0b]" />
                  </div>
                  <div className="text-slate-400">Lun-Vie: 10am-5pm<br />Sáb: 10am-1pm</div>
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
                <Link href="/garantias" className="text-sm text-slate-400 hover:text-white transition-colors">Garantías y devoluciones</Link>
                <Link href="/politica-privacidad" className="text-sm text-slate-400 hover:text-white transition-colors">Política de privacidad</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
