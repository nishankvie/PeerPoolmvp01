/**
 * Chat/Scheduler Screen
 * 
 * Messaging interface with integrated scheduling:
 * - Real-time chat messages
 * - Quick schedule picker
 * - User info sidebar
 * - Message input with actions
 * 
 * Accessible: Proper ARIA labels and keyboard navigation
 */
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  ArrowLeft, Send, Calendar, Clock, MapPin, 
  Image, Paperclip, Smile, MoreVertical, Check,
  Video, Phone, ChevronRight, Sparkles
} from 'lucide-react'
import { Header } from '../components/layout'
import { Button, Card, Avatar, Badge, Input } from '../components/ui'
import { users, chatMessages, availableSlots, currentUser } from '../data/mockData'

// Message Bubble Component
function MessageBubble({ message, isOwn, senderAvatar, senderName }) {
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  
  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
      {!isOwn && (
        <Avatar src={senderAvatar} name={senderName} size="sm" />
      )}
      
      <div className={`max-w-[70%] ${isOwn ? 'text-right' : ''}`}>
        <div
          className={`
            px-4 py-3 rounded-2xl inline-block text-left
            ${isOwn 
              ? 'bg-primary text-white rounded-br-md' 
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
            }
          `}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <p className={`text-xs text-gray-400 mt-1 ${isOwn ? 'text-right' : ''}`}>
          {time}
        </p>
      </div>
    </div>
  )
}

// Time Slot Picker Component
function TimeSlotPicker({ slots, selectedSlot, onSelect }) {
  return (
    <div className="space-y-2">
      {slots.map((slot) => {
        const slotDate = new Date(slot.date)
        const isSelected = selectedSlot?.id === slot.id
        
        return (
          <button
            key={slot.id}
            type="button"
            onClick={() => onSelect(slot)}
            className={`
              w-full p-3 rounded-md border-2 text-left transition-all
              ${isSelected 
                ? 'border-primary bg-primary-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            aria-pressed={isSelected}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-md flex items-center justify-center
                  ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {slotDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-500">
                    {slot.time} • {slot.duration}
                  </p>
                </div>
              </div>
              {isSelected && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

function ChatScheduler({ user: propUser, onBack }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const messagesEndRef = useRef(null)
  
  // State
  const [messages, setMessages] = useState(chatMessages)
  const [newMessage, setNewMessage] = useState('')
  const [showScheduler, setShowScheduler] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  
  // Get user from props or URL params
  const user = propUser || users.find(u => u.id === id) || users[0]
  
  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    const message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
    }
    
    setMessages([...messages, message])
    setNewMessage('')
  }
  
  const handleScheduleMeetup = () => {
    if (!selectedSlot) return
    
    const scheduleMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      content: `📅 I'd like to schedule a meetup on ${new Date(selectedSlot.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${selectedSlot.time}. Does that work for you?`,
      timestamp: new Date().toISOString(),
      type: 'text',
    }
    
    setMessages([...messages, scheduleMessage])
    setShowScheduler(false)
    setSelectedSlot(null)
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="container-app py-6 flex-1 flex flex-col">
        <div className="grid grid-cols-12 gap-6 flex-1">
          {/* Chat Area - 8 columns */}
          <div className="col-span-12 lg:col-span-8 flex flex-col">
            <Card padding="none" className="flex-1 flex flex-col overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBack}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <Avatar
                    src={user.avatar}
                    name={user.name}
                    size="md"
                    verified={user.verified}
                    online
                  />
                  
                  <div>
                    <h2 className="font-semibold text-gray-900">{user.name}</h2>
                    <p className="text-sm text-green-500 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Online now
                    </p>
                  </div>
                </div>
                
                {/* Chat Actions */}
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Video call"
                  >
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Voice call"
                  >
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="More options"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                {/* Match Notice */}
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-sm text-primary">
                    <Sparkles className="w-4 h-4" />
                    You matched with {user.name}!
                  </div>
                </div>
                
                {/* Messages */}
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.senderId === 'me'}
                    senderAvatar={message.senderId === 'me' ? currentUser.avatar : user.avatar}
                    senderName={message.senderId === 'me' ? currentUser.name : user.name}
                  />
                ))}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Scheduler Panel (Collapsible) */}
              {showScheduler && (
                <div className="border-t border-gray-100 p-4 bg-gray-50 animate-slide-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Pick a Time
                    </h3>
                    <button 
                      onClick={() => setShowScheduler(false)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                  
                  <TimeSlotPicker
                    slots={availableSlots}
                    selectedSlot={selectedSlot}
                    onSelect={setSelectedSlot}
                  />
                  
                  <Button
                    variant="accent"
                    className="w-full mt-4"
                    disabled={!selectedSlot}
                    onClick={handleScheduleMeetup}
                  >
                    Send Invite
                  </Button>
                </div>
              )}
              
              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  {/* Quick Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowScheduler(!showScheduler)}
                      className={`
                        p-2 rounded-full transition-colors
                        ${showScheduler ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-500'}
                      `}
                      aria-label="Schedule meetup"
                    >
                      <Calendar className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                      aria-label="Attach file"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                      aria-label="Add image"
                    >
                      <Image className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Input */}
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    aria-label="Message input"
                  />
                  
                  {/* Emoji & Send */}
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    aria-label="Add emoji"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    className="rounded-full px-4"
                    disabled={!newMessage.trim()}
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          
          {/* Sidebar - 4 columns (Hidden on mobile) */}
          <aside className="hidden lg:block col-span-4 space-y-6">
            {/* User Info Card */}
            <Card className="text-center">
              <Avatar
                src={user.avatar}
                name={user.name}
                size="xl"
                verified={user.verified}
                className="mx-auto mb-4"
              />
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {user.name}
              </h3>
              
              <p className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4" />
                {user.location}
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="primary">
                  <Sparkles className="w-3 h-3" />
                  {user.matchScore}% Match
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {user.bio}
              </p>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                View Full Profile
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Card>
            
            {/* Shared Interests */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">
                Shared Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.slice(0, 4).map((interest) => (
                  <Badge key={interest} variant="gray" size="sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </Card>
            
            {/* Quick Schedule */}
            <Card className="bg-gradient-to-br from-primary-50 to-accent-50 border-0">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Ready to Meet?
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {user.name.split(' ')[0]} is available on {user.availability}
                  </p>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => setShowScheduler(true)}
                  >
                    Schedule Now
                  </Button>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default ChatScheduler


