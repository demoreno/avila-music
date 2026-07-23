'use client'

import { useState } from 'react'
import { whatsappProductLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'
import AddToCartButton from './AddToCartButton'
import QuantityInput from './QuantityInput'

interface ProductActionsProps {
  product: {
    productId: string
    slug: string
    name: string
    imageUrl: string | null
    unitPriceUsd: number | null
    stockTotal: number
    stockMinimum: number
  }
  showPrices: boolean
}

export default function ProductActions({ product, showPrices }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1)
  const maxQty = product.stockTotal > 0 ? product.stockTotal : 99

  const isOutOfStock = product.stockTotal === 0
  const isLowStock = product.stockTotal > 0 && product.stockTotal <= product.stockMinimum

  const waLink = whatsappProductLink(
    product.name,
    showPrices ? product.unitPriceUsd ?? undefined : undefined,
    quantity
  )

  function getWhatsAppLabel(): string {
    if (isOutOfStock) return 'Consultar disponibilidad'
    if (!showPrices) return 'Consultar precio'
    return 'Pedir por WhatsApp'
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Quantity + CTAs */}
      <div className="flex flex-col gap-4">
        {!isOutOfStock && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-text-muted">Cantidad</span>
            <QuantityInput value={quantity} max={maxQty} onChange={setQuantity} />
            {isLowStock && (
              <span className="text-xs font-medium text-amber-600">
                Quedan {product.stockTotal} unidades
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {!isOutOfStock && (
            <AddToCartButton
              product={{
                productId: product.productId,
                slug: product.slug,
                name: product.name,
                imageUrl: product.imageUrl,
                unitPriceUsd: product.unitPriceUsd,
                stockTotal: product.stockTotal,
              }}
              quantity={quantity}
              className="btn-primary btn-glow justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 w-full"
            />
          )}

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-3 rounded-xl font-semibold transition-all duration-300 py-4 w-full ${
              isOutOfStock
                ? 'bg-gradient-to-r from-whatsapp to-whatsapp-hover text-white shadow-xl shadow-whatsapp/30 hover:shadow-2xl hover:shadow-whatsapp/40 hover:scale-[1.02]'
                : 'border-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white hover:scale-[1.02]'
            }`}
          >
            <WhatsAppIcon className="h-5 w-5" />
            {getWhatsAppLabel()}
          </a>
        </div>
      </div>
    </div>
  )
}
