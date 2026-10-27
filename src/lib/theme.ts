export type Period = 'day' | 'week' | 'month' | 'year'
export const PERIODS: Period[] = ['day', 'week', 'month', 'year']

/** [stop0, stop1] gradient of every level ball, index = level (1..22). */
export const LEVEL_GRAD: Record<number, [string, string]> = {
  1: ['#C5D3FF', '#4669CC'], 2: ['#B8CCFF', '#6D87C9'], 3: ['#D3B0FF', '#4B57B2'], 4: ['#B4A0FC', '#C27BBD'],
  5: ['#ED8BBB', '#FDD2E1'], 6: ['#F28BAA', '#FBC2E1'], 7: ['#FFE3D3', '#F8A371'], 8: ['#FFD1B5', '#FFF4CA'],
  9: ['#FFEECD', '#FDF3DD'], 10: ['#D9ECBC', '#ADC755'], 11: ['#7DFC58', '#DDFFD3'], 12: ['#38C957', '#C8EAE0'],
  13: ['#0CF1E2', '#A5FFF4'], 14: ['#0CF1E2', '#A5FFF4'], 15: ['#FFFFFF', '#FFFFFF'], 16: ['#B3FFF8', '#F2FFFE'],
  17: ['#B3FFF8', '#F2FFFE'], 18: ['#C0FDFB', '#EAD1F2'], 19: ['#BCF5F3', '#EAD1F2'], 20: ['#FAC8FF', '#FBE0FF'],
  21: ['#F4D3F7', '#FCEEFD'], 22: ['#F4D3F7', '#FCEEFD'],
}
export const CYAN_GRAD: [string, string] = ['#7EFFF3', '#ECFFFD']
export const INK = '#3E4E78'
export const asset = (n: string) => `/assets/${n}`

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
/** deterministic pseudo random 0..1 */
export function rnd(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
