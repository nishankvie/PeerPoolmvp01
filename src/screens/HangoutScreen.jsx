/**
 * Hangout/Create Event Screen
 */
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Sparkles, ChevronRight, X, ArrowLeft, Check, Lock, Users, Globe, Send, Calendar, MapPin, AlertCircle, GraduationCap, PartyPopper, Coffee, Gamepad2, Trophy, Video, BookOpen, Zap } from 'lucide-react'
import { useMood, MOODS } from '../context/MoodContext'
import { GlassCard, Button, Avatar } from '../components/ui'
import { users, currentUser } from '../data/mockData'
import { studyBuddyUsers } from '../data/studyBuddyMock'

const eventTypes = [
  { id: 'quick', label: 'Quick Hangout', emoji: '⚡', description: 'Fast & casual', mood: 'social' },
  { id: 'party', label: 'Party', emoji: '🎉', description: "Let's celebrate!", mood: 'party' },
  { id: 'studybuddy', label: 'Study Buddy', emoji: '📚', description: 'Find study partners', mood: 'focus', special: true },
  { id: 'gaming', label: 'Game Night', emoji: '🎮', description: 'Gaming session', mood: 'play' },
  { id: 'chill', label: 'Chill', emoji: '😌', description: 'Relaxed vibes', mood: 'chill' },
]

const timeOptions = [
  { id: 'morning', label: 'Morning', icon: '🌅' },
  { id: 'afternoon', label: 'Afternoon', icon: '☀️' },
  { id: 'evening', label: 'Evening', icon: '🌆' },
  { id: 'tonight', label: 'Tonight', icon: '🌙' },
  { id: 'tomorrow', label: 'Tomorrow', icon: '📅' },
  { id: 'weekend', label: 'Weekend', icon: '🎉' },
]

const visibilityOptions = [
  { id: 'friends', label: 'Friends Only', icon: Lock, description: 'Only your friends can see' },
  { id: 'groups', label: 'My Groups', icon: Users, description: 'Friends & club members' },
  { id: 'public', label: 'Public', icon: Globe, description: 'Anyone can join' },
]

const steps = ['type', 'customize', 'details', 'invite']

