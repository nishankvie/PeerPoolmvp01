/**
 * Header Component
 */
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Bell, Settings } from 'lucide-react'
import { useMood, MOODS } from '../../context/MoodContext'

const navLinks = [
  { path: '/home', label: 'Home', emoji: '🏠' },
  { path: '/events', label: 'Events', emoji: '📅' },
  { path: '/timeline', label: 'MyTime', emoji: '⏰' },
  { path: '/hangout', label: 'Hangout', emoji: '✨' },
]

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentMood, setCurrentMood, moodConfig } = useMood()
  
  return (
    <header className="glass sticky top-0 z-40 border-b border-white/10 safe-top">
      <div className="container-app">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-4">
            <Link to="/home" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="PeerPool" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg" />
              <span className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-white/90 transition-colors hidden sm:block">PeerPool</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">{navLinks.map((link) => <Link key={link.path} to={link.path} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>{link.emoji} {link.label}</Link>)}</nav>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1">{Object.values(MOODS).map((mood) => <button key={mood.id} onClick={() => setCurrentMood(mood.id)} className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${currentMood === mood.id ? `${mood.gradient} ${mood.shadow} scale-110` : 'bg-white/5 hover:bg-white/10'}`} title={mood.label}><span className="text-base sm:text-lg">{mood.emoji}</span></button>)}</div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"><Bell className="w-5 h-5 text-white/60" /><span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${moodConfig.gradient}`} /></button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
