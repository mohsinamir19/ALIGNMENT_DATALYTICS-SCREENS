import { useSyncExternalStore } from 'react'

/** ONE shared demo store (localStorage, resettable). Every v11 screen reads from here. */
export type EventType = 'positive_match' | 'negative_match' | 'check_in'
export interface DemoEvent { id: string; type: EventType; minutesAfter: number; level?: number; note?: string; enjoyed?: boolean }
export interface Movement { type: string; before: number; after: number; minutes: number; start: string; end: string }
export interface Relief { name: string; level: number }
export interface DemoState {
  movement: Movement
  events: DemoEvent[]            // oldest first
  counts: { positive: number; negative: number }
  relief: Relief[]
  coins: number
  lastLoggedId: string | null    // last match logged in Flow 1 (for the "Moment kept" popup)
}

const KEY = 'angel-v11-demo'

export const seed = (): DemoState => ({
  movement: { type: 'Deactivation', before: 6, after: 19, minutes: 5, start: '15:05', end: '15:10' },
  // seed = frame D3: one positive match, 20 minutes after the movement ended
  events: [{ id: 'seed-pm', type: 'positive_match', minutesAfter: 20, note: 'Finished my first chapter', enjoyed: false }],
  counts: { positive: 9, negative: 5 },
  relief: [
    { name: 'Breathing', level: 3 }, { name: 'Meditation', level: 5 },
    { name: 'Focus Wheel', level: 4 }, { name: 'Deactivation', level: 13 },
  ],
  coins: 0,
  lastLoggedId: null,
})

function load(): DemoState {
  try { const raw = localStorage.getItem(KEY); if (raw) return { ...seed(), ...JSON.parse(raw) } } catch { /* storage may be blocked */ }
  return seed()
}
let state: DemoState = typeof window === 'undefined' ? seed() : load()
const listeners = new Set<() => void>()
const commit = (next: DemoState) => {
  state = next
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ }
  listeners.forEach((l) => l())
}

export const getState = () => state
export const useDemo = () => useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb) }, getState, getState)

const uid = () => Math.random().toString(36).slice(2, 9)
const nextMinutes = () => state.events.reduce((m, e) => Math.max(m, e.minutesAfter), 0) + 8

export const actions = {
  /** Flow 1: log a match. Matches have no level; the optional emotion level is only kept on the event for the E1/E2 context. */
  addMatch(kind: 'positive' | 'negative', note?: string, level?: number): string {
    const id = uid()
    const ev: DemoEvent = { id, type: kind === 'positive' ? 'positive_match' : 'negative_match', minutesAfter: nextMinutes(), note: note?.trim() || undefined, level, enjoyed: false }
    commit({
      ...state, events: [...state.events, ev], lastLoggedId: id, coins: state.coins + 1,
      counts: { positive: state.counts.positive + (kind === 'positive' ? 1 : 0), negative: state.counts.negative + (kind === 'negative' ? 1 : 0) },
    })
    return id
  },
  /** Flow 1 / E2: store an optional check-in with an emotion level (1-22). */
  addCheckIn(level: number): string {
    const id = uid()
    commit({ ...state, events: [...state.events, { id, type: 'check_in', minutesAfter: nextMinutes(), level }] })
    return id
  },
  markEnjoyed(id: string) { commit({ ...state, events: state.events.map((e) => (e.id === id ? { ...e, enjoyed: true } : e)) }) },
  reset() { commit(seed()) },
}

/** un-enjoyed positive match, oldest first (drives the sheet's one button) */
export const firstUnenjoyed = (s: DemoState) => s.events.find((e) => e.type === 'positive_match' && !e.enjoyed)
