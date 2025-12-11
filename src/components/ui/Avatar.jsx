/**
 * Avatar Component
 */
import { MOODS } from '../../context/MoodContext'

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8 sm:w-10 sm:h-10',
  md: 'w-10 h-10 sm:w-12 sm:h-12',
  lg: 'w-14 h-14 sm:w-16 sm:h-16',
  xl: 'w-20 h-20 sm:w-24 sm:h-24',
}

export function Avatar({
  src,
  name,
  size = 'md',
  mood = null,
  showMoodRing = false,
  online = false,
  className = '',
}) {
  const moodConfig = mood ? MOODS[mood] : null
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  
  return (
    <div className={`relative inline-flex flex-shrink-0 ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={`w-full h-full rounded-full object-cover ${showMoodRing && moodConfig ? `ring-2 ring-offset-2 ring-offset-dark ${moodConfig.ring}` : ''}`}
          loading="lazy"
        />
      ) : (
        <div className={`w-full h-full rounded-full ${moodConfig ? moodConfig.gradient : 'bg-gradient-to-br from-gray-600 to-gray-700'} flex items-center justify-center text-white font-semibold ${size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {initials || '?'}
        </div>
      )}
      
      {showMoodRing && moodConfig && (
        <span className="absolute -bottom-0.5 -right-0.5 text-sm">{moodConfig.emoji}</span>
      )}
      
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark" />
      )}
    </div>
  )
}

export default Avatar
