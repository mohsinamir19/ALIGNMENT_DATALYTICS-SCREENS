/** The 22 emotions. Coordinates are L3 spiral-local (plate x,y,w,h and ball x,y,size). */
export interface Emotion {
  level: number
  lines: string[]
  px: number; py: number; pw: number; ph: number
  bx: number; by: number; bs: number
  side: 'l' | 'r' | 'c'
}
const e = (level: number, lines: string[], px: number, py: number, pw: number, ph: number, bx: number, by: number, bs: number, side: 'l' | 'r' | 'c'): Emotion =>
  ({ level, lines, px, py, pw, ph, bx, by, bs, side })

export const EMOTIONS: Emotion[] = [
  e(22, ['FREEDOM', 'JOY   LOVE', 'APPRECIATION', 'EMPOWERMENT'], 113.3, 11, 202, 112, 188, 90, 48, 'c'),
  e(21, ['PASSION'], 34, 138, 126, 49, 145, 148.3, 26, 'l'),
  e(20, ['ENTHUSIASM', 'EAGERNESS', 'HAPPINESS'], 261.8, 149.7, 134, 62, 253, 170.3, 26, 'r'),
  e(19, ['POSITIVE', 'EXPECTATION', 'BELIEF'], 31.8, 188.8, 134, 55, 149, 202.4, 26, 'l'),
  e(18, ['OPTIMISM'], 261.8, 214, 134, 54, 252, 227.9, 26, 'r'),
  e(17, ['HOPEFULNESS'], 31.8, 245.8, 134, 49, 153, 257, 26, 'l'),
  e(16, ['CONTENTMENT', 'SATISFACTION'], 262, 269.8, 134, 56, 249, 282, 26, 'r'),
  e(15, ['BOREDOM'], 163, 345.3, 122, 49, 153, 357, 26, 'r'),
  e(14, ['PESSIMISM'], 262, 405, 134, 49, 246, 416, 26, 'r'),
  e(13, ['FRUSTRATION', 'IRRITATION', 'IMPATIENCE'], 32, 425.5, 134, 62, 153, 447.1, 26, 'l'),
  e(12, ['OVERWHELM'], 262.2, 465.6, 134, 49, 246, 476.2, 26, 'r'),
  e(11, ['DISAPPOINTMENT'], 32, 498.7, 134, 49, 153, 509.3, 26, 'l'),
  e(10, ['DOUBT'], 262.2, 525.8, 134, 49, 246, 536, 26, 'r'),
  e(9, ['WORRY'], 32, 558.9, 134, 49, 153, 568.4, 26, 'l'),
  e(8, ['BLAME'], 262.2, 587, 134, 49, 246, 598, 26, 'r'),
  e(7, ['DISCOURAGEMENT'], 32, 619.1, 134, 49, 153, 630, 26, 'l'),
  e(6, ['ANGER'], 262.2, 647.2, 134, 49, 246, 658, 26, 'r'),
  e(5, ['REVENGE'], 32, 679.3, 134, 49, 153, 690, 26, 'l'),
  e(4, ['HATRED', 'RAGE'], 262.2, 707.3, 134, 49, 246, 718, 26, 'r'),
  e(3, ['JEALOUSY'], 32, 739.4, 134, 49, 153, 750, 26, 'l'),
  e(2, ['INSECURITY', 'GUILT', 'UNWORTHINESS'], 262.2, 770.5, 134, 62, 246, 779, 26, 'r'),
  e(1, ['FEAR', 'GRIEF', 'DESPERATION', 'POWERLESSNESS'], 32, 800, 134, 75, 151, 812, 26, 'l'),
]

export const byLevel = (level?: number | null) => EMOTIONS.find((x) => x.level === level)
const cap = (s: string) => s.charAt(0) + s.slice(1).toLowerCase()
/** "17 Optimism" (level + capitalised first label word) */
/** the L4/E1 reference text names level 17 "Optimism" (the spec table says Hopefulness); the reference wins for popup status lines */
export const emotionName = (level: number) => { if (level === 17) return 'Optimism'; const m = byLevel(level); return m ? cap(m.lines[0].split(/\s+/)[0]) : '' }
export const emotionTitle = (level: number) => `${level} ${emotionName(level)}`
export const kindFromLevel = (level: number): 'positive' | 'negative' | null => (level >= 16 ? 'positive' : level <= 14 ? 'negative' : null)
