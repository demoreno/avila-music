export default function CategoriasLoading() {
  return (
    <div role="status" aria-label="Cargando" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-2 h-8 w-40 animate-pulse rounded bg-slate-200" />
      <div className="mb-10 h-4 w-72 animate-pulse rounded bg-slate-200" />

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-card">
            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
            <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-10 animate-pulse rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
