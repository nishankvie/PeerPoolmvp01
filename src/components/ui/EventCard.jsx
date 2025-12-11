/**
 * EventCard Component
 */
import { Calendar, MapPin, Users } from 'lucide-react'
import { MOODS } from '../../context/MoodContext'

export function EventCard({ event, users = [], onClick, variant = 'default' }) {
  const moodConfig = MOODS[event.mood]
  const eventAttendees = users.filter(u => event.attendees?.includes(u.id))
  
  if (variant === 'compact') {
    return (
      <button onClick={onClick} className="w-full p-3 rounded-xl glass hover:bg-white/10 flex items-center gap-3 text-left transition-all active:scale-[0.98]">
        <div className={`w-12 h-12 rounded-xl ${moodConfig.gradient} flex items-center justify-center flex-shrink-0`}><span className="text-xl">{moodConfig.emoji}</span></div>
        <div className="flex-1 min-w-0"><p className="font-medium text-white text-sm truncate">{event.title}</p><p className="text-xs text-white/60 truncate">{event.time} • {event.location}</p></div>
      </button>
    )
  }
  
  return (
    <button onClick={onClick} className="w-full glass rounded-2xl overflow-hidden text-left hover:bg-white/10 transition-all active:scale-[0.98]">
      <div className="relative h-32 sm:h-40">{event.image && <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />}<div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" /><div className={`absolute top-3 left-3 px-2 py-1 rounded-lg ${moodConfig.badge} text-xs font-medium flex items-center gap-1`}>{moodConfig.emoji} {moodConfig.label}</div></div>
      <div className="p-4"><h3 className="font-display font-semibold text-white text-lg mb-2">{event.title}</h3><div className="flex flex-wrap gap-2 text-xs text-white/60 mb-3"><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.time}</span><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span></div>{eventAttendees.length > 0 && <div className="flex items-center gap-2"><div className="flex -space-x-2">{eventAttendees.slice(0, 4).map((user, i) => <img key={user.id} src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full ring-2 ring-dark object-cover" style={{ zIndex: 4 - i }} />)}</div><span className="text-xs text-white/60"><Users className="w-3 h-3 inline mr-1" />{eventAttendees.length} friends</span></div>}</div>
    </button>
  )
}

export default EventCard


