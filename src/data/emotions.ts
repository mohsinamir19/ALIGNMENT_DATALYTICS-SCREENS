/** Emotion names per level, copied from the Figma frame "buttons and spiral fit to screen". */
export const EMOTIONS: Record<number, string[]> = {
  22: ['Freedom', 'Joy', 'Love', 'Appreciation', 'Empowerment'],
  21: ['Passion'],
  20: ['Enthusiasm', 'Eagerness', 'Happiness'],
  19: ['Positive Expectation', 'Belief'],
  18: ['Optimism'],
  17: ['Hopefulness'],
  16: ['Contentment', 'Satisfaction'],
  15: ['Boredom'],
  14: ['Pessimism'],
  13: ['Frustration', 'Irritation', 'Impatience'],
  12: ['Overwhelm'],
  11: ['Disappointment'],
  10: ['Doubt'],
  9: ['Worry'],
  8: ['Blame'],
  7: ['Discouragement'],
  6: ['Anger'],
  5: ['Revenge'],
  4: ['Hatred', 'Rage'],
  3: ['Jealousy'],
  2: ['Insecurity', 'Guilt', 'Unworthiness'],
  1: ['Fear', 'Grief', 'Desperation', 'Powerlessness'],
}
/** Short label (first name) for tight tooltip lines. */
export const emotionOf = (level: number) => (EMOTIONS[Math.min(22, Math.max(1, Math.round(level)))] ?? [''])[0]
