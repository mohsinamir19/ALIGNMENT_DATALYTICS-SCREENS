import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import PhoneFrame from '../PhoneFrame'
import { actions, useDemo } from '../store'
import { navigate, usePath, useQuery } from '../router'
import Spiral from './Spiral'
import { byLevel, emotionName, kindFromLevel } from './emotions'
import { MomentKept, EnjoyPopup } from './Popups'
import { BackButton, Svg, CSS, GREEN, Heading2, MAGENTA, Minus, MintButton, NAVY, NEG_GRAD, PearlCircle, Plate, POS_GRAD, StatusBar, Tick, Title } from './ui'

type Kind = 'positive' | 'negative'
type Screen = 'l1' | 'l2' | 'l3' | 'l4'
interface Draft { kind: Kind | null; explicit: boolean; note: string; level: number | null }
const FRESH: Draft = { kind: null, explicit: false, note: '', level: null }

const q = (u: string) => (/^[\w/.-]*$/.test(u) ? u : encodeURIComponent(u))
const NOTE_MAX = 140

function Glow() {
  return <img src="/v11/m-bg-glow.svg" alt="" draggable={false} style={{ position: 'absolute', left: 0, top: 0, width: 428, height: 926, pointerEvents: 'none' }} />
}

function Chip({ kind }: { kind: Kind }) {
  return (
    <span aria-hidden style={{ position: 'absolute', left: 30, top: 22, width: 142, height: 16, borderRadius: 4, background: 'linear-gradient(180deg,#e3f8fc,#c9eff7)', boxShadow: 'inset 0 0 0 .5px rgba(1,118,135,.35)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5px 0 4px' }}>
      <span style={{ fontWeight: 400, fontSize: 7, lineHeight: '16px', color: '#017687', whiteSpace: 'nowrap', textTransform: 'capitalize' }}>name your {kind} experience (optional)</span>
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" stroke="#e0203c" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1l3 3.500L7 1" /></svg>
    </span>
  )
}

interface CardProps {
  kind: Kind; x: number; y: number; w: number; h: number; expanded: boolean; note: string; instant: boolean
  onChoose: () => void; onNote: (v: string) => void; onDone: () => void; onSkip: () => void; interactive: boolean
}
function Card({ kind, x, y, w, h, expanded, note, instant, onChoose, onNote, onDone, onSkip, interactive }: CardProps) {
  const pos = kind === 'positive'
  const grad = pos ? POS_GRAD : NEG_GRAD
  const color = pos ? GREEN : MAGENTA
  const label = pos ? 'Positive Match' : 'Negative Match'
  return (
    <motion.div initial={false} animate={{ left: x, top: y, width: w, height: h }} transition={{ duration: instant ? 0 : 0.28, ease: 'easeOut' }} style={{ position: 'absolute' }}>
      <Plate w="100%" h="100%" r={expanded ? 15 : 12} inset={expanded ? 3.8 : 3} grad={grad}>
        {expanded ? (
          <>
            <div style={{ position: 'absolute', left: 11.3, top: 9, fontWeight: 700, fontSize: 13.8, lineHeight: '18px', color }}>{label}</div>
            <textarea aria-label={`Write your ${kind} match (optional)`} value={note} maxLength={NOTE_MAX} placeholder={`Write your ${kind} match`} autoFocus={interactive}
              onChange={(e) => onNote(e.target.value.replace(/\n/g, ' '))}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onDone() } }}
              style={{ position: 'absolute', left: 11.3, top: 28.8, width: 203, height: 96.5, border: 0, resize: 'none', background: 'linear-gradient(180deg,#e6f6fc,#c9ecfa)', boxShadow: 'inset 0 1px 3px rgba(20,80,120,.28), 0 0 0 1px rgba(255,255,255,.85)', borderRadius: 5, padding: '9px 10px', fontFamily: 'inherit', fontWeight: 500, fontSize: 14, lineHeight: '18px', color: NAVY }} />
            <div style={{ position: 'absolute', left: 15, top: 136 }}><MintButton w={52.65 * 1.1} h={23} label="SKIP" fs={10} ls={0.6} onClick={onSkip} /></div>
            <button className="tap" onClick={onDone} aria-label="Done" style={{ position: 'absolute', left: 166, top: 118, width: 54, height: 54, borderRadius: 27 }}>
              <Svg src="/v11/m-check-circle.svg" style={{ position: 'absolute', left: 8, top: 8, width: 38, height: 38, maxWidth: 'none', filter: pos ? undefined : 'hue-rotate(140deg) saturate(1.4)' }} />
              <span className="sr">Done</span>
            </button>
          </>
        ) : (
          <button onClick={onChoose} disabled={!interactive} aria-label={label} className="tap" style={{ position: 'absolute', inset: 0, borderRadius: 12, textAlign: 'center' }}>
            <span style={{ position: 'absolute', left: 0, right: 0, top: 8, fontWeight: 700, fontSize: 11, lineHeight: '14px', color }}>{label}</span>
            <Chip kind={kind} />
            <Svg src={pos ? '/v11/m-choice-circle-pos.svg' : '/v11/m-choice-circle-neg.svg'} style={{ position: 'absolute', left: 55, top: 38.75, width: 70, height: 70, maxWidth: 'none' }} />
          </button>
        )}
      </Plate>
    </motion.div>
  )
}

