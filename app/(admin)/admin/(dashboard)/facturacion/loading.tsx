export default function FacturacionLoading() {
  return (
    <div role="status" aria-label="Cargando">
      <div className="mb-2 h-7 w-32 animate-pulse rounded bg-slate-200" />
      <div className="mb-6 h-3 w-80 animate-pulse rounded bg-slate-200" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 h-3 w-28 animate-pulse rounded bg-slate-200" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-slate-100" />
            <div className="mt-5 rounded-lg border border-dashed border-slate-300 py-8">
              <div className="mx-auto h-3 w-48 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-9 animate-pulse rounded-lg bg-slate-100" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
