import { ShieldCheck, Ruler, Weight, Palette, Cpu, Maximize2, FileText, PackageCheck } from 'lucide-react'

interface ProductSpecsProps {
  description: string
  notes: string | null
}

const SPEC_ICONS: Record<string, typeof Ruler> = {
  material: PackageCheck,
  medida: Ruler,
  peso: Weight,
  color: Palette,
  calibre: Maximize2,
  compatibilidad: Cpu,
  marca: PackageCheck,
  modelo: Cpu,
  dimensiones: Ruler,
  tamaño: Maximize2,
}

function isSpecLine(line: string): boolean {
  return /^[•\-*✦]?\s*(material|medida|peso|color|calibre|compatibilidad|incluye|contenido|marca|modelo|dimensiones|tamaño):/i.test(
    line.trim()
  )
}

function parseSpecLine(line: string): { label: string; value: string; icon: typeof Ruler } | null {
  const match = line.trim().match(
    /^[•\-*✦]?\s*(material|medida|peso|color|calibre|compatibilidad|incluye|contenido|marca|modelo|dimensiones|tamaño):\s*(.+)/i
  )
  if (!match) return null
  const key = match[1].toLowerCase()
  return {
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: match[2].trim(),
    icon: SPEC_ICONS[key] ?? FileText,
  }
}

export default function ProductSpecs({ description, notes }: ProductSpecsProps) {
  const lines = description.split('\n').filter(Boolean)
  const specLines = lines.filter(isSpecLine)
  const hasSpecs = specLines.length > 0
  const paragraphLines = lines.filter((l) => !isSpecLine(l))

  return (
    <div className="relative rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1e4d6b] via-[#0f7a5f] to-[#f59e0b]" />

      <div className="pl-6 sm:pl-8">
        {/* Header with serif font */}
        <div className="pr-6 sm:pr-8 pt-6 sm:pt-7 pb-5">
          <h3 className="heading-serif text-2xl font-bold text-[#1e4d6b]">
            {hasSpecs ? 'Características' : 'Descripción'}
          </h3>
          <p className="text-xs text-text-muted mt-0.5 tracking-wide">
            {hasSpecs
              ? 'Especificaciones técnicas del producto'
              : 'Información general'}
          </p>
        </div>

        <div className="pr-6 sm:pr-8 pb-7 sm:pb-8">

      {hasSpecs ? (
        <div>
          <div className="space-y-px">
            {specLines.map((line, i) => {
              const spec = parseSpecLine(line)
              if (!spec) return null
              const Icon = spec.icon
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-4 py-3 ${
                    i % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'
                  } rounded-lg`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-xs">
                    <Icon className="h-4 w-4 text-[#1e4d6b]" />
                  </div>
                  <div className="flex flex-1 items-baseline gap-3 min-w-0">
                    <span className="text-[11px] font-semibold text-text-muted uppercase tracking-widest shrink-0 min-w-[5.5rem]">
                      {spec.label}
                    </span>
                    <span className="text-sm font-medium text-text break-words leading-snug">
                      {spec.value}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          {paragraphLines.length > 0 && (
            <div className="mt-5 pt-5 border-t border-slate-100">
              <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
                {paragraphLines.join('\n')}
              </p>
            </div>
          )}
        </div>
      ) : description ? (
        <div className="text-sm text-text-muted leading-relaxed whitespace-pre-line max-w-prose">
          {description}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/40 p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm">
            <FileText className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-semibold text-text">Descripción próximamente</p>
          <p className="text-xs text-text-muted mt-1 max-w-xs mx-auto leading-relaxed">
            ¿Dudas sobre este producto? Escríbenos por WhatsApp y te asesoramos en minutos.
          </p>
        </div>
      )}

      {notes && (
        <div className="mt-5 pt-5 border-t border-slate-100">
          <div className="flex items-start gap-3 rounded-lg bg-amber-50/60 border border-amber-200/50 p-4">
            <ShieldCheck className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800/70 leading-relaxed">{notes}</p>
          </div>
        </div>
      )}
      </div>
      </div>
    </div>
  )
}