function SavedChip({ kind, note, onEdit }: { kind: Kind; note: string; onEdit: () => void }) {
  const pos = kind === 'positive'
  const color = pos ? GREEN : MAGENTA
  return (
    <div className="abs" style={{ left: 18, top: 162 }}>
      <Plate w={392} h={68} r={14} grad={pos ? POS_GRAD : NEG_GRAD}>
        <div style={{ position: 'absolute', left: 14, top: 16 }}><PearlCircle size={36}>{pos ? <Tick /> : <Minus />}</PearlCircle></div>
        <div style={{ position: 'absolute', left: 62, top: 0, bottom: 0, right: 90, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 14, lineHeight: '20px', letterSpacing: 0.5, color }}>{pos ? 'Positive match' : 'Negative match'}</div>
          {note && <div style={{ fontWeight: 400, fontSize: 12, lineHeight: '16px', color: NAVY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>“{note}”</div>}
        </div>
        <div style={{ position: 'absolute', left: 314, top: 19 }}><MintButton w={64} h={30} label="EDIT" onClick={onEdit} /></div>
      </Plate>
    </div>
  )
}

interface LProps {
  screen: Screen | 'behind'; draft: Draft; setDraft: (f: (d: Draft) => Draft) => void
  go: (s: Screen) => void; onPickLevel: (l: number) => void; onBack: () => void; interactive?: boolean; behindKind?: Kind
}
/** L1 / L2 / L3 and the screen that sits behind the L4 / E1 popups */
function LScreen({ screen, draft, setDraft, go, onPickLevel, onBack, interactive = true, behindKind }: LProps) {
  const reduce = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const kind = behindKind ?? draft.kind
  const cfg = {
    l1: { sp: 372, head: 312, x: 0 }, l2: { sp: 402, head: 342, x: 0 }, l3: { sp: 312, head: 262, x: -1 }, behind: { sp: 352, head: 302, x: 0 },
  }[screen === 'l4' ? 'behind' : screen]
  const expanded = screen === 'l2' || screen === 'behind' || screen === 'l4'
  const height = cfg.sp + 887

  useEffect(() => {
    const el = scrollRef.current; if (!el) return
    const top = screen === 'l3' && kind === 'negative' ? 9999 : 0
    el.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }, [screen, kind, reduce])

  const geo = (which: Kind) => {
    if (!expanded) return { x: which === 'negative' ? 26 : 222, y: 162, w: 180, h: 112, ex: false }
    const neg = kind === 'negative'
    if (which === kind) return { x: neg ? 7.15 : 195.2, y: 162, w: 225.65, h: 173, ex: true }
    return { x: which === 'negative' ? 7.2 : 240.8, y: 162, w: 180, h: 112, ex: false }
  }
  const choose = (k: Kind) => { setDraft((d) => ({ ...d, kind: k, explicit: true })); go('l2') }
  const sel = screen === 'l3' ? draft.level : (screen === 'l1' || screen === 'l2') ? draft.level : null

  return (
    <div className="mf" style={{ position: 'absolute', inset: 0 }}>
      <Glow />
      <div className="scroll" ref={scrollRef}>
        <div style={{ position: 'relative', width: 428, height }}>
          <Title />
          {screen === 'l3' && kind ? <SavedChip kind={kind} note={draft.note} onEdit={() => go('l2')} /> : (
            (['negative', 'positive'] as Kind[]).map((k) => {
              const g = geo(k)
              return <Card key={k} kind={k} x={g.x} y={g.y} w={g.w} h={g.h} expanded={g.ex} note={draft.note} instant={!!reduce || !interactive}
                interactive={interactive} onChoose={() => choose(k)} onNote={(v) => setDraft((d) => ({ ...d, note: v }))}
                onDone={() => go('l3')} onSkip={() => { setDraft((d) => ({ ...d, note: '' })); go('l3') }} />
            })
          )}
          <Heading2 top={cfg.head} />
          <Spiral x={cfg.x} y={cfg.sp} dim={screen === 'l1' || screen === 'l2'} showBadge={screen === 'l3'} selected={interactive ? sel : null} onPick={onPickLevel} />
        </div>
      </div>
      <StatusBar />
      <BackButton onClick={onBack} />
    </div>
  )
}

function Inert({ on, children }: { on: boolean; children: ReactNode }) {
  const r = useRef<HTMLDivElement>(null)
  useEffect(() => { const el = r.current; if (!el) return; if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert') }, [on])
  return <div ref={r} aria-hidden={on || undefined} style={{ position: 'absolute', inset: 0 }}>{children}</div>
}

function Match() {
  const [screen, setScreen] = useState<Screen>('l1')
  const [draft, setDraftState] = useState<Draft>(FRESH)
  const [done, setDone] = useState<{ id: string; kind: Kind; level: number } | null>(null)
  const busy = useRef(false)
  const demo = useDemo()
  const setDraft = useCallback((f: (d: Draft) => Draft) => setDraftState(f), [])

  const pickLevel = (level: number) => {
    if (screen === 'l3') {
      if (busy.current || !draft.kind) return
      busy.current = true
      const id = actions.addMatch(draft.kind, draft.note, level)
      setDone({ id, kind: draft.kind, level })
      setScreen('l4')
      return
    }
    const inferred = kindFromLevel(level)
    setDraftState((d) => ({ ...d, level, kind: d.explicit ? d.kind : (inferred ?? d.kind) }))
    if (screen === 'l1' && !draft.explicit && inferred) setScreen('l2')
  }
  const reset = useCallback(() => { busy.current = false; setDone(null); setDraftState(FRESH); setScreen('l1') }, [])
  const back = () => { if (screen === 'l1') navigate('/'); else if (screen === 'l2') { setScreen('l1') } else if (screen === 'l3') setScreen('l2') }

  const popup = screen === 'l4' && done
  return (
    <div className="mf" style={{ position: 'absolute', inset: 0 }}>
      <Inert on={!!popup}>
        <LScreen screen={popup ? 'behind' : screen} draft={draft} setDraft={setDraft} go={setScreen} onPickLevel={pickLevel} onBack={back} interactive={!popup} />
      </Inert>
      {popup && (
        <MomentKept kind={done.kind} level={done.level} name={emotionName(done.level)} positive={demo.counts.positive} negative={demo.counts.negative}
          onClose={reset} onEnjoy={() => navigate(`/match/enjoy?id=${done.id}&back=/match`)} onData={() => navigate('/analytics')} />
      )}
    </div>
  )
}

function Enjoy() {
  const query = useQuery()
  const id = query.get('id') ?? ''
  const back = query.get('back') || '/match'
  const demo = useDemo()
  const ev = demo.events.find((e) => e.id === id)
  const kind: Kind = ev?.type === 'negative_match' ? 'negative' : 'positive'
  const level = ev?.level ?? null
  const noop = () => {}
  const done = () => { if (ev) actions.markEnjoyed(ev.id); navigate(back) }
  const feel = () => { if (ev) actions.markEnjoyed(ev.id); navigate(`/match/check-in?back=${q(back)}`) }
  return (
    <div className="mf" style={{ position: 'absolute', inset: 0 }}>
      <Inert on>
        <LScreen screen="behind" draft={{ ...FRESH, kind, note: ev?.note ?? '' }} setDraft={noop} go={noop} onPickLevel={noop} onBack={noop} interactive={false} behindKind={kind} />
      </Inert>
      <EnjoyPopup kind={kind} level={level} name={level ? emotionName(level) : ''} note={ev?.note?.trim() || 'A good moment'} onClose={() => navigate(back)} onDone={done} onFeel={feel} />
    </div>
  )
}

function CheckIn() {
  const query = useQuery()
  const back = query.get('back') || '/analytics?sheet=2'
  const reduce = useReducedMotion()
  const pick = (level: number) => { actions.addCheckIn(level); navigate(back) }
  const hold: CSSProperties = { position: 'absolute', left: 0, top: 0, width: 428, height: 926 }
  return (
    <div className="mf" style={hold}>
      <img src="/v11/m-bg-e2-sky.png" alt="" draggable={false} style={{ ...hold, objectFit: 'cover' }} />
      <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', left: 0, top: 12, width: 428, height: 914 }}>
        <img src="/v11/m-spiral-e2-full.svg" alt="Please choose the emotion you are feeling now. Optional, add it to your day." draggable={false} style={{ display: 'block', width: 428, height: 914, maxWidth: 'none' }} />
      </motion.div>
      {/* E2 spiral hit areas: the spiral is the L3 layout shifted by (-3, +107.7) in frame coords */}
      <Spiral x={-3} y={107.7} hitOnly onPick={pick} labelPrefix="I feel" />
      <button className="tap abs" aria-label="Go to your day" onClick={() => navigate('/analytics')} style={{ left: 360, top: 32, width: 48, height: 48, zIndex: 6 }} />
      <StatusBar />
      <BackButton onClick={() => navigate(back)} top={36} left={10} label="Back, skip check-in" ghost />
    </div>
  )
}

export default function MatchFlow() {
  const path = usePath()
  const view = path === '/match/enjoy' ? <Enjoy /> : path === '/match/check-in' ? <CheckIn /> : <Match />
  return (
    <PhoneFrame bg="#EEF0FF">
      <style>{CSS}</style>
      <div key={path} style={{ position: 'absolute', inset: 0 }}>{view}</div>
    </PhoneFrame>
  )
}
