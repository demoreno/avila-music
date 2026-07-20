const WHATSAPP_NUMBER = '584128288674'

export function whatsappProductLink(productName: string, price?: number): string {
  const message =
    price !== undefined
      ? `Hola, me interesa el producto: *${productName}* (USD ${price.toFixed(2)}). ¿Está disponible?`
      : `Hola, me interesa el producto: *${productName}*. ¿Podrían darme el precio y disponibilidad?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

