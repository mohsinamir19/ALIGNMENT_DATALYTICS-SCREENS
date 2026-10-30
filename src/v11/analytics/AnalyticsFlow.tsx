import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PhoneFrame from '../PhoneFrame'
import { navigate, useQuery } from '../router'
import { useDemo, type Movement } from '../store'
import Sheet from '../sheet/Sheet'
import Shell from '../../components/Shell'
import PoaGraph from '../../components/PoaGraph'
import ProgressGraph, { type Kind } from '../../components/ProgressGraph'
import { dateLabel, pgFor } from '../../data/model'
import type { Period } from '../../lib/theme'

const DY = 120            // v11: everything at y >= 214 moves down (strip 100 + gap 20)
const PAGE_H = 1832 + DY  // 1952
const PROGRESS_TOP = 1032 + DY
const FONT = '"Reem Kufi", sans-serif'
const MINUS = '−'
const v11 = (f: string) => `/v11/${f}`

/* ------------------------------------------------------------ strip content (all numbers from the store) */
type StripState = 'up' | 'quiet' | 'down'
interface StripView { state: StripState; eyebrow: string; num: string; name: string; sub: string; tappable: boolean }

const PERIOD_WORD: Record<Period, string> = { day: 'TODAY', week: 'THIS WEEK', month: 'THIS MONTH', year: 'THIS YEAR' }

function stripState(m: Movement | null): StripState {
  if (!m || m.after === m.before) return 'quiet'
  return m.after > m.before ? 'up' : 'down'
}

function stripView(period: Period, offset: number, m: Movement | null): StripView {
  // the store only holds today's movement; other days/weeks/months/years show the calm "nothing yet" strip
  const cur = offset === 0 ? m : null
  const state = stripState(cur)
  if (!cur || state === 'quiet') {
    return { state: 'quiet', eyebrow: `YOUR MOVEMENTS ${PERIOD_WORD[period]}`, num: '0', name: 'Nothing yet', sub: 'They will appear here', tappable: false }
  }
  const d = cur.after - cur.before
  const num = d > 0 ? `+${d}` : `${MINUS}${Math.abs(d)}`
  if (period === 'day') {
    return {
      state, num, name: cur.type, tappable: true,
      eyebrow: state === 'up' ? 'YOUR BEAUTIFUL MOVEMENT TODAY' : 'YOUR MOVEMENT TODAY',
      sub: `From ${cur.before} to ${cur.after}  ·  in ${cur.minutes} minutes`,
    }
  }
  return {
    state, num, name: cur.type, tappable: true,
    eyebrow: `BIGGEST MOVEMENT ${PERIOD_WORD[period]}`,
    sub: `${dateLabel('day', 0)} · From ${cur.before} to ${cur.after}`,
  }
}

function Strip({ view, onOpen }: { view: StripView; onOpen: () => void }) {
  const body = (
    <>
      <img src={v11('a-d1-strip-plates.svg')} alt="" draggable={false} width={392} height={100} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 24, top: 14, width: view.tappable ? 290 : 344, display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left' }}>
        <div style={{ font: `600 11px/17px ${FONT}`, letterSpacing: 1.2, color: '#0b8fa3', whiteSpace: 'nowrap' }}>{view.eyebrow}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 51 }}>
          <div style={{ font: `700 34px/51px ${FONT}`, color: '#3e4e78', whiteSpace: 'nowrap' }}>{view.num}</div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ font: `600 16px/24px ${FONT}`, color: '#3e4e78', whiteSpace: 'nowrap' }}>{view.name}</div>
            <div style={{ font: `400 13px/20px ${FONT}`, color: '#5a6a95', whiteSpace: 'pre' }}>{view.sub}</div>
          </div>
        </div>
      </div>
      {view.tappable && <img src={v11('a-d1-strip-button-open.svg')} alt="" draggable={false} style={{ position: 'absolute', left: 323.2, top: 25.2, width: 50.8, height: 51.4, pointerEvents: 'none' }} />}
    </>
  )
  const box: React.CSSProperties = { position: 'absolute', left: 18, top: 214, width: 392, height: 100, display: 'block', textAlign: 'left', borderRadius: 24 }
  if (!view.tappable) return <div style={box} aria-label={`${view.eyebrow}. ${view.name}. ${view.sub}`}>{body}</div>
  return (
    <button onClick={onOpen} style={box} className="v11-strip" aria-label={`${view.eyebrow}: ${view.num} ${view.name}. ${view.sub.replace(/\s+/g, ' ')}. Open details`}>
      {body}
    </button>
  )
}

