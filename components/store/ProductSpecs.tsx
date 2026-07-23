import { Ruler, Package, ShieldCheck } from 'lucide-react'

interface ProductSpecsProps {
  description: string
  notes: string | null
  stockTotal: number
  stockMinimum: number
}

function isSpecLine(line: string): boolean {
  return /^[•\-*✦]?\s*(material|medida|peso|color|calibre|compatibilidad|incluye|contenido|marca|modelo|dimensiones|tamaño):/i.test(
    line.trim()
  )
}

function parseSpecLine(line: string): { label: string; value: string } | null {
  const match = line.trim().match(
    /^[•\-*✦]?\s*(material|medida|peso|color|calibre|compatibilidad|incluye|contenido|marca|modelo|dimensiones|tamaño):\s*(.+)/i
  )
  if (!match) return null
  return {
    label: match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase(),
    value: match[2].trim(),
  }
}

export default function ProductSpecs({ description, notes, stockTotal, stockMinimum }: ProductSpecsProps) {
  const lines = description.split('\n').filter(Boolean)
  const specLines = lines.filter(isSpecLine)
  const hasSpecs = specLines.length > 0
  const paragraphLines = lines.filter((l) => !isSpecLine(l))

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-semibold text-[#1e4d6b] mb-4 flex items-center gap-2">
        <Package className="h-5 w-5" />
        {hasSpecs ? 'Características' : 'Descripción'}
      </h3>

      {hasSpecs ? (
        <div className="space-y-3">
          {specLines.map((line, i) => {
            const spec = parseSpecLine(line)
            if (!spec) return null
            return (
              <div key={i} className="flex items-baseline gap-2 text-sm">
                <span className="min-w-[7rem] font-medium text-text-muted">{spec.label}</span>
                <span className="text-text">{spec.value}</span>
              </div>
            )
          })}
          {paragraphLines.length > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
                {paragraphLines.join('\n')}
              </p>
            </div>
          )}
        </div>
      ) : description ? (
        <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">{description}</p>
      ) : (
        <div className="rounded-xl bg-slate-50 border border-dashed border-slate-200 p-4 text-center">
          <Ruler className="h-8 w-8 mx-auto text-slate-300 mb-2" strokeWidth={1.5} />
          <p className="text-sm text-text-muted mb-1">Contenido en preparación</p>
          <p className="text-xs text-slate-400">
            {stockTotal > 0
              ? 'Escríbenos por WhatsApp y te asesoramos'
              : 'Consúltenos disponibilidad por WhatsApp'}
          </p>
        </div>
      )}

      {notes && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-start gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>{notes}</span>
          </div>
        </div>
      )}
    </div>
  )
}
