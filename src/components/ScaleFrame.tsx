import { useEffect, useRef, useState, type ReactNode } from 'react'

export const FRAME_W = 428
export const FRAME_H = 1832

/** Renders children in the 428x1832 Figma frame, scaled down to fit narrower viewports (never up). */
export default function ScaleFrame({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fit = () => setScale(Math.min(1, window.innerWidth / FRAME_W))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return (
    <div className="flex justify-center" style={{ minHeight: '100vh' }}>
      <div style={{ width: FRAME_W * scale, height: FRAME_H * scale }}>
        <div ref={ref} style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'relative', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
