import { clamp, rnd, type Period } from '../lib/theme'
import poaJson from './poa.json'
import pgDay from './progress-day.json'
import pgWeek from './progress-week.json'
import pgMonth from './progress-month.json'
import pgYear from './progress-year.json'

/* ---------------------------------------------------------------- POA (top graph) */
export const POA_PLOT = { x: 61, y: 247, w: 332, h: 560 }
export const poaY = (level: number) => 247.6 + (22.25 - level) * 26.082

export interface PoaPoint { x: number; y: number; level: number; label?: number; size: number; cyan?: boolean; caption: string }
export interface PoaData { points: PoaPoint[]; lineD: string; avg: number }

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DOW_LONG = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const BASE = new Date(2026, 9, 25) // Sun 25 Oct 2026

const DAY_SAMPLES: [number, number][] = [[75.9, 725.9], [83.9, 701.3], [90.8, 677.0], [97.7, 652.8], [104.9, 628.6], [111.7, 604.8], [119.8, 580.9], [128.9, 557.4], [140.2, 535.0], [153.9, 514.7], [171.2, 497.4], [193.2, 486.8], [215.0, 487.9], [233.9, 503.6], [249.2, 523.0], [264.1, 542.8], [280.3, 561.5], [303.9, 569.1], [316.2, 548.2], [323.9, 523.5], [329.2, 499.0], [333.7, 474.2], [337.7, 449.4], [341.5, 424.5], [345.3, 399.6], [349.1, 374.7], [353.2, 349.9], [358.2, 325.8], [370.5, 309.5]]

function hourLabel(x: number) {
  const t = 8 + (x - 61) / 41.5625
  const h = Math.floor(t), m = Math.round((t - h) * 60)
  return `${h}:${String(m).padStart(2, '0')}`
}

export function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r }

export function poaFor(period: Period, offset: number): PoaData {
  const raw = (poaJson as any)[period] as any[]
  const seed = (period.length * 31 + offset * 17 + 5)
  const shifted = raw.map((p, i) => {
    let level = p.levelInt as number
    let y = p.y as number
    if (offset !== 0) {
      level = clamp(level + Math.round((rnd(seed + i * 3.3) - 0.5) * 5), 2, 21)
      y = poaY(level)
    }
    return { ...p, level, y }
  })
  const pts: PoaPoint[] = shifted.map((p) => {
    let caption = ''
    if (period === 'day') caption = hourLabel(p.x)
    else if (period === 'week') { const k = WEEK.indexOf(p.day); caption = p.day + ' ' + addDays(BASE, offset * 7 - 6 + k).getDate() }
    else if (period === 'month') caption = DOW[addDays(new Date(2026 + 0, 9 + offset, p.day), 0).getDay()] + ' ' + p.day
    else caption = MONTHS_LONG[MON.indexOf(p.month)]
    return { x: p.x, y: p.y, level: p.level, label: p.label !== undefined ? p.level : undefined, size: p.size, cyan: period === 'day', caption }
  })
  // line
  let lineD = ''
  if (period === 'day') {
    const dy = (x: number) => {
      const a = shifted
      if (x <= a[0].x) return a[0].y - raw[0].y
      for (let i = 0; i < a.length - 1; i++) if (x <= a[i + 1].x) { const t = (x - a[i].x) / (a[i + 1].x - a[i].x); return (a[i].y - raw[i].y) * (1 - t) + (a[i + 1].y - raw[i + 1].y) * t }
      return a[a.length - 1].y - raw[raw.length - 1].y
    }
    const s = DAY_SAMPLES.map(([x, y]) => [x, y + dy(x)])
    lineD = 'M' + s.map((p) => p.join(' ')).join(' L') // refined by d3 in component
  } else {
    const gap = period === 'week' ? 60 : period === 'month' ? 14 : 40
    pts.forEach((p, i) => {
      const prev = pts[i - 1]
      lineD += prev && p.x - prev.x <= gap ? ` L${p.x} ${p.y}` : ` M${p.x} ${p.y}`
    })
  }
  const avg = pts.reduce((s, p) => s + p.level, 0) / pts.length
  return { points: pts, lineD: lineD.trim(), avg }
}

/* ---------------------------------------------------------------- Progress graph */
export const PG_PLOT = { x: 39, y: 1099, w: 312, h: 560 }
export const pgY = (v: number) => 1102.6 + (22 - v) * 26.081

export interface Bar { x0: number; x1: number; yTop: number; yBottom: number; type: 'P' | 'G'; vTop: number; vBottom: number; label: string; games: number; avg: number; lift: number; delta: number }
export interface PgData {
  bars: Bar[]
  checkIns: { x: number; y: number; v: number }[]
  pos: { x: number; y: number; n: number }[]
  neg: { x: number; y: number; n: number }[]
  stripPos: { x: number; count: number | null }[]
  stripNeg: { x: number; count: number | null }[]
  counts?: any
  selected: number | null
}