/* ------------------------------------------------------------ P1 popup */
function EmotionBackdrop() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'linear-gradient(180deg,#fbe4f2 0%,#e6f4f6 40%,#bfe4ff 100%)' }}>
      <img src={v11('m-bg-glow.svg')} alt="" draggable={false} style={{ position: 'absolute', left: 0, top: 0, width: 428, height: 926 }} />
      <img src={v11('m-spiral-e2-full.svg')} alt="" draggable={false} style={{ position: 'absolute', left: 0, top: 12, width: 428, height: 914 }} />
      <div style={{ position: 'absolute', left: 0, top: 44, width: 428, textAlign: 'center', fontFamily: FONT, fontWeight: 700, color: '#34d2e3' }}>
        <div style={{ fontSize: 31, lineHeight: '32px', letterSpacing: 1 }}>PLEASE CHOOSE</div>
        <div style={{ fontSize: 17, lineHeight: '18px', color: '#0b8fa3' }}>THE EMOTION YOU ARE FEELING NOW</div>
        <div style={{ font: `600 12px/16px ${FONT}`, color: '#3e4e78', marginTop: 1 }}>See how much the process made you feel better.</div>
      </div>
    </div>
  )
}

const MINI_LINE_X: [number, number] = [53.58, 230.66]
const miniY = (v: number, before: number, after: number) => {
  // endpoints of the exported line: bottom 83.22 (before) -> top 24.70 (after)
  const span = Math.max(1, after - before)
  return 83.22 - ((v - before) / span) * 58.52
}

