import { useMemo, useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Ball, { BallDefs } from './Ball'
import Tooltip, { tipHeight, type TipContent } from './Tooltip'
import { asset, INK, type Period } from '../lib/theme'
import { pgFor, PG_DEFAULT_SELECT, DESIGN_TIPS, PG_PLOT, type Bar } from '../data/model'

export type Kind = 'P' | 'G' | 'C' | 'POS' | 'NEG'
const STAR_W = { day: 16.2, week: 13.8, month: 8.9, year: 10.5 }
const G_W = { day: 12.1, week: 10.3, month: 6.65, year: 7.9 }
const C_W = { day: 16, week: 14.4, month: 8.8, year: 11.2 }
const TRI_W = { day: 16.2, week: 16.2, month: 12.95, year: 11.3 }
const BLUE = '#3F5CC4', PINK = '#E0058F'

const Img = ({ n, cx, cy, w, h, s = 1, o = 1 }: { n: string; cx: number; cy: number; w: number; h: number; s?: number; o?: number }) => (
  <image href={asset(n)} x={cx - (w * s) / 2} y={cy - (h * s) / 2} width={w * s} height={h * s} preserveAspectRatio="none" opacity={o} />
)

const LABELS: [string, number, number, number, number][] = [
  ['pg-label-superhigh.svg', 353, 1099.6, 57.38, 7.45], ['pg-label-high.svg', 353, 1239.6, 24.01, 7.45],
  ['pg-label-bordem.svg', 353, 1280.4, 42.15, 7.63], ['pg-label-medium.svg', 353, 1296.4, 40.54, 7.63],
  ['pg-label-low.svg', 353, 1496.6, 22.52, 7.71], ['pg-label-verylow.svg', 353, 1646.6, 50.59, 7.71],
]
const ZOOM_POS: Record<Period, [number, number, number, number]> = { day: [14, 1700, 361, 1699], week: [9, 1700, 371, 1700], month: [17, 1701, 379, 1701], year: [9, 1700, 375, 1700] }

function axisFor(period: Period): { base: [number, number]; ticks: [number, string][]; tickH: number } {
  if (period === 'day') return { base: [41.2, 351], ticks: [61.2, 107, 154, 200.8, 246, 295.8, 340.8].map((x, i) => [x, ['1:00', '1:10', '1:20', '1:30', '1:40', '1:50', '1:50'][i]] as [number, string]), tickH: 0 }
  if (period === 'week') return { base: [38.5, 351.5], ticks: [60.8, 105.4, 149.9, 194.5, 239.1, 283.6, 328.2].map((x, i) => [x, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]] as [number, string]), tickH: 7 }
  if (period === 'month') return { base: [46.5, 351.5], ticks: [52, 122.5, 192.9, 263.4, 333.8].map((x, i) => [x, ['1', '8', '15', '22', '29'][i]] as [number, string]), tickH: 7 }
  return { base: [43, 355], ticks: Array.from({ length: 12 }, (_, i) => [56 + 26 * i, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]] as [number, string]), tickH: 6 }
}

interface Props { period: Period; offset: number; hidden: Set<Kind>; onFilter: () => void }

