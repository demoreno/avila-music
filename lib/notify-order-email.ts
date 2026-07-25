import { Resend } from 'resend'

interface OrderNotificationInput {
  reference: string
  customerEmail: string | null
  shippingAddress: string
  preferredCarrier: string | null
  totalUsd: number
  items: { name: string; quantity: number; unitPriceUsd: number }[]
}

const NOTIFY_TO = 'demoreno@gmail.com'
const FROM = 'Ávila Music <pedidos@avilamusic.store>'

/**
 * Provisional monitoring rule: plain-text heads-up to the owner's inbox on every
 * checkout, so a new order isn't missed if nobody's logged into /admin. Best-effort
 * — never blocks or fails checkout if Resend is down or misconfigured.
 */
export async function notifyNewOrder(input: OrderNotificationInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const itemsText = input.items
    .map((item) => `- ${item.quantity}x ${item.name} (USD ${(item.unitPriceUsd * item.quantity).toFixed(2)})`)
    .join('\n')

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: `Nuevo pedido #${input.reference} — USD ${input.totalUsd.toFixed(2)}`,
      text: `Nuevo pedido desde la web.

Referencia: ${input.reference}
Cliente: ${input.customerEmail ?? 'sin cuenta'}
Total: USD ${input.totalUsd.toFixed(2)}
Transportista preferido: ${input.preferredCarrier ?? 'sin indicar'}
Dirección de envío: ${input.shippingAddress}

Productos:
${itemsText}
`,
    })
  } catch (err) {
    // Best-effort — never breaks checkout, but log so a broken/misconfigured Resend
    // account (the exact thing this rule is supposed to catch) doesn't fail silently.
    console.error('notifyNewOrder failed', err)
  }
}