function ProcessPopup({ m, onDone, onSee }: { m: Movement; onDone: () => void; onSee: () => void }) {
  const reduce = useReducedMotion()
  const d = m.after - m.before
  const head = `${d >= 0 ? '+' : MINUS}${Math.abs(d)} LEVELS`
  const yB = miniY(m.before, m.before, m.after), yA = miniY(m.after, m.before, m.after)
  const lbl: React.CSSProperties = { position: 'absolute', font: `600 6.84px/8px ${FONT}`, color: '#5a6a95', whiteSpace: 'nowrap' }
  const btnBase: React.CSSProperties = { position: 'absolute', top: 385 - 1.87, width: 96, height: 52, textAlign: 'center' }
  const plates = (label: React.ReactNode) => (
    <>
      <img src={v11('a-p1-btn-plates.svg')} alt="" draggable={false} style={{ position: 'absolute', left: 3.75, top: 1.87, width: 88.5, height: 48.27, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 3.75, top: 1.87 + 6.44, width: 88.5, font: `700 12.873px/16.09px ${FONT}`, color: '#6cd9c7', textAlign: 'center', pointerEvents: 'none' }}>{label}</div>
    </>
  )
  return (
    <>
      <EmotionBackdrop />
      <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.28, ease: 'easeOut' }}
        role="dialog" aria-modal="true" aria-label="Process ended" style={{ position: 'absolute', left: 21, top: 229, width: 386, height: 468 }}>
        <img src={v11('a-p1-popup-plates.svg')} alt="" draggable={false} style={{ position: 'absolute', left: 0, top: 0, width: 386, height: 468, pointerEvents: 'none' }} />
        {/* mini graph "what you shifted" */}
        <div style={{ position: 'absolute', left: 52, top: 84, width: 282.72, height: 114 }} aria-hidden>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 282.72, height: 110.96, borderRadius: 13.68, background: 'linear-gradient(180deg,#fbe4f2 0%,#dff5ec 50%,#e0dcf7 100%)' }} />
          <div style={{ ...lbl, left: 3.04, top: 0, width: 16.72, textAlign: 'right' }}>22</div>
          <div style={{ ...lbl, left: 3.04, top: 41.04, width: 16.72, textAlign: 'right' }}>15</div>
          <div style={{ ...lbl, left: 3.04, top: 91.2, width: 16.72, textAlign: 'right' }}>1</div>
          <img src={v11('a-p1-mini-dashed-15.svg')} alt="" draggable={false} style={{ position: 'absolute', left: 23.94, top: 49.78, width: 253.08, height: 0.76 }} />
          <svg width={282.72} height={110.96} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
            <line x1={MINI_LINE_X[0]} y1={yB} x2={MINI_LINE_X[1]} y2={yA} stroke="#3f5cc4" strokeWidth="2.28" strokeLinecap="round" />
          </svg>
          <img src={v11('a-p1-marker-before.svg')} alt="" draggable={false} style={{ position: 'absolute', left: 45.5, top: yB - 10.2, width: 17.7, height: 17.87 }} />
          <img src={v11('a-p1-marker-after.svg')} alt="" draggable={false} style={{ position: 'absolute', left: 220.3, top: yA - 7.9, width: 17.7, height: 17.87 }} />
          <div style={{ ...lbl, left: 22.8, top: 94.24, fontSize: 8.36, lineHeight: '10px' }}>Before · {m.before}</div>
          <div style={{ ...lbl, right: 282.72 - 267.52, top: 94.24, fontSize: 8.36, lineHeight: '10px', textAlign: 'right' }}>After · {m.after}</div>
        </div>
        {/* texts */}
        <div style={{ position: 'absolute', left: 48.37, top: 270.03, width: 289.25, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11.8, textAlign: 'center' }}>
          <div style={{ font: `700 22.874px/28.04px ${FONT}`, color: '#34d2e3', textTransform: 'uppercase' }}>{head}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4.43, font: `600 11.806px/13.28px ${FONT}`, color: '#1b8f74' }}>
            <span style={{ width: 5.9, height: 5.9, borderRadius: '50%', background: '#1b8f74', flex: 'none' }} />
            in {m.minutes} minutes of {m.type}
          </div>
          <div style={{ font: `600 11.068px/14.76px ${FONT}`, color: '#3e4e78' }}>From {m.before} to {m.after}</div>
        </div>
        <button onClick={onDone} className="v11-p1btn" style={{ ...btnBase, left: 90 - 3.75 }} aria-label="Done">{plates('DONE')}</button>
        <button onClick={onSee} className="v11-p1btn" style={{ ...btnBase, left: 208.5 - 3.75 }} aria-label="See Datalytics">
          {plates(<>SEE<br />DATALYTICS</>)}
        </button>
      </motion.div>
    </>
  )
}

