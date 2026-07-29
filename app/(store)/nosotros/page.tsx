import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Check, Target, Handshake, Truck, Percent, Scale } from 'lucide-react'
import WhatsAppIcon from '@/components/shared/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce la historia de Ávila Music, tienda de accesorios musicales en Caracas. Calidad y confianza para músicos en toda Venezuela.',
  alternates: { canonical: '/nosotros' },
}

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[300px] flex items-center bg-gradient-to-r from-primary-light/30 via-white to-primary-light/30">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            Desde 2020
          </span>
          <h1 className="heading-serif text-4xl sm:text-5xl font-bold text-text">
            De músicos para músicos:<br />
            <span className="text-primary">accesorios de verdad</span>
          </h1>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Desde 2020
              </span>
              <h2 className="heading-serif text-3xl sm:text-4xl font-bold text-text mb-6">
                Una historia que empezó<br />con una cuerda rota
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-4">
                Ávila Music nació en 2020 porque conseguir un juego de cuerdas en Caracas era una odisea.
                No encontrabas lo que buscabas, o pagabas sobreprecio por productos que no merecían la pena.
                Así que decidimos hacerlo nosotros: buscar los mejores proveedores, traer productos originales
                y ofrecerlos a un precio justo.
              </p>
              <p className="text-text-muted text-lg leading-relaxed mb-4">
                Empezamos desde casa, con un inventario que cabía en un estante. Los primeros pedidos
                llegaban por WhatsApp, de músicos que conocían a músicos. Hoy despachamos a cualquier
                ciudad de Venezuela con MRW y Zoom, y trabajamos con marcas como Ernie Ball, D'Addario,
                Yamaha y Alice, entre otras.
              </p>
              <p className="text-text-muted text-lg leading-relaxed">
                Cada producto que vendemos es 100% original, comprado directo a fabricantes y distribuidores
                autorizados. Sin intermediarios. Sin sorpresas. Porque si hay algo que entendemos, es que un
                músico no puede darse el lujo de un instrumento que falla.
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/photo-1511379938547-c1f69419868d.webp"
                  alt="Música y pasión"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-bg-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-serif text-3xl font-bold text-text mb-3">Cómo trabajamos</h2>
            <p className="text-text-muted">Esto es lo que nos diferencia</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Target,
                  title: 'Calidad que puedes sentir',
                  description: 'Probamos cada producto antes de ofrecerlo. Si no pasa nuestro filtro, no llega a tus manos.',
                },
                {
                  icon: Handshake,
                  title: 'Humanos al otro lado',
                  description: 'Cuando escribes por WhatsApp, responden músicos que saben lo que vendemos. Sin guiones, sin robos.',
                },
                {
                  icon: Truck,
                  title: 'Llegamos donde estés',
                  description: 'Despachamos a cualquier ciudad de Venezuela con MRW y Zoom. Tu pedido llega seguro y en tiempo.',
                },
                {
                  icon: Percent,
                  title: 'Sin letra chica',
                  description: 'El precio que ves es el precio que pagas. Sin cargos ocultos ni sorpresas al pagar.',
                },
              ].map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{value.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-serif text-3xl font-bold text-text mb-3">Hitos importantes</h2>
            <p className="text-text-muted">Nuestro camino</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/30" />

            <div className="space-y-10">
              {[
                {
                  year: '2020',
                  title: 'Un estante y un WhatsApp',
                  description: 'Empezamos desde casa con cuerdas y accesorios básicos. Los primeros clientes llegaron porque un músico le dijo a otro.',
                },
                {
                  year: '2022',
                  title: 'De Caracas para el país',
                  description: 'Cerramos nuestras primeras alianzas con MRW y Zoom. Por primera vez, un músico en Maracaibo o Puerto Ordaz podía comprarnos sin moverse de su casa.',
                },
                {
                  year: '2024',
                  title: 'Marcas que suman',
                  description: 'Incorporamos líneas completas de Ernie Ball, D\'Addario, Yamaha y Alice. Pasamos de tener productos a tener catálogo.',
                },
                {
                  year: '2026',
                  title: 'La tienda en tu bolsillo',
                  description: 'Lanzamos nuestra plataforma web para que puedas comprar desde donde estés, con envíos a tu ciudad y precios en tiempo real.',
                },
              ].map((milestone, index) => (
                <div key={milestone.year} className="relative flex gap-6">
                  <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary ring-4 ring-white shadow-md">
                    <span className="text-sm font-bold text-white">{milestone.year}</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-text">{milestone.title}</h3>
                    <p className="mt-2 text-text-muted leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calidad-Precio */}
      <section className="py-16 bg-bg-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-primary/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Scale className="h-16 w-16 mx-auto mb-4 text-primary" strokeWidth={1.5} />
                    <p className="text-2xl heading-serif font-bold text-primary">Calidad + Precio Justo</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Nuestro compromiso
              </span>
              <h2 className="heading-serif text-3xl font-bold text-text mb-6">
                Calidad sin pagar de más
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-4">
                Comprar directo a fabricantes reconocidos tiene una ventaja clara: pagas lo que el producto vale, no lo que un intermediario decide marcar. Por eso trabajamos con Ernie Ball, D'Addario, Yamaha y otras marcas sin cadenas de distribución infladas.
              </p>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                Antes de ofrecer un producto, lo probamos. Si no pasa la prueba de durabilidad, sonido y precio justo, no llega al catálogo. Así de simple.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
<Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-text font-semibold">Productos verificados</h3>
                    <p className="text-sm text-text-muted">Probados por músicos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
<Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-text font-semibold">Precios competitivos</h3>
                    <p className="text-sm text-text-muted">Sin intermediarios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Marcas que distribuimos
            </span>
            <h2 className="heading-serif text-3xl font-bold text-text mb-3">Las marcas que tocas</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Trabajamos con fabricantes que cualquier músico conoce. Originales, directo de fábrica, 
              sin réplicas ni imitaciones.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Ernie Ball', file: 'ernie-ball.webp', bg: 'bg-white' },
              { name: "D'Addario", file: 'daddario-logo.jpg', bg: 'bg-white' },
              { name: 'Alice', file: 'alice-logo.jpeg', bg: 'bg-white' },
              { name: 'Smiger', file: 'smiger.png', bg: 'bg-white' },
              { name: 'Wilkinson', file: 'wilkinson.png', bg: 'bg-white' },
              { name: 'Yamaha', file: 'Yamaha-Logo.png', bg: 'bg-white' },
            ].map((brand) => (
              <div
                key={brand.name}
                className={`group flex items-center justify-center rounded-xl border border-border ${brand.bg} p-4 transition-all hover:border-primary/30 hover:shadow-md`}
              >
                <div className="relative h-16 w-full flex items-center justify-center">
                  <Image
                    src={`/marcas/${brand.file}`}
                    alt={brand.name}
                    fill
                    className="object-contain opacity-70 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-text-muted text-sm">
            Y muchas más marcas de calidad disponibles en nuestro catálogo
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="heading-serif text-3xl sm:text-4xl font-bold text-text mb-4">
            ¿Buscas algo puntual?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Escríbenos por WhatsApp y te respondemos al instante. O recorre nuestro catálogo completo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Ver catálogo completo
            </Link>
            <a
              href="https://wa.me/584128288674"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white px-8 py-3.5 rounded-lg font-semibold transition-all"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
