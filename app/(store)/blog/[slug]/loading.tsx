export default function BlogPostLoading() {
  return (
    <div role="status" aria-label="Cargando" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 h-4 w-28 animate-pulse rounded bg-slate-200" />

      <div className="h-9 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 h-3 w-40 animate-pulse rounded bg-slate-200" />

      <div className="mt-8 aspect-video w-full animate-pulse rounded-2xl bg-slate-200" />

      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-full animate-pulse rounded bg-slate-100" />
        ))}
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  )
}
