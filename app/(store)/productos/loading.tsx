export default function ProductosLoading() {
  return (
    <div role="status" aria-label="Cargando">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <div className="mb-2 h-4 w-32 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card">
              <div className="h-64 w-full animate-pulse bg-slate-200" />
              <div className="flex flex-col gap-3 p-5">
                <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
