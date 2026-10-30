import { useEffect, useState, type ReactNode } from 'react'
import { actions } from './store'

export const PHONE_W = 428
export const PHONE_H = 926

/**
 * 428x926 phone frame. Desktop: centered, scaled down to fit the window. Phone (<= 480px wide): full screen,
 * the 428px design scales to the width and the frame grows in height to fill the screen.
 */
export default function PhoneFrame({ children, bg = '#EAFFFD' }: { children: ReactNode; bg?: string }) {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight })
  useEffect(() => {
    const f = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', f); window.addEventListener('orientationchange', f)
    return () => { window.removeEventListener('resize', f); window.removeEventListener('orientationchange', f) }
  }, [])
  const mobile = vp.w <= 480
  const scale = mobile ? vp.w / PHONE_W : Math.min(1, (vp.h - 56) / PHONE_H, vp.w / PHONE_W)
  const h = mobile ? vp.h / scale : PHONE_H
  return (
    <div style={{ minHeight: '100dvh', background: mobile ? bg : '#DFF5F5', display: 'flex', alignItems: mobile ? 'flex-start' : 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ width: PHONE_W * scale, height: h * scale, position: 'relative', flex: 'none', borderRadius: mobile ? 0 : 38 * scale, boxShadow: mobile ? 'none' : '0 18px 50px rgba(40,70,120,.28)', overflow: 'hidden', background: bg }}>
        <div id="v11-phone" style={{ width: PHONE_W, height: h, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'relative', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
      <button onClick={() => { actions.reset(); window.location.reload() }} aria-label="Reset demo"
        style={{ position: 'fixed', left: 10, bottom: 8, fontSize: 11, padding: '6px 10px', minHeight: 44, color: '#3E4E78', background: 'rgba(255,255,255,.7)', borderRadius: 8, fontFamily: 'Reem Kufi', fontWeight: 600, zIndex: 9999 }}>
        Reset demo
      </button>
    </div>
  )
}
