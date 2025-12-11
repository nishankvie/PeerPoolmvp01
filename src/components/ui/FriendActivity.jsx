/**
 * FriendActivity Component
 */
import { MOODS } from '../../context/MoodContext'
import Avatar from './Avatar'

export function FriendActivity({ activity, onClick }) {
  const moodConfig = MOODS[activity.mood]
  return (
    <button onClick={onClick} className="w-full p-3 rounded-xl glass hover:bg-white/10 flex items-center gap-3 text-left transition-all active:scale-[0.98]">
      <Avatar src={activity.user.avatar} name={activity.user.name} size="sm" mood={activity.mood} showMoodRing />
      <div className="flex-1 min-w-0"><p className="font-medium text-white text-sm truncate">{activity.user.name} is planning:</p><p className="text-xs text-white/60 truncate">{activity.activity}</p></div>
      <div className={`px-2 py-1 rounded-lg ${moodConfig.badge} text-xs`}>{activity.time}</div>
    </button>
  )
}

export default FriendActivity


