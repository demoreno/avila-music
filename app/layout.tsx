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
  url: 'https://avilamusic.shop',
  logo: 'https://avilamusic.shop/avila-logo.jpeg',
  sameAs: ['https://wa.me/584128288674'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Urdaneta, Torre Alfa, Oficina 8A',
    addressLocality: 'Caracas',
    addressCountry: 'VE',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'ventas@avilamusic.store',
      telephone: '+58-412-8288674',
      areaServed: 'VE',
      availableLanguage: 'Spanish',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'soporte@avilamusic.store',
      areaServed: 'VE',
      availableLanguage: 'Spanish',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'purchasing',
      email: 'compras@avilamusic.store',
      areaServed: 'VE',
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
