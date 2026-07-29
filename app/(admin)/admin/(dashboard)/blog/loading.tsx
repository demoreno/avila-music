export default function BlogAdminLoading() {
  return (
    <div role="status" aria-label="Cargando">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-7 w-16 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-3 w-56 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="h-10 w-36 animate-pulse rounded-lg bg-slate-200" />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-50 p-3">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
        </div>
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3">
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200" />
              <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
              <div className="ml-auto h-3 w-16 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
