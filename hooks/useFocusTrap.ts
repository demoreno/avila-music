import { useEffect, useRef, type RefObject } from 'react'

/**
 * Accessible modal/dialog focus trap.
 *
 * - Remembers what had focus before the dialog opened and restores it on close/unmount.
 * - Traps Tab / Shift+Tab so focus cycles between the first and last focusable
 *   elements inside the container instead of escaping to the page behind it.
 * - Escape calls `onClose`.
 *
 * Attach the returned `onKeyDown` handler to the dialog container's `onKeyDown` prop.
 *
 * `isOpen` defaults to `true` for components that only mount the dialog while it's
 * open (e.g. rendered via `{showModal && <Modal />}` from the parent). If the dialog
 * markup instead stays mounted and is only conditionally rendered *inside* an
 * always-mounted component, pass the open/closed flag explicitly so the
 * previously-focused element is captured at open time rather than at parent-mount time.
 */
export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, onClose: () => void, isOpen = true) {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null

    // Move focus into the dialog so Escape/Tab reach this container's onKeyDown —
    // without this, a dialog with no `autoFocus` element leaves focus on whatever
    // triggered it (or on <body>), and keydown never bubbles into the dialog subtree.
    const container = containerRef.current
    if (container) {
      const firstFocusable = container.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (firstFocusable) {
        firstFocusable.focus()
      } else {
        if (!container.hasAttribute('tabindex')) container.tabIndex = -1
        container.focus()
      }
    }

    return () => {
      previouslyFocusedRef.current?.focus?.()
    }
  }, [isOpen, containerRef])

  function onKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab' || !containerRef.current) return

    const focusable = containerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return { onKeyDown }
}
