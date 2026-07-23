import type { CartItem } from './cart/types'

const WHATSAPP_NUMBER = '584128288674'

export function whatsappProductLink(productName: string, price?: number, quantity?: number): string {
  const qty = quantity && quantity > 1
  const label = qty ? `×${quantity} ${productName}` : productName
  const total = qty && price !== undefined ? price * quantity : price
  const message =
    total !== undefined
      ? `Hola, me interesa: *${label}* (USD ${total.toFixed(2)}). ¿Está disponible?`
      : `Hola, me interesa: *${label}*. ¿Podrían darme el precio y disponibilidad?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function whatsappOrderLink(items: CartItem[], orderNumber: string): string {
  const lines = items.map((item) => {
    const lineTotal = item.unitPriceUsd !== null ? ` — USD ${(item.unitPriceUsd * item.quantity).toFixed(2)}` : ''
    return `• ${item.quantity}x ${item.name}${lineTotal}`
  })

  const hasAllPrices = items.every((item) => item.unitPriceUsd !== null)
  const total = hasAllPrices
    ? items.reduce((sum, item) => sum + (item.unitPriceUsd as number) * item.quantity, 0)
    : null

  const message = [
    `Hola, quiero confirmar mi pedido *#${orderNumber}*:`,
    '',
    ...lines,
    '',
    total !== null ? `*Total: USD ${total.toFixed(2)}*` : '*Total: a confirmar*',
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

