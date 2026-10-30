import { useState } from 'react'
import ScaleFrame from './components/ScaleFrame'
import Shell from './components/Shell'
import PoaGraph from './components/PoaGraph'
import ProgressGraph, { type Kind } from './components/ProgressGraph'
import type { Period } from './lib/theme'

export default function App() {
  const [period, setPeriod] = useState<Period>('day')
  const [offset, setOffset] = useState(0)
  const [hidden, setHidden] = useState<Set<Kind>>(new Set())

  const toggle = (k: Kind) => setHidden((h) => { const n = new Set(h); n.has(k) ? n.delete(k) : n.add(k); return n })
  const setKinds = (kinds: Kind[], on: boolean) => setHidden((h) => { const n = new Set(h); kinds.forEach((k) => (on ? n.delete(k) : n.add(k))); return n })
  const drill = (p: Period, o: number) => { setPeriod(p); setOffset(o) }

  return (
    <ScaleFrame>
      <Shell period={period} offset={offset} hidden={hidden}
        onPeriod={(p) => { setPeriod(p); setOffset(0) }}
        onStep={(d) => setOffset((o) => Math.max(-12, Math.min(12, o + d)))}
        onToggle={toggle} />
      <PoaGraph period={period} offset={offset} onDrill={drill} />
      <ProgressGraph period={period} offset={offset} hidden={hidden} onSet={setKinds} onDrill={drill} />
    </ScaleFrame>
  )
}
