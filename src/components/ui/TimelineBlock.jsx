/**
 * TimelineBlock Component
 */
import { Plus, Clock } from 'lucide-react'
import { MOODS, useMood } from '../../context/MoodContext'

export function TimelineBlock({ slot, onPlan }) {
  const { moodConfig } = useMood()
  
  if (slot.isFree) {
    return (
      <button onClick={onPlan} className="w-full p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-white/40 flex items-center justify-between min-h-[80px] transition-all active:scale-[0.98]">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${moodConfig.gradient} flex items-center justify-center`}><Plus className="w-6 h-6 text-white" /></div>
          <div className="text-left"><p className="font-medium text-white">{slot.time}</p><p className="text-sm text-white/50">{slot.label} • Free</p></div>
        </div>
        <span className="px-4 py-2 rounded-lg bg-white/10 text-sm text-white/60">Plan</span>
      </button>
    )
  }
  
  return (
    <div className="glass p-4 flex items-center gap-4 min-h-[80px]">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"><Clock className="w-6 h-6 text-white/50" /></div>
      <div className="flex-1"><p className="font-medium text-white">{slot.time}</p><p className="text-sm text-white/50">{slot.label}</p></div>
      <div className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-white/70">{slot.event}</div>
    </div>
  )
}

export default TimelineBlock


