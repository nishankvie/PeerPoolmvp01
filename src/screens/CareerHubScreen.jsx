/**
 * CareerHub Screen
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Video, BookOpen, Users, Briefcase, Calendar, ChevronRight, Sparkles, GraduationCap } from 'lucide-react'
import { useMood, MOODS } from '../context/MoodContext'
import { Header } from '../components/layout'
import { GlassCard, SectionHeader, Button, Avatar } from '../components/ui'
import { PostCard } from '../components/feed'
import { careerEvents, careerPosts, careerCategories } from '../data/careerOnlyMock'
import { users } from '../data/mockData'

const categoryIcons = { hackathon: Trophy, workshop: BookOpen, webinar: Video, studybuddy: GraduationCap }

function CareerEventCard({ event, onClick }) {
  const moodConfig = MOODS[event.mood]
  const Icon = categoryIcons[event.category] || Calendar
  return (
    <button onClick={onClick} className="w-full glass rounded-2xl overflow-hidden text-left hover:bg-white/10 transition-all active:scale-[0.98]">
      <div className="relative h-32 sm:h-40"><img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" /><div className={`absolute top-3 left-3 px-2 py-1 rounded-lg ${moodConfig.badge} text-xs font-medium flex items-center gap-1`}><Icon className="w-3 h-3" />{event.category}</div>{event.price && <div className="absolute top-3 right-3 px-2 py-1 bg-dark/80 backdrop-blur rounded-lg text-xs text-white">{event.price}</div>}</div>
      <div className="p-4"><h3 className="font-display font-semibold text-white text-lg mb-1 truncate">{event.title}</h3><p className="text-sm text-white/60 mb-2 line-clamp-1">{event.description}</p><div className="flex items-center justify-between"><div className="text-xs text-white/50"><span className="capitalize">{event.date}</span> • {event.time}</div><div className="text-xs text-white/50">{event.attendeeCount} attending</div></div>{event.prizes && <div className="mt-2 px-2 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 text-xs font-medium inline-flex items-center gap-1">🏆 {event.prizes}</div>}</div>
    </button>
  )
}

function CareerHubScreen() {
  const navigate = useNavigate()
  const { moodConfig, setCurrentMood } = useMood()
  const [activeCategory, setActiveCategory] = useState('all')
  
  useEffect(() => { setCurrentMood('focus') }, [])
  
  const filteredEvents = activeCategory === 'all' ? careerEvents : careerEvents.filter(e => e.category === activeCategory)
  const filteredPosts = activeCategory === 'all' ? careerPosts : careerPosts.filter(p => p.category === activeCategory)
  
  return (
    <div className="min-h-screen-safe bg-mesh-focus bg-dark">
      <Header />
      <main className="container-app py-4 sm:py-6" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 96px)' }}>
        <div className="glass rounded-2xl p-4 sm:p-6 mb-6 bg-gradient-to-br from-focus/20 to-chill/10">
          <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl bg-gradient-focus shadow-neon-focus flex items-center justify-center"><Briefcase className="w-6 h-6 text-white" /></div><div><h1 className="text-2xl font-display font-bold text-white">Career Hub</h1><p className="text-sm text-white/60">Hackathons, Workshops & Networking</p></div></div></div>
          <button onClick={() => navigate('/career/studybuddy')} className="w-full p-4 rounded-xl bg-gradient-to-r from-focus to-chill text-white flex items-center justify-between hover:brightness-110 transition-all active:scale-[0.98]"><div className="flex items-center gap-3"><GraduationCap className="w-8 h-8" /><div className="text-left"><p className="font-semibold">Find a Study Buddy</p><p className="text-sm text-white/80">Match with students in your field</p></div></div><ChevronRight className="w-6 h-6" /></button>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <button onClick={() => setActiveCategory('all')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeCategory === 'all' ? 'bg-gradient-focus text-white shadow-neon-focus' : 'glass text-white/70 hover:text-white'}`}><Sparkles className="w-4 h-4" />All</button>
          {careerCategories.map((cat) => { const Icon = categoryIcons[cat.id] || Calendar; return <button key={cat.id} onClick={() => cat.id === 'studybuddy' ? navigate('/career/studybuddy') : setActiveCategory(cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-gradient-focus text-white shadow-neon-focus' : 'glass text-white/70 hover:text-white'}`}><Icon className="w-4 h-4" />{cat.label}<span className="text-xs opacity-60">({cat.id === 'studybuddy' ? '→' : cat.count})</span></button> })}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button onClick={() => navigate('/career/hackathons')} className="p-4 rounded-xl glass hover:bg-white/10 text-center transition-all active:scale-95"><Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" /><span className="text-sm text-white">Hackathons</span></button>
          <button onClick={() => navigate('/career/workshops')} className="p-4 rounded-xl glass hover:bg-white/10 text-center transition-all active:scale-95"><BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-400" /><span className="text-sm text-white">Workshops</span></button>
          <button onClick={() => navigate('/career/webinars')} className="p-4 rounded-xl glass hover:bg-white/10 text-center transition-all active:scale-95"><Video className="w-8 h-8 mx-auto mb-2 text-purple-400" /><span className="text-sm text-white">Webinars</span></button>
        </div>
        <section className="mb-8"><SectionHeader title="Upcoming Events" subtitle={`${filteredEvents.length} events`} icon={Calendar} mood="focus" /><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{filteredEvents.slice(0, 4).map((event) => <CareerEventCard key={event.id} event={event} onClick={() => console.log('View event:', event.id)} />)}</div></section>
        <section><SectionHeader title="Career Memories" subtitle="What the community has been up to" icon={Users} mood="focus" /><div className="space-y-4 max-w-2xl mx-auto">{filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}</div></section>
      </main>
    </div>
  )
}

export default CareerHubScreen


