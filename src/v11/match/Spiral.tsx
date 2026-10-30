import type { CSSProperties } from 'react'
import { EMOTIONS, type Emotion } from './emotions'
import { NAVY, Svg } from './ui'

const BALL_GRAD: Record<number, string> = {
  7: '#b8a2f0,#e9b6ef', 6: '#a690e8,#cdbcf6', 5: '#b6a0ee,#e0bff4', 4: '#8f93ea,#b8aaf2', 3: '#7f93ea,#aa9cf2', 2: '#6f9ee8,#90b6f4', 1: '#62b3e6,#8fd3f4',
}
const SH = '-1px -1px 1px #fff, 1px 2px 3px rgba(0,0,0,.25)'
const PLATE_SH = '-6px -4px 4px #fff, 9px 9px 11px rgba(0,0,0,.16)'
const PG = 'linear-gradient(120deg,#e8efff 3.600%,#f0f5ff,#f6f9ff 93%)'
const LG = 'linear-gradient(180deg,#dee9ff,#f6f9ff)'

function CssRow({ m }: { m: Emotion }) {
  const left = m.side === 'l'
  const r = left ? '79px 14px 14px 79px' : '14px 79px 79px 14px'
  const py = Math.round(m.ph * 0.065), px = Math.round(m.pw * 0.03)
  const iy = Math.round(m.ph * 0.13), ix = Math.round(m.pw * 0.06)
  const [c1, c2] = (BALL_GRAD[m.level] ?? '#8fa0ea,#b9c4f4').split(',')
  const ball: CSSProperties = { position: 'absolute', left: m.bx, top: m.by, width: m.bs, height: m.bs, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%,#fff,#e9eefb)', boxShadow: '-1px -1px 2px #fff, 2px 2px 4px rgba(0,0,0,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 2 }
  return (
    <>
      <div aria-hidden style={{ position: 'absolute', left: m.px, top: m.py, width: m.pw, height: m.ph, borderRadius: r, background: PG, boxShadow: PLATE_SH, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: `${py}px ${px}px`, borderRadius: r, background: LG, boxShadow: SH }} />
        <div style={{ position: 'absolute', inset: `${iy}px ${ix}px`, borderRadius: r, background: LG, boxShadow: SH, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: left ? 'flex-start' : 'flex-end', padding: left ? '0 0 0 0' : '0 12px 0 0', gap: m.lines.length > 3 ? 0 : 2 }}>
          {m.lines.map((l) => <span key={l} style={{ fontWeight: 500, fontSize: 12, lineHeight: m.lines.length > 3 ? '13px' : '14px', color: NAVY, letterSpacing: 0, whiteSpace: 'nowrap' }}>{l}</span>)}
        </div>
      </div>
      <div aria-hidden style={ball}>
        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: 1, background: `linear-gradient(135deg,${c1},${c2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', textShadow: 'none' }}>{m.level}</span>
      </div>
    </>
  )
}

/** hit rectangle in spiral-local coords: plate united with ball, at least 44 tall */
const hitRect = (m: Emotion) => {
  const x1 = Math.min(m.px, m.bx), y1 = Math.min(m.py, m.by)
  const x2 = Math.max(m.px + m.pw, m.bx + m.bs), y2 = Math.max(m.py + m.ph, m.by + m.bs)
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 }
}

/**
 * The 22-emotion spiral. Rows 22..8 come from the exported L3 art (m-spiral-l3-full.svg, transparent), rows 7..1 are CSS plates.
 * Transparent buttons sit on top (plate + ball rectangles).
 */
export default function Spiral({ x = 0, y, dim = false, showBadge = false, selected, onPick, hitOnly = false, labelPrefix = 'Feeling' }: {
  x?: number; y: number; dim?: boolean; showBadge?: boolean; selected?: number | null; onPick: (level: number) => void; hitOnly?: boolean; labelPrefix?: string
}) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 428, height: 887 }}>
      {!hitOnly && <div style={{ position: 'absolute', inset: 0, opacity: dim ? 0.75 : 1, filter: dim ? 'saturate(.8)' : undefined, transition: 'opacity .25s ease' }}>
        <Svg src="/v11/m-spiral-e2-ribbon-neg.svg" style={{ position: 'absolute', left: 169.5, top: 406.3, width: 90, height: 413, maxWidth: 'none', clipPath: 'inset(190px 0 0 0)', WebkitMaskImage: 'linear-gradient(180deg,transparent 190px,#000 240px)', maskImage: 'linear-gradient(180deg,transparent 190px,#000 240px)', opacity: 0.85, pointerEvents: 'none' }} />
        <Svg src="/v11/m-spiral-l3-full.svg"
          style={{ position: 'absolute', left: 1, top: -4, width: 427, height: 618, maxWidth: 'none', pointerEvents: 'none', clipPath: showBadge ? 'polygon(0 0,428px 0,428px 586px,261px 586px,261px 618px,0 618px)' : 'polygon(103px 0,308px 0,308px 140px,428px 140px,428px 586px,261px 586px,261px 618px,0 618px,0 140px,103px 140px)' }} />
        {EMOTIONS.filter((m) => m.level <= 8).map((m) => <CssRow key={m.level} m={m} />)}
      </div>}
      {EMOTIONS.map((m) => {
        const r = hitRect(m)
        const top = r.y
        const sel = selected === m.level
        return (
          <button key={m.level} className={`hit${sel ? ' sel' : ''}`} onClick={() => onPick(m.level)} aria-pressed={sel}
            aria-label={`${labelPrefix} ${m.level}, ${m.lines.join(' ').replace(/\s+/g, ' ').toLowerCase()}`}
            style={{ left: r.x, top, width: r.w, height: Math.max(r.h, 44), zIndex: 3, borderRadius: m.level === 22 ? '110px 110px 24px 24px' : 28 }} />
        )
      })}
    </div>
  )
}
