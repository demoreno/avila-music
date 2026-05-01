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
  title: 'Ávila Music | Accesorios Musicales',
  description:
    'Tienda especializada en accesorios musicales: guitarras, bajos, violines, baterías y equipos electrónicos. Envíos a todo el país.',
  openGraph: {
    siteName: 'Ávila Music',
    locale: 'es_VE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="transition-opacity duration-300">{children}</body>
    </html>
  )
}
