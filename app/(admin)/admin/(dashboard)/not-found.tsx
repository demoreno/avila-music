import Link from 'next/link'

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <span className="heading-serif text-7xl font-bold gradient-text mb-4">404</span>
      <h1 className="heading-serif text-2xl font-bold text-[#1e4d6b] mb-3">
        Página no encontrada
      </h1>
      <p className="text-text-muted text-base mb-8 max-w-md">
        El pedido, orden o publicación que buscas no existe o fue eliminado.
        Revisa que el enlace sea correcto.
      </p>
      <Link href="/admin/dashboard" className="btn-primary">
        Volver al panel
      </Link>
    </div>
  )
}
