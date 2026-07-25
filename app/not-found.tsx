import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white px-6 overflow-hidden">
      {/* Decorative background blobs */}
      <div
        className="deco-circle deco-gradient pointer-events-none"
        style={{ width: '500px', height: '500px', top: '-200px', right: '-150px' }}
      />
      <div
        className="deco-circle deco-gold pointer-events-none"
        style={{ width: '400px', height: '400px', bottom: '-180px', left: '-120px' }}
      />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Logo */}
        <div className="mb-8 animate-fade-in-up">
          <div className="relative mx-auto w-fit">
            <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl animate-pulse-glow" />
            <img
              src="/avila-logo.jpeg"
              alt="Ávila Music"
              width={96}
              height={96}
              className="relative rounded-full object-cover ring-4 ring-amber-500/20"
            />
          </div>
        </div>

        {/* Waveform decoration */}
        <div className="flex items-end gap-[3px] h-16 mb-8 animate-fade-in-up stagger-1">
          {[0.3, 0.6, 0.9, 1.2, 0.5, 1.5, 0.7, 1.0, 0.4].map((delay, i) => (
            <div
              key={i}
              className="waveform-bar"
              style={{ '--delay': `${delay}s`, '--duration': `${1.2 + (i * 0.1)}s` } as React.CSSProperties}
            />
          ))}
        </div>

        {/* 404 */}
        <h1 className="heading-serif text-8xl sm:text-9xl font-bold gradient-text mb-4 animate-scale-in stagger-2 leading-none">
          404
        </h1>

        {/* Message */}
        <p className="heading-serif text-2xl sm:text-3xl font-semibold text-[#1e4d6b] mb-3 animate-fade-in-up stagger-3">
          Esta nota no está en el pentagrama
        </p>
        <p className="text-text-muted text-base sm:text-lg mb-10 max-w-md animate-fade-in-up stagger-4 leading-relaxed">
          Parece que la página que buscas no está en nuestro repertorio.
          Pero no te preocupes — la tienda sigue sonando.
          Vuelve al inicio o explorá nuestros productos.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up stagger-5">
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
          <Link href="/productos" className="btn-outline">
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  )
}
