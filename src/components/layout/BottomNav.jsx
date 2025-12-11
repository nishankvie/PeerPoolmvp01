/**
 * BottomNav Component - Fixed mobile navigation with safe-area support
 */
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Calendar, Plus, Clock, MessageCircle } from 'lucide-react'
import { useMood } from '../../context/MoodContext'

const navItems = [
  { id: 'home', path: '/home', icon: Home, label: 'Home' },
  { id: 'timeline', path: '/timeline', icon: Clock, label: 'MyTime' },
  { id: 'create', path: '/hangout', icon: Plus, label: 'Create', isCenter: true },
  { id: 'events', path: '/events', icon: Calendar, label: 'Events' },
  { id: 'chat', path: '/chats', icon: MessageCircle, label: 'Chat' },
]

function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { moodConfig } = useMood()
  
  // Hide on chat detail screen and hangout creation wizard
  if (location.pathname.startsWith('/chat/')) return null
  if (location.pathname.startsWith('/hangout')) return null
  
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-xl border-t border-white/10"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 pt-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path || (item.path === '/home' && location.pathname === '/')
          
          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`
                  relative -mt-6 p-4 rounded-2xl flex items-center justify-center
                  ${moodConfig.gradient} ${moodConfig.shadow}
                  transition-all duration-300 hover:scale-105 active:scale-95
                `}
                aria-label={item.label}
              >
                <Icon className="w-6 h-6 text-white" />
              </button>
            )
          }
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                flex flex-col items-center justify-center py-2 px-3 rounded-xl min-w-[60px]
                transition-all duration-200 active:scale-95
                ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}
              `}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? moodConfig.text : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <span className={`absolute -bottom-0.5 w-1 h-1 rounded-full ${moodConfig.gradient}`} />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav


