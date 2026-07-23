import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Script from 'next/script'
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
  metadataBase: new URL('https://avilamusic.shop'),
  title: {
    default: 'Ávila Music | Tienda de Accesorios Musicales en Caracas',
    template: '%s | Ávila Music',
  },
  description:
    'Tienda de accesorios musicales en Caracas: guitarras, bajos, violines, baterías y equipos electrónicos. Comprá online con envíos a todo el país.',
  manifest: '/manifest.json',
  openGraph: {
    siteName: 'Ávila Music',
    locale: 'es_VE',
    type: 'website',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicStore',
  '@id': 'https://avilamusic.shop/#store',
  name: 'Ávila Music',
  url: 'https://avilamusic.shop',
  logo: 'https://avilamusic.shop/avila-logo.jpeg',
  image: 'https://avilamusic.shop/avila-logo.jpeg',
  telephone: '+58-412-8288674',
  email: 'contacto@avilamusic.shop',
  priceRange: '$',
  description: 'Tienda de accesorios musicales en Caracas — cuerdas, guitarras, bajos, violines, batería y más. Envíos a todo el país.',
  sameAs: [
    'https://wa.me/584128288674',
    'https://www.instagram.com/avilamusiccs',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Urdaneta, Torre Alfa, Oficina 8A',
    addressLocality: 'Caracas',
    addressRegion: 'Distrito Capital',
    postalCode: '1010',
    addressCountry: 'VE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 10.5012,
    longitude: -66.9026,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00',
    },
  ],
  areaServed: 'VE',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+58-412-8288674',
      email: 'ventas@avilamusic.store',
      availableLanguage: ['Spanish', 'English'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'soporte@avilamusic.store',
      availableLanguage: 'Spanish',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'purchasing',
      email: 'compras@avilamusic.store',
      availableLanguage: 'Spanish',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="transition-opacity duration-300" suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S6G6DY0JP2"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S6G6DY0JP2');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
