export default function CuentaLoading() {
  return (
    <div role="status" aria-label="Cargando" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-14 w-14 animate-pulse rounded-full bg-slate-200" />
        <div className="space-y-2">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-40 animate-pulse rounded bg-slate-200" />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 h-4 w-24 animate-pulse rounded bg-slate-200" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  )
}
