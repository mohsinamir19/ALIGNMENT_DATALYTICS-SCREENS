import { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate, useReducedMotion } from 'framer-motion'
import { asset, INK, PERIODS, rnd, type Period } from '../lib/theme'
import { CARD_TEXT, dateLabel } from '../data/model'
import type { Kind } from './ProgressGraph'

const A = (n: string, x: number, y: number, w: number, h: number, extra: React.CSSProperties = {}) => (
  <img src={asset(n)} alt="" draggable={false} style={{ position: 'absolute', left: x, top: y, width: w, height: h, pointerEvents: 'none', userSelect: 'none', ...extra }} />
)

export function Background({ dy = 0 }: { dy?: number }) {
  const blobs = (top: number) => (
    <div style={{ position: 'absolute', left: 0, top, width: 381, height: 851.55, opacity: 0.16, filter: 'blur(66.5px)', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 212.76, height: 454.84, background: '#6A35FF', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', left: 0, top: 282.82, width: 234.64, height: 529.19, background: '#FF00E5', opacity: 0.8, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', left: 117.84, top: 23.73, width: 253.5, height: 491.28, background: '#15FF73', opacity: 0.8, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', left: 156.17, top: 345.5, width: 224.83, height: 450.46, background: '#FFE600', opacity: 0.8, borderRadius: '50%' }} />
    </div>
  )
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: '#EAFFFD' }} />
      {blobs(105)}
      {dy > 0 && blobs(896.55)}
    </>
  )
}

function StatusBar() {
  return (
    <div style={{ position: 'absolute', left: 0, top: 12, width: 428, height: 17 }}>
      <span style={{ position: 'absolute', left: 55, top: '50%', transform: 'translate(-50%,-50%)', font: '500 17px/17px Roboto, sans-serif', letterSpacing: -0.5, color: '#797777', fontFeatureSettings: '"ss03" 1' }}>11:11</span>
      <div style={{ position: 'absolute', left: 334.3, right: 15.4, top: 0, height: 13, display: 'flex', gap: 7, alignItems: 'center' }}>
        <img src={asset('status-signal.svg')} width={19.97} height={12} alt="" />
        <img src={asset('status-wifi.svg')} width={17} height={12.5} alt="" />
        <img src={asset('status-battery.svg')} width={27.33} height={13} alt="" />
      </div>
    </div>
  )
}

const TAB_X = [8, 104, 200, 296]
const TAB_LABEL: Record<Period, [number, number]> = { day: [29.03, 10.71], week: [45.17, 10.78], month: [58.0, 11.14], year: [41.22, 10.71] }
const DATE_BOX: Record<Period, [number, number, number, number]> = { day: [177.98, 186.84, 71.67, 11.48], week: [179.75, 186.84, 68.06, 11.42], month: [166.75, 186.17, 94.3, 12.02], year: [196.52, 187.78, 34.35, 10.34] }

