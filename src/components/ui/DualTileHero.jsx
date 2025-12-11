/**
 * DualTileHero Component - Swipe-only behavior
 */
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Sparkles, Trophy, Video, BookOpen, Users, PartyPopper, Gamepad2, Coffee, Dumbbell, ExternalLink } from 'lucide-react'
import { useMood, MOODS } from '../../context/MoodContext'

const careerCategories = [
  { id: 'hackathons', label: 'Hackathons', emoji: '🏆', icon: Trophy, path: '/career/hackathons', color: 'focus' },
  { id: 'webinars', label: 'Webinars', emoji: '📺', icon: Video, path: '/career/webinars', color: 'focus' },
  { id: 'studybuddy', label: 'Study Buddy', emoji: '📚', icon: BookOpen, path: '/career/studybuddy', color: 'focus' },
  { id: 'networking', label: 'Networking', emoji: '🤝', icon: Users, path: '/events?mode=career', color: 'social' },
]

const funCategories = [
  { id: 'party', label: 'Parties', emoji: '🎉', icon: PartyPopper, path: '/events?vibe=party', color: 'party' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮', icon: Gamepad2, path: '/events?vibe=play', color: 'play' },
  { id: 'chill', label: 'Chill', emoji: '😌', icon: Coffee, path: '/events?vibe=chill', color: 'chill' },
  { id: 'fitness', label: 'Fitness', emoji: '💪', icon: Dumbbell, path: '/events?vibe=social', color: 'social' },
]

function SubVibeChip({ category, onSelect }) {
  const moodConfig = MOODS[category.color]
  return (
    <button onClick={() => onSelect(category)} className="flex-shrink-0 flex flex-col items-center gap-1.5 p-3 w-20 sm:w-24 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-95 group">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${moodConfig.gradient} flex items-center justify-center transition-transform group-hover:scale-110`}><span className="text-lg sm:text-xl">{category.emoji}</span></div>
      <span className="text-xs text-white/70 group-hover:text-white text-center leading-tight">{category.label}</span>
    </button>
  )
}

function SubVibeStrip({ categories, onSelect, onOpenHub, hubLabel }) {
  const scrollRef = useRef(null)
  const { moodConfig } = useMood()
  const scroll = (direction) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: direction * 100, behavior: 'smooth' }) }
  
  return (
    <div className="animate-slide-up">
      <div className="relative">
        <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-dark/80 backdrop-blur border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-dark transition-all"><ChevronLeft className="w-4 h-4" /></button>
        <div ref={scrollRef} className="flex gap-2 overflow-x-auto px-10 py-2 scrollbar-hide">{categories.map((cat) => <SubVibeChip key={cat.id} category={cat} onSelect={onSelect} />)}</div>
        <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-dark/80 backdrop-blur border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-dark transition-all"><ChevronRight className="w-4 h-4" /></button>
      </div>
      <div className="flex justify-center mt-2"><button onClick={onOpenHub} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs ${moodConfig.text} hover:bg-white/10 transition-all`}><ExternalLink className="w-3.5 h-3.5" />{hubLabel}</button></div>
    </div>
  )
}

function DualTileHero({ onVibeSelect, onCategorySelect }) {
  const navigate = useNavigate()
  const { setCurrentMood, moodConfig } = useMood()
  const [activeMode, setActiveMode] = useState(null)
  
  const handleTileClick = (mode) => { const newMode = activeMode === mode ? null : mode; setActiveMode(newMode); if (newMode) { setCurrentMood(mode === 'career' ? 'focus' : 'party'); onVibeSelect?.(mode) } }
  const handleCategorySelect = (category) => { setCurrentMood(category.color); onCategorySelect?.(category); navigate(category.path) }
  const handleOpenHub = (hub) => { navigate(hub === 'career' ? '/career' : '/events?mode=fun') }
  
  return (
    <section className="py-4 sm:py-6">
      <div className="flex items-center justify-center gap-2 mb-4"><Sparkles className={`w-5 h-5 ${moodConfig.text}`} /><h2 className="text-xl sm:text-2xl font-display font-bold text-white">Choose Your Vibe</h2><Sparkles className={`w-5 h-5 ${moodConfig.text}`} /></div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3">
        <button onClick={() => handleTileClick('career')} className={`relative overflow-hidden p-4 sm:p-6 rounded-2xl text-left bg-gradient-to-br from-focus via-focus-400 to-chill shadow-neon-focus transition-all duration-300 ${activeMode === 'career' ? 'scale-[1.02] ring-2 ring-white/40' : 'hover:scale-[1.01]'} active:scale-[0.98]`}>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-30"><ChevronLeft className="w-5 h-5 text-white animate-pulse" /></div>
          <div className="flex items-start justify-between mb-3"><span className="text-3xl sm:text-4xl">💼</span>{activeMode === 'career' && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}</div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-1">Career Mode</h3>
          <p className="text-xs sm:text-sm text-white/70">Hackathons, Study & Network</p>
        </button>
        <button onClick={() => handleTileClick('fun')} className={`relative overflow-hidden p-4 sm:p-6 rounded-2xl text-left bg-gradient-to-br from-party via-accent to-social shadow-neon-party transition-all duration-300 ${activeMode === 'fun' ? 'scale-[1.02] ring-2 ring-white/40' : 'hover:scale-[1.01]'} active:scale-[0.98]`}>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-30"><ChevronRight className="w-5 h-5 text-white animate-pulse" /></div>
          <div className="flex items-start justify-between mb-3"><span className="text-3xl sm:text-4xl">🎉</span>{activeMode === 'fun' && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}</div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-1">Fun Mode</h3>
          <p className="text-xs sm:text-sm text-white/70">Parties, Gaming & Chill</p>
        </button>
      </div>
      {activeMode === 'career' && <SubVibeStrip categories={careerCategories} onSelect={handleCategorySelect} onOpenHub={() => handleOpenHub('career')} hubLabel="Open Career Hub" />}
      {activeMode === 'fun' && <SubVibeStrip categories={funCategories} onSelect={handleCategorySelect} onOpenHub={() => handleOpenHub('fun')} hubLabel="Open Fun Hub" />}
    </section>
  )
}

export default DualTileHero


