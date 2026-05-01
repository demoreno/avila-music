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
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:border-primary/30 hover:shadow-lg">
      <div className="relative h-56 w-full bg-bg-alt overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl text-text-light">
            🎵
          </div>
        )}
        
        {product.stock_total === 0 && (
          <span className="absolute left-2 top-2 rounded bg-error px-2 py-1 text-xs font-semibold text-white">
            Sin stock
          </span>
        )}
        {product.stock_total > 0 && product.stock_total <= product.stock_minimum && (
          <span className="absolute left-2 top-2 rounded bg-warning px-2 py-1 text-xs font-semibold text-white">
            Últimas unidades
          </span>
        )}
        
        {/* Quick action button on hover */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-success text-white shadow-md transition-transform hover:scale-110"
            title="Consultar por WhatsApp"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {product.subcategory_name && (
          <span className="mb-2 text-xs font-medium uppercase tracking-wide text-primary">
            {product.subcategory_name}
          </span>
        )}
        <h3 className="flex-1 text-sm font-semibold text-text line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="mt-3 text-xl font-bold text-primary">
          USD {product.price_usd.toFixed(2)}
        </p>

        <div className="mt-3 flex gap-2">
          <Link
            href={`/productos/${product.slug}`}
            className="flex-1 rounded-lg border border-primary py-2 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Ver producto
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg bg-success px-3 py-2 text-white transition-colors hover:bg-success/90"
            title="Consultar por WhatsApp"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
