'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle2, Music } from 'lucide-react'
import { whatsappProductLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'
import AddToCartButton from '@/components/store/AddToCartButton'
import type { PublicProduct } from '@/lib/catalog'
import { getPublicImageUrl } from '@/lib/catalog/image-url'

interface ProductCardProps {
  product: Omit<PublicProduct, 'price_usd'> & {
    price_usd: number | null
    subcategory_name?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0]
  const imageUrl = primaryImage ? getPublicImageUrl(primaryImage.storage_path) : null
  const waLink = whatsappProductLink(product.name, product.price_usd ?? undefined)

  const isOutOfStock = product.stock_total === 0
  const isLowStock = product.stock_total > 0 && product.stock_total <= product.stock_minimum

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-500 hover:shadow-2xl hover:shadow-[#1e4d6b]/15 will-change-transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/productos/${product.slug}`} className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 block">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              loading="lazy"
              className={`object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-[#1e4d6b]/80 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <Music className="h-16 w-16" strokeWidth={1} />
          </div>
        )}

        {/* Badges on image - only when out of stock for urgency */}
        {isOutOfStock && (
          <div className="absolute left-3 top-3">
            <span className="badge badge-out shadow-lg">Agotado</span>
          </div>
        )}
        {isLowStock && (
          <div className="absolute left-3 top-3">
            <span className="badge badge-low-stock shadow-lg">
              Últimas {product.stock_total}
            </span>
          </div>
        )}

        {/* Quick Actions - Slide in on hover */}
        <div
          className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-whatsapp shadow-lg transition-all hover:scale-110 hover:bg-whatsapp hover:text-white"
            title="Consultar por WhatsApp"
            aria-label={`Consultar ${product.name} por WhatsApp`}
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <AddToCartButton
            product={{
              productId: product.id,
              slug: product.slug,
              name: product.name,
              imageUrl,
              unitPriceUsd: product.price_usd,
              stockTotal: product.stock_total,
            }}
            ariaLabel={`Agregar ${product.name} al carrito`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-[#1e4d6b] shadow-lg transition-all hover:scale-110 hover:bg-[#1e4d6b] hover:text-white disabled:opacity-40 disabled:pointer-events-none"
          >
            {''}
          </AddToCartButton>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        {product.subcategory_name && (
          <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#1e4d6b]/70">
            {product.subcategory_name}
          </span>
        )}

        {/* Product Name */}
        <Link href={`/productos/${product.slug}`}>
          <h3 className="text-lg font-bold text-text line-clamp-2 leading-snug transition-colors hover:text-[#1e4d6b]">
            {product.name}
          </h3>
        </Link>

        {/* Price and Action */}
        <div className="mt-auto pt-4">
          {!isOutOfStock && !isLowStock && product.stock_total < 20 && (
            <span className="badge badge-hot mb-2 shadow-sm">Popular</span>
          )}
          {product.price_usd !== null ? (
            <p className="text-2xl font-bold gradient-text">
              USD {product.price_usd.toFixed(2)}
            </p>
          ) : (
            <p className="text-lg font-semibold gradient-text">
              Cotizar por WhatsApp
            </p>
          )}
          {!isOutOfStock && (
            <p className="mt-1 text-xs text-success font-medium flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Disponible
            </p>
          )}
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#1e4d6b]/5 to-[#f59e0b]/5 blur-2xl" />
    </div>
  )
}
