'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProductImage } from '@/types/index'

interface ImageGalleryProps {
  images: ProductImage[]
  productName: string
}

function buildUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const sorted = [...images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.sort_order - b.sort_order
  })

  const [active, setActive] = useState(0)

  if (sorted.length === 0) {
    return (
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="absolute inset-0 flex items-center justify-center text-7xl">
          🎵
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-card group">
        <Image
          src={buildUrl(sorted[active].storage_path)}
          alt={productName}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-105"
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        {/* Zoom Indicator */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          Zoom
        </div>
      </div>

      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {sorted.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActive(idx)}
              className={`group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                idx === active
                  ? 'border-[#1e4d6b] shadow-md scale-105'
                  : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#1e4d6b]/30'
              }`}
            >
              <Image
                src={buildUrl(img.storage_path)}
                alt={`${productName} ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="80px"
              />
              {idx === 0 && (
                <div className="absolute top-1 right-1 rounded-full bg-[#1e4d6b] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  Principal
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
