import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CYAN, GREEN, MAGENTA, NAVY, Svg } from './ui'

/** Frame-sized overlay: transparent backdrop (tap outside closes), teal three-plate popup at (21,229) 386x468, Esc closes. */
export function Popup({ onClose, label, children }: { onClose: () => void; label: string; children: ReactNode }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const k = (ev: KeyboardEvent) => { if (ev.key === 'Escape') { ev.preventDefault(); onClose() } }
    window.addEventListener('keydown', k)
    ref.current?.querySelector<HTMLElement>('button')?.focus()
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  const teal = 'linear-gradient(180deg,#93fcee,#95fff0 48%,#8bf7e5)'
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
      <button aria-label="Close" tabIndex={-1} onClick={onClose} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'default' }} />
      <motion.div ref={ref} role="dialog" aria-modal="true" aria-label={label}
        initial={reduce ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduce ? 0 : 0.22, ease: 'easeOut' }}
        style={{ position: 'absolute', left: 0, top: 0, width: 428, height: 926, pointerEvents: 'none', transformOrigin: '214px 463px' }}>
        <div style={{ position: 'absolute', left: 21, top: 229, width: 386, height: 468, background: teal, boxShadow: '-5px -6px 5px #fff, 5px 5px 6px rgba(0,0,0,.25)', pointerEvents: 'auto' }} />
        <div style={{ position: 'absolute', left: 30, top: 240, width: 368, height: 446, background: teal, boxShadow: '-5px -6px 5px #fff, 5px 5px 6px rgba(0,0,0,.25)' }} />
        <div style={{ position: 'absolute', left: 41, top: 250, width: 346, height: 424, background: 'linear-gradient(180deg,#eef4ff,#f6f9ff)', boxShadow: '-5px -5px 5px #fff, 4px 4px 7px rgba(0,0,0,.25)' }} />
        <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
      </motion.div>
    </div>
  )
}

/** pale mint popup button (88.5 x 48.3, three nested plates); hit area 100 x 60 */
export function PopupButton({ x, label, onClick, primary }: { x: number; label: string[]; onClick: () => void; primary?: boolean }) {
  const g = 'linear-gradient(181deg,#eaf7fa 3.800%,#f7fafb 99%)'
  const o = '-1.600px -1.600px .8px #fff, .8px .8px 1.600px rgba(71,71,71,.25)'
  const i = '-.8px -.8px .8px #fff, .8px .8px 1.600px rgba(71,71,71,.25)'
  return (
    <button className="tap" onClick={onClick} aria-label={label.join(' ')} style={{ position: 'absolute', left: x - 6, top: 608, width: 100.5, height: 60, borderRadius: 6, zIndex: 2, pointerEvents: 'auto' }}>
      <span style={{ position: 'absolute', left: 6, top: 6, width: 88.5, height: 48.3, borderRadius: 3.2, background: g, boxShadow: o }}>
        <span style={{ position: 'absolute', inset: 1.6, borderRadius: 2.4, background: g, boxShadow: i }} />
        <span style={{ position: 'absolute', inset: 3.2, borderRadius: 1.6, background: g, boxShadow: i, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12.9, lineHeight: '16px', color: primary ? '#0f8a77' : '#178f7c', textAlign: 'center', textTransform: 'uppercase' }}>
          {label.map((l) => <span key={l}>{l}</span>)}
        </span>
      </span>
    </button>
  )
}

export function PopupTitle({ children }: { children: string }) {
  return <div style={{ position: 'absolute', left: 89, top: 494, width: 250, height: 28, textAlign: 'center', fontWeight: 700, fontSize: 22.9, lineHeight: '28px', color: CYAN, textTransform: 'uppercase' }}>{children}</div>
}

export function Status({ kind, text }: { kind: 'positive' | 'negative'; text: string }) {
  const c = kind === 'positive' ? GREEN : MAGENTA
  return (
    <div style={{ position: 'absolute', left: 89, top: 527, width: 250, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4.4, fontWeight: 600, fontSize: 11.8, lineHeight: '14px', color: c, whiteSpace: 'nowrap' }}>
      <span style={{ width: 5.9, height: 5.9, borderRadius: '50%', background: c, flex: 'none' }} />{text}
    </div>
  )
}

