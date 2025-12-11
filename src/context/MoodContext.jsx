/**
 * Mood Context - Global mood state management
 */
import { createContext, useContext, useState } from 'react'

export const MOODS = {
  party: {
    id: 'party',
    label: 'Party',
    emoji: '🎉',
    gradient: 'bg-gradient-to-br from-party via-accent to-pink-500',
    mesh: 'bg-mesh-party',
    badge: 'bg-party/20 text-party border border-party/30',
    ring: 'ring-party',
    text: 'text-party',
    shadow: 'shadow-neon-party',
    colorHex: '#D946EF',
  },
  chill: {
    id: 'chill',
    label: 'Chill',
    emoji: '😌',
    gradient: 'bg-gradient-to-br from-chill via-cyan-400 to-teal-400',
    mesh: 'bg-mesh-chill',
    badge: 'bg-chill/20 text-chill border border-chill/30',
    ring: 'ring-chill',
    text: 'text-chill',
    shadow: 'shadow-neon-chill',
    colorHex: '#00CED1',
  },
  play: {
    id: 'play',
    label: 'Play',
    emoji: '🎮',
    gradient: 'bg-gradient-to-br from-play via-green-400 to-emerald-400',
    mesh: 'bg-mesh-play',
    badge: 'bg-play/20 text-play border border-play/30',
    ring: 'ring-play',
    text: 'text-play',
    shadow: 'shadow-neon-play',
    colorHex: '#22C55E',
  },
  focus: {
    id: 'focus',
    label: 'Focus',
    emoji: '📚',
    gradient: 'bg-gradient-to-br from-focus via-indigo-500 to-blue-500',
    mesh: 'bg-mesh-focus',
    badge: 'bg-focus/20 text-focus border border-focus/30',
    ring: 'ring-focus',
    text: 'text-focus',
    shadow: 'shadow-neon-focus',
    colorHex: '#6366F1',
  },
  social: {
    id: 'social',
    label: 'Social',
    emoji: '🤝',
    gradient: 'bg-gradient-to-br from-social via-orange-500 to-red-500',
    mesh: 'bg-mesh-social',
    badge: 'bg-social/20 text-social border border-social/30',
    ring: 'ring-social',
    text: 'text-social',
    shadow: 'shadow-neon-social',
    colorHex: '#F97316',
  },
}

const MoodContext = createContext()

export function MoodProvider({ children }) {
  const [currentMood, setCurrentMood] = useState('party')
  
  const moodConfig = MOODS[currentMood]
  
  const value = {
    currentMood,
    setCurrentMood,
    moodConfig,
    allMoods: MOODS,
  }
  
  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>
}

export function useMood() {
  const context = useContext(MoodContext)
  if (!context) throw new Error('useMood must be used within MoodProvider')
  return context
}

export default MoodContext


