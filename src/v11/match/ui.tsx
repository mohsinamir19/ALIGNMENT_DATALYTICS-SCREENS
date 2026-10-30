import { useEffect, useState, type CSSProperties, type ImgHTMLAttributes, type ReactNode } from 'react'

/** The exported SVG assets carry an opaque #F0F5FF frame rectangle; strip it at load so they sit on the glow background. */
const svgCache = new Map<string, string>()
const svgPending = new Map<string, Promise<string>>()
function loadSvg(src: string): Promise<string> {
  const hit = svgPending.get(src); if (hit) return hit
  const p = fetch(src).then((r) => r.text()).then((t) => {
    const out = t.replace(/<rect width="428" height="926"(?![^>]*fill="white")[^>]*\/>/g, '').replace(/<path d="M-\d{3,}[^"]*"[^>]*\/>/g, '')
    const url = URL.createObjectURL(new Blob([out], { type: 'image/svg+xml' }))
    svgCache.set(src, url); return url
  }).catch(() => { svgCache.set(src, src); return src })
  svgPending.set(src, p); return p
}
export function useSvgUrl(src: string) {
  const [u, setU] = useState<string | undefined>(svgCache.get(src))
  useEffect(() => { if (!svgCache.has(src)) loadSvg(src).then(setU); else setU(svgCache.get(src)) }, [src])
  return u
}
export function Svg({ src, ...rest }: { src: string } & ImgHTMLAttributes<HTMLImageElement>) {
  const u = useSvgUrl(src)
  return <img alt="" draggable={false} {...rest} src={u ?? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='} />
}

export const NAVY = '#3e4e78'
export const CYAN = '#34d2e3'
export const GREEN = '#1b8f74'
export const MAGENTA = '#b3426e'
export const SHADOW = '-1px -1px 1px #fff, 1px 2px 3px rgba(0,0,0,.25)'
export const POS_GRAD = 'linear-gradient(180deg,#d9ffe8,#b9f5d0)'
export const NEG_GRAD = 'linear-gradient(180deg,#ffe0f5,#fcc3e9)'

export const CSS = `
.mf *{box-sizing:border-box}
.mf button{-webkit-appearance:none;appearance:none}
.mf .scroll{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;overscroll-behavior:contain}
.mf .scroll::-webkit-scrollbar{display:none}
.mf .abs{position:absolute}
.mf .tap{transition:transform .12s ease,box-shadow .15s ease}
.mf .tap:active{transform:scale(.97)}
.mf .hit{position:absolute;border-radius:28px;transition:transform .15s ease,box-shadow .2s ease;background:transparent}
.mf .hit:active{transform:scale(.97)}
.mf .hit.sel{box-shadow:0 0 0 2px #34d2e3,0 0 14px rgba(52,210,227,.65);transform:scale(1.03)}
.mf :focus{outline:none}
.mf :focus-visible{outline:3px solid #1f6fe5;outline-offset:2px}
.mf textarea:focus-visible{outline:2px solid #34d2e3;outline-offset:-2px}
.mf textarea::placeholder{color:#7d8aa3;opacity:1}
.mf .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (prefers-reduced-motion: reduce){.mf *{transition:none!important;animation:none!important}}
`

export function StatusBar() {
  return (
    <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, width: 428, height: 36, zIndex: 20, pointerEvents: 'none', background: 'linear-gradient(180deg,#f0f5ff 70%,rgba(240,245,255,0))' }}>
      <div style={{ position: 'absolute', left: 26, top: 10, width: 58, textAlign: 'center', fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: 17, letterSpacing: -0.5, lineHeight: '19px', color: '#797777' }}>11:11</div>
      <svg style={{ position: 'absolute', left: 334, top: 13 }} width="76" height="14" viewBox="0 0 76 14" fill="#797777">
        <rect x="0" y="9" width="3" height="4" rx="1" /><rect x="5" y="6" width="3" height="7" rx="1" /><rect x="10" y="3" width="3" height="10" rx="1" /><rect x="15" y="0" width="3" height="13" rx="1" />
        <path d="M31 3.5c3.2 0 6.100 1.200 8.300 3.300l-1.300 1.400a9.300 9.300 0 0 0-14 0l-1.300-1.400A11.700 11.700 0 0 1 31 3.500Zm0 4c1.900 0 3.600.7 5 1.900l-1.400 1.400a5.200 5.200 0 0 0-7.200 0L26 9.400a7.600 7.600 0 0 1 5-1.900Zm0 4c.9 0 1.600.3 2.200.8L31 14l-2.200-1.700c.6-.5 1.300-.8 2.200-.8Z" transform="translate(0 -1)" />
        <rect x="47" y="1.500" width="25" height="11" rx="3.500" fill="none" stroke="#797777" strokeWidth="1.200" opacity=".6" /><rect x="49" y="3.500" width="21" height="7" rx="2" /><rect x="73" y="5" width="2" height="4" rx="1" opacity=".6" />
      </svg>
    </div>
  )
}

