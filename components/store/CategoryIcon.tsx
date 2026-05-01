import type { SVGProps } from 'react'

interface CategoryIconProps {
  slug: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const categoryIcons: Record<string, (props: SVGProps<SVGSVGElement>) => React.ReactNode> = {
  guitarras: () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52 8C52 8 56 12 56 20C56 28 52 32 52 32L38 46L34 42L48 28C48 28 52 24 52 16C52 12 50 10 50 10L26 34L22 30L46 6C46 6 48 4 52 4C56 4 56 8 52 8Z" fill="currentColor" opacity="0.9"/>
      <circle cx="20" cy="44" r="12" fill="currentColor"/>
      <circle cx="20" cy="44" r="6" fill="white" fillOpacity="0.3"/>
      <path d="M14 50L10 58C8 62 10 64 14 62L22 56" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M26 50L30 58C32 62 30 64 26 62L18 56" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  bajo: () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="24" width="36" height="16" rx="4" fill="currentColor" opacity="0.9"/>
      <circle cx="14" cy="32" r="4" fill="white" fillOpacity="0.3"/>
      <circle cx="24" cy="32" r="4" fill="white" fillOpacity="0.3"/>
      <circle cx="34" cy="32" r="4" fill="white" fillOpacity="0.3"/>
      <path d="M44 28L56 20V44L44 36" fill="currentColor"/>
      <path d="M48 32L56 32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <path d="M10 48L8 56C6 60 8 62 12 60L18 56" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M22 48L20 56C18 60 20 62 24 60L30 56" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  'violin-cuerdas': () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8C24 8 20 14 20 24C20 32 24 38 26 42L22 56C20 60 22 62 26 60L30 52L32 56L34 52L38 60C42 62 44 60 42 56L38 42C40 38 44 32 44 24C44 14 40 8 32 8Z" fill="currentColor" opacity="0.9"/>
      <circle cx="32" cy="28" r="8" fill="white" fillOpacity="0.2"/>
      <path d="M32 12V20" stroke="currentColor" strokeWidth="2"/>
      <path d="M28 16L32 12L36 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 36C24 36 26 40 32 40C38 40 40 36 40 36" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <path d="M26 28C26 28 28 26 32 26C36 26 38 28 38 28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  'bateria-percusion': () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="20" rx="20" ry="8" fill="currentColor" opacity="0.9"/>
      <path d="M12 20V40C12 44 20 48 32 48C44 48 52 44 52 40V20" stroke="currentColor" strokeWidth="3" fill="none"/>
      <ellipse cx="32" cy="40" rx="20" ry="8" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="20" r="6" fill="white" fillOpacity="0.3"/>
      <path d="M48 12L54 6M50 8L56 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="52" cy="4" r="3" fill="currentColor"/>
      <path d="M16 12L10 6M14 8L8 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="12" cy="4" r="3" fill="currentColor"/>
    </svg>
  ),
  'electronica-cables': () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="16" width="32" height="32" rx="6" fill="currentColor" opacity="0.9"/>
      <circle cx="32" cy="28" r="6" fill="white" fillOpacity="0.3"/>
      <path d="M28 40L32 44L36 40" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 34V44" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <path d="M52 32H60" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="60" cy="32" r="3" fill="currentColor"/>
      <path d="M4 32H12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="4" cy="32" r="3" fill="currentColor"/>
      <path d="M56 28L60 32L56 36" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  ),
}

export function getCategoryIcon(slug: string): string {
  const emojiMap: Record<string, string> = {
    guitarras: '🎸',
    bajo: '🎸',
    'violin-cuerdas': '🎻',
    'bateria-percusion': '🥁',
    'electronica-cables': '🔌',
  }
  return emojiMap[slug] ?? '🎵'
}

export default function CategoryIcon({ slug, size = 'md', className = '' }: CategoryIconProps) {
  const IconComponent = categoryIcons[slug]
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }

  if (IconComponent) {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <IconComponent />
      </div>
    )
  }

  return <span className={size === 'xl' ? 'text-6xl' : size === 'lg' ? 'text-5xl' : size === 'md' ? 'text-4xl' : 'text-2xl'}>🎵</span>
}
