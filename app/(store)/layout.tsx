import Link from 'next/link'
import Image from 'next/image'
import CartButton from './CartButton'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm will-change-transform">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/avila-logo.jpeg"
              alt="Ávila Music"
              width={40}
              height={40}
              className="rounded-full object-cover ring-2 ring-[#1e4d6b]/20 transition-transform group-hover:scale-105"
              priority
            />
            <div>
              <span className="heading-serif text-2xl font-bold text-[#1e4d6b]">Ávila Music</span>
              <p className="text-xs text-text-muted -mt-1">Accesorios Musicales</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 sm:flex">
            <Link href="/" className="text-sm font-medium text-text hover:text-[#1e4d6b] transition-colors" prefetch>
              Inicio
            </Link>
            <Link href="/productos" className="text-sm font-medium text-text hover:text-[#1e4d6b] transition-colors" prefetch>
              Productos
            </Link>
            <Link href="/productos?view=categorias" className="text-sm font-medium text-text hover:text-[#1e4d6b] transition-colors" prefetch>
              Categorías
            </Link>
            <Link href="/nosotros" className="text-sm font-medium text-text hover:text-[#1e4d6b] transition-colors" prefetch>
              Nosotros
            </Link>
            <Link href="/envios" className="text-sm font-medium text-text hover:text-[#1e4d6b] transition-colors" prefetch>
              Envíos
            </Link>
            <Link href="/contacto" className="text-sm font-medium text-text hover:text-[#1e4d6b] transition-colors" prefetch>
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/584138288674"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-success hover:text-success/80 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <CartButton />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/avila-logo.jpeg"
                  alt="Ávila Music"
                  width={40}
                  height={40}
                  className="rounded-full object-cover ring-2 ring-[#1e4d6b]/20"
                />
                <span className="heading-serif text-xl font-bold text-[#1e4d6b]">Ávila Music</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Accesorios musicales de calidad para artistas y entusiastas. Envíos a todo el país.
              </p>
            </div>

            {/* Enlaces */}
            <div>
              <h4 className="font-semibold text-text mb-4">Tienda</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/productos" className="text-text-muted hover:text-[#1e4d6b] transition-colors">Productos</Link></li>
                <li><Link href="/productos?view=categorias" className="text-text-muted hover:text-[#1e4d6b] transition-colors">Categorías</Link></li>
                <li><Link href="/productos" className="text-text-muted hover:text-[#1e4d6b] transition-colors">Más vendidos</Link></li>
              </ul>
            </div>

            {/* Información */}
            <div>
              <h4 className="font-semibold text-text mb-4">Información</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/nosotros" className="text-text-muted hover:text-[#1e4d6b] transition-colors">Nosotros</Link></li>
                <li><Link href="/envios" className="text-text-muted hover:text-[#1e4d6b] transition-colors">Envíos y entregas</Link></li>
                <li><Link href="/garantias" className="text-text-muted hover:text-[#1e4d6b] transition-colors">Garantías</Link></li>
                <li><Link href="/faq" className="text-text-muted hover:text-[#1e4d6b] transition-colors">Preguntas frecuentes</Link></li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-semibold text-text mb-4">Contáctanos</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-[#1e4d6b] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+584138288674" className="hover:text-[#1e4d6b] transition-colors">+58 413-8288674</a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-[#1e4d6b] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contacto@avilamusic.com" className="hover:text-[#1e4d6b] transition-colors">contacto@avilamusic.com</a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-[#1e4d6b] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Lun-Vie: 9am-6pm · Sáb: 9am-1pm</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-text-muted">
                © {new Date().getFullYear()} Ávila Music. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/terminos" className="text-sm text-text-muted hover:text-[#1e4d6b] transition-colors">
                  Términos y condiciones
                </Link>
                <a
                  href="https://wa.me/584138288674"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-success px-4 py-2 text-sm font-semibold text-white hover:bg-success/90 transition-colors"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
