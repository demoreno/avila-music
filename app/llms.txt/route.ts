import { catalog } from '@/lib/catalog'

const BASE_URL = 'https://avilamusic.shop'

export async function GET() {
  const categoryTree = await catalog.getCategoryTree()

  const seenCategories = new Set<string>()
  const rootCategories = categoryTree.filter((row) => {
    if (seenCategories.has(row.category_slug)) return false
    seenCategories.add(row.category_slug)
    return true
  })

  const categoryLines = rootCategories
    .map((cat) => `- [${cat.category_name}](${BASE_URL}/productos/categoria/${cat.category_slug})`)
    .join('\n')

  const body = `# Ávila Music

> Tienda venezolana de instrumentos musicales y accesorios 100% originales — guitarras, bajos, violines, batería y electrónica. Pedidos por WhatsApp, envíos a todo el país.

Ávila Music opera principalmente en línea, con despacho a toda Venezuela vía MRW y Zoom. Cuenta con un showroom en Caracas para atención presencial, exclusivamente bajo cita previa. Los precios se muestran solo a visitantes desde Venezuela.

## Catálogo

- [Todos los productos](${BASE_URL}/productos)
${categoryLines}

## Empresa

- [Nosotros](${BASE_URL}/nosotros)
- [Envíos y entregas](${BASE_URL}/envios)
- [Garantías y devoluciones](${BASE_URL}/garantias)
- [Preguntas frecuentes](${BASE_URL}/faq)
- [Términos y condiciones](${BASE_URL}/terminos)
- [Política de privacidad](${BASE_URL}/politica-privacidad)

## Contacto

- Ventas y cotizaciones: ventas@avilamusic.store
- Soporte y garantías: soporte@avilamusic.store
- Alianzas B2B y proveedores: compras@avilamusic.store
- WhatsApp: https://wa.me/584128288674
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
