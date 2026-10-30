import { useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { line, curveMonotoneX } from 'd3-shape'
import Ball, { BallDefs } from './Ball'
import Tooltip, { tipSize } from './Tooltip'
import { poaTip } from '../data/tooltips'
import { asset, INK, LEVEL_GRAD, type Period } from '../lib/theme'
import { poaFor, POA_PLOT, poaY } from '../data/model'

const img = (n: string, x: number, y: number, w: number, h: number) => <image href={asset(n)} x={x} y={y} width={w} height={h} preserveAspectRatio="none" />

/** natural size + inset of the exported scale-ball svgs is irrelevant: scale balls are drawn in code */
function Scale() {
  return (
    <g>
      {Array.from({ length: 22 }, (_, i) => {
        const level = 22 - i
        return <Ball key={level} id="poa" cx={43.5} cy={247.6 + i * 26.082} d={13} level={level} label={level} />
      })}
    </g>
  )
}

const WEEK_X = [84.5, 132, 179.6, 227, 274.4, 321.9, 369.3]
const WEEK_L = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTH_X = [66.35, 141.3, 216.3, 291.3, 366.2]
const MONTH_L = ['1', '8', '15', '22', '29']
const YEAR_L = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function Axis({ period }: { period: Period }) {
  const t = (x: number, label: string, major = true, tick = true) => (
    <g key={label + x}>
      {tick && <line x1={x} x2={x} y1={major ? 812.5 : 814} y2={major ? 819.5 : 818} stroke="#8B99C4" strokeWidth="1" />}
      <text x={x} y={834} textAnchor="middle" fontSize="10" fontWeight="500" fill={INK} fontFamily="Reem Kufi">{label}</text>
    </g>
  )
  return (
    <g>
      <line x1="60.5" x2="393.5" y1="815.5" y2="815.5" stroke="#B8C2E0" strokeWidth="1" />
      {period === 'day' && Array.from({ length: 9 }, (_, k) => t(61 + 41.5625 * k, `${8 + k}:00`))}
      {period === 'day' && Array.from({ length: 8 }, (_, k) => <line key={'m' + k} x1={61 + 41.5625 * (k + 0.5)} x2={61 + 41.5625 * (k + 0.5)} y1="814" y2="818" stroke="#8B99C4" />)}
      {period === 'week' && WEEK_X.map((x, i) => t(x, WEEK_L[i], true, false))}
      {period === 'month' && MONTH_X.map((x, i) => t(x, MONTH_L[i]))}
      {period === 'year' && YEAR_L.map((m, i) => t(74.8 + 27.67 * i, m))}
    </g>
  )
}

export default function PoaGraph({ period, offset, onDrill, dy = 0 }: { period: Period; offset: number; onDrill: (p: Period, o: number) => void; dy?: number }) {
  const reduce = useReducedMotion()
  const data = useMemo(() => poaFor(period, offset), [period, offset])
  const [sel, setSel] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const prevData = useMemo(() => poaFor(period, offset - 1), [period, offset])

  useEffect(() => { setSel(null); setHover(null) }, [period, offset])
  useEffect(() => {
    const esc = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') setSel(null) }
    const out = (e: PointerEvent) => { if (!(e.target as Element).closest?.('[data-hit],[data-tip]')) setSel(null) }
    window.addEventListener('keydown', esc); window.addEventListener('pointerdown', out)
    return () => { window.removeEventListener('keydown', esc); window.removeEventListener('pointerdown', out) }
  }, [])
  const dur = reduce ? 0 : 1.4

  const pathD = useMemo(() => {
    if (period !== 'day') return data.lineD
    const pts = data.lineD.slice(1).split(' L').map((s) => s.split(' ').map(Number) as [number, number])
    return line().curve(curveMonotoneX)(pts) ?? ''
  }, [data, period])

  const active = hover ?? sel
  const p = sel !== null ? data.points[sel] : null
  const spec = sel !== null ? poaTip(period, offset, data, prevData, sel) : null
  const size = spec ? tipSize(spec) : null
  const tipX = p && size ? Math.min(Math.max(p.x - size.w / 2 + 6, 28), 428 - size.w - 16) : 0
  const tipY = p && size ? (p.y - p.size / 2 - size.h - 12 < 247 ? p.y + p.size / 2 + 12 : p.y - p.size / 2 - size.h - 12) : 0
  const maskId = `poa-mask-${period}`

  return (
    <svg viewBox="0 0 428 1832" width="428" height="1832" style={{ position: 'absolute', left: 0, top: dy, overflow: 'visible', pointerEvents: 'none' }}>
      <BallDefs id="poa" />
      {/* glass rail container + plot */}
      {img('poa-container-frame.svg', 19, 221, 386, 631)}
      {img('poa-plot-bg.svg', 61, 247, 332, 560)}
      <rect x={POA_PLOT.x} y={POA_PLOT.y} width={POA_PLOT.w} height={POA_PLOT.h} fill="transparent" style={{ pointerEvents: 'all', cursor: 'default' }} onClick={() => { setSel(null); setHover(null) }} />
      {img('poa-label-in-name.svg', 85.5, 252.6, 123, 11.85)}
      {img('poa-label-in-sub.svg', 85.2, 267.7, 166.85, 11.82)}
      {img('poa-label-out-name.svg', 85.4, 763.5, 163.66, 11.94)}
      {img('poa-label-out-sub.svg', 85.2, 785.7, 200.67, 11.82)}
      {img('poa-midline.svg', 61, 431.5, 333, 1)}
      <Scale />
      <Axis period={period} />

      <AnimatePresence mode="wait">
        <motion.g key={`${period}-${offset}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.25 }}>
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="200" width="428" height="660">
              <motion.path d={pathD} fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" pathLength={1}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur, ease: 'easeInOut' }} />
            </mask>
          </defs>
          <path d={pathD} fill="none" stroke="#6F7AA8" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="1.5 3.5" mask={`url(#${maskId})`} />
          {data.points.map((pt, i) => {
            const delay = reduce ? 0 : (dur * 0.9 * (pt.x - 61)) / 332
            const isActive = active === i
            return (
              <motion.g key={i} initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, duration: reduce ? 0 : 0.35, type: 'spring', stiffness: 260, damping: 18 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                <g data-hit role="button" tabIndex={0} aria-label={`Point of attraction ${pt.caption}: ${pt.level}`} className="hit" style={{ pointerEvents: 'all', cursor: 'pointer', outline: 'none' }} onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(i)} onPointerLeave={() => setHover(null)}
                  onClick={(e) => { e.stopPropagation(); setSel(i) }} onKeyDown={(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(i) } }}>
                  <circle cx={pt.x} cy={pt.y} r={Math.max(pt.size / 2 + 6, 22)} fill="transparent" />
                  <Ball id="poa" cx={pt.x} cy={pt.y} d={isActive ? pt.size * 1.18 : pt.size} level={pt.level} label={pt.label ?? (pt.size < 12 ? pt.level : undefined)} cyan={pt.cyan} active={isActive} />
                </g>
              </motion.g>
            )
          })}
          <AnimatePresence>
            {p && spec && <Tooltip key={`t${sel}-${period}-${offset}`} id="poatip" x={tipX} y={tipY} spec={spec} onDrill={spec.drill ? () => onDrill(spec.drill!.period, spec.drill!.offset) : undefined} />}
          </AnimatePresence>
        </motion.g>
      </AnimatePresence>
    </svg>
  )
}
export { LEVEL_GRAD, poaY }
