'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'

type ToastType = 'success' | 'error'

interface ToastItem {
  id: number
  type: ToastType
  message: string
}

interface ToastContextValue {
  toast: {
    success: (message: string) => void
    error: (message: string) => void
  }
}

const ToastContext = createContext<ToastContextValue | null>(null)

const AUTO_DISMISS_MS = 4000
const MAX_TOASTS = 3

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback(
    (message: string, type: ToastType) => {
      const id = nextId.current++
      setToasts((prev) => {
        const next = [...prev, { id, type, message }]
        // Mantiene como máximo MAX_TOASTS apilados — descarta el más viejo.
        return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next
      })
      setTimeout(() => dismiss(id), AUTO_DISMISS_MS)
    },
    [dismiss]
  )

  const value: ToastContextValue = {
    toast: {
      success: (message: string) => show(message, 'success'),
      error: (message: string) => show(message, 'error'),
    },
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
        {toasts.map((t) => {
          const isError = t.type === 'error'
          return (
            <div
              key={t.id}
              role={isError ? 'alert' : 'status'}
              aria-live={isError ? 'assertive' : 'polite'}
              className={`flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg ${
                isError
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-green-200 bg-green-50 text-green-700'
              }`}
            >
              {isError ? (
                <XCircle className="h-5 w-5 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              )}
              <span className="flex-1">{t.message}</span>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Cerrar notificación"
                className={`flex-shrink-0 rounded p-0.5 ${
                  isError ? 'text-red-400 hover:text-red-600' : 'text-green-400 hover:text-green-600'
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de un ToastProvider')
  return ctx.toast
}
