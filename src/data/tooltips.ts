import type { Period } from '../lib/theme'
import { clamp } from '../lib/theme'
import { addDays, DESIGN_TIPS, PG_DEFAULT_SELECT, type Bar, type PgData, type PoaData, type PoaPoint } from './model'
import { emotionOf } from './emotions'

export type TipType = 'processEnd' | 'processStart' | 'gameEnd' | 'gameStart' | 'checkIn' | 'matchPos' | 'matchNeg' | 'stripPos' | 'stripNeg' | 'poa'
export type IconKey = 'P' | 'G' | 'C' | 'POS' | 'NEG' | 'POA'

/** One config map: type -> title, accent color and icon. Fields are built per type below. */
export const TIP_CONFIG: Record<TipType, { title: string; color: string; icon: IconKey }> = {
  processEnd: { title: 'PROCESS · END', color: '#3F5CC4', icon: 'P' },
  processStart: { title: 'PROCESS · START', color: '#3F5CC4', icon: 'P' },
  gameEnd: { title: 'GAME · END', color: '#C4087F', icon: 'G' },
  gameStart: { title: 'GAME · START', color: '#C4087F', icon: 'G' },
  checkIn: { title: 'CHECK-IN', color: '#0B8FA3', icon: 'C' },
  matchPos: { title: 'POSITIVE MATCH', color: '#0B8FA3', icon: 'POS' },
  matchNeg: { title: 'NEGATIVE MATCH', color: '#C0392B', icon: 'NEG' },
  stripPos: { title: 'POSITIVE · NO EMOTION', color: '#0B8FA3', icon: 'POS' },
  stripNeg: { title: 'NEGATIVE · NO EMOTION', color: '#C0392B', icon: 'NEG' },
  poa: { title: 'POINT OF ATTRACTION', color: '#3F5CC4', icon: 'POA' },
}

export interface TipSpec {
  type: TipType
  title: string
  color: string
  icon: IconKey
  lines: string[]
  delta?: { text: string; up: boolean }
  drill?: { period: Period; offset: number; label: string }
}

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const BASE = new Date(2026, 9, 25)
const DAY_MS = 86400000

/* ------------------------------------------------ x -> time/date helpers (progress graph) */
const hhmm = (x: number) => {
  const t = 8 + ((x - 39) / 312) * 8
  const h = Math.floor(t)
  return `${h}:${String(Math.round((t - h) * 60) % 60).padStart(2, '0')}`
}
const weekK = (x: number) => clamp(Math.floor((x - 39) / 44.57), 0, 6)
const monthDay = (x: number) => clamp(Math.round((x - 52) / 10.06) + 1, 1, 31)
const yearM = (x: number) => clamp(Math.floor((x - 56) / 26) + 1, 0, 11)

export function whenLabel(period: Period, offset: number, x: number): string {
  if (period === 'day') return hhmm(x)
  if (period === 'week') { const d = addDays(BASE, offset * 7 - 6 + weekK(x)); return `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}` }
  if (period === 'month') { const d = new Date(2026, 9 + offset, monthDay(x)); return `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}` }
  return MONTHS[((yearM(x) + offset * 12) % 12 + 12) % 12]
}

/** Where the "expand" button leads: Year -> Month -> Week -> Day. */
export function drillFor(period: Period, offset: number, x: number, graph: 'pg' | 'poa' = 'pg'): TipSpec['drill'] {
  if (period === 'day') return undefined
  if (period === 'year') {
    const m = graph === 'pg' ? yearM(x) : clamp(Math.round((x - 74.8) / 27.67), 0, 11)
    return { period: 'month', offset: offset * 12 + (m - 9), label: `Open ${MONTHS[m]}` }
  }
  if (period === 'month') {
    const day = graph === 'pg' ? monthDay(x) : clamp(Math.round((x - 66.35) / 10.714) + 1, 1, 31)
    const diff = Math.round((new Date(2026, 9 + offset, day).getTime() - BASE.getTime()) / DAY_MS)
    return { period: 'week', offset: Math.ceil(diff / 7), label: `Open week of ${day} ${MON[new Date(2026, 9 + offset, day).getMonth()]}` }
  }
  const k = graph === 'pg' ? weekK(x) : clamp(Math.round((x - 84.5) / 47.45), 0, 6)
  const d = addDays(BASE, offset * 7 - 6 + k)
  return { period: 'day', offset: Math.round((d.getTime() - BASE.getTime()) / DAY_MS), label: `Open ${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}` }
}