const PG_RAW: Record<Period, any> = { day: pgDay, week: pgWeek, month: pgMonth, year: pgYear }
const TIPS: Partial<Record<Period, { label: string; l2: string; lift: number; bar: number }>> = {}
void TIPS

export function barLabel(period: Period, x: number, i: number, offset: number): string {
  if (period === 'day') {
    const t = 8 + ((x - 39) / 312) * 8
    const h = Math.floor(t)
    return `${h}:${String(Math.round((t - h) * 60)).padStart(2, '0')}`
  }
  if (period === 'week') {
    const k = clamp(Math.round((x - 46.3) / 44.57), 0, 6) // Mon..Sun
    const d = addDays(BASE, offset * 7 - 6 + k)
    return DOW_LONG[d.getDay()]
  }
  if (period === 'month') {
    const day = clamp(Math.round((x - 52) / 10.06) + 1, 1, 31)
    const d = new Date(2026, 9 + offset, day)
    return `${DOW[d.getDay()].toUpperCase()} ${day} ${MON[d.getMonth()].toUpperCase()}`
  }
  return MONTHS_LONG[(i + 1 + (offset % 12) + 12) % 12].toUpperCase()
}

export function pgFor(period: Period, offset: number): PgData {
  const r = PG_RAW[period]
  const seed = period.length * 13 + offset * 7 + 2
  const dyOf = (i: number) => (offset === 0 ? 0 : Math.round((rnd(seed + i * 2.7) - 0.5) * 4) * 26.081)
  const bars: Bar[] = r.bars.map((b: any, i: number) => {
    const x0 = typeof b.x === 'number' ? b.x : b.x.bottom
    const x1 = typeof b.x === 'number' ? x0 : b.x.top
    const d = dyOf(i)
    const yTop = clamp(b.yTop + d, 1110, 1620), yBottom = clamp(b.yBottom + d, yTop + 40, 1640)
    const vTop = 22 - (yTop - 1102.6) / 26.081, vBottom = 22 - (yBottom - 1102.6) / 26.081
    const n = 1 + Math.floor(rnd(seed + i) * 4)
    return {
      x0, x1, yTop, yBottom, type: b.type, vTop, vBottom,
      label: barLabel(period, x0, i, offset),
      games: n, avg: Math.round(vTop), lift: Math.max(1, Math.round(vTop - vBottom)),
      delta: Math.round((rnd(seed + i * 5.1) * 8 - 3) * 10) / 10,
    }
  })
  const shiftY = (arr: any[], k: number) => arr.map((c, i) => { const y = clamp(c.y + dyOf(i + k), 1130, 1630); return { ...c, y } })
  const wc = r.counts
  return {
    bars,
    checkIns: shiftY(r.checkIns, 40),
    pos: shiftY(r.plotPositiveTriangles, 80).map((t: any, i: number) => ({ ...t, n: wc?.plotPositive?.[i] ?? 0 })),
    neg: shiftY(r.plotNegativeTriangles, 120).map((t: any, i: number) => ({ ...t, n: wc?.plotNegative?.[i] ?? 0 })),
    stripPos: r.stripPositive, stripNeg: r.stripNegative, counts: wc,
    selected: offset === 0 ? (r.selected?.bar ?? null) : null,
  }
}
export const PG_DEFAULT_SELECT: Record<Period, number | null> = { day: null, week: 5, month: 16, year: 6 }

/** Fixed tooltips copied from the design for the initially selected bar. */
export const DESIGN_TIPS: Record<Period, { title: string; l2: string; l3: string } | null> = {
  day: null,
  week: { title: 'SATURDAY', l2: '3 games · avg feeling 14', l3: 'Best lift +6' },
  month: { title: 'THU 15 OCT', l2: '2 activities · avg 13', l3: 'Best lift +6' },
  year: { title: 'AUGUST', l2: '16 activities · avg 13', l3: 'Best lift +10' },
}

/* ---------------------------------------------------------------- Shell text */
export const CARD_TEXT: Record<Period, { value: number; dec: number; recorded: number; deact: string }> = {
  day: { value: 11.74, dec: 2, recorded: 23, deact: '5MIN' },
  week: { value: 11.7, dec: 1, recorded: 51, deact: 'SUN 25 OCT' },
  month: { value: 10.8, dec: 1, recorded: 212, deact: 'SUN 25 OCT' },
  year: { value: 10.4, dec: 1, recorded: 391, deact: 'OCT 2026' },
}

export function dateLabel(period: Period, offset: number): string {
  if (period === 'day') { const d = addDays(BASE, offset); return `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}` }
  if (period === 'week') { const e = addDays(BASE, offset * 7), s = addDays(e, -6); return `${s.getDate()} - ${e.getDate()} ${MON[e.getMonth()]}` }
  if (period === 'month') { const d = new Date(2026, 9 + offset, 1); return `${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}` }
  return String(2026 + offset)
}
