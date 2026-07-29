export default function BlogLoading() {
  return (
    <div role="status" aria-label="Cargando" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-12 flex flex-col items-center gap-3">
        <div className="h-9 w-28 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-64 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card">
            <div className="aspect-video w-full animate-pulse bg-slate-200" />
            <div className="flex flex-col gap-3 p-5">
              <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
