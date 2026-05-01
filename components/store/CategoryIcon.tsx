const categoryEmojis: Record<string, string> = {
  guitarras: '🎸',
  bajo: '🎸',
  'violin-cuerdas': '🎻',
  'bateria-percusion': '🥁',
  'electronica-cables': '🔌',
}

export function getCategoryEmoji(slug: string): string {
  return categoryEmojis[slug] ?? '🎵'
}

export default function CategoryIcon({ slug, size = 'md' }: { slug: string; size?: 'sm' | 'md' | 'lg' }) {
  const emoji = getCategoryEmoji(slug)
  const sizeClass = { sm: 'text-2xl', md: 'text-4xl', lg: 'text-6xl' }[size]

  return <span className={sizeClass} role="img" aria-label={slug}>{emoji}</span>
}
