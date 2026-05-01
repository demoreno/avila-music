'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { whatsappProductLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'
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
  const [isHovered, setIsHovered] = useState(false)
  const imageUrl = getImageUrl(product.images, product.id)
  const waLink = whatsappProductLink(product.name, product.price_usd)

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
          <div className="flex h-full items-center justify-center text-6xl text-slate-400">
            🎵
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
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Link
            href={`/productos/${product.slug}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-[#1e4d6b] shadow-lg transition-all hover:scale-110 hover:bg-[#1e4d6b] hover:text-white"
            title="Ver detalles"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
        </div>

        {/* Add to Cart Button - Slide up on hover */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <Link
            href={`/productos/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-white/95 backdrop-blur-sm py-3 text-sm font-semibold text-[#1e4d6b] shadow-lg transition-all hover:bg-[#1e4d6b] hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
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
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold gradient-text">
                USD {product.price_usd.toFixed(2)}
              </p>
              {!isOutOfStock && (
                <p className="mt-1 text-xs text-success font-medium flex items-center gap-1">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Disponible
                </p>
              )}
            </div>
            
            {/* Rating placeholder for future */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#1e4d6b]/5 to-[#f59e0b]/5 blur-2xl" />
    </div>
  )
}