/* ------------------------------------------------ comparison vs previous period */
const pl = (n: number, noun: string) => {
  if (n === 1) return `${n} ${noun}`
  if (noun === 'match') return `${n} matches`
  if (noun === 'level of lift') return `${n} levels of lift`
  return `${n} ${noun}s`
}
/** Change vs the previous period: value, absolute change, % and colour (green up, red down). `noun` is singular. */
export function cmp(cur: number, prev: number | undefined, noun: string, period: Period): TipSpec['delta'] {
  if (prev === undefined || Number.isNaN(prev)) return undefined
  const d = Math.round((cur - prev) * 10) / 10
  if (d === 0) return { up: true, text: `● Same as previous ${period} (${pl(prev, noun)})` }
  const pct = prev === 0 ? null : Math.round((Math.abs(d) / Math.abs(prev)) * 100)
  const up = d > 0
  return { up, text: `${up ? '▲ +' : '▼ −'}${pl(Math.abs(d), noun)}${pct === null ? '' : ` (${up ? '+' : '−'}${pct}%)`} vs previous ${period}` }
}

const NOTES_POS = ['Finished my first chapter', 'Felt calm after the walk', 'Got some good news', 'Shared a laugh with a friend']
const NOTES_NEG = ['Stuck in traffic', 'Argued about plans', 'Missed a deadline', 'Too many emails at once']
const lvl = (y: number) => Math.min(22, Math.max(1, Math.round(22 - (y - 1102.6) / 26.081)))
const plural = (n: number, w: string, ws = w + 's') => `${n} ${n === 1 ? w : ws}`

export interface Ctx { period: Period; offset: number; data: PgData; prev: PgData }

function make(type: TipType, lines: string[], delta: TipSpec['delta'], drill?: TipSpec['drill']): TipSpec {
  return { type, ...TIP_CONFIG[type], lines, delta, drill }
}

