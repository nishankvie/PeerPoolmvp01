/**
 * DiscoverFriendsRow Component
 */
import { useState } from 'react'
import { MessageCircle, UserPlus, Users, X, Send, Sparkles } from 'lucide-react'
import { useMood, MOODS } from '../../context/MoodContext'
import { buddyBadges } from '../../data/homeFeedMock'

function QuickChatModal({ friend, onClose, onSend }) {
  const { moodConfig } = useMood()
  const friendMoodConfig = MOODS[friend.currentMood]
  const [message, setMessage] = useState(`Hey — we both like ${friendMoodConfig.label} vibes — want to hang out? 😄`)
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-dark-100 rounded-2xl overflow-hidden animate-slide-up">
        <div className={`${friendMoodConfig.gradient} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full ring-2 ring-white/30 object-cover" /><div><h3 className="font-semibold text-white">{friend.name}</h3><p className="text-sm text-white/80">{friendMoodConfig.emoji} {friendMoodConfig.label}</p></div></div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><X className="w-5 h-5 text-white" /></button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-sm text-white/60"><Users className="w-4 h-4" />{friend.mutualFriends} mutual friends{friend.mutualFriendNames && ` including ${friend.mutualFriendNames.slice(0, 2).join(', ')}`}</div>
          <div className="flex flex-wrap gap-2">{friend.sharedInterests.map((interest) => <span key={interest} className="px-2 py-1 rounded-lg bg-white/10 text-xs text-white/70">{interest}</span>)}</div>
          <div><label className="block text-sm text-white/60 mb-2">Your message</label><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full bg-white/5 px-4 py-3 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:bg-white/10 resize-none" /></div>
          <button onClick={() => { onSend(friend, message); onClose() }} className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${moodConfig.gradient} text-white ${moodConfig.shadow} font-semibold transition-all active:scale-95 hover:brightness-110`}><Send className="w-5 h-5" />Send Message</button>
        </div>
      </div>
    </div>
  )
}

function FriendCard({ friend, onMessage, onAdd }) {
  const { moodConfig } = useMood()
  const friendMoodConfig = MOODS[friend.currentMood]
  const primaryBadge = friend.badges[0]
  const badgeConfig = buddyBadges[primaryBadge]
  
  return (
    <div className="flex-shrink-0 w-48 sm:w-56 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      <div className={`h-1.5 ${friendMoodConfig.gradient}`} />
      <div className="p-4 space-y-3">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-2"><img src={friend.avatar} alt={friend.name} className={`w-16 h-16 rounded-full object-cover ring-2 ring-offset-2 ring-offset-dark ${friendMoodConfig.ring}`} /><span className="absolute -bottom-1 -right-1 text-lg">{friendMoodConfig.emoji}</span></div>
          <h4 className="font-semibold text-white text-sm truncate w-full">{friend.name}</h4>
          <p className="text-xs text-white/50">{friend.username}</p>
        </div>
        <div className="flex items-center justify-center gap-1 text-xs text-white/60"><Users className="w-3.5 h-3.5" /><span>{friend.mutualFriends} mutual friends</span></div>
        <div className="flex flex-wrap justify-center gap-1">{friend.sharedInterests.slice(0, 2).map((interest) => <span key={interest} className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-white/70">{interest}</span>)}</div>
        {badgeConfig && <div className={`flex items-center justify-center gap-1 px-2 py-1 rounded-full mx-auto w-fit ${MOODS[badgeConfig.color]?.badge || 'bg-white/10'}`}><span>{badgeConfig.emoji}</span><span className="text-xs font-medium">{badgeConfig.label}</span></div>}
        <div className="flex gap-2">
          <button onClick={() => onMessage(friend)} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl ${moodConfig.gradient} text-white ${moodConfig.shadow} font-medium text-xs transition-all active:scale-95`}><MessageCircle className="w-4 h-4" />Message</button>
          <button onClick={() => onAdd(friend)} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 transition-all active:scale-95"><UserPlus className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  )
}

function DiscoverFriendsRow({ friends, title = "Discover New Friends" }) {
  const { moodConfig } = useMood()
  const [chatFriend, setChatFriend] = useState(null)
  const handleMessage = (friend) => { setChatFriend(friend) }
  const handleAdd = (friend) => { console.log('Add buddy:', friend.name) }
  const handleSendMessage = (friend, message) => { console.log('Send message to', friend.name, ':', message) }
  
  return (
    <section className="py-4">
      <div className="flex items-center gap-2 mb-3 px-4 sm:px-0">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${moodConfig.gradient} flex items-center justify-center`}><Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
        <div><h3 className="font-display font-semibold text-base sm:text-lg text-white">{title}</h3><p className="text-xs text-white/50">People you might vibe with</p></div>
      </div>
      <div className="relative -mx-4 sm:mx-0">
        <div className="absolute left-0 top-0 bottom-0 w-4 sm:hidden bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-4 sm:hidden bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
        <div className="flex gap-3 overflow-x-auto px-4 sm:px-0 pb-2 scrollbar-hide">{friends.map((friend) => <FriendCard key={friend.id} friend={friend} onMessage={handleMessage} onAdd={handleAdd} />)}</div>
      </div>
      {chatFriend && <QuickChatModal friend={chatFriend} onClose={() => setChatFriend(null)} onSend={handleSendMessage} />}
    </section>
  )
}

export default DiscoverFriendsRow