export default function ProgressGraph({ period, offset, hidden, onFilter }: Props) {
  const reduce = useReducedMotion()
  const data = useMemo(() => pgFor(period, offset), [period, offset])
  const [sel, setSel] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState(0)
  const drag = useRef<{ x: number; pan: number } | null>(null)

  useEffect(() => { setSel(offset === 0 ? PG_DEFAULT_SELECT[period] : null); setHover(null); setZoom(1); setPan(0) }, [period, offset])

  const CX = PG_PLOT.x + PG_PLOT.w / 2
  const maxPan = ((zoom - 1) * PG_PLOT.w) / 2
  const fx = (x: number) => CX + (x - CX) * zoom + pan
  const setZ = (z: number) => { setZoom(z); setPan((p) => Math.max(-((z - 1) * PG_PLOT.w) / 2, Math.min(((z - 1) * PG_PLOT.w) / 2, p))) }

  const s = (w: Record<Period, number>, base: number) => w[period] / base
  const sStar = s(STAR_W, 16.2), sG = s(G_W, 12.1), sC = s(C_W, 16), sT = s(TRI_W, 16.2)
  const n = data.bars.length
  const step = reduce ? 0 : Math.min(0.14, 1.7 / n)
  const grow = reduce ? 0 : 0.5

  const visible = (b: Bar) => !hidden.has(b.type)
  const active = hover ?? sel
  const ab = active !== null ? data.bars[active] : null
  const ax = axisFor(period)

  const tip: TipContent | null = useMemo(() => {
    if (!ab) return null
    const design = DESIGN_TIPS[period]
    if (design && offset === 0 && active === PG_DEFAULT_SELECT[period]) return { title: design.title, lines: [design.l2, design.l3], delta: `▲ +${ab.delta > 0 ? ab.delta : 1.2} levels vs previous ${period}`, deltaUp: true }
    const what = ab.type === 'P' ? (ab.games === 1 ? 'process' : 'processes') : ab.games === 1 ? 'game' : 'games'
    const l2 = period === 'day' ? `${ab.games} ${what} · feeling ${Math.round(ab.vBottom)} → ${Math.round(ab.vTop)}` : period === 'week' ? `${ab.games} ${what} · avg feeling ${ab.avg}` : `${ab.games * 2} activities · avg ${ab.avg}`
    return { title: ab.label, lines: [l2, `Best lift +${ab.lift}`], delta: `${ab.delta >= 0 ? '▲ +' : '▼ '}${ab.delta} levels vs previous ${period}`, deltaUp: ab.delta >= 0 }
  }, [ab, period, offset, active])

  const tH = tipHeight(2, true)
  const tx = ab ? Math.min(Math.max(fx(ab.x1) - 106.5, 14), 428 - 204 - 14) : 0
  const flip = ab ? ab.yTop + 19.5 + tH > 1655 : false
  const ty = ab ? (flip ? ab.yTop - 10 - tH : ab.yTop + 19.5) : 0

  const checks = [...data.checkIns].sort((a, b) => a.x - b.x)
  const dotted = checks.map((c, i) => `${i ? 'L' : 'M'}${fx(c.x)} ${c.y}`).join(' ')
  const hitW = Math.min(22, Math.max(9, (period === 'month' ? 10 : 20)))
  const [zox, zoy, zix, ziy] = ZOOM_POS[period]

  const key = `${period}-${offset}`
  const btn = (x: number, y: number, label: string, onClick: () => void, size = 44) => (
    <rect x={x + 13 - size / 2} y={y + 13 - size / 2} width={size} height={size} fill="transparent" style={{ pointerEvents: 'all', cursor: 'pointer' }} onClick={onClick}><title>{label}</title></rect>
  )

  return (
    <svg viewBox="0 0 428 1832" width="428" height="1832" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none', touchAction: 'pan-y' }}>
      <BallDefs id="pg" />
      <defs>
        <clipPath id="pg-clip"><rect x="39" y="1040" width="314" height="720" /></clipPath>
        <filter id="pg-glow" x="-200%" y="-20%" width="500%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#7a8cff" floodOpacity=".8" /></filter>
      </defs>
      {/* card plates */}
      <image href={asset('pg-card-plate-outer.svg')} x="3" y="1028" width="426" height="727" preserveAspectRatio="none" />
      <image href={asset('pg-card-plate-inner.svg')} x="9" y="1034" width="414" height="715" preserveAspectRatio="none" />
      <image href={asset('pg-plot-gradient.svg')} x="39" y="1099" width="312" height="560" preserveAspectRatio="none" />
      {/* strips */}
      <image href={asset('pg-strip-well.svg')} x={38 - 5.27} y={1065 - 5.27} width="321.95" height="38.95" preserveAspectRatio="none" />
      <image href={asset('pg-strip-well.svg')} x={42 - 5.27} y={1672 - 5.27} width="321.95" height="38.95" preserveAspectRatio="none" />
      <image href={asset('pg-label-posno.svg')} x="42.1" y="1053.45" width="107.78" height="7.89" />
      <image href={asset('pg-label-negno.svg')} x="45.45" y="1662.4" width="116.1" height="7.92" />
      {/* scale */}
      {Array.from({ length: 22 }, (_, i) => <Ball key={i} id="pg" cx={25.5} cy={1102.6 + i * 26.081} d={13} level={22 - i} label={22 - i} />)}
      {LABELS.map(([f, x, y, w, h]) => <image key={f} href={asset(f)} x={x} y={y} width={w} height={h} />)}

      {/* plot interaction layer: background tap clears, drag pans */}
      <rect x="39" y="1099" width="312" height="560" fill="transparent" style={{ pointerEvents: 'all', touchAction: zoom > 1 ? 'none' : 'pan-y', cursor: zoom > 1 ? 'grab' : 'default' }}
        onPointerDown={(e) => { if (zoom > 1) { drag.current = { x: e.clientX, pan }; (e.target as Element).setPointerCapture(e.pointerId) } }}
        onPointerMove={(e) => { if (drag.current) { const sc = (e.currentTarget.ownerSVGElement!.getBoundingClientRect().width || 428) / 428; setPan(Math.max(-maxPan, Math.min(maxPan, drag.current.pan + (e.clientX - drag.current.x) / sc))) } }}
        onPointerUp={() => { drag.current = null }}
        onClick={() => { setSel(null); setHover(null) }} />

      <g clipPath="url(#pg-clip)">
        {/* axis */}
        {period === 'day' ? <image href={asset('pg-day-ruler.svg')} x={fx(45.7)} y="1710.6" width={306.41 * zoom} height="9.59" preserveAspectRatio="none" />
          : <g transform={`translate(0 ${period === 'month' ? 1 : 0})`}><line x1={ax.base[0]} x2={ax.base[1]} y1="1709.8" y2="1709.8" stroke="#B8C2E0" strokeWidth="1.5" />
            {ax.ticks.map(([x]) => <line key={x} x1={fx(x)} x2={fx(x)} y1="1706.5" y2="1713.3" stroke="#97A5D0" strokeWidth="1.6" />)}</g>}
        {ax.ticks.map(([x, l], i) => (
          <text key={i} x={fx(x)} y={period === 'day' ? 1730 : period === 'year' ? 1727.5 : 1728.5} textAnchor="middle" fontSize={({ day: 9, week: 10.6, month: 10.5, year: 10.2 })[period]} fontWeight="600" fill={INK} fontFamily="Reem Kufi">{l}</text>
        ))}
        {period === 'day' && <rect x={43 + (maxPan ? (1 - (pan + maxPan) / (2 * maxPan)) * 232 : 0)} y="1653" width="70" height="4" rx="2" fill="#F5F7F7" stroke="#d6dde6" strokeWidth=".5" />}

        <motion.g key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.2 }}>
          {/* dotted check-in line (reveals after bars) */}
          {!hidden.has('C') && (
            <motion.path d={dotted} fill="none" stroke="#ABABAB" strokeWidth="1" strokeDasharray="2 2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: reduce ? 0 : n * step * 0.6, duration: reduce ? 0 : 1.2, ease: 'easeInOut' }} />
          )}
          {/* bars */}
          {data.bars.map((b, i) => {
            if (!visible(b)) return null
            const color = b.type === 'P' ? BLUE : PINK
            const hot = active === i
            const x0 = fx(b.x0), x1 = fx(b.x1)
            const d = i * step
            const mk = (x: number, y: number, scale: number) => b.type === 'P'
              ? <Img n="pg-marker-process-star.svg" cx={x} cy={y} w={18.628} h={18.812} s={sStar * scale} />
              : <Img n="pg-marker-games.svg" cx={x} cy={y} w={12.094} h={17.637} s={sG * scale} />
            return (
              <g key={i}>
                <motion.line x1={x0} y1={b.yBottom} stroke={color} strokeWidth={hot ? 3.4 : 2} strokeLinecap="round" filter={hot ? 'url(#pg-glow)' : undefined}
                  initial={{ x2: x0, y2: b.yBottom }} animate={{ x2: x1, y2: b.yTop }} transition={{ delay: d, duration: grow, ease: 'easeOut' }} />
                {period !== 'month' && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d, duration: reduce ? 0 : 0.2 }}>{mk(x0, b.yBottom, hot ? 1.2 : 1)}</motion.g>
                )}
                <motion.g initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: d + grow * 0.85, duration: reduce ? 0 : 0.25 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  {mk(x1, b.yTop, hot ? 1.25 : 1)}
                </motion.g>
                {period === 'week' && data.counts && (
                  <text x={x1 + 7} y={b.yTop + 3} fontSize="6.5" fontWeight="700" fill={color} fontFamily="Reem Kufi">x{data.counts.barTop[i]}</text>
                )}
                <line x1={x0} y1={b.yBottom + 8} x2={x1} y2={b.yTop - 8} stroke="transparent" strokeWidth={hitW} strokeLinecap="round" style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(i)} onPointerLeave={() => setHover(null)}
                  onClick={(e) => { e.stopPropagation(); setSel(sel === i && hover === null ? null : i); setHover(null) }} />
              </g>
            )
          })}
          {/* check-ins */}
          {!hidden.has('C') && checks.map((c, i) => (
            <motion.g key={'c' + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : n * step * 0.5 + i * 0.05, duration: 0.25 }}>
              <Img n="pg-marker-checkin.svg" cx={fx(c.x)} cy={c.y} w={25.067} h={24.667} s={sC} />
              {period === 'week' && data.counts && data.counts.checkIns[i] !== undefined && <text x={fx(c.x) + 6} y={c.y + 11} fontSize="6.5" fontWeight="700" fill="#0B8FA3" fontFamily="Reem Kufi">x{data.counts.checkIns[i]}</text>}
            </motion.g>
          ))}
          {/* match triangles inside plot */}
          {!hidden.has('POS') && data.pos.map((t, i) => (
            <motion.g key={'p' + i} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: reduce ? 0 : n * step * 0.8 + i * 0.06 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <Img n="pg-tri-positive-plot.svg" cx={fx(t.x)} cy={t.y} w={21.371} h={17.946} s={sT} />
              {t.n > 0 && <text x={fx(t.x) + 7} y={t.y + 8} fontSize="6.5" fontWeight="700" fill="#1B8F74" fontFamily="Reem Kufi">x{t.n}</text>}
            </motion.g>
          ))}
          {!hidden.has('NEG') && data.neg.map((t, i) => (
            <motion.g key={'n' + i} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: reduce ? 0 : n * step * 0.8 + i * 0.06 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <Img n="pg-tri-negative-plot.svg" cx={fx(t.x)} cy={t.y} w={19.537} h={16.75} s={sT} />
              {t.n > 0 && <text x={fx(t.x) + 7} y={t.y + 8} fontSize="6.5" fontWeight="700" fill="#8A8A8A" fontFamily="Reem Kufi">x{t.n}</text>}
            </motion.g>
          ))}
          {/* strips */}
          {!hidden.has('POS') && data.stripPos.map((m, i) => (
            <motion.g key={'sp' + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : i * 0.05 + 0.2 }}>
              <Img n="pg-strip-tri-positive.svg" cx={fx(m.x) + (period === 'day' ? 8 : period === 'month' ? 5.5 : 6.5)} cy={period === 'day' ? 1083 : period === 'week' ? 1084.4 : 1081.4} w={21.371} h={17.946} s={period === 'day' ? 1 : 0.81} />
              {m.count !== null && <text x={fx(m.x) + (period === 'day' ? 14.5 : 15.5)} y={period === 'month' || period === 'year' ? 1083 : 1086} fontSize={period === 'day' ? 7 : 9} fontWeight="700" fill="#1B8F74" fontFamily="Reem Kufi">{m.count}</text>}
            </motion.g>
          ))}
          {!hidden.has('NEG') && data.stripNeg.map((m, i) => (
            <motion.g key={'sn' + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : i * 0.05 + 0.2 }}>
              <Img n="pg-strip-tri-negative.svg" cx={fx(m.x) + (period === 'day' ? 8 : 7)} cy={period === 'day' ? 1690 : 1691.4} w={19.537} h={16.75} s={period === 'day' ? 1 : 0.81} />
              {m.count !== null && <text x={fx(m.x) + 14.5} y={1693} fontSize={period === 'day' ? 7 : 9} fontWeight="700" fill="#7b7b7b" fontFamily="Reem Kufi">{m.count}</text>}
            </motion.g>
          ))}
          {/* selected ring */}
          {ab && visible(ab) && (
            <motion.g key={'ring' + active} initial={{ opacity: 0, scale: 1.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <image href={asset('pg-selected-ring.svg')} x={fx(ab.x1) - 11} y={ab.yTop + 1.5 - 11} width="22" height="22" />
            </motion.g>
          )}
        </motion.g>
      </g>

      <AnimatePresence>{ab && tip && visible(ab) && <Tooltip key={`tip${active}${key}`} id="pgtip" x={tx} y={ty} content={tip} />}</AnimatePresence>

      {/* filter + zoom */}
      <image href={asset('pg-filter-button.svg')} x={387 - 30.3} y={1064 - 27.86} width="60.59" height="55.72" style={{ pointerEvents: 'none' }} />
      <rect x="365" y="1042" width="44" height="44" rx="22" fill="transparent" style={{ pointerEvents: 'all', cursor: 'pointer' }} onClick={onFilter}><title>Filter</title></rect>
      <image href={asset('pg-zoom-out-base.svg')} x={zox - 3} y={zoy - 3} width="32" height="33" />
      <image href={asset('pg-zoom-out-glyph.svg')} x={zox + 8} y={zoy + 8} width="10" height="10" opacity={zoom > 1 ? 1 : 0.55} />
      <image href={asset('pg-zoom-in-base.svg')} x={zix - 3} y={ziy - 3} width="32" height="33" />
      <image href={asset('pg-zoom-in-glyph.svg')} x={zix + 8} y={ziy + 8} width="10" height="10" opacity={zoom < 2 ? 1 : 0.55} />
      {btn(zox, zoy, 'Zoom out', () => setZ(Math.max(1, zoom - 0.5)))}
      {btn(zix, ziy, 'Zoom in', () => setZ(Math.min(2, zoom + 0.5)))}
    </svg>
  )
}
export { Ball }
