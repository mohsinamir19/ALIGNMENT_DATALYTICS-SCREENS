import type { DemoEvent, Movement } from '../store'

/** Pure logic for sheet page 2 "What happened next" (7 states, one button rule). */
export type RowIcon = 'positive' | 'negative' | 'checkin'
export interface Page2Row { id: string; icon: RowIcon; title: string; sub: string; detail?: string }
export interface Page2Result {
  state: 1 | 2 | 3 | 4 | 5 | 6 | 7
  rows: Page2Row[]                       // at most 3 (see allRows when seeAll)
  allRows: Page2Row[]                    // every row, oldest first
  seeAll: boolean                        // more than 3 events: show a "See all" link under row 3
  note: { text: string; tone: 'green' | 'teal' | 'grey' } | null   // only for 0 or 1 event
  heading?: { title: string; sub: string } // state 1 only (no icon)
  button: { label: 'Enjoy this moment' | 'Close'; action: 'enjoy' | 'close'; eventId?: string }
}

const minutesText = (n: number) => `${n} ${n === 1 ? 'minute' : 'minutes'}`

export function renderSheetPage2(events: DemoEvent[], movement: Movement): Page2Result {
  // oldest first, stable by insertion
  const sorted = events.map((e, i) => ({ e, i })).sort((a, b) => a.e.minutesAfter - b.e.minutesAfter || a.i - b.i).map((x) => x.e)
  const name = movement.type
  const toRow = (e: DemoEvent): Page2Row => {
    const after = `${minutesText(e.minutesAfter)} after your ${name}`
    if (e.type === 'positive_match') return { id: e.id, icon: 'positive', title: 'A positive match', sub: after + (e.enjoyed ? ' · Enjoyed' : ''), detail: e.note }
    if (e.type === 'negative_match') return { id: e.id, icon: 'negative', title: 'A negative match', sub: after, detail: e.note }
    return { id: e.id, icon: 'checkin', title: `You checked in at ${e.level ?? ''}`.trim(), sub: after }
  }
  const allRows = sorted.map(toRow)
  const target = sorted.find((e) => e.type === 'positive_match' && !e.enjoyed)
  const button: Page2Result['button'] = target
    ? { label: 'Enjoy this moment', action: 'enjoy', eventId: target.id }
    : { label: 'Close', action: 'close' }
  const base = { rows: allRows.slice(0, 3), allRows, seeAll: allRows.length > 3, button }

  if (sorted.length === 0) {
    return { ...base, state: 1, note: { text: 'No match or check-in came after this movement.', tone: 'grey' }, heading: { title: 'Nothing yet', sub: 'Your day is still open.' } }
  }
  if (sorted.length === 1) {
    const e = sorted[0]
    if (e.type === 'positive_match') {
      return e.enjoyed
        ? { ...base, state: 7, note: { text: 'You stayed with it. That counts.', tone: 'grey' } }
        : { ...base, state: 2, note: { text: 'You noticed something good. No feeling was recorded with it.', tone: 'green' } }
    }
    if (e.type === 'negative_match') return { ...base, state: 3, note: { text: 'You noticed something heavy. It is part of your day.', tone: 'grey' } }
    const same = (e.level ?? 0) >= movement.after
    return { ...base, state: 4, note: { text: same ? 'Still high on your scale — the relief stayed with you.' : 'A little lower now. That is part of the day.', tone: 'teal' } }
  }
  // two or more rows: no note box
  const hasPositive = sorted.some((e) => e.type === 'positive_match')
  return { ...base, state: hasPositive ? 5 : 6, note: null }
}
