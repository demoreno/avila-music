export default function ProductLoading() {
  return (
    <div role="status" aria-label="Cargando" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 h-4 w-64 animate-pulse rounded bg-slate-200" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="aspect-square w-full animate-pulse rounded-2xl bg-slate-200" />

        <div className="flex flex-col gap-6">
          <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="h-10 w-40 animate-pulse rounded bg-slate-200" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-slate-100" />
        </div>
      </div>

      <div className="mt-12 h-24 w-full animate-pulse rounded-2xl bg-slate-100" />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-56 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    </div>
  )
}
