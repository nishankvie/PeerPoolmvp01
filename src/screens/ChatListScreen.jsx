/**
 * Chat List Screen - Instagram-style chat list
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Edit, X, Send, Users } from 'lucide-react'
import { useMood, MOODS } from '../context/MoodContext'
import { Header } from '../components/layout'
import { Avatar, GlassCard } from '../components/ui'
import { users, currentUser } from '../data/mockData'
import { recommendedFriends } from '../data/homeFeedMock'

function NewChatModal({ friend, onClose, onSend }) {
  const { moodConfig } = useMood()
  const friendMoodConfig = MOODS[friend.currentMood]
  const [message, setMessage] = useState(`Hey ${friend.name.split(' ')[0]}! 👋`)
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-dark-100 rounded-2xl overflow-hidden animate-slide-up">
        <div className={`${friendMoodConfig.gradient} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full ring-2 ring-white/30 object-cover" />
              <div><h3 className="font-semibold text-white">{friend.name}</h3><p className="text-sm text-white/80">{friendMoodConfig.emoji} {friendMoodConfig.label}</p></div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5 text-white" /></button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full bg-white/5 px-4 py-3 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:bg-white/10 resize-none" />
          <button onClick={() => { onSend(friend, message); onClose() }} className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${moodConfig.gradient} text-white ${moodConfig.shadow} font-semibold transition-all active:scale-95`}>
            <Send className="w-5 h-5" />Send Message
          </button>
        </div>
      </div>
    </div>
  )
}

function ChatListScreen() {
  const navigate = useNavigate()
  const { moodConfig } = useMood()
  const [searchQuery, setSearchQuery] = useState('')
  const [newChatUser, setNewChatUser] = useState(null)
  
  const allFriends = users.filter(u => currentUser.friends.includes(u.id))
  
  const chatList = allFriends.map((user, i) => ({
    ...user,
    lastMessage: ["Hey! What's your vibe today? 🎉", "That was so much fun yesterday!", "Are you free this weekend?", "Let's plan something soon", "Thanks for the invite!", "Can't wait for the party 🎊"][i % 6],
    lastMessageTime: ['2m ago', '15m ago', '1h ago', '3h ago', 'Yesterday', '2d ago'][i % 6],
    unread: i === 0 ? 3 : i === 2 ? 1 : 0,
    online: i < 3,
  }))
  
  const filteredChats = chatList.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.username?.toLowerCase().includes(searchQuery.toLowerCase()))
  const onlineFriends = filteredChats.filter(u => u.online)
  
  const handleStartChat = (friend, message) => { navigate(`/chat/${friend.id}`) }
  
  return (
    <div className={`min-h-screen-safe ${moodConfig.mesh} bg-dark`}>
      <Header />
      <main className="container-app py-4" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 96px)' }}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-display font-bold text-white">Messages</h1>
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors"><Edit className="w-5 h-5 text-white/60" /></button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search conversations..." className="input pl-12" />
        </div>
        
        {onlineFriends.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs text-white/50 uppercase tracking-wider mb-3">Active Now</h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
              {onlineFriends.map((user) => {
                const userMoodConfig = MOODS[user.currentMood]
                return (
                  <button key={user.id} onClick={() => navigate(`/chat/${user.id}`)} className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="relative">
                      <img src={user.avatar} alt={user.name} className={`w-14 h-14 rounded-full object-cover ring-2 ring-offset-2 ring-offset-dark ${userMoodConfig.ring}`} />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-dark" />
                      <span className="absolute -bottom-0.5 -right-0.5 text-sm">{userMoodConfig.emoji}</span>
                    </div>
                    <span className="text-xs text-white/70 truncate w-16 text-center">{user.name.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="text-xs text-white/50 uppercase tracking-wider mb-3">Messages</h3>
          {filteredChats.length === 0 ? (
            <div className="text-center py-12"><Users className="w-12 h-12 text-white/20 mx-auto mb-3" /><p className="text-white/50">No conversations found</p></div>
          ) : (
            filteredChats.map((user) => {
              const userMoodConfig = MOODS[user.currentMood]
              return (
                <button key={user.id} onClick={() => navigate(`/chat/${user.id}`)} className="w-full p-3 rounded-xl glass hover:bg-white/10 flex items-center gap-3 transition-all active:scale-[0.98]">
                  <div className="relative flex-shrink-0">
                    <img src={user.avatar} alt={user.name} className={`w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-offset-dark ${userMoodConfig.ring}`} />
                    {user.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark" />}
                    <span className="absolute -bottom-0.5 -right-0.5 text-sm">{userMoodConfig.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`font-semibold truncate ${user.unread > 0 ? 'text-white' : 'text-white/90'}`}>{user.name}</span>
                      <span className="text-xs text-white/40 flex-shrink-0 ml-2">{user.lastMessageTime}</span>
                    </div>
                    <p className={`text-sm truncate ${user.unread > 0 ? 'text-white font-medium' : 'text-white/60'}`}>{user.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${userMoodConfig.badge}`}>{userMoodConfig.emoji} {userMoodConfig.label}</span>
                    </div>
                  </div>
                  {user.unread > 0 && (
                    <div className={`w-6 h-6 rounded-full ${moodConfig.gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>{user.unread}</div>
                  )}
                </button>
              )
            })
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="text-sm text-white/50 mb-3">Suggested New Chats</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {recommendedFriends.slice(0, 4).map((friend) => {
              const friendMoodConfig = MOODS[friend.currentMood]
              return (
                <button key={friend.id} onClick={() => setNewChatUser(friend)} className="flex-shrink-0 w-32 p-3 rounded-xl glass hover:bg-white/10 text-center transition-all active:scale-95">
                  <img src={friend.avatar} alt={friend.name} className={`w-12 h-12 rounded-full mx-auto mb-2 object-cover ring-2 ${friendMoodConfig.ring}`} />
                  <p className="text-sm font-medium text-white truncate">{friend.name}</p>
                  <p className="text-xs text-white/50">{friend.mutualFriends} mutual</p>
                </button>
              )
            })}
          </div>
        </div>
      </main>
      {newChatUser && <NewChatModal friend={newChatUser} onClose={() => setNewChatUser(null)} onSend={handleStartChat} />}
    </div>
  )
}

export default ChatListScreen


