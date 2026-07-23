'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ZoomIn, X, Music, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProductImage } from '@/types/index'
import { getPublicImageUrl } from '@/lib/catalog/image-url'

interface ImageGalleryProps {
  images: ProductImage[]
  productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const sorted = [...images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.sort_order - b.sort_order
  })

  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  function openLightbox() {
    if (sorted.length > 0) setLightboxOpen(true)
  }

  function closeLightbox() {
    setLightboxOpen(false)
  }

  function prevImage(e: React.MouseEvent) {
    e.stopPropagation()
    setActive((a) => (a - 1 + sorted.length) % sorted.length)
  }

  function nextImage(e: React.MouseEvent) {
    e.stopPropagation()
    setActive((a) => (a + 1) % sorted.length)
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + sorted.length) % sorted.length)
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % sorted.length)
    },
    [lightboxOpen, sorted.length]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxOpen])

  if (sorted.length === 0) {
    return (
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
          <Music className="h-20 w-20" strokeWidth={1} />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-card group">
          <button
            type="button"
            onClick={openLightbox}
            className="absolute inset-0 cursor-zoom-in"
            aria-label={`Ver ${productName} ampliada`}
          >
            <Image
              src={getPublicImageUrl(sorted[active].storage_path)}
              alt={productName}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-105 pointer-events-none"
              priority
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </button>

          {sorted.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#1e4d6b] shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#1e4d6b] shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <ZoomIn className="h-4 w-4" />
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
                aria-label={`Ver imagen ${idx + 1} de ${productName}`}
                aria-current={idx === active}
                className={`group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  idx === active
                    ? 'border-[#1e4d6b] shadow-md scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#1e4d6b]/30'
                }`}
              >
                <Image
                  src={getPublicImageUrl(img.storage_path)}
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

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen de ${productName}`}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Cerrar zoom"
          >
            <X className="h-6 w-6" />
          </button>

          {sorted.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <div className="relative h-full w-full p-4 sm:p-8 md:p-16">
            <Image
              src={getPublicImageUrl(sorted[active].storage_path)}
              alt={`${productName} — ampliada`}
              fill
              className="object-contain"
              sizes="100vw"
              quality={95}
              priority
            />
          </div>

          {sorted.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {active + 1} / {sorted.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}
