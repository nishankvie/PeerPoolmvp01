/**
 * MemoryCard Component
 */
import { MOODS } from '../../context/MoodContext'

export function MemoryCard({ memory, onClick }) {
  const moodConfig = MOODS[memory.mood]
  return (
    <button onClick={onClick} className="flex-shrink-0 w-44 sm:w-56 rounded-xl sm:rounded-2xl overflow-hidden glass hover:bg-white/10 transition-all active:scale-[0.98]">
      <div className="relative h-28 sm:h-36">{memory.image && <img src={memory.image} alt={memory.title} className="w-full h-full object-cover" loading="lazy" />}<div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent" /><div className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-lg ${moodConfig.badge} text-xs`}>{moodConfig.emoji}</div></div>
      <div className="p-3"><p className="font-semibold text-white text-sm truncate">{memory.title}</p><p className="text-xs text-white/60">{memory.date}</p></div>
    </button>
  )
}

export default MemoryCard


