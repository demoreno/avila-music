import Link from 'next/link'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="heading-serif text-7xl font-bold gradient-text mb-4">404</span>
      <h1 className="heading-serif text-3xl sm:text-4xl font-bold text-[#1e4d6b] mb-4">
        No encontramos esta página
      </h1>
      <p className="text-text-muted text-lg mb-10 max-w-md">
        El enlace puede estar roto o el producto ya no está disponible. Volvé al catálogo o escribinos si buscabas algo puntual.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/productos" className="btn-primary">
          Ver productos
        </Link>
        <a
          href="https://wa.me/584128288674"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 border border-slate-200 text-[#1e4d6b] font-semibold rounded-xl hover:border-[#1e4d6b]/30 hover:bg-slate-50 transition-all duration-300"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
