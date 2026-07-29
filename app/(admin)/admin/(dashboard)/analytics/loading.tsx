export default function AnalyticsLoading() {
  return (
    <div role="status" aria-label="Cargando">
      <div className="mb-6 h-7 w-32 animate-pulse rounded bg-slate-200" />

      <div className="space-y-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 h-4 w-40 animate-pulse rounded bg-slate-200" />
          <div className="h-[260px] animate-pulse rounded-lg bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 h-4 w-52 animate-pulse rounded bg-slate-200" />
              <div className="h-[300px] animate-pulse rounded-lg bg-slate-100" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 h-4 w-36 animate-pulse rounded bg-slate-200" />
              <div className="h-[220px] animate-pulse rounded-lg bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