function Tabs({ period, onChange }: { period: Period; onChange: (p: Period) => void }) {
  return (
    <div role="tablist" aria-label="Period" style={{ position: 'absolute', left: 18, top: 107.5, width: 392, height: 60 }}>
      {A('tabs-container.svg', -5, -5, 403, 71)}
      {PERIODS.map((p, i) => {
        const on = p === period
        return (
          <button key={p} role="tab" aria-selected={on} onClick={() => onChange(p)} aria-label={p}
            style={{ position: 'absolute', left: TAB_X[i] - 4, top: 12 - 4, width: 96, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {on && (
              <motion.div layoutId="tab-pill" transition={{ type: 'spring', stiffness: 420, damping: 36 }} style={{ position: 'absolute', left: 0, top: 1, width: 100, height: 50 }}>
                <img src={asset('tabs-active-pill-day.svg')} width={100} height={50} alt="" draggable={false} style={{ position: 'absolute', left: -4, top: -3 }} />
              </motion.div>
            )}
            <img src={asset(`tabs-label-${p}-${on ? 'active' : 'inactive'}.svg`)} width={TAB_LABEL[p][0]} height={TAB_LABEL[p][1]} alt="" draggable={false} style={{ position: 'relative', top: -3, transition: 'opacity .2s', opacity: on ? 1 : 0.9 }} />
          </button>
        )
      })}
    </div>
  )
}

function DateStepper({ period, offset, onStep }: { period: Period; offset: number; onStep: (d: number) => void }) {
  const [x, y, w, h] = DATE_BOX[period]
  const arrow = (dir: 'prev' | 'next', left: number, chevX: number) => (
    <button aria-label={dir === 'prev' ? 'Previous' : 'Next'} onClick={() => onStep(dir === 'prev' ? -1 : 1)}
      style={{ position: 'absolute', left: left - 8, top: 177 - 8, width: 44, height: 44, }}>
      <img src={asset(`date-arrow-${dir}-base.svg`)} width={34} height={34} alt="" draggable={false} style={{ position: 'absolute', left: 8 - 2, top: 8 - 1 }} />
      <img src={asset(`date-arrow-${dir}-chevron.svg`)} width={6.2} height={14} alt="" draggable={false} style={{ position: 'absolute', left: chevX - left + 8, top: 7 + 8 }} />
    </button>
  )
  return (
    <>
      {arrow('prev', 96, 106.8)}
      {arrow('next', 304, 315)}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={period + offset} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}
          style={{ position: 'absolute', left: 0, top: 0, width: 428, height: 0 }}>
          {offset === 0 ? A(`date-label-${period}.svg`, x, y, w, h) : (
            <div style={{ position: 'absolute', left: 110, width: 208, top: 181, textAlign: 'center', font: '600 15px/22px "Reem Kufi"', color: INK, letterSpacing: 0.3 }}>{dateLabel(period, offset)}</div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

function CountText({ to, dec, box, fs }: { to: number; dec: number; box: [number, number, number, number]; fs: number }) {
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : 0)
  useEffect(() => {
    if (reduce) { setV(to); return }
    const c = animate(0, to, { duration: 1.1, ease: 'easeOut', onUpdate: setV })
    return () => c.stop()
  }, [to, reduce])
  const [x0, y, w0, h] = box
  const x = x0 - 0.9, w = w0 * 1.05
  return (
    <svg style={{ position: 'absolute', left: x, top: y - 0.4, overflow: 'visible', pointerEvents: 'none' }} width={w} height={h}>
      <text x="0" y={h} textLength={w} lengthAdjust="spacingAndGlyphs" fontSize={fs} fontWeight="600" fill={INK} fontFamily="Reem Kufi">{v.toFixed(dec)}</text>
    </svg>
  )
}

const VAL_BOX: Record<Period, [number, number, number, number]> = { day: [55.15, 48.58, 34.9, 13.42], week: [59.38, 48.74, 25.95, 13.26], month: [56.24, 48.58, 32.21, 13.58], year: [56.04, 48.58, 32.13, 13.44] }

function Cards({ period, offset }: { period: Period; offset: number }) {
  const t = CARD_TEXT[period]
  const value = offset === 0 ? t.value : Math.round((t.value + (rnd(offset * 9 + period.length) - 0.5) * 3) * 10 ** t.dec) / 10 ** t.dec
  const right = period === 'day' ? 'card-afternoon-day-full.svg' : period === 'year' ? 'card-afternoon-year-full.svg' : 'card-afternoon-week-month-full.svg'
  const nm: Record<Period, [number, number]> = { day: [17.48, 86.75], week: [17.73, 83.85], month: [17.48, 91.55], year: [17.61, 90.96] }
  return (
    <>
      <motion.div key={'cl' + period + offset} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', left: 45, top: 906, width: 170, height: 108 }}>
        {A('card-morning-plate-outer.svg', -4, -4, 182, 122)}
        {A('card-morning-plate-inner.svg', 0, 0, 174, 114)}
        {A('card-morning-heading-point-of-attraction.svg', 10.36, 15.86, 149.28, 9.48)}
        <CountText to={value} dec={t.dec} box={VAL_BOX[period]} fs={VAL_BOX[period][3] / 0.7} />
        {A('card-morning-count-slash22.svg', 94.57 - (period === 'week' ? 0.3 : 0), 50.81, 21.46, 11.48)}
        {A(`card-morning-${period}-name.svg`, nm[period][0], 75.2, nm[period][1], 21.1)}
      </motion.div>
      <motion.div key={'cr' + period} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} style={{ position: 'absolute', left: 227, top: 906, width: 170, height: 108 }}>
        {A(right, -4, -4, 182, 122)}
      </motion.div>
    </>
  )
}

const LEG: { k: Kind; x: number; y: number; w: number; h: number }[] = [
  { k: 'P', x: 22, y: 1759, w: 84, h: 30 }, { k: 'G', x: 138, y: 1759, w: 70, h: 30 },
  { k: 'C', x: 218, y: 1759, w: 84, h: 30 }, { k: 'POS', x: 304, y: 1759, w: 116, h: 30 },
  { k: 'NEG', x: 22, y: 1789, w: 128, h: 30 },
]

function Legend({ hidden, toggle }: { hidden: Set<Kind>; toggle: (k: Kind) => void }) {
  return (
    <>
      {A('legend-bar-group-full.svg', 7 - 2.75, 1755.93 - 2.75, 423, 75)}
      {LEG.map((l) => (
        <button key={l.k} aria-pressed={!hidden.has(l.k)} aria-label={`Toggle ${l.k}`} onClick={() => toggle(l.k)}
          style={{ position: 'absolute', left: l.x, top: l.y, width: l.w, height: l.h, background: hidden.has(l.k) ? 'rgba(214,232,250,.78)' : 'transparent', transition: 'background .2s', borderRadius: 6 }} />
      ))}
    </>
  )
}

interface Props { dy?: number; period: Period; offset: number; hidden: Set<Kind>; onPeriod: (p: Period) => void; onStep: (d: number) => void; onToggle: (k: Kind) => void }

export default function Shell({ dy = 0, period, offset, hidden, onPeriod, onStep, onToggle }: Props) {
  return (
    <>
      <Background dy={dy} />
      <StatusBar />
      <button aria-label="Back" onClick={() => history.length > 1 && history.back()} style={{ position: 'absolute', left: 10, top: 49, width: 44, height: 44 }}>
        {A('back-button-group-full.svg', -1, 0.85, 50, 47)}
      </button>
      {A('title-your-datalytics.svg', 101.46, 65.64, 225.47, 18.55)}
      <button aria-label="Home" onClick={() => (document.getElementById('v11-scroll') ?? window).scrollTo({ top: 0, behavior: 'smooth' })} style={{ position: 'absolute', left: 362, top: 46, width: 44, height: 44 }}>
        {A('home-icon-group-full.svg', 2.48, 2, 40, 40)}
      </button>
      <Tabs period={period} onChange={onPeriod} />
      <DateStepper period={period} offset={offset} onStep={onStep} />
      <div style={{ position: 'absolute', left: 0, top: dy, width: 428, height: 0 }}>
        {A('heading-your-point-of-attraction.svg', 80.62, 214.23, 265.33, 14.31)}
        {A('heading-your-progress.svg', 134.67, 873.61, 155.21, 13.54)}
        <Cards period={period} offset={offset} />
        <Legend hidden={hidden} toggle={onToggle} />
      </div>
    </>
  )
}
