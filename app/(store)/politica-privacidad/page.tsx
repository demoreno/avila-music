import type { Metadata } from 'next'
import { Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad y protección de datos personales de Ávila Music.',
  alternates: { canonical: '/politica-privacidad' },
}

export default function PoliticaPrivacidadPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary-light/30 via-white to-primary-light/30">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Legal
          </span>
          <h1 className="heading-serif mt-4 text-5xl font-bold gradient-text sm:text-6xl">
            Política de<br />
            privacidad
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="prose prose-lg max-w-none">

            <div className="rounded-2xl border border-border bg-bg-alt p-8 sm:p-12">
              <p className="text-text-muted mb-8">
                <strong className="text-text">Última actualización:</strong> Julio 2026
              </p>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  1. Responsable del tratamiento
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Ávila Music es responsable del tratamiento de los datos personales recolectados
                  a través de este sitio web y de los canales de contacto oficiales de la tienda.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  2. Datos que recolectamos
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="leading-relaxed">
                    <strong className="text-text">2.1 Datos de contacto:</strong> Nombre, número
                    de teléfono, correo electrónico y dirección de envío, proporcionados al
                    consultar o realizar un pedido.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">2.2 Datos de la operación:</strong> Historial de
                    pedidos, preferencias de producto y comunicaciones sostenidas por WhatsApp o
                    correo electrónico.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">2.3 Datos de navegación:</strong> Información
                    técnica básica (páginas visitadas, dispositivo) recolectada de forma anónima
                    para mejorar el funcionamiento del sitio.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  3. Finalidad del tratamiento
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="leading-relaxed">
                    Utilizamos tus datos exclusivamente para: procesar pedidos y cotizaciones,
                    coordinar envíos con nuestras empresas de mensajería, brindar soporte técnico
                    y garantías, y comunicarnos contigo sobre el estado de tu compra.
                  </p>
                  <p className="leading-relaxed">
                    No utilizamos tus datos personales para fines distintos a los aquí descritos
                    sin tu consentimiento explícito.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  4. Con quién compartimos tus datos
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="leading-relaxed">
                    <strong className="text-text">4.1 Empresas de envío:</strong> Compartimos los
                    datos de contacto y dirección estrictamente necesarios con MRW y Zoom para
                    completar la entrega de tu pedido.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">4.2 Proveedores y alianzas B2B:</strong> Los
                    datos de contacto proporcionados a través del correo de compras se utilizan
                    únicamente para evaluar y coordinar alianzas comerciales, y no se ceden a
                    terceros.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-text">4.3 No vendemos datos:</strong> No comercializamos
                    ni cedemos tu información personal a terceros con fines publicitarios.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  5. Tus derechos
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Puedes solicitar acceso, corrección o eliminación de tus datos personales
                  escribiendo a{' '}
                  <span className="text-text font-medium">soporte@avilamusic.store</span>.
                  Atendemos estas solicitudes dentro de un plazo razonable.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  6. Conservación de datos
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Conservamos tus datos mientras exista una relación comercial activa o mientras
                  sea necesario para cumplir obligaciones legales, fiscales o de garantía.
                </p>
              </section>

              <section>
                <h2 className="heading-serif text-2xl font-bold text-text mb-4">
                  7. Contacto
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  Para dudas sobre esta política o el tratamiento de tus datos, contáctanos:
                </p>
                <div className="rounded-xl border border-border bg-white p-6 shadow-card">
                  <p className="text-text-muted">
                    <strong className="text-text">WhatsApp:</strong> +58 412-8288674<br />
                    <strong className="text-text">Soporte:</strong> soporte@avilamusic.store<br />
                    <strong className="text-text">Horario:</strong> Lunes a Viernes 10am-6pm, Sábados 10am-1pm
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Aceptación */}
      <section className="py-20 bg-bg-alt">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-card">
            <Lock className="h-12 w-12 text-accent mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-text-muted">
              Al utilizar este sitio y proporcionar tus datos, aceptas el tratamiento
              descrito en esta política de privacidad.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