/** Biggest-lift process of the Day is called "Deactivation" in the design cards. */
export function barTip(c: Ctx, i: number, end: 'start' | 'end'): TipSpec {
  const b: Bar = c.data.bars[i]
  const pb: Bar | undefined = c.prev.bars[i]
  const isP = b.type === 'P'
  const s = Math.round(b.vBottom), e = Math.round(b.vTop), lift = e - s
  const type: TipType = (isP ? 'process' : 'game') + (end === 'end' ? 'End' : 'Start') as TipType
  const x = end === 'end' ? b.x1 : b.x0
  const drill = drillFor(c.period, c.offset, x)
  const delta = end === 'end' ? cmp(e, pb ? Math.round(pb.vTop) : undefined, 'level', c.period) : cmp(s, pb ? Math.round(pb.vBottom) : undefined, 'level', c.period)
  const kind = isP ? 'process' : 'game'
  let t: TipSpec
  if (c.period === 'day') {
    const t0 = hhmm(b.x0)
    const dur = Math.max(1, Math.round(((b.x1 - b.x0) / 312) * 480))
    const [h0, m0] = t0.split(':').map(Number)
    const t1 = `${h0 + Math.floor((m0 + dur) / 60)}:${String((m0 + dur) % 60).padStart(2, '0')}`
    const best = c.data.bars.reduce((m, q, k) => (q.vTop - q.vBottom > c.data.bars[m].vTop - c.data.bars[m].vBottom ? k : m), 0)
    const name = isP && best === i ? 'DEACTIVATION' : null
    t = end === 'end'
      ? make(type, [`${t0} – ${t1} · ${dur} min`, `Ended at ${e} · ${emotionOf(e)}`, `Felt ${s} → ${e} · +${lift} levels`], delta, drill)
      : make(type, [`${t0} · ${dur} min ${kind}`, `Started at ${s} · ${emotionOf(s)}`, `Went on to ${e} (+${lift} levels)`], delta, drill)
    if (name) t.title = `${name} · ${end === 'end' ? 'END' : 'START'}`
  } else {
    const dsg = DESIGN_TIPS[c.period]
    if (end === 'end' && dsg && c.offset === 0 && i === PG_DEFAULT_SELECT[c.period]) {
      t = make(type, [dsg.l2, dsg.l3], delta, drill)
      t.title = dsg.title
    } else if (end === 'end') {
      const l2 = c.period === 'week' ? `${plural(b.games, kind === 'game' ? 'game' : 'process', kind === 'game' ? 'games' : 'processes')} · avg feeling ${b.avg}` : `${b.games * 2} activities · avg ${b.avg}`
      t = make(type, [l2, `Best lift +${b.lift}`, `Ends at ${e} · ${emotionOf(e)}`], delta, drill)
      t.title = b.label
    } else {
      t = make(type, [`${plural(b.games, kind)} · started at ${s}`, emotionOf(s)], delta, drill)
      t.title = `${b.label} · START`
    }
  }
  return t
}

export function checkTip(c: Ctx, i: number): TipSpec {
  const ci = c.data.checkIns[i], pc = c.prev.checkIns[i]
  const v = lvl(ci.y)
  return make('checkIn', [whenLabel(c.period, c.offset, ci.x), `Felt ${v} · ${emotionOf(v)}`], cmp(v, pc ? lvl(pc.y) : undefined, 'level', c.period), drillFor(c.period, c.offset, ci.x))
}

export function matchTip(c: Ctx, i: number, pos: boolean): TipSpec {
  const arr = pos ? c.data.pos : c.data.neg
  const prevArr = pos ? c.prev.pos : c.prev.neg
  const m = arr[i]
  const v = lvl(m.y)
  const note = (pos ? NOTES_POS : NOTES_NEG)[(i + c.offset + 40) % 4]
  return make(pos ? 'matchPos' : 'matchNeg', [`${whenLabel(c.period, c.offset, m.x)} · ${v} ${emotionOf(v)}`, `“${note}”`], cmp(arr.length, prevArr.length, 'match', c.period), drillFor(c.period, c.offset, m.x))
}

export function stripTip(c: Ctx, i: number, pos: boolean): TipSpec {
  const arr = pos ? c.data.stripPos : c.data.stripNeg
  const prevArr = pos ? c.prev.stripPos : c.prev.stripNeg
  const s = arr[i]
  const n = s.count ?? 1
  const pn = prevArr[i] ? (prevArr[i].count ?? 1) : undefined
  return make(pos ? 'stripPos' : 'stripNeg', [whenLabel(c.period, c.offset, s.x), plural(n, `${pos ? 'positive' : 'negative'} moment`), 'Moment recorded, emotion not reported'], cmp(n, pn, 'moment', c.period), drillFor(c.period, c.offset, s.x))
}

export function poaTip(period: Period, offset: number, data: PoaData, prev: PoaData, i: number): TipSpec {
  const p: PoaPoint = data.points[i]
  const q = prev.points[i]
  const zone = p.level >= 15 ? 'In alignment · feeling good' : 'Not in alignment · not feeling good'
  return make('poa', [p.caption, `${p.level} / 22 · ${emotionOf(p.level)}`, zone], cmp(p.level, q?.level, 'level', period), drillFor(period, offset, p.x, 'poa'))
}
