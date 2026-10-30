import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useDemo } from '../store'
import { renderSheetPage2, type Page2Row } from './page2'

export interface SheetProps {
  open: boolean
  page: number                       // 0..2
  onPage: (p: number) => void
  onClose: () => void
  onEnjoy: (eventId: string) => void // opens E1 (/match/enjoy)
  onHighlightMovement: () => void    // page 3 bar tap -> highlight 15:05-15:10 on the graph
}

const FONT = "'Reem Kufi', system-ui, sans-serif"
const INK = '#3e4e78', SUB = '#5a6a95', TEAL = '#0b8fa3', GREEN = '#1b8f74'
const eyebrow: CSSProperties = { position: 'absolute', left: 28, top: 28, fontSize: 12, fontWeight: 700, color: TEAL, letterSpacing: 0.5, lineHeight: '16px', whiteSpace: 'nowrap', margin: 0 }
const txt = (extra: CSSProperties): CSSProperties => ({ position: 'absolute', margin: 0, whiteSpace: 'nowrap', fontFamily: FONT, ...extra })

const SEE_ALL_H = 40
/** page 2 geometry: 0/1 event and 2 rows share the drawn 330 card; each extra row adds the 74 pitch, "See all" adds 40 */
function p2Layout(r: ReturnType<typeof renderSheetPage2>, expanded: boolean) {
  const rows = expanded ? r.allRows : r.rows
  const showSeeAll = r.seeAll && !expanded
  const n = r.state === 1 ? 0 : rows.length
  const extra = r.note ? 0 : Math.max(0, n - 2) * 74 + (showSeeAll ? SEE_ALL_H : 0)
  return { rows, showSeeAll, btnTop: 212 + extra, height: 330 + extra }
}
const sheetHeight = (page: number, p2h: number) => (page === 0 ? 370 : page === 2 ? 400 : p2h)
const dotY = (page: number, h: number) => (page === 0 ? 340.5 : page === 2 ? 357 : h - 43.5)