/* ------------------------------------------------------------ page */
export default function AnalyticsFlow() {
  const q = useQuery()
  const { movement } = useDemo()
  const reduce = useReducedMotion()
  const [period, setPeriod] = useState<Period>('day')
  const [offset, setOffset] = useState(0)
  const [hidden, setHidden] = useState<Set<Kind>>(new Set())
  const [ext, setExt] = useState<{ i: number; n: number } | null>(null)
  const scroller = useRef<HTMLDivElement>(null)

  const sheetParam = parseInt(q.get('sheet') ?? '', 10)
  const sheetOpen = sheetParam >= 1
  const page = Math.min(2, Math.max(0, (Number.isFinite(sheetParam) ? sheetParam : 1) - 1))
  const popup = q.get('popup') === 'process'

  // dev override for reviewing the strip states: /analytics?strip=quiet|down (down swaps the store's before/after)
  const stripDev = q.get('strip')
  const mv: Movement | null = useMemo(() => {
    if (stripDev === 'quiet') return null
    if (stripDev === 'down') return { ...movement, before: movement.after, after: movement.before }
    return movement
  }, [movement, stripDev])

  const toggle = (k: Kind) => setHidden((h) => { const n = new Set(h); if (n.has(k)) n.delete(k); else n.add(k); return n })
  const setKinds = (kinds: Kind[], on: boolean) => setHidden((h) => { const n = new Set(h); kinds.forEach((k) => (on ? n.delete(k) : n.add(k))); return n })
  const drill = (p: Period, o: number) => { setPeriod(p); setOffset(o) }

  const view = useMemo(() => stripView(period, offset, mv), [period, offset, mv])

  const setSheet = useCallback((p: number | null) => navigate(p === null ? '/analytics' : `/analytics?sheet=${p + 1}`, { replace: true }), [])

  const openStrip = () => {
    if (period !== 'day' || offset !== 0) { setPeriod('day'); setOffset(0); return }   // W/M/Y strip: open that day (Sun 25 Oct)
    setSheet(0)
  }

  // sheet needs the Day graph behind it: force Day, scroll so the progress graph plate sits at y=60 (D2)
  useEffect(() => {
    if (!sheetOpen) return
    if (period !== 'day' || offset !== 0) { setPeriod('day'); setOffset(0) }
  }, [sheetOpen]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!sheetOpen) return
    const t = setTimeout(() => scroller.current?.scrollTo({ top: PROGRESS_TOP - 60, behavior: reduce ? 'auto' : 'smooth' }), 30)
    return () => clearTimeout(t)
  }, [sheetOpen, reduce])
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }) }, [popup])

  // the Deactivation bar on the Day progress graph = the bar whose levels equal the store's movement
  const movementBar = useMemo(() => {
    const bars = pgFor('day', 0).bars
    const hit = bars.findIndex((b) => Math.round(b.vBottom) === movement.before && Math.round(b.vTop) === movement.after)
    if (hit >= 0) return hit
    return bars.reduce((best, b, i) => (b.vTop - b.vBottom > bars[best].vTop - bars[best].vBottom ? i : best), 0)
  }, [movement])
  const highlight = () => { setPeriod('day'); setOffset(0); setExt((e) => ({ i: movementBar, n: (e?.n ?? 0) + 1 })) }

  return (
    <>
      <PhoneFrame>
        {popup ? (
          <ProcessPopup m={movement} onDone={() => navigate('/analytics', { replace: true })} onSee={() => navigate('/analytics?sheet=1', { replace: true })} />
        ) : (
          <>
            <div ref={scroller} id="v11-scroll" style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', overscrollBehavior: 'contain', scrollbarWidth: 'none' }}>
              <div style={{ position: 'relative', width: 428, height: PAGE_H, overflow: 'hidden', fontFamily: FONT }}>
                <Shell dy={DY} period={period} offset={offset} hidden={hidden}
                  onPeriod={(p) => { setPeriod(p); setOffset(0) }}
                  onStep={(d) => setOffset((o) => Math.max(-12, Math.min(12, o + d)))}
                  onToggle={toggle} />
                <Strip view={view} onOpen={openStrip} />
                <PoaGraph dy={DY} period={period} offset={offset} onDrill={drill} />
                <ProgressGraph dy={DY} defaultOpen={false} externalBar={ext} period={period} offset={offset} hidden={hidden} onSet={setKinds} onDrill={drill} />
              </div>
            </div>
            <Sheet open={sheetOpen} page={page} onPage={(p) => setSheet(p)} onClose={() => setSheet(null)}
              onEnjoy={(id) => navigate(`/match/enjoy?id=${id}&back=${encodeURIComponent('/analytics?sheet=2')}`)}
              onHighlightMovement={highlight} />
          </>
        )}
      </PhoneFrame>
      {createPortal(
        <button onClick={() => navigate('/analytics?popup=process')}
          style={{ position: 'fixed', right: 10, bottom: 8, fontSize: 12, padding: '6px 10px', minHeight: 32, color: '#3E4E78', background: 'rgba(255,255,255,.8)', borderRadius: 8, fontFamily: FONT, fontWeight: 600, zIndex: 9999 }}>
          Simulate: process ended
        </button>,
        document.body,
      )}
    </>
  )
}
