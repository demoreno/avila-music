'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  src: string
  label: string
}

interface ColorGalleryProps {
  images: GalleryImage[]
  productName: string
}

export default function ColorGallery({ images, productName }: ColorGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function close() {
    setOpenIndex(null)
  }

  function prev() {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }

  function next() {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length))
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {images.map((img, i) => (
          <button
            key={img.label}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group flex flex-col items-center gap-2"
          >
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden ring-1 ring-white/15 shadow-lg transition-transform group-hover:scale-105 group-hover:ring-amber-400/50">
              <Image
                src={img.src}
                alt={`${productName} color ${img.label}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <span className="text-xs text-white/60 group-hover:text-white/90 transition-colors">{img.label}</span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white transition-colors"
            aria-label="Color anterior"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <div className="relative w-full max-w-2xl aspect-[4/5] sm:aspect-[3/4]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[openIndex].src}
              alt={`${productName} color ${images[openIndex].label}`}
              fill
              className="object-contain"
              sizes="(min-width: 768px) 640px, 100vw"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white transition-colors"
            aria-label="Siguiente color"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
            {images[openIndex].label}
          </span>
        </div>
      )}
    </>
  )
}
