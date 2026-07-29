export default function OrdenesLoading() {
  return (
    <div role="status" aria-label="Cargando">
      <div className="mb-6">
        <div className="h-7 w-28 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-3 w-64 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-50 p-3">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
        </div>
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3">
              <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200" />
              <div className="ml-auto h-3 w-14 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
