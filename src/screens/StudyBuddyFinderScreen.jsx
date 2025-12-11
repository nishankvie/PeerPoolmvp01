/**
 * StudyBuddyFinder Screen - 5-step funnel UI
 */
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Search, MapPin, GraduationCap, BookOpen, Clock, Users, Star, MessageCircle, UserPlus, ChevronRight, ToggleLeft, ToggleRight, Sliders, X, Check, Zap } from 'lucide-react'
import { useMood, MOODS } from '../context/MoodContext'
import { GlassCard, Button, Avatar } from '../components/ui'
import { universities, subjects, studyStyles, studyBuddyUsers, estimatedCounts, cities } from '../data/studyBuddyMock'

function FunnelStep({ step, currentStep, label, value, onClick }) {
  const { moodConfig } = useMood()
  const isActive = currentStep === step
  const isPast = currentStep > step
  return <button onClick={onClick} className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive ? `${moodConfig.gradient} text-white ${moodConfig.shadow}` : ''} ${isPast ? 'bg-white/20 text-white' : ''} ${!isActive && !isPast ? 'bg-white/5 text-white/50' : ''}`}>{isPast && value ? value : label}</button>
}

function StudyBuddyCard({ user, onMessage, onAdd }) {
  const { moodConfig } = useMood()
  const uni = universities.find(u => u.id === user.university)
  const subj = subjects.find(s => s.id === user.subject)
  const style = studyStyles.find(s => s.id === user.studyStyle)
  return (
    <GlassCard hover className="overflow-hidden">
      <div className="flex gap-3 sm:gap-4">
        <div className="relative flex-shrink-0"><img src={user.avatar} alt={user.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover ring-2 ring-focus/50" /><div className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-focus text-white text-xs font-bold">{user.matchScore}%</div></div>
        <div className="flex-1 min-w-0"><div className="flex items-start justify-between gap-2 mb-1"><div><h4 className="font-semibold text-white">{user.name}</h4><p className="text-xs text-white/50">{user.username}</p></div><div className="flex items-center gap-1 text-xs text-yellow-400"><Star className="w-3 h-3 fill-current" />{user.rating}</div></div><div className="flex flex-wrap gap-1 mb-2"><span className="px-2 py-0.5 rounded-full bg-focus/20 text-focus text-xs">{subj?.name}</span><span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-xs">{user.course}</span><span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-xs">{style?.emoji} {style?.label}</span></div><div className="flex items-center gap-3 text-xs text-white/50 mb-2"><span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{uni?.name}</span><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{user.distance}km</span></div><div className="flex items-center gap-3 text-xs text-white/50"><span className="flex items-center gap-1"><Users className="w-3 h-3" />{user.mutualFriends} mutual</span><span>{user.studySessions} sessions</span></div></div>
      </div>
      <p className="text-sm text-white/70 mt-3 line-clamp-2">{user.bio}</p>
      <div className="flex gap-2 mt-3">{user.availability.today && <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs">Today</span>}{user.availability.tomorrow && <span className="px-2 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs">Tomorrow</span>}{user.availability.weekend && <span className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-xs">Weekend</span>}</div>
      <div className="flex gap-2 mt-4"><button onClick={() => onMessage(user)} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl ${moodConfig.gradient} text-white ${moodConfig.shadow} font-semibold text-sm transition-all active:scale-95`}><MessageCircle className="w-4 h-4" />Message</button><button onClick={() => onAdd(user)} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"><UserPlus className="w-5 h-5" /></button></div>
    </GlassCard>
  )
}

