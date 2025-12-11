/**
 * GlassCard Component - Glassmorphism card
 */
import { MOODS } from '../../context/MoodContext'

const paddingMap = { sm: 'p-3 sm:p-4', md: 'p-4 sm:p-6', lg: 'p-6 sm:p-8' }

export function GlassCard({ children, mood = null, glow = false, hover = false, padding = 'md', className = '' }) {
  const moodConfig = mood ? MOODS[mood] : null
  return (
    <div className={`glass ${paddingMap[padding]} ${moodConfig && glow ? moodConfig.shadow : ''} ${hover ? 'hover:bg-white/10 transition-all' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function SectionHeader({ title, subtitle, icon: Icon, mood = 'party', action, onAction }) {
  const moodConfig = MOODS[mood]
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {Icon && <div className={`w-10 h-10 rounded-xl ${moodConfig.gradient} flex items-center justify-center`}><Icon className="w-5 h-5 text-white" /></div>}
        <div><h3 className="text-lg font-display font-semibold text-white">{title}</h3>{subtitle && <p className="text-sm text-white/60">{subtitle}</p>}</div>
      </div>
      {action && <button onClick={onAction} className="text-sm text-white/60 hover:text-white transition-colors">{action}</button>}
    </div>
  )
}

export function MoodBadge({ mood, size = 'sm' }) {
  const moodConfig = MOODS[mood]
  if (!moodConfig) return null
  const sizeClasses = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm' }
  return <span className={`inline-flex items-center gap-1 rounded-full ${moodConfig.badge} ${sizeClasses[size]}`}><span>{moodConfig.emoji}</span><span className="font-medium">{moodConfig.label}</span></span>
}

export default GlassCard


