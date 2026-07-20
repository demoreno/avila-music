import type { MetadataRoute } from 'next'

// Bots de asistentes de IA (búsqueda/respuesta) a los que permitimos explícitamente
// leer el catálogo, para que puedan citarnos o recomendarnos en sus respuestas.
const AI_ASSISTANT_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
      ...AI_ASSISTANT_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: '/admin/',
      })),
    ],
    sitemap: 'https://avilamusic.shop/sitemap.xml',
  }
}
