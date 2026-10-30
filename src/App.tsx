import { usePath } from './v11/router'
import Launcher from './v11/Launcher'
import MatchFlow from './v11/match/MatchFlow'
import AnalyticsFlow from './v11/analytics/AnalyticsFlow'

export default function App() {
  const path = usePath()
  if (path === '/match' || path.startsWith('/match/')) return <MatchFlow />
  if (path === '/analytics') return <AnalyticsFlow />
  return <Launcher />
}
