import Image from 'next/image'
import Link from 'next/link'
import { whatsappProductLink } from '@/lib/whatsapp'
import type { Product, ProductImage } from '@/types/index'

interface ProductCardProps {
  product: Product & {
    images?: ProductImage[]
    subcategory_name?: string
  }
}

function getImageUrl(images: ProductImage[] | undefined, productId: string): string | null {
  if (!images || images.length === 0) return null
  const primary = images.find((i) => i.is_primary) ?? images[0]
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${primary.storage_path}`
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getImageUrl(product.images, product.id)
  const waLink = whatsappProductLink(product.name, product.price_usd)

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-52 w-full bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl text-slate-300">
            🎵
          </div>
        )}
        {product.stock_total === 0 && (
          <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
            Sin stock
          </span>
        )}
        {product.stock_total > 0 && product.stock_total <= product.stock_minimum && (
          <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
            Últimas unidades
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {product.subcategory_name && (
          <span className="mb-1 text-xs font-medium uppercase tracking-wide text-amber-600">
            {product.subcategory_name}
          </span>
        )}
        <h3 className="flex-1 text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="mt-2 text-xl font-bold text-slate-900">
          USD {product.price_usd.toFixed(2)}
        </p>

        <div className="mt-3 flex gap-2">
          <Link
            href={`/productos/${product.slug}`}
            className="flex-1 rounded-lg border border-amber-600 py-2 text-center text-sm font-semibold text-amber-600 transition-colors hover:bg-amber-600 hover:text-white"
          >
            Ver producto
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg bg-green-500 px-3 py-2 text-white transition-colors hover:bg-green-600"
            title="Consultar por WhatsApp"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
