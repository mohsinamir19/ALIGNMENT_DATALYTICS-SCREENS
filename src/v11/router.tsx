import { useEffect, useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react'

/** Minimal history-API router (no dependency). Paths: /, /match, /match/enjoy, /match/check-in, /analytics */
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())
if (typeof window !== 'undefined') window.addEventListener('popstate', emit)

const snap = () => window.location.pathname + window.location.search
export const useUrl = () => useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb) }, snap, () => '/')
export function usePath() { return useUrl().split('?')[0].replace(/\/+$/, '') || '/' }
export function useQuery() { return new URLSearchParams(useUrl().split('?')[1] ?? '') }

export function navigate(to: string, opts: { replace?: boolean } = {}) {
  if (snap() === to) return
  if (opts.replace) window.history.replaceState({}, '', to)
  else window.history.pushState({}, '', to)
  emit()
}

export function Link({ to, children, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={to} {...rest} onClick={(e: MouseEvent) => { if (e.metaKey || e.ctrlKey) return; e.preventDefault(); navigate(to) }}>{children}</a>
}

/** scroll to top whenever the route changes */
export function useScrollReset(dep: unknown) { useEffect(() => { window.scrollTo(0, 0) }, [dep]) }
