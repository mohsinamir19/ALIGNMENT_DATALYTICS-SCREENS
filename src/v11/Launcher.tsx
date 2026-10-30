import { Link } from './router'
import { actions } from './store'

const btn: React.CSSProperties = {
  display: 'block', textAlign: 'center', textDecoration: 'none', color: '#1F3B5C', fontWeight: 700, fontSize: 20, letterSpacing: 1.2,
  padding: '20px 24px', borderRadius: 999, minHeight: 64,
  background: 'linear-gradient(180deg,#B5F8E7,#5CEBCA)', border: '4px solid #ACF8E4',
  boxShadow: '2px 4px 6px rgba(0,0,0,.25), inset 0 0 0 4px rgba(92,235,202,.5)',
}

export default function Launcher() {
  return (
    <main style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: 24, background: 'linear-gradient(180deg,#EAFFFD,#DDEBFF)', fontFamily: 'Reem Kufi' }}>
      <div style={{ width: 'min(100%, 380px)', display: 'grid', gap: 18 }}>
        <h1 style={{ margin: 0, textAlign: 'center', color: '#3E4E78', fontSize: 'clamp(26px,7vw,32px)', letterSpacing: 1.4 }}>ANGEL · v11</h1>
        <p style={{ margin: 0, textAlign: 'center', color: '#485980', fontSize: 16 }}>Pick a flow to try</p>
        <Link to="/match" style={btn}>Positive match flow</Link>
        <Link to="/analytics" style={btn}>Analytics flow</Link>
        <button onClick={() => { actions.reset(); window.location.reload() }} style={{ ...btn, background: '#fff', border: '2px solid #ACF8E4', fontSize: 16, minHeight: 48, padding: '10px 18px', boxShadow: '1px 2px 3px rgba(0,0,0,.2)' }}>Reset demo</button>
      </div>
    </main>
  )
}
