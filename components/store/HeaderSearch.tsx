'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Music } from 'lucide-react'

interface SearchResult {
  slug: string
  name: string
  price_usd: number | null
  imageUrl: string | null
}

interface HeaderSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HeaderSearch({ open, onOpenChange }: HeaderSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fetching is triggered by the user typing, not by an effect syncing to `query` —
  // this runs the debounced request straight from the change handler.
  function handleQueryChange(value: string) {
    setQuery(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!value.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value.trim())}`)
        const data = await res.json()
        setResults(data.results ?? [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 250)
  }

  function reset() {
    setQuery('')
    setResults([])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/productos?search=${encodeURIComponent(query.trim())}`)
      reset()
      onOpenChange(false)
    }
  }

  return (
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[28rem] pb-4' : 'max-h-0'}`}>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Buscar productos..."
            autoFocus={open}
            className="w-full h-11 pl-10 pr-24 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:bg-white transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-4 rounded-lg bg-amber-500 text-black text-xs font-semibold hover:bg-amber-400 transition-colors"
          >
            Buscar
          </button>
        </div>

        {query.trim() && (
          <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden max-h-80 overflow-y-auto z-10">
            {loading ? (
              <p className="px-4 py-3 text-sm text-slate-400">Buscando...</p>
            ) : results.length === 0 ? (
              <p className="px-4 py-3 text-sm text-slate-400">Sin resultados para &quot;{query}&quot;</p>
            ) : (
              results.map((r) => (
                <Link
                  key={r.slug}
                  href={`/productos/${r.slug}`}
                  onClick={() => {
                    reset()
                    onOpenChange(false)
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {r.imageUrl ? (
                      <Image src={r.imageUrl} alt={r.name} fill className="object-cover" sizes="40px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-300">
                        <Music className="h-4 w-4" strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-slate-700 flex-1 truncate">{r.name}</span>
                  {r.price_usd !== null && (
                    <span className="text-xs font-medium text-slate-500 flex-shrink-0">USD {r.price_usd.toFixed(2)}</span>
                  )}
                </Link>
              ))
            )}
          </div>
        )}
      </form>
    </div>
  )
}
