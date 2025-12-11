/**
 * Button Component
 */
import { MOODS } from '../../context/MoodContext'

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base',
  lg: 'px-6 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg',
}

const variantClasses = {
  primary: 'text-white',
  secondary: 'text-dark',
  glass: 'glass text-white hover:bg-white/15',
  outline: 'bg-transparent border-2 text-white hover:bg-white/10',
}

export function Button({
  children,
  mood = 'party',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
}) {
  const moodConfig = MOODS[mood]
  
  const getVariantStyles = () => {
    if (variant === 'glass') return 'glass text-white hover:bg-white/15'
    if (variant === 'outline') return `bg-transparent border-2 ${moodConfig?.ring || 'border-white'} text-white hover:bg-white/10`
    // Primary - use mood gradient
    if (['chill', 'play'].includes(mood)) return `${moodConfig.gradient} ${moodConfig.shadow} text-dark`
    return `${moodConfig.gradient} ${moodConfig.shadow} text-white`
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-xl
        transition-all duration-300 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:brightness-110
        ${sizeClasses[size]}
        ${getVariantStyles()}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button