function StudyBuddyPreview({ onClose, onFindMore }) {
  const { moodConfig } = useMood()
  const previewUsers = studyBuddyUsers.slice(0, 3)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-dark-100 rounded-2xl overflow-hidden animate-slide-up max-h-[80vh] flex flex-col">
        <div className="bg-gradient-focus p-4 flex items-center justify-between"><div className="flex items-center gap-3"><GraduationCap className="w-6 h-6 text-white" /><h3 className="font-semibold text-white">Quick Study Buddy Matches</h3></div><button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5 text-white" /></button></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">{previewUsers.map((user) => <div key={user.id} className="glass p-3 rounded-xl flex items-center gap-3"><img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-focus/50" /><div className="flex-1 min-w-0"><p className="font-semibold text-white text-sm">{user.name}</p><p className="text-xs text-white/60">{user.course} • {user.matchScore}% match</p></div><button className="px-3 py-1.5 rounded-lg bg-focus text-white text-xs font-medium">Invite</button></div>)}</div>
        <div className="p-4 border-t border-white/10"><button onClick={onFindMore} className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${moodConfig.gradient} text-white ${moodConfig.shadow} font-semibold transition-all active:scale-95`}><GraduationCap className="w-5 h-5" />Find More Study Buddies</button></div>
      </div>
    </div>
  )
}

function HangoutScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentMood, setCurrentMood, moodConfig } = useMood()
  const formRef = useRef(null)
  const prefillMood = location.state?.prefillMood || currentMood
  const prefillTitle = location.state?.prefillTitle || ''
  
  const [step, setStep] = useState(0)
  const [eventType, setEventType] = useState(null)
  const [selectedMood, setSelectedMood] = useState(prefillMood)
  const [mainCategory, setMainCategory] = useState(null)
  const [title, setTitle] = useState(prefillTitle)
  const [description, setDescription] = useState('')
  const [selectedTime, setSelectedTime] = useState('tonight')
  const [location_, setLocation] = useState('')
  const [visibility, setVisibility] = useState('friends')
  const [maxAttendees, setMaxAttendees] = useState(10)
  const [selectedFriends, setSelectedFriends] = useState([])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showStudyBuddyPreview, setShowStudyBuddyPreview] = useState(false)
  
  const moodTemplateConfig = MOODS[selectedMood]
  const suggestedFriends = users.filter(u => currentUser.friends.includes(u.id))
  const isLastStep = step === steps.length - 1
  
  // D) Fix keyboard overlap on mobile
  useEffect(() => {
    const onFocus = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        setTimeout(() => {
          e.target.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);
      }
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, []);
  
  const handleEventTypeSelect = (type) => { 
    setEventType(type.id); 
    setSelectedMood(type.mood); 
    setCurrentMood(type.mood); 
    if (type.id === 'studybuddy') { 
      setMainCategory('career'); 
      setTitle('Study Session'); 
      setDescription('Group study or tutoring session') 
    }
    setStep(1) 
  }
  
  const toggleFriend = (friendId) => { 
    setSelectedFriends(prev => prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId]) 
  }
  
  const validate = () => { 
    const newErrors = {}; 
    if (!title.trim()) newErrors.title = 'Title is required'; 
    if (!selectedMood) newErrors.mood = 'Please select a vibe'; 
    if (!selectedTime) newErrors.time = 'Please select a time'; 
    setErrors(newErrors); 
    if (newErrors.title) formRef.current?.querySelector('input[name="title"]')?.focus(); 
    return Object.keys(newErrors).length === 0 
  }
  
  // C) Fix the final step button so it actually works
  const handleSubmit = async () => { 
    if (!validate()) return; 
    setIsSubmitting(true); 
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    console.log('Hangout created!', { 
      title, 
      description, 
      mood: selectedMood, 
      eventType, 
      mainCategory, 
      time: selectedTime, 
      location: location_, 
      visibility, 
      maxAttendees, 
      invitedFriends: selectedFriends 
    }); 
    setShowSuccess(true); 
    setTimeout(() => navigate('/home'), 1500) 
  }
  
  const handleContinue = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  }
  
  const handleBack = () => { 
    if (step > 0) setStep(step - 1); 
    else navigate(-1) 
  }
  
  if (showSuccess) return (
    <div className={`min-h-screen-safe ${moodTemplateConfig.mesh} bg-dark flex items-center justify-center p-4`}>
      <div className="text-center animate-slide-up">
        <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${moodTemplateConfig.gradient} ${moodTemplateConfig.shadow} flex items-center justify-center`}>
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">Event Created!</h2>
        <p className="text-white/60">Your hangout is ready</p>
      </div>
    </div>
  )
  
  return (
    <div className={`min-h-screen-safe ${moodTemplateConfig.mesh} bg-dark flex flex-col`}>
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-white/10 flex-shrink-0 safe-top">
        <div className="flex items-center justify-between h-14 px-4">
          <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className={`w-8 h-1 rounded-full transition-all ${i <= step ? moodTemplateConfig.gradient : 'bg-white/20'}`} />
            ))}
          </div>
          <button onClick={() => navigate('/home')} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </header>
      
      {/* A) Make the content scrollable */}
      <div 
        ref={formRef}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)"
        }}
      >
        <main className="px-4 py-6 max-w-2xl mx-auto w-full">
          {step === 0 && (
            <div className="animate-fade-in space-y-6">
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">What are you planning?</h1>
                <p className="text-white/60">Choose your event type</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {eventTypes.map((type) => { 
                  const typeMood = MOODS[type.mood]; 
                  return (
                    <button 
                      key={type.id} 
                      onClick={() => handleEventTypeSelect(type)} 
                      className={`relative p-5 rounded-2xl text-left transition-all active:scale-[0.98] ${type.special ? `${typeMood.gradient} ${typeMood.shadow}` : 'glass hover:bg-white/10'}`}
                    >
                      {type.special && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/20 text-xs text-white font-medium">
                          <Zap className="w-3 h-3 inline mr-1" />New
                        </div>
                      )}
                      <span className="text-3xl mb-2 block">{type.emoji}</span>
                      <h3 className="text-lg font-bold text-white mb-1">{type.label}</h3>
                      <p className="text-xs text-white/70">{type.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <div className="text-center">
                <span className="text-4xl mb-3 block">{eventTypes.find(t => t.id === eventType)?.emoji}</span>
                <h1 className="text-2xl font-display font-bold text-white mb-2">Customize Your Event</h1>
              </div>
              {eventType === 'studybuddy' && (
                <GlassCard mood="focus" glow className="relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-8 h-8 text-focus" />
                      <div>
                        <p className="font-semibold text-white">Find Study Buddies</p>
                        <p className="text-xs text-white/60">Match with students in your field</p>
                      </div>
                    </div>
                    <button onClick={() => setShowStudyBuddyPreview(true)} className="px-3 py-2 rounded-xl bg-focus text-white text-sm font-medium hover:brightness-110 transition-all active:scale-95">
                      Preview
                    </button>
                  </div>
                </GlassCard>
              )}
              <div>
                <label className="block text-sm text-white/60 mb-3">Category</label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button 
                    onClick={() => setMainCategory(mainCategory === 'career' ? null : 'career')} 
                    className={`p-4 rounded-xl text-left transition-all active:scale-[0.98] ${mainCategory === 'career' ? 'bg-gradient-focus shadow-neon-focus ring-2 ring-white/30' : 'glass hover:bg-white/10'}`}
                  >
                    <span className="text-2xl mb-2 block">💼</span>
                    <h4 className="font-semibold text-white">Career</h4>
                    <p className="text-xs text-white/60">Study, Hackathons</p>
                  </button>
                  <button 
                    onClick={() => setMainCategory(mainCategory === 'fun' ? null : 'fun')} 
                    className={`p-4 rounded-xl text-left transition-all active:scale-[0.98] ${mainCategory === 'fun' ? 'bg-gradient-party shadow-neon-party ring-2 ring-white/30' : 'glass hover:bg-white/10'}`}
                  >
                    <span className="text-2xl mb-2 block">🎉</span>
                    <h4 className="font-semibold text-white">Fun</h4>
                    <p className="text-xs text-white/60">Parties, Gaming</p>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-3">Vibe</label>
                <div className="grid grid-cols-5 gap-2">
                  {Object.values(MOODS).map((mood) => (
                    <button 
                      key={mood.id} 
                      onClick={() => setSelectedMood(mood.id)} 
                      className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all active:scale-95 ${selectedMood === mood.id ? `${mood.gradient} ${mood.shadow}` : 'glass hover:bg-white/10'}`}
                    >
                      <span className="text-xl">{mood.emoji}</span>
                      <span className="text-xs text-white/80">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="animate-fade-in space-y-5">
              <div className="text-center">
                <span className="text-4xl mb-3 block">{moodTemplateConfig.emoji}</span>
                <h1 className="text-2xl font-display font-bold text-white mb-2">Event Details</h1>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Event Title *</label>
                <input 
                  name="title" 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder={`${moodTemplateConfig.emoji} ${moodTemplateConfig.label} hangout...`} 
                  className={`input ${errors.title ? 'border-red-400' : ''}`} 
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{errors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Tell people what to expect..." 
                  rows={3} 
                  className="input resize-none" 
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">When? *</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeOptions.map((time) => (
                    <button 
                      key={time.id} 
                      onClick={() => setSelectedTime(time.id)} 
                      className={`p-3 rounded-xl text-center transition-all active:scale-95 ${selectedTime === time.id ? `${moodTemplateConfig.gradient} ${moodTemplateConfig.shadow}` : 'glass hover:bg-white/10'}`}
                    >
                      <span className="text-xl block mb-1">{time.icon}</span>
                      <p className="text-sm font-medium text-white">{time.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input 
                    type="text" 
                    value={location_} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="Add a location..." 
                    className="input pl-12" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Max Attendees</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setMaxAttendees(Math.max(2, maxAttendees - 1))} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:bg-white/20">-</button>
                  <span className={`w-16 h-10 rounded-xl ${moodTemplateConfig.gradient} flex items-center justify-center font-bold text-white`}>{maxAttendees}</span>
                  <button onClick={() => setMaxAttendees(Math.min(100, maxAttendees + 1))} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:bg-white/20">+</button>
                  <span className="text-sm text-white/50">people</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Who can see this?</label>
                <div className="space-y-2">
                  {visibilityOptions.map((option) => { 
                    const Icon = option.icon; 
                    return (
                      <button 
                        key={option.id} 
                        onClick={() => setVisibility(option.id)} 
                        className={`w-full p-3 rounded-xl flex items-center gap-3 text-left transition-all active:scale-[0.98] ${visibility === option.id ? 'glass-heavy border-white/30' : 'glass hover:bg-white/10'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${visibility === option.id ? moodTemplateConfig.gradient : 'bg-white/10'}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white text-sm">{option.label}</p>
                          <p className="text-xs text-white/50">{option.description}</p>
                        </div>
                        {visibility === option.id && <Check className={`w-5 h-5 ${moodTemplateConfig.text}`} />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="animate-fade-in space-y-5">
              <div className="text-center">
                <span className="text-4xl mb-3 block">👥</span>
                <h1 className="text-2xl font-display font-bold text-white mb-2">Invite Friends</h1>
              </div>
              <GlassCard mood={selectedMood} glow>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl ${moodTemplateConfig.gradient} flex items-center justify-center`}>
                    <span className="text-2xl">{moodTemplateConfig.emoji}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">{title || `${moodTemplateConfig.label} hangout`}</p>
                    <p className="text-sm text-white/60">
                      {timeOptions.find(t => t.id === selectedTime)?.label} • {visibilityOptions.find(v => v.id === visibility)?.label}
                      {location_ && ` • ${location_}`}
                    </p>
                  </div>
                </div>
              </GlassCard>
              <div>
                <h4 className="text-sm text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />Suggested friends
                </h4>
                <div className="space-y-2">
                  {suggestedFriends.map((friend) => { 
                    const isSelected = selectedFriends.includes(friend.id); 
                    return (
                      <button 
                        key={friend.id} 
                        onClick={() => toggleFriend(friend.id)} 
                        className={`w-full p-3 rounded-xl flex items-center gap-3 text-left transition-all active:scale-[0.98] ${isSelected ? 'glass-heavy border-white/30' : 'glass hover:bg-white/10'}`}
                      >
                        <Avatar src={friend.avatar} name={friend.name} size="sm" mood={friend.currentMood} showMoodRing />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white text-sm">{friend.name}</p>
                          <p className="text-xs text-white/50">
                            {friend.currentMood === selectedMood ? `Also feeling ${moodTemplateConfig.label}!` : `Feeling ${MOODS[friend.currentMood].label}`}
                          </p>
                        </div>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? moodTemplateConfig.gradient : 'bg-white/10'}`}>
                          {isSelected ? <Check className="w-5 h-5 text-white" /> : <span className="text-white/50">+</span>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* B) Make the footer fixed at bottom (BottomNav is hidden on this page) */}
      <footer 
        className="fixed bottom-0 left-0 right-0 p-4 border-t border-white/10"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
          background: "rgba(13,13,18,0.98)",
          backdropFilter: "blur(16px)",
          zIndex: 50
        }}
      >
        <div className="max-w-2xl mx-auto">
          {step < 3 ? (
            <Button mood={selectedMood} fullWidth size="lg" onClick={handleContinue}>
              Continue<ChevronRight className="w-5 h-5" />
            </Button>
          ) : (
            <>
              <Button mood={selectedMood} fullWidth size="lg" onClick={handleContinue} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Create Hangout
                  </>
                )}
              </Button>
              <button onClick={handleSubmit} className="w-full mt-3 py-2 text-white/50 hover:text-white transition-colors text-sm">
                Skip invitations for now
              </button>
            </>
          )}
        </div>
      </footer>
      
      {showStudyBuddyPreview && (
        <StudyBuddyPreview 
          onClose={() => setShowStudyBuddyPreview(false)} 
          onFindMore={() => { setShowStudyBuddyPreview(false); navigate('/career/studybuddy') }} 
        />
      )}
    </div>
  )
}

export default HangoutScreen
