export default function OrdenDetalleLoading() {
  return (
    <div role="status" aria-label="Cargando">
      <div className="mb-6">
        <div className="h-7 w-56 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-3 w-40 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-3 h-3 w-20 animate-pulse rounded bg-slate-200" />
            <div className="space-y-2.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-slate-100" />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-3 h-3 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-10 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="h-24 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="h-24 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}
