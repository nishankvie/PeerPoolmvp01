/**
 * MoodTile Component
 */
import { MOODS } from '../../context/MoodContext'

export function MoodTile({ mood, isActive = false, onClick, size = 'md' }) {
  const moodConfig = MOODS[mood]
  if (!moodConfig) return null
  
  const sizeClasses = {
    sm: 'w-24 h-20 p-2',
    md: 'w-32 h-24 sm:w-40 sm:h-28 p-3',
    lg: 'w-40 h-28 sm:w-48 sm:h-32 p-4',
  }
  
  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 ${sizeClasses[size]} rounded-xl sm:rounded-2xl
        flex flex-col items-center justify-center gap-1
        transition-all duration-300 active:scale-95
        ${isActive ? `${moodConfig.gradient} ${moodConfig.shadow} scale-105` : 'glass hover:bg-white/10'}
      `}
    >
      <span className={`${size === 'sm' ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>{moodConfig.emoji}</span>
      <span className={`font-semibold text-white ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{moodConfig.label}</span>
    </button>
  )
}

export default MoodTile


