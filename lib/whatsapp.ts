const WHATSAPP_NUMBER = '584138288674'

export function whatsappProductLink(productName: string, price: number): string {
  const message = `Hola, me interesa el producto: *${productName}* (USD ${price.toFixed(2)}). ¿Está disponible?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function whatsappCartLink(
  items: { name: string; qty: number; price: number }[]
): string {
  const itemLines = items
    .map((item) => `• ${item.qty}x ${item.name} — USD ${(item.qty * item.price).toFixed(2)}`)
    .join('\n')

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0)

  const message =
    `Hola, quiero hacer un pedido:\n\n${itemLines}\n\n` +
    `*Total: USD ${total.toFixed(2)}*\n\n¿Pueden confirmar disponibilidad?`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
