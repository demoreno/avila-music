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
      <div className="flex h-80 items-center justify-center rounded-xl bg-slate-100 text-7xl text-slate-300">
        🎵
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative h-80 w-full overflow-hidden rounded-xl bg-slate-100 sm:h-96">
        <Image
          src={buildUrl(sorted[active].storage_path)}
          alt={productName}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sorted.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActive(idx)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                idx === active ? 'border-amber-500' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={buildUrl(img.storage_path)}
                alt={`${productName} ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
