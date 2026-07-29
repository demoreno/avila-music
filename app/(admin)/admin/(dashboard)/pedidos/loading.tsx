export default function PedidosLoading() {
  return (
    <div role="status" aria-label="Cargando">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-7 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-9 w-32 animate-pulse rounded-lg bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200" />
              <div className="h-3 w-14 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="mb-3 flex-1 space-y-1.5">
              <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="h-3 w-14 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