/** the mint "three-layer" pill, drop shadow only */
function Pill({ label, onClick, top, arrow, autoFocus }: { label: string; onClick: () => void; top: number; arrow?: boolean; autoFocus?: boolean }) {
  return (
    <button type="button" onClick={onClick} data-autofocus={autoFocus ? '' : undefined}
      style={{ position: 'absolute', left: 28, top, width: 372, height: 46, borderRadius: 23, border: '1.5px solid #acf8e4', background: 'linear-gradient(180deg,#5cebca,#b5f8e7)', boxShadow: '1px 3px 5px rgba(0,0,0,.25)', color: '#0b4f5a', fontFamily: FONT, fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', padding: 0 }}>
      {label}
      {arrow && (
        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden><path d="M1 6h11M8 1.5L12.5 6 8 10.5" stroke="#0b4f5a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )}
    </button>
  )
}

function Icon({ kind, y }: { kind: Page2Row['icon']; y: number }) {
  if (kind === 'positive') return (
    <div aria-hidden style={{ position: 'absolute', left: 30, top: y, width: 34, height: 29.15 }}>
      <img src="/v11/a-d3-icon-positive-match.svg" alt="" style={{ position: 'absolute', left: -6.37, top: -4.52, width: 44.88, height: 37.69, maxWidth: 'none' }} />
    </div>
  )
  if (kind === 'checkin') return (
    <div aria-hidden style={{ position: 'absolute', left: 28, top: y - 4, width: 33.6, height: 33.6 }}>
      <img src="/v11/a-d4-icon-checkin-marker-c.svg" alt="" style={{ position: 'absolute', left: -9.52, top: -8.68, width: 52.64, height: 51.8, maxWidth: 'none' }} />
    </div>
  )
  // negative: grey triangle pointing down with a minus (the exported file carries a canvas background, so it is drawn here)
  return (
    <svg aria-hidden width="42" height="38" viewBox="0 0 42 38" style={{ position: 'absolute', left: 26, top: y - 2 }}>
      <defs>
        <linearGradient id="negT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9dde6" /><stop offset="1" stopColor="#8d94a3" /></linearGradient>
        <filter id="negS" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="1" dy="2" stdDeviation="1.6" floodColor="#000" floodOpacity=".25" /></filter>
      </defs>
      <path d="M8.5 7h25c2 0 3 2 2 3.700L23 31.500c-1 1.700-3.600 1.700-4.600 0L6.500 10.700C5.500 9 6.500 7 8.500 7Z" fill="url(#negT)" stroke="#f4f6fa" strokeWidth="1.2" filter="url(#negS)" />
      <path d="M17 13.500h8" stroke="#3e4e78" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function Dots({ page, y, onPage }: { page: number; y: number; onPage: (p: number) => void }) {
  return (
    <div role="tablist" aria-label="Sheet pages" style={{ position: 'absolute', left: 0, right: 0, top: y - 10, height: 24, display: 'flex', justifyContent: 'center', gap: 0 }}>
      {[0, 1, 2].map((i) => (
        <button key={i} type="button" role="tab" aria-selected={page === i} aria-label={`Page ${i + 1} of 3`} onClick={() => onPage(i)}
          style={{ width: 16, height: 24, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', cursor: 'pointer' }}>
          <img src={page === i ? '/v11/a-sheet-dot-on.svg' : '/v11/a-sheet-dot-off.svg'} alt="" width={7} height={7} style={{ display: 'block' }} />
        </button>
      ))}
    </div>
  )
}

/* ---------- page 1 ---------- */
function Page1({ onNext }: { onNext: () => void }) {
  const { movement: m } = useDemo()
  const lbl: CSSProperties = { fontSize: 9, fontWeight: 600, color: SUB, width: 22, textAlign: 'right', left: 32, lineHeight: '12px' }
  return (
    <>
      <h2 style={eyebrow}>LOOK WHAT YOU SHIFTED</h2>
      <div aria-hidden style={{ position: 'absolute', left: 28, top: 52, width: 372, height: 146, borderRadius: 18, background: 'linear-gradient(180deg,#fbe4f2,#dff5ec 50%,#e0dcf7)' }} />
      <div aria-hidden>
        <span style={txt({ ...lbl, top: 52 })}>22</span>
        <span style={txt({ ...lbl, top: 106 })}>15</span>
        <span style={txt({ ...lbl, top: 172 })}>1</span>
        <img src="/v11/a-d2-mini-dashed-15.svg" alt="" style={{ position: 'absolute', left: 59.5, top: 117.5, width: 333, height: 1, maxWidth: 'none' }} />
        <img src="/v11/a-d2-mini-line.svg" alt="" style={{ position: 'absolute', left: 98.5, top: 84.5, width: 233, height: 77, maxWidth: 'none' }} />
        <img src="/v11/a-d2-mini-marker-before.svg" alt="" style={{ position: 'absolute', left: 87.87, top: 148.02, width: 23.29, height: 23.52, maxWidth: 'none' }} />
        <img src="/v11/a-d2-mini-marker-after.svg" alt="" style={{ position: 'absolute', left: 317.87, top: 74.02, width: 23.29, height: 23.52, maxWidth: 'none' }} />
      </div>
      <span style={txt({ left: 58, top: 176, fontSize: 12, fontWeight: 600, color: SUB, lineHeight: '16px' })}>Before {'·'} {m.before}</span>
      <span style={txt({ right: 48, top: 176, fontSize: 12, fontWeight: 600, color: SUB, lineHeight: '16px' })}>After {'·'} {m.after}</span>
      <p style={txt({ left: 0, right: 0, top: 206, textAlign: 'center', fontSize: 34, fontWeight: 700, color: GREEN, lineHeight: '40px' })}>+{m.after - m.before} levels</p>
      <p style={txt({ left: 0, right: 0, top: 250, textAlign: 'center', fontSize: 14, fontWeight: 600, color: INK, lineHeight: '20px' })}>in {m.minutes} minutes of {m.type}</p>
      <Pill label="See what happened next" top={278} arrow onClick={onNext} autoFocus />
    </>
  )
}

/* ---------- page 2 ---------- */
function Page2({ expanded, setExpanded, onEnjoy, onClose }: { expanded: boolean; setExpanded: (b: boolean) => void; onEnjoy: (id: string) => void; onClose: () => void }) {
  const { events, movement } = useDemo()
  const r = renderSheetPage2(events, movement)
  const { rows, showSeeAll, btnTop } = p2Layout(r, expanded)
  const noteBg = r.note?.tone === 'green' ? 'rgba(27,143,116,.08)' : r.note?.tone === 'teal' ? 'rgba(11,143,163,.08)' : 'rgba(62,78,120,.07)'
  const detail = r.state === 2 || r.state === 7 || r.state === 3 ? r.rows[0]?.detail : undefined
  return (
    <>
      <h2 style={eyebrow}>WHAT HAPPENED NEXT</h2>
      {r.heading && (
        <>
          <p style={txt({ left: 28, top: 56, fontSize: 24, fontWeight: 700, color: INK, lineHeight: '30px' })}>{r.heading.title}</p>
          <p style={txt({ left: 28, top: 92, fontSize: 14, fontWeight: 600, color: SUB, lineHeight: '20px' })}>{r.heading.sub}</p>
        </>
      )}
      {!r.heading && rows.map((row, i) => {
        const y = 56 + i * 74
        return (
          <div key={row.id}>
            <Icon kind={row.icon} y={y} />
            <p style={txt({ left: 96, top: y, fontSize: 24, fontWeight: 700, color: INK, lineHeight: '30px' })}>{row.title}</p>
            <p style={txt({ left: 96, top: y + 36, fontSize: 14, fontWeight: 600, color: SUB, lineHeight: '20px' })}>{row.sub}</p>
          </div>
        )
      })}
      {r.note && (
        <div style={{ position: 'absolute', left: 28, top: 132, width: 372, height: 64, borderRadius: 16, background: noteBg }}>
          <p style={txt({ left: 16, top: 16, width: 340, whiteSpace: 'normal', fontSize: 13, fontWeight: 400, color: INK, lineHeight: '20px' })}>{r.note.text}</p>
          {detail && <p style={txt({ left: 16, top: 36, width: 340, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 12, fontWeight: 400, color: SUB, lineHeight: '18px' })}>{'“'}{detail}{'”'}</p>}
        </div>
      )}
      {showSeeAll && (
        <button type="button" onClick={() => setExpanded(true)}
          style={{ position: 'absolute', left: 28, top: 56 + rows.length * 74 - 18 + 4, width: 372, height: 44, background: 'none', color: TEAL, fontFamily: FONT, fontWeight: 700, fontSize: 14, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          See all
        </button>
      )}
      <Pill label={r.button.label} top={btnTop} autoFocus
        onClick={() => (r.button.action === 'enjoy' && r.button.eventId ? onEnjoy(r.button.eventId) : onClose())} />
    </>
  )
}

/* ---------- page 3 ---------- */
const BAR_TOP: Record<string, string> = { Deactivation: '#0b8fa3', 'Focus Wheel': '#e0058f' }
const NUM = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
function Page3({ onHighlightMovement }: { onHighlightMovement: () => void }) {
  const { relief, movement } = useDemo()
  const [sel, setSel] = useState<number | null>(null)
  const count = relief.length
  const chipFor = (i: number | null) => {
    if (i === null) return null
    const it = relief[i]
    if (it.name === movement.type) return `${movement.minutes} minutes ${'·'} ${movement.start} to ${movement.end} ${'·'} level ${movement.before} to ${movement.after}`
    return `${it.name} ${'·'} up ${it.level} ${it.level === 1 ? 'level' : 'levels'}`
  }
  const chip = chipFor(sel)
  return (
    <>
      <h2 style={eyebrow}>YOUR RELIEF MOMENTS TODAY</h2>
      <p style={txt({ left: 28, top: 48, fontSize: 13, color: SUB, lineHeight: '18px' })}>{NUM[count] ?? count} recorded upward {count === 1 ? 'movement' : 'movements'}</p>
      {relief.map((it, i) => {
        const h = Math.min(it.level * 10, 150)
        const top = 220 - h
        const col = BAR_TOP[it.name] ?? '#3f5cc4'
        const on = sel === i
        const x = 36 + i * 94
        return (
          <button key={it.name + i} type="button" aria-pressed={on} aria-label={`${it.name}, plus ${it.level} levels`}
            onClick={() => {
              const next = on ? null : i
              setSel(next)
              if (next !== null && relief[next].name === movement.type) onHighlightMovement()
            }}
            style={{ position: 'absolute', left: x - 9, width: 94, top: top - 24 - 6, height: 220 + 18 + 6 + 12 - (top - 24) , padding: 0, background: 'none', cursor: 'pointer', fontFamily: FONT }}>
            <span style={{ position: 'absolute', left: 9, width: 76, top: 6, textAlign: 'center', fontSize: 16, fontWeight: 700, color: GREEN, lineHeight: '20px' }}>+{it.level}</span>
            <span aria-hidden style={{ position: 'absolute', left: 9, width: 76, top: 6 + 24, height: h, borderRadius: 14, border: '1.5px solid #fff', boxSizing: 'border-box', opacity: sel === null || on ? 0.85 : 0.45, background: `linear-gradient(180deg,${col},#fff)`, boxShadow: on ? `0 0 0 2px ${col}` : 'none', transition: 'opacity .2s, box-shadow .2s' }} />
            <span style={{ position: 'absolute', left: -4, width: 102, top: 6 + 24 + h + 10, textAlign: 'center', fontSize: 12, fontWeight: 600, color: INK, lineHeight: '16px', whiteSpace: 'nowrap' }}>{it.name}</span>
          </button>
        )
      })}
      <img src="/v11/a-d5-divider.svg" alt="" aria-hidden style={{ position: 'absolute', left: 27.5, top: 271.5, width: 373, height: 1, maxWidth: 'none' }} />
      <p style={txt({ left: 28, top: 288, fontSize: 20, fontWeight: 700, color: INK, lineHeight: '26px' })}>{count} {count === 1 ? 'moment' : 'moments'} of relief</p>
      {chip ? (
        <p aria-live="polite" style={txt({ left: 28, top: 316, fontSize: 12, fontWeight: 600, color: '#0b4f5a', lineHeight: '18px', padding: '2px 10px', background: 'rgba(11,143,163,.12)', borderRadius: 11 })}>{chip}</p>
      ) : (
        <p style={txt({ left: 28, top: 318, fontSize: 13, color: SUB, lineHeight: '18px' })}>Tap a bar to see that movement</p>
      )}
    </>
  )
}

/* ---------- sheet ---------- */
export default function Sheet({ open, page, onPage, onClose, onEnjoy, onHighlightMovement }: SheetProps) {
  const reduce = useReducedMotion()
  const { events, movement } = useDemo()
  const [expanded, setExpanded] = useState(false)
  const [dir, setDir] = useState(1)
  const [dragY, setDragY] = useState(0)
  const dlg = useRef<HTMLDivElement>(null)
  const prevFocus = useRef<HTMLElement | null>(null)
  const drag = useRef<{ x: number; y: number; axis: 'x' | 'y' | null; moved: boolean } | null>(null)
  const swallow = useRef(false)

  const p = Math.max(0, Math.min(2, page))
  const r2 = renderSheetPage2(events, movement)
  const height = sheetHeight(p, p2Layout(r2, expanded).height)

  const go = useCallback((n: number) => {
    const t = Math.max(0, Math.min(2, n))
    if (t === p) return
    setDir(t > p ? 1 : -1)
    onPage(t)
  }, [p, onPage])

  // focus management + keys
  useEffect(() => {
    if (!open) return
    prevFocus.current = document.activeElement as HTMLElement | null
    setExpanded(false)
    const t = window.setTimeout(() => (dlg.current?.querySelector<HTMLElement>('[data-autofocus]') ?? dlg.current)?.focus({ preventScroll: true }), 60)
    return () => { window.clearTimeout(t); prevFocus.current?.focus?.({ preventScroll: true }) }
  }, [open])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
      else if (e.key === 'ArrowLeft') go(p - 1)
      else if (e.key === 'ArrowRight') go(p + 1)
      else if (e.key === 'Tab' && dlg.current) {
        const f = Array.from(dlg.current.querySelectorAll<HTMLElement>('button:not([disabled])'))
        if (!f.length) return
        const first = f[0], last = f[f.length - 1], a = document.activeElement
        if (e.shiftKey && (a === first || a === dlg.current)) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, p, go, onClose])

  const down = (e: RPointerEvent) => { drag.current = { x: e.clientX, y: e.clientY, axis: null, moved: false }; swallow.current = false }
  const move = (e: RPointerEvent) => {
    const d = drag.current; if (!d) return
    const dx = e.clientX - d.x, dy = e.clientY - d.y
    if (!d.axis && Math.hypot(dx, dy) > 8) d.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    if (d.axis === 'y' && dy > 0) setDragY(dy)
    if (d.axis) d.moved = true
  }
  const up = (e: RPointerEvent) => {
    const d = drag.current; drag.current = null
    if (!d) return
    const dx = e.clientX - d.x, dy = e.clientY - d.y
    if (d.moved) swallow.current = true
    if (d.axis === 'x' && Math.abs(dx) > 50) go(dx < 0 ? p + 1 : p - 1)
    else if (d.axis === 'y' && dy > 80) { setDragY(0); onClose(); return }
    setDragY(0)
  }
  const spring = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 380, damping: 38, mass: 0.9 }
  const fade = reduce ? { duration: 0 } : { duration: 0.2 }

  const content: ReactNode = p === 0 ? <Page1 onNext={() => go(1)} />
    : p === 1 ? <Page2 expanded={expanded} setExpanded={setExpanded} onEnjoy={onEnjoy} onClose={onClose} />
    : <Page3 onHighlightMovement={onHighlightMovement} />
  const dY = dotY(p, height)

  return (
    <AnimatePresence>
      {open && (
        <div key="sheet-root" style={{ position: 'absolute', inset: 0, zIndex: 60, fontFamily: FONT }}>
          {/* tap outside closes. The plot dim (white .6) is drawn by the graph; no dark scrim here. */}
          <div aria-hidden onClick={onClose} style={{ position: 'absolute', inset: 0 }} />
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={spring}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
            <motion.div
              ref={dlg} role="dialog" aria-modal="true" aria-label={p === 0 ? 'Look what you shifted' : p === 1 ? 'What happened next' : 'Relief moments today'} tabIndex={-1}
              onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={() => { drag.current = null; setDragY(0) }}
              onClickCapture={(e) => { if (swallow.current) { e.stopPropagation(); e.preventDefault(); swallow.current = false } }}
              animate={{ height }} transition={spring} initial={false}
              style={{ position: 'relative', width: 428, overflow: 'hidden', borderRadius: '28px 28px 0 0', background: 'linear-gradient(180deg,#fff,#eaf2ff)', boxShadow: '0 -4px 8px rgba(0,0,0,.18)', touchAction: 'none', outline: 'none', transform: dragY ? `translateY(${dragY}px)` : undefined, userSelect: 'none', WebkitUserSelect: 'none' }}>
              <div aria-hidden style={{ position: 'absolute', left: 192, top: 12, width: 44, height: 5, borderRadius: 3, background: '#c3d0ea' }} />
              <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, width: 428, height: 32 }} />
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.div key={p} custom={dir}
                  initial={{ opacity: 0, x: reduce ? 0 : 36 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduce ? 0 : -36 * dir }} transition={fade}
                  style={{ position: 'absolute', left: 0, top: 0, width: 428, height: '100%' }}>
                  {content}
                </motion.div>
              </AnimatePresence>
              <Dots page={p} y={dY} onPage={go} />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
