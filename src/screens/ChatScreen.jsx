/**
 * Chat Screen - Individual conversation
 */
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Send, Calendar, MoreVertical, Phone, Video, Smile } from 'lucide-react'
import { useMood, MOODS } from '../context/MoodContext'
import { Avatar, Button } from '../components/ui'
import { users, chatMessages, moodSuggestions, currentUser } from '../data/mockData'

const moodActions = [
  { mood: 'party', label: "Let's party", emoji: '🎉' },
  { mood: 'chill', label: "Let's chill", emoji: '😌' },
  { mood: 'play', label: "Let's play", emoji: '🎮' },
  { mood: 'focus', label: "Let's study", emoji: '📚' },
  { mood: 'social', label: "Let's hang", emoji: '🤝' },
]

function MessageBubble({ message, isOwn, mood }) {
  const moodConfig = MOODS[mood || 'party']
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  
  return (
    <div className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <div className={`max-w-[80%] ${isOwn ? 'text-right' : ''}`}>
        <div className={`px-4 py-3 rounded-2xl inline-block text-left ${isOwn ? `${moodConfig.gradient} text-white rounded-br-sm` : 'glass text-white rounded-bl-sm'}`}>
          <p className="text-sm">{message.content}</p>
        </div>
        <p className={`text-xs text-white/40 mt-1 ${isOwn ? 'text-right' : ''}`}>{time}</p>
      </div>
    </div>
  )
}

function ChatScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { currentMood, moodConfig } = useMood()
  
  const [messages, setMessages] = useState(chatMessages)
  const [newMessage, setNewMessage] = useState('')
  const [showMoodActions, setShowMoodActions] = useState(true)
  
  const user = users.find(u => u.id === id) || users[0]
  const userMoodConfig = MOODS[user.currentMood]
  const suggestion = moodSuggestions[user.id]
  
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    setMessages([...messages, { id: Date.now().toString(), senderId: 'me', content: newMessage, timestamp: new Date().toISOString(), type: 'text' }])
    setNewMessage('')
  }
  
  const handleMoodAction = (mood) => {
    const moodTemplate = MOODS[mood]
    setMessages([...messages, { id: Date.now().toString(), senderId: 'me', content: `${moodTemplate.emoji} ${moodTemplate.label} time? What do you say?`, timestamp: new Date().toISOString(), type: 'text' }])
    setShowMoodActions(false)
  }
  
  return (
    <div className={`h-screen-safe flex flex-col ${moodConfig.mesh} bg-dark`}>
      <header className="glass sticky top-0 z-40 border-b border-white/10 flex-shrink-0 safe-top">
        <div className="flex items-center justify-between h-14 px-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/chats')} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><ArrowLeft className="w-5 h-5 text-white" /></button>
            <Avatar src={user.avatar} name={user.name} size="sm" mood={user.currentMood} showMoodRing online />
            <div><h2 className="font-semibold text-white text-sm">{user.name}</h2><p className={`text-xs ${userMoodConfig.text} flex items-center gap-1`}>{userMoodConfig.emoji} {userMoodConfig.label}</p></div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors hidden sm:flex"><Video className="w-5 h-5 text-white/60" /></button>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors hidden sm:flex"><Phone className="w-5 h-5 text-white/60" /></button>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors"><MoreVertical className="w-5 h-5 text-white/60" /></button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="container-app py-4 space-y-3 max-w-3xl mx-auto">
          {suggestion && (
            <div className={`${moodConfig.gradient} ${moodConfig.shadow} p-4 rounded-2xl text-center mb-4 animate-slide-up mx-2`}>
              <p className="font-medium text-sm mb-2 text-white">{suggestion.message}</p>
              <button onClick={() => navigate('/hangout')} className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/20 text-white hover:bg-white/30 transition-all">{suggestion.suggestion}</button>
            </div>
          )}
          {messages.map((message) => <MessageBubble key={message.id} message={message} isOwn={message.senderId === 'me'} mood={currentMood} />)}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>
      
      <div className="flex-shrink-0 border-t border-white/10 bg-dark/80 backdrop-blur-xl">
        {showMoodActions && (
          <div className="px-3 pt-3 animate-slide-up">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {moodActions.map((action) => {
                const actionMoodConfig = MOODS[action.mood]
                return (
                  <button key={action.mood} onClick={() => handleMoodAction(action.mood)} className={`flex-shrink-0 px-4 py-2 rounded-xl flex items-center gap-2 ${actionMoodConfig.gradient} ${actionMoodConfig.shadow} transition-all active:scale-95 ${action.mood === 'chill' || action.mood === 'play' ? 'text-dark' : 'text-white'}`}>
                    <span className="text-lg">{action.emoji}</span><span className="font-medium text-sm whitespace-nowrap">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="p-3 pb-safe">
          <div className="flex items-center gap-3 glass p-3 rounded-2xl">
            <button type="button" onClick={() => navigate('/hangout')} className={`flex-shrink-0 p-2.5 rounded-xl ${moodConfig.gradient} ${moodConfig.shadow} active:scale-95 transition-all`}><Calendar className="w-5 h-5 text-white" /></button>
            <input ref={inputRef} type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent px-2 py-2 text-white text-base placeholder:text-white/40 focus:outline-none min-w-0" enterKeyHint="send" />
            <button type="button" className="hidden sm:flex p-2 hover:bg-white/10 rounded-xl transition-colors text-white/60"><Smile className="w-5 h-5" /></button>
            <button type="submit" disabled={!newMessage.trim()} className={`flex-shrink-0 p-2.5 rounded-xl transition-all active:scale-95 ${newMessage.trim() ? `${moodConfig.gradient} ${moodConfig.shadow}` : 'bg-white/10'}`}><Send className="w-5 h-5 text-white" /></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatScreen


