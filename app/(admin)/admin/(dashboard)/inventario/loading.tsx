export default function InventarioLoading() {
  return (
    <div role="status" aria-label="Cargando">
      <div className="mb-6 h-7 w-32 animate-pulse rounded bg-slate-200" />
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-50 p-3">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
        </div>
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3">
              <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
              <div className="ml-auto h-3 w-20 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
