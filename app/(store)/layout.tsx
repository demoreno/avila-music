import Link from 'next/link'
import Image from 'next/image'
import CartButton from './CartButton'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <header className="sticky top-0 z-50 border-b border-edge bg-ink/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/avila-logo.jpeg"
              alt="Ávila Music"
              width={36}
              height={36}
              className="rounded-full object-cover ring-1 ring-edge"
            />
            <span className="heading-serif text-xl font-semibold tracking-wide text-cream">Ávila Music</span>
          </Link>

          <nav className="hidden items-center gap-7 sm:flex">
            <Link href="/" className="text-sm text-sand transition-colors hover:text-cream">
              Inicio
            </Link>
            <Link href="/productos" className="text-sm text-sand transition-colors hover:text-cream">
              Productos
            </Link>
            <Link href="/productos?view=categorias" className="text-sm text-sand transition-colors hover:text-cream">
              Categorías
            </Link>
          </nav>

          <CartButton />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-edge bg-panel py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/avila-logo.jpeg"
                  alt="Ávila Music"
                  width={36}
                  height={36}
                  className="rounded-full object-cover ring-1 ring-edge"
                />
                <span className="heading-serif text-xl font-semibold text-cream">Ávila Music</span>
              </div>
              <p className="mt-2 max-w-xs text-sm text-sand">
                Accesorios musicales de calidad · Envíos a todo el país
              </p>
            </div>
            <a
              href="https://wa.me/584138288674"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded border border-green-800 bg-green-950/60 px-5 py-2.5 text-sm font-semibold text-green-400 transition-all hover:border-green-700 hover:bg-green-900/50 hover:text-green-300"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
          <div className="mt-8 border-t border-edge pt-6 text-center text-xs text-sand/50">
            © {new Date().getFullYear()} Ávila Music. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
