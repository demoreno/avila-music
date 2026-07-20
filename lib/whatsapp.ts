const WHATSAPP_NUMBER = '584128288674'

export function whatsappProductLink(productName: string, price: number): string {
  const message = `Hola, me interesa el producto: *${productName}* (USD ${price.toFixed(2)}). ¿Está disponible?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

