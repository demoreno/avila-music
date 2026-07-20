'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, ArrowRight, CheckCircle2, Music } from 'lucide-react'
import { whatsappProductLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'
import type { PublicProduct } from '@/lib/catalog'

interface ProductCardProps {
  product: Omit<PublicProduct, 'price_usd'> & {
    price_usd: number | null
    subcategory_name?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0]
  const imageUrl = primaryImage ? primaryImage.storage_path : null
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
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
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
            {/* Gradient Overlay on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-[#1e4d6b]/80 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <Music className="h-16 w-16" strokeWidth={1} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {isOutOfStock && (
            <span className="badge badge-out shadow-lg">
              Agotado
            </span>
          )}
          {isLowStock && (
            <span className="badge badge-low-stock shadow-lg">
              Últimas {product.stock_total} unidades
            </span>
          )}
          {!isOutOfStock && !isLowStock && product.stock_total < 20 && (
            <span className="badge badge-hot shadow-lg">
              Popular
            </span>
          )}
        </div>

        {/* Quick Actions - Slide in on hover */}
        <div className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-success shadow-lg transition-all hover:scale-110 hover:bg-success hover:text-white"
            title="Consultar por WhatsApp"
            aria-label={`Consultar ${product.name} por WhatsApp`}
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Link
            href={`/productos/${product.slug}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-[#1e4d6b] shadow-lg transition-all hover:scale-110 hover:bg-[#1e4d6b] hover:text-white"
            title="Ver detalles"
            aria-label={`Ver detalles de ${product.name}`}
          >
            <Eye className="h-5 w-5" />
          </Link>
        </div>

        {/* Ver producto - Slide up on hover */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <Link
            href={`/productos/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-white/95 backdrop-blur-sm py-3 text-sm font-semibold text-[#1e4d6b] shadow-lg transition-all hover:bg-[#1e4d6b] hover:text-white"
          >
            <ArrowRight className="h-5 w-5" />
            Ver producto
          </Link>
        </div>
      </div>

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
          <h3 className="heading-serif text-lg font-bold text-text line-clamp-2 leading-snug transition-colors hover:text-[#1e4d6b]">
            {product.name}
          </h3>
        </Link>

        {/* Price and Action */}
        <div className="mt-auto pt-4">
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