function StudyBuddyFinderScreen() {
  const navigate = useNavigate()
  const { moodConfig, setCurrentMood } = useMood()
  
  useEffect(() => { setCurrentMood('focus') }, [])
  
  const [step, setStep] = useState(1)
  const [subject, setSubject] = useState(null)
  const [city, setCity] = useState('vienna')
  const [university, setUniversity] = useState(null)
  const [availability, setAvailability] = useState({ today: false, tomorrow: false, weekend: false })
  const [studyStyle, setStudyStyle] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [autoMatch, setAutoMatch] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState([])
  
  const getEstimatedCount = () => { let count = estimatedCounts[city] || 100000; if (university) count = Math.min(count, estimatedCounts[university] || 10000); if (subject) count = Math.min(count, estimatedCounts[subject] || 5000); return count }
  const filteredSubjects = subjects.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase()))
  const cityUniversities = universities.filter(u => u.city.toLowerCase() === (cities.find(c => c.id === city)?.name.toLowerCase() || 'vienna'))
  
  const runMatches = () => { let matches = [...studyBuddyUsers]; if (subject) matches = matches.filter(u => u.subject === subject); if (university) matches = matches.filter(u => u.university === university); if (availability.today) matches = matches.filter(u => u.availability.today); matches.sort((a, b) => b.matchScore - a.matchScore); if (matches.length === 0) matches = studyBuddyUsers.slice(0, 4); setResults(matches); setShowResults(true) }
  const handleMessage = (user) => { navigate(`/chat/${user.id}`, { state: { prefillMessage: `Hey ${user.name}! I'm looking for a study buddy for ${subjects.find(s => s.id === subject)?.name || 'our course'}. Want to study together?` }}) }
  const handleAdd = (user) => { console.log('Add study buddy:', user.name) }
  const handleInputFocus = (e) => { setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300) }
  
  return (
    <div className="min-h-screen-safe bg-mesh-focus bg-dark flex flex-col">
      <header className="glass sticky top-0 z-40 border-b border-white/10 flex-shrink-0 safe-top"><div className="container-app"><div className="flex items-center h-14"><button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl mr-3 transition-colors"><ArrowLeft className="w-5 h-5 text-white" /></button><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-focus shadow-neon-focus flex items-center justify-center"><GraduationCap className="w-5 h-5 text-white" /></div><div><h1 className="font-display font-bold text-white">Study Buddy Finder</h1><p className="text-xs text-white/60">Find your perfect study partner</p></div></div></div></div></header>
      
      {!showResults && <div className="glass border-b border-white/10 overflow-x-auto scrollbar-hide"><div className="container-app py-2 flex items-center gap-2 min-w-max"><FunnelStep step={1} currentStep={step} label="Subject" value={subjects.find(s=>s.id===subject)?.name} onClick={() => setStep(1)} /><ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" /><FunnelStep step={2} currentStep={step} label="Location" value={city ? cities.find(c=>c.id===city)?.name : null} onClick={() => setStep(2)} /><ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" /><FunnelStep step={3} currentStep={step} label="University" value={universities.find(u=>u.id===university)?.name} onClick={() => setStep(3)} /><ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" /><FunnelStep step={4} currentStep={step} label="When" value={Object.entries(availability).filter(([k,v])=>v).map(([k])=>k).join(', ')} onClick={() => setStep(4)} /><ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" /><FunnelStep step={5} currentStep={step} label="Style" value={studyStyles.find(s=>s.id===studyStyle)?.label} onClick={() => setStep(5)} /></div></div>}
      
      {!showResults && <div className="container-app py-2 text-center"><p className="text-sm text-white/60"><span className={`font-bold ${moodConfig.text}`}>~{getEstimatedCount().toLocaleString()}</span> potential matches</p></div>}
      
      <main className="flex-1 container-app py-4 overflow-y-auto" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 120px)' }}>
        {!showResults && step === 1 && <div className="animate-fade-in space-y-4"><div className="text-center mb-6"><h2 className="text-xl font-display font-bold text-white mb-2">What are you studying?</h2><p className="text-sm text-white/60">Select your subject or course</p></div><div className="relative mb-4"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={handleInputFocus} placeholder="Search subjects..." className="input pl-12" /></div><div className="grid grid-cols-2 gap-2">{filteredSubjects.map((subj) => <button key={subj.id} onClick={() => { setSubject(subj.id); setStep(2) }} className={`p-4 rounded-xl text-left transition-all active:scale-95 ${subject === subj.id ? `${moodConfig.gradient} ${moodConfig.shadow}` : 'glass hover:bg-white/10'}`}><p className="font-semibold text-white text-sm">{subj.name}</p><p className="text-xs text-white/50">{subj.category}</p></button>)}</div></div>}
        
        {!showResults && step === 2 && <div className="animate-fade-in space-y-4"><div className="text-center mb-6"><h2 className="text-xl font-display font-bold text-white mb-2">Where are you located?</h2><p className="text-sm text-white/60">Select your city</p></div><div className="space-y-2">{cities.map((c) => <button key={c.id} onClick={() => { setCity(c.id); setStep(3) }} className={`w-full p-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] ${city === c.id ? `${moodConfig.gradient} ${moodConfig.shadow}` : 'glass hover:bg-white/10'}`}><div className="flex items-center gap-3"><MapPin className="w-5 h-5" /><div className="text-left"><p className="font-semibold text-white">{c.name}</p><p className="text-xs text-white/60">{c.studentPopulation.toLocaleString()} students</p></div></div>{city === c.id && <Check className="w-5 h-5 text-white" />}</button>)}</div></div>}
        
        {!showResults && step === 3 && <div className="animate-fade-in space-y-4"><div className="text-center mb-6"><h2 className="text-xl font-display font-bold text-white mb-2">Your University</h2><p className="text-sm text-white/60">Optional - select your university</p></div><div className="space-y-2"><button onClick={() => { setUniversity(null); setStep(4) }} className="w-full p-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] glass hover:bg-white/10"><span className="text-white/70">Skip - All Universities</span><ChevronRight className="w-5 h-5 text-white/30" /></button>{cityUniversities.map((uni) => <button key={uni.id} onClick={() => { setUniversity(uni.id); setStep(4) }} className={`w-full p-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] ${university === uni.id ? `${moodConfig.gradient} ${moodConfig.shadow}` : 'glass hover:bg-white/10'}`}><div className="flex items-center gap-3"><GraduationCap className="w-5 h-5" /><div className="text-left"><p className="font-semibold text-white">{uni.name}</p><p className="text-xs text-white/60">{uni.studentCount.toLocaleString()} students</p></div></div>{university === uni.id && <Check className="w-5 h-5 text-white" />}</button>)}</div></div>}
        
        {!showResults && step === 4 && <div className="animate-fade-in space-y-4"><div className="text-center mb-6"><h2 className="text-xl font-display font-bold text-white mb-2">When are you free?</h2><p className="text-sm text-white/60">Select your availability</p></div><div className="space-y-3">{[{ key: 'today', label: 'Today', icon: '📅' }, { key: 'tomorrow', label: 'Tomorrow', icon: '🌅' }, { key: 'weekend', label: 'Weekend (Fri-Sun)', icon: '🎉' }].map((option) => <button key={option.key} onClick={() => setAvailability(prev => ({ ...prev, [option.key]: !prev[option.key] }))} className={`w-full p-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] ${availability[option.key] ? `${moodConfig.gradient} ${moodConfig.shadow}` : 'glass hover:bg-white/10'}`}><div className="flex items-center gap-3"><span className="text-xl">{option.icon}</span><span className="font-semibold text-white">{option.label}</span></div>{availability[option.key] && <Check className="w-5 h-5 text-white" />}</button>)}</div></div>}
        
        {!showResults && step === 5 && <div className="animate-fade-in space-y-4"><div className="text-center mb-6"><h2 className="text-xl font-display font-bold text-white mb-2">Study Style</h2><p className="text-sm text-white/60">How do you prefer to study?</p></div><div className="space-y-2">{studyStyles.map((style) => <button key={style.id} onClick={() => setStudyStyle(style.id)} className={`w-full p-4 rounded-xl flex items-center gap-4 text-left transition-all active:scale-[0.98] ${studyStyle === style.id ? `${moodConfig.gradient} ${moodConfig.shadow}` : 'glass hover:bg-white/10'}`}><span className="text-2xl">{style.emoji}</span><div><p className="font-semibold text-white">{style.label}</p><p className="text-xs text-white/60">{style.description}</p></div></button>)}</div><div className="mt-6 p-4 rounded-xl glass flex items-center justify-between"><div className="flex items-center gap-3"><Zap className="w-5 h-5 text-yellow-400" /><div><p className="font-semibold text-white text-sm">Auto-match</p><p className="text-xs text-white/60">Get notified of new matches</p></div></div><button onClick={() => setAutoMatch(!autoMatch)} className={`p-1 rounded-full transition-colors ${autoMatch ? 'bg-focus' : 'bg-white/20'}`}>{autoMatch ? <ToggleRight className="w-8 h-8 text-white" /> : <ToggleLeft className="w-8 h-8 text-white/50" />}</button></div></div>}
        
        {showResults && <div className="animate-fade-in space-y-4"><div className="flex items-center justify-between mb-4"><div><h2 className="text-xl font-display font-bold text-white">Your Matches</h2><p className="text-sm text-white/60">{results.length} study buddies found</p></div><button onClick={() => setShowResults(false)} className="px-3 py-1.5 rounded-lg glass text-sm text-white/70"><Sliders className="w-4 h-4 inline mr-1" />Refine</button></div><div className="space-y-4">{results.map((user) => <StudyBuddyCard key={user.id} user={user} onMessage={handleMessage} onAdd={handleAdd} />)}</div>{results.length === 0 && <div className="text-center py-12"><GraduationCap className="w-12 h-12 text-white/20 mx-auto mb-3" /><p className="text-white/50">No exact matches found. Try adjusting your filters.</p></div>}</div>}
      </main>
      
      {!showResults && <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 z-40" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}><div className="container-app p-4 flex gap-3">{step > 1 && <button onClick={() => setStep(step - 1)} className="p-3 rounded-xl glass text-white/70 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></button>}{step < 5 ? <Button mood="focus" fullWidth size="lg" onClick={() => setStep(step + 1)}>Continue <ArrowRight className="w-5 h-5" /></Button> : <Button mood="focus" fullWidth size="lg" onClick={runMatches}><Search className="w-5 h-5" /> Find Matches</Button>}</div></div>}
    </div>
  )
}

export default StudyBuddyFinderScreen


