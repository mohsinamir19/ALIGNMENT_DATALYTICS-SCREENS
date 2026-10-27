import { LEVEL_GRAD, CYAN_GRAD, INK } from '../lib/theme'

/** Shared <defs>: 3 gradient-per-level + glossy shadow filter. Include once per svg. */
export function BallDefs({ id }: { id: string }) {
  return (
    <defs>
      {Object.entries({ ...LEVEL_GRAD, cyan: CYAN_GRAD } as Record<string, [string, string]>).map(([k, [a, b]]) => (
        <linearGradient key={k} id={`${id}-g${k}`} x1=".2175" y1=".085" x2=".86" y2=".9575">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      ))}
      <filter id={`${id}-ball`} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
        <feDropShadow dx="-2" dy="-2" stdDeviation="1.6" floodColor="#fff" floodOpacity=".75" result="w" />
        <feDropShadow dx=".56" dy=".56" stdDeviation=".46" floodColor="#000" floodOpacity=".25" />
      </filter>
    </defs>
  )
}

interface Props {
  id: string
  cx: number
  cy: number
  d: number
  level: number
  label?: number | string
  cyan?: boolean
  active?: boolean
}

/** Glossy 3-ring level ball (Figma: radii 13 / 11.27 / 9.53 at d=26). */
export default function Ball({ id, cx, cy, d, level, label, cyan, active }: Props) {
  const g = `url(#${id}-g${cyan ? 'cyan' : Math.round(level)})`
  const s = d / 26
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`} filter={`url(#${id}-ball)`} style={{ transition: 'transform .2s' }}>
      <circle r="13" fill={g} />
      <circle r="11.27" fill={g} />
      <circle r="9.53" fill={g} />
      {active && <circle r="14.5" fill="none" stroke="#0B8FA3" strokeWidth="1.6" />}
      {label !== undefined && (
        <text textAnchor="middle" dy="5.6" fontSize="15" fontWeight="600" fill={INK} fontFamily="Reem Kufi">{label}</text>
      )}
    </g>
  )
}
