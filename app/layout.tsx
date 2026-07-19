import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://avilamusic.com'),
  title: {
    default: 'Ávila Music | Accesorios Musicales',
    template: '%s | Ávila Music',
  },
  description:
    'Tienda especializada en accesorios musicales: guitarras, bajos, violines, baterías y equipos electrónicos. Envíos a todo el país.',
  manifest: '/manifest.json',
  openGraph: {
    siteName: 'Ávila Music',
    locale: 'es_VE',
    type: 'website',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ávila Music',
  url: 'https://avilamusic.com',
  logo: 'https://avilamusic.com/avila-logo.jpeg',
  sameAs: ['https://wa.me/584138288674'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="transition-opacity duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
