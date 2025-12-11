/**
 * Career Hackathons Screen
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Calendar, MapPin, Users, ArrowLeft, Clock } from 'lucide-react'
import { useMood } from '../context/MoodContext'
import { GlassCard } from '../components/ui'
import { careerEvents } from '../data/careerOnlyMock'

function CareerHackathonsScreen() {
  const navigate = useNavigate()
  const { moodConfig } = useMood()
  const [filter, setFilter] = useState('all')
  const hackathons = careerEvents.filter(e => e.category === 'hackathon')
  const filteredHackathons = filter === 'all' ? hackathons : hackathons.filter(h => h.date === filter)
  
  return (
    <div className="min-h-screen-safe bg-mesh-focus bg-dark">
      <header className="glass sticky top-0 z-40 border-b border-white/10 safe-top"><div className="container-app"><div className="flex items-center h-14 sm:h-16"><button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl mr-3 transition-colors"><ArrowLeft className="w-5 h-5 text-white" /></button><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"><Trophy className="w-5 h-5 text-white" /></div><div><h1 className="font-display font-bold text-white">Hackathons</h1><p className="text-xs text-white/60">{hackathons.length} upcoming events</p></div></div></div></div></header>
      <main className="container-app py-4 sm:py-6" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 96px)' }}>
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">{['all', 'today', 'tomorrow', 'weekend'].map((f) => <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all ${filter === f ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg' : 'glass text-white/70 hover:text-white'}`}>{f === 'all' ? 'All Hackathons' : f}</button>)}</div>
        <div className="space-y-4">{filteredHackathons.map((hackathon) => <GlassCard key={hackathon.id} hover className="overflow-hidden"><div className="flex gap-4"><img src={hackathon.image} alt={hackathon.title} className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover flex-shrink-0" loading="lazy" /><div className="flex-1 min-w-0 py-1"><div className="flex items-start justify-between gap-2 mb-2"><h3 className="font-display font-semibold text-white text-lg leading-tight">{hackathon.title}</h3>{hackathon.prizes && <span className="flex-shrink-0 px-2 py-0.5 rounded-lg bg-yellow-500/20 text-yellow-400 text-xs font-medium">🏆 {hackathon.prizes.split(' ')[0]}</span>}</div><p className="text-sm text-white/60 mb-2 line-clamp-1">{hackathon.description}</p><div className="flex flex-wrap gap-2 text-xs text-white/50"><span className="flex items-center gap-1"><Calendar className="w-3 h-3" /><span className="capitalize">{hackathon.date}</span></span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{hackathon.time}</span><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{hackathon.location}</span><span className="flex items-center gap-1"><Users className="w-3 h-3" />{hackathon.attendeeCount} attending</span></div><div className="flex gap-1.5 mt-2">{hackathon.skills?.slice(0, 3).map((skill) => <span key={skill} className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-white/70">{skill}</span>)}</div></div></div></GlassCard>)}{filteredHackathons.length === 0 && <div className="text-center py-12"><Trophy className="w-12 h-12 text-white/20 mx-auto mb-3" /><p className="text-white/50">No hackathons found for this filter</p></div>}</div>
      </main>
    </div>
  )
}

export default CareerHackathonsScreen


