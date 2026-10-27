import { motion } from 'framer-motion'
import { INK } from '../lib/theme'

export interface TipContent { title: string; lines: string[]; delta?: string; deltaUp?: boolean }

export const TIP_W = 204

/** Teal bubble tooltip (Figma: 204 wide, r14, #A2F3EE -> #DDFFFC, drop shadow 0/4/4). */
export default function Tooltip({ x, y, w = TIP_W, content, id }: { x: number; y: number; w?: number; content: TipContent; id: string }) {
  const lines = content.lines.length
  const h = 18 + 14 + lines * 16 + (content.delta ? 18 : 0) + 6
  return (
    <g transform={`translate(${x} ${y})`} style={{ pointerEvents: 'none' }}>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
        <defs>
          <linearGradient id={`${id}-tg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A2F3EE" /><stop offset="1" stopColor="#DDFFFC" /></linearGradient>
          <filter id={`${id}-ts`} x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="2" floodOpacity=".25" /></filter>
        </defs>
        <path
          d={`M14 0H${w - 14}Q${w} 0 ${w} 14V${h / 2 - 6}L${w + 8} ${h / 2}L${w} ${h / 2 + 6}V${h - 14}Q${w} ${h} ${w - 14} ${h}H14Q0 ${h} 0 ${h - 14}V14Q0 0 14 0Z`}
          fill={`url(#${id}-tg)`} filter={`url(#${id}-ts)`}
        />
        <text x="14" y="26" fontSize="13" fontWeight="700" letterSpacing=".8" fill="#3F5CC4" fontFamily="Reem Kufi">{content.title}</text>
        {content.lines.map((l, i) => (
          <text key={i} x="14" y={44 + i * 16} fontSize={i === 0 ? 12 : 11.5} fill="#333131" fontFamily="Reem Kufi" fontWeight="500">{l}</text>
        ))}
        {content.delta && (
          <text x="14" y={44 + lines * 16 + 6} fontSize="11" fontWeight="700" fill={content.deltaUp ? '#0B8FA3' : '#C0398E'} fontFamily="Reem Kufi">{content.delta}</text>
        )}
      </motion.g>
    </g>
  )
}
export { INK }
export const tipHeight = (lines: number, delta: boolean) => 18 + 14 + lines * 16 + (delta ? 18 : 0) + 6