export function BackButton({ onClick, top = 30, left = 12, label = 'Back', ghost = false }: { onClick: () => void; top?: number; left?: number; label?: string; ghost?: boolean }) {
  return (
    <button className="tap abs" aria-label={label} onClick={onClick} style={{ left, top, width: 44, height: 44, zIndex: 21, borderRadius: 22 }}>
      {!ghost && <Svg src="/v11/m-back-btn.svg" style={{ position: 'absolute', left: 3, top: 2, width: 51, height: 48, maxWidth: 'none', pointerEvents: 'none' }} />}
    </button>
  )
}

/** two-plate card: outer + inset inner plate, drop shadows only */
export function Plate({ w, h, r, inset = 3, grad, style, children }: { w: number | string; h: number | string; r: number; inset?: number; grad: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div style={{ width: w, height: h, borderRadius: r, background: grad, boxShadow: SHADOW, position: 'relative', ...style }}>
      <div style={{ position: 'absolute', inset, borderRadius: Math.max(r - inset, 0), background: grad, boxShadow: SHADOW }} />
      {children}
    </div>
  )
}

/** three concentric pearl circles with an icon */
export function PearlCircle({ size, children, style }: { size: number; children?: ReactNode; style?: CSSProperties }) {
  const sh = '-2px -2px 3px #fff, 2px 3px 5px rgba(0,0,0,.28)'
  const ring = (s: number, bg: string): CSSProperties => ({ position: 'absolute', left: (size - s) / 2, top: (size - s) / 2, width: s, height: s, borderRadius: '50%', background: bg, boxShadow: sh })
  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }}>
      <div style={ring(size, 'linear-gradient(135deg,#ffffff,#e4eaf8)')} />
      <div style={ring(size * 0.95, 'linear-gradient(135deg,#f9fbff,#e9eefb)')} />
      <div style={ring(size * 0.9, 'linear-gradient(135deg,#ffffff,#eef2fc)')} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  )
}

export const Tick = ({ color = GREEN, size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.500l4.500 4.500L19 7.500" /></svg>
)
export const Minus = ({ color = MAGENTA, size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.200" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="9.500" /><path d="M7.500 12h9" /></svg>
)

/** three-layer mint button (EDIT / SKIP). hit area is padded to >= 44px. */
export function MintButton({ w, h, label, onClick, fs = 12, ls = 1, ariaLabel }: { w: number; h: number; label: string; onClick: () => void; fs?: number; ls?: number; ariaLabel?: string }) {
  const k = h / 30
  const hitW = Math.max(w + 12, 52), hitH = Math.max(h + 12, 44)
  return (
    <button className="tap" onClick={onClick} aria-label={ariaLabel ?? label} style={{ position: 'relative', width: hitW, height: hitH, margin: `${-(hitH - h) / 2}px ${-(hitW - w) / 2}px`, borderRadius: 14 }}>
      <span style={{ position: 'absolute', left: (hitW - w) / 2, top: (hitH - h) / 2, width: w, height: h, borderRadius: h / 2, background: '#acf8e4', boxShadow: SHADOW }}>
        <span style={{ position: 'absolute', inset: 3 * k, borderRadius: 12 * k, background: 'linear-gradient(180deg,#5cebca,#b5f8e7)', boxShadow: SHADOW }} />
        <span style={{ position: 'absolute', inset: 6 * k, borderRadius: 9 * k, background: 'linear-gradient(180deg,#b5f8e7,#8af0d6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: fs, lineHeight: 1, letterSpacing: ls, color: '#1f3b5c' }}>{label}</span>
      </span>
    </button>
  )
}

export function Title({ top = 84 }: { top?: number }) {
  return (
    <>
      <h1 className="abs" style={{ left: 18, top, width: 392, height: 36, margin: 0, textAlign: 'center', whiteSpace: 'nowrap', fontWeight: 700, fontSize: 24, lineHeight: '36px', letterSpacing: 1.2, color: CYAN, textTransform: 'uppercase' }}>Check- in your match</h1>
      <p className="abs" style={{ left: 18, top: top + 48, width: 392, height: 20, margin: 0, textAlign: 'center', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: NAVY }}>Tap the one that fits. You’ll feel it next.</p>
    </>
  )
}

export function Heading2({ top }: { top: number }) {
  return (
    <>
      <h2 className="abs" style={{ left: 18, top, width: 391, height: 36, margin: 0, textAlign: 'center', fontWeight: 700, fontSize: 24, lineHeight: '36px', letterSpacing: 1.2, color: CYAN, textTransform: 'uppercase', whiteSpace: 'pre' }}>{'How did it the match  feel?'}</h2>
      <p className="abs" style={{ left: 64, top: top + 37, width: 300, height: 14, margin: 0, whiteSpace: 'nowrap', textAlign: 'center', fontWeight: 700, fontSize: 12, lineHeight: '14px', letterSpacing: 1, color: '#0b8fa3', textTransform: 'uppercase' }}>Optional · after your match</p>
    </>
  )
}
