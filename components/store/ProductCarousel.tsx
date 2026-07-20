'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '@/components/store/ProductCard'
import type { PublicProduct } from '@/lib/catalog'

interface ProductCarouselProps {
  products: (Omit<PublicProduct, 'price_usd'> & { price_usd: number | null })[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: 'left' | 'right') {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-carousel-item]')
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-px-4 pb-2"
      >
        {products.map((product) => (
          <div
            key={product.id}
            data-carousel-item
            className="snap-start flex-shrink-0 w-[260px] sm:w-[280px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCard('left')}
        aria-label="Ver anteriores"
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white shadow-card-hover border border-slate-100 text-[#1e4d6b] hover:bg-[#1e4d6b] hover:text-white transition-all duration-300"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard('right')}
        aria-label="Ver siguientes"
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white shadow-card-hover border border-slate-100 text-[#1e4d6b] hover:bg-[#1e4d6b] hover:text-white transition-all duration-300"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
