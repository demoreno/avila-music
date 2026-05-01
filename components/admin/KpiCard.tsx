interface KpiCardProps {
  label: string
  value: string
  delta?: number
  deltaLabel?: string
  prefix?: string
  suffix?: string
}

export default function KpiCard({
  label,
  value,
  delta,
  deltaLabel,
  prefix,
  suffix,
}: KpiCardProps) {
  const isPositive = delta !== undefined && delta >= 0

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">
        {prefix && <span className="text-lg font-semibold text-slate-600">{prefix}</span>}
        {value}
        {suffix && <span className="ml-1 text-lg font-semibold text-slate-600">{suffix}</span>}
      </p>
      {delta !== undefined && (
        <p
          className={`mt-2 text-sm font-medium ${
            isPositive ? 'text-emerald-600' : 'text-red-500'
          }`}
        >
          {isPositive ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
          {deltaLabel && <span className="ml-1 font-normal text-slate-400">{deltaLabel}</span>}
        </p>
      )}
    </div>
  )
}
