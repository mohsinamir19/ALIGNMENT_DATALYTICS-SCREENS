import { motion } from 'framer-motion'
import { asset } from '../lib/theme'
import type { TipSpec, IconKey } from '../data/tooltips'

const ICON: Record<IconKey, [string, number, number]> = {
  P: ['pg-marker-process-star.svg', 18.6, 18.8], G: ['pg-marker-games.svg', 12.1, 17.6], C: ['pg-marker-checkin.svg', 25, 24.7],
  POS: ['pg-tri-positive-plot.svg', 21.4, 17.9], NEG: ['pg-tri-negative-plot.svg', 19.5, 16.7], POA: ['pg-marker-checkin.svg', 25, 24.7],
}

/** Rough text width: Reem Kufi at 12px averages ~6px per glyph. */
const tw = (s: string, k = 6) => s.length * k

export function tipSize(t: TipSpec) {
  const body = Math.max(tw(t.title, 8.6) + 26, ...t.lines.map((l) => tw(l)), t.delta ? tw(t.delta.text, 5.9) : 0)
  const w = Math.round(Math.min(252, Math.max(150, body + 30 + (t.drill ? 14 : 0))))
  const h = 14 + 18 + t.lines.length * 16 + (t.delta ? 18 : 0) + 12 + (t.drill ? 6 : 0)
  return { w, h: Math.max(h, t.drill ? 66 : 56) }
}

interface Props { x: number; y: number; spec: TipSpec; id: string; onDrill?: () => void }

/** Teal bubble tooltip. Figma: r14, #A2F3EE -> #DDFFFC, drop shadow 0/4/4, notch on the right edge. */
export default function Tooltip({ x, y, spec, id, onDrill }: Props) {
  const { w, h } = tipSize(spec)
  const [icon, iw, ih] = ICON[spec.icon]
  const sc = Math.min(1, 15 / ih)
  return (
    <g transform={`translate(${x} ${y})`} data-tip style={{ pointerEvents: 'all' }} role="dialog" aria-label={`${spec.title}: ${spec.lines.join(', ')}`}>
      <motion.g initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A2F3EE" /><stop offset="1" stopColor="#DDFFFC" /></linearGradient>
          <filter id={`${id}-s`} x="-10%" y="-10%" width="125%" height="150%"><feDropShadow dx="0" dy="4" stdDeviation="2" floodOpacity=".25" /></filter>
          <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EFFFFD" /><stop offset="1" stopColor="#9EEBE3" /></linearGradient>
        </defs>
        <path d={`M14 0H${w - 14}Q${w} 0 ${w} 14V${h / 2 - 6}L${w + 8} ${h / 2}L${w} ${h / 2 + 6}V${h - 14}Q${w} ${h} ${w - 14} ${h}H14Q0 ${h} 0 ${h - 14}V14Q0 0 14 0Z`} fill={`url(#${id}-g)`} filter={`url(#${id}-s)`} />
        <image href={asset(icon)} x={14 + 7.5 - (iw * sc) / 2} y={14 + 7 - (ih * sc) / 2} width={iw * sc} height={ih * sc} />
        <text x="34" y="26" fontSize="13.5" fontWeight="700" letterSpacing=".7" fill={spec.color} fontFamily="Reem Kufi">{spec.title}</text>
        {spec.lines.map((l, i) => (
          <text key={i} x="14" y={46 + i * 16} fontSize="12.5" fill="#333131" fontFamily="Reem Kufi" fontWeight="500">{l}</text>
        ))}
        {spec.delta && (
          <text x="14" y={46 + spec.lines.length * 16 + 3} fontSize="11.2" fontWeight="700" fill={spec.delta.up ? '#0B8F5A' : '#C0392B'} fontFamily="Reem Kufi">{spec.delta.text}</text>
        )}
        {spec.drill && onDrill && (
          <g role="button" tabIndex={0} aria-label={spec.drill.label} data-tip className="hit" style={{ cursor: 'pointer', outline: 'none', pointerEvents: 'all' }}
            onClick={(e) => { e.stopPropagation(); onDrill() }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onDrill() } }}>
            <title>{spec.drill.label}</title>
            <circle cx={w - 22} cy={h - 19} r="22" fill="transparent" />
            <circle cx={w - 22} cy={h - 19} r="14.5" fill={`url(#${id}-b)`} stroke="#fff" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 1.5px 1.5px rgba(0,0,0,.25))' }} />
            <path d={`M${w - 27} ${h - 19 + 2}V${h - 19 + 6}H${w - 23}M${w - 17} ${h - 19 - 2}V${h - 19 - 6}H${w - 21}M${w - 27} ${h - 19 + 6}L${w - 20} ${h - 19 - 1}`} fill="none" stroke="#1F6F7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform={`rotate(0)`} />
          </g>
        )}
      </motion.g>
    </g>
  )
}