/** "Moment kept" jar popup */
export function MomentKept({ kind, level, name, positive, negative, onClose, onEnjoy, onData }: {
  kind: 'positive' | 'negative'; level: number | null; name: string; positive: number; negative: number
  onClose: () => void; onEnjoy: () => void; onData: () => void
}) {
  const reduce = useReducedMotion()
  const pos = kind === 'positive'
  const ball = pos ? '#86c9a0' : '#f0a4a8'
  return (
    <Popup onClose={onClose} label="Moment kept">
      <div style={{ position: 'absolute', left: 123, top: 260, width: 183, height: 221 }}>
        <Svg src="/v11/m-jar.svg" style={{ width: 183, height: 221, display: 'block' }} />
        <motion.span aria-hidden initial={reduce ? false : { y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.2, ease: [0.3, 0, 0.5, 1] }}
          style={{ position: 'absolute', left: 99, top: 63, width: 24, height: 24, borderRadius: '50%', background: ball, display: 'block' }} />
      </div>
      <PopupTitle>Moment kept</PopupTitle>
      <Status kind={kind} text={`${pos ? 'Positive' : 'Negative'} match${level ? ` · ${level} ${name}` : ''}`} />
      <div style={{ position: 'absolute', left: 89, top: 549, width: 250, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7.4 }}>
        <Svg src="/v11/m-coin.svg" width={23.6} height={23.6} />
        <span style={{ fontWeight: 700, fontSize: 16.2, lineHeight: '21px', color: '#8a6a0c' }}>+1 coin</span>
      </div>
      <div style={{ position: 'absolute', left: 89, top: 583, width: 250, height: 15, textAlign: 'center', fontWeight: 600, fontSize: 11.1, lineHeight: '15px', color: NAVY }}>
        Today: {positive} positive · {negative} negative
      </div>
      {pos && <PopupButton x={111} label={['ENJOY THIS', 'MOMENT']} onClick={onEnjoy} primary />}
      <PopupButton x={pos ? 229.5 : 170.75} label={['SEE', 'DATALYTICS']} onClick={onData} />
    </Popup>
  )
}

function Heart({ w, h, fill, id }: { w: number; h: number; fill: [string, string]; id: string }) {
  void w; void h
  const d = 'M50 90C22 66 2 48 2 27 2 13 13 2 27 2c10 0 19 5 23 13C54 7 63 2 73 2c14 0 25 11 25 25 0 21-20 39-48 63Z'
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 92" preserveAspectRatio="none" aria-hidden style={{ overflow: 'visible' }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={fill[0]} /><stop offset="1" stopColor={fill[1]} /></linearGradient></defs>
      <path d={d} fill={`url(#${id})`} />
    </svg>
  )
}

/** E1 popup */
export function EnjoyPopup({ kind, level, name, note, onClose, onDone, onFeel }: {
  kind: 'positive' | 'negative'; level?: number | null; name: string; note: string; onClose: () => void; onDone: () => void; onFeel: () => void
}) {
  const reduce = useReducedMotion()
  const long = note.length > 44
  const layer = (inset: number, fill: [string, string], sh: string, id: string) => (
    <div style={{ position: 'absolute', inset, filter: sh }}><Heart w={0} h={0} fill={fill} id={id} /></div>
  )
  return (
    <Popup onClose={onClose} label="Enjoy this moment">
      <motion.div animate={reduce ? undefined : { scale: [1, 1.04, 1] }} transition={{ duration: 6, ease: 'easeInOut', times: [0, 0.5, 1] }}
        style={{ position: 'absolute', left: 98, top: 268, width: 232, height: 196 }}>
        {layer(0, ['#eef3ff', '#e6eeff'], 'drop-shadow(-4px -4px 4px #fff) drop-shadow(5px 6px 8px rgba(40,60,110,.22))', 'h1')}
        {layer(10, ['#e4edff', '#dbe7ff'], 'drop-shadow(-3px -3px 3px #fff) drop-shadow(3px 4px 5px rgba(40,60,110,.2))', 'h2')}
        {layer(22, ['#dce8ff', '#e8efff'], 'drop-shadow(-2px -2px 2px #fff) drop-shadow(2px 3px 4px rgba(40,60,110,.2))', 'h3')}
        <div style={{ position: 'absolute', left: 52, top: 56, width: 128, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: 400, fontSize: long ? 14 : 18, lineHeight: long ? '17px' : '22px', letterSpacing: -0.36, color: 'rgba(45,55,65,.75)', overflow: 'hidden', wordBreak: 'break-word' }}>
          <span style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{note}</span>
        </div>
      </motion.div>
      <PopupTitle>Enjoy this moment</PopupTitle>
      <Status kind={kind} text={`${kind === 'positive' ? 'Positive' : 'Negative'} match${level ? ` · ${level} ${name}` : ''}`} />
      <div style={{ position: 'absolute', left: 89, top: 549, width: 250, height: 15, textAlign: 'center', fontWeight: 600, fontSize: 11.1, lineHeight: '15px', color: NAVY }}>Stay with it for one slow breath. Nothing to do.</div>
      <PopupButton x={111} label={['DONE']} onClick={onDone} primary />
      <PopupButton x={229.5} label={['HOW DO I', 'FEEL NOW']} onClick={onFeel} />
    </Popup>
  )
}
