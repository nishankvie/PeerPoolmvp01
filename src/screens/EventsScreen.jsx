/**
 * Events Screen
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Users, Building2, Plus } from 'lucide-react'
import { useMood, MOODS } from '../context/MoodContext'
import { Header } from '../components/layout'
import { GlassCard, SectionHeader, Button, EventCard, MoodBadge } from '../components/ui'
import { users, events, currentUser } from '../data/mockData'

const filterTabs = [
  { id: 'all', label: 'All', icon: Calendar },
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'public', label: 'Public', icon: Building2 },
]

function EventsScreen() {
  const navigate = useNavigate()
  const { currentMood, moodConfig } = useMood()
  const [activeFilter, setActiveFilter] = useState('all')
  
  const groupedEvents = {
    today: events.filter(e => e.date === 'today'),
    tomorrow: events.filter(e => e.date === 'tomorrow'),
    weekend: events.filter(e => e.date === 'weekend'),
  }
  
  const filterEvents = (eventsList) => {
    if (activeFilter === 'friends') return eventsList.filter(e => e.attendees.some(id => currentUser.friends.includes(id)))
    if (activeFilter === 'public') return eventsList.filter(e => e.isPublic)
    return eventsList
  }
  
  const sortByMood = (eventsList) => [...eventsList].sort((a, b) => {
    if (a.mood === currentMood && b.mood !== currentMood) return -1
    if (b.mood === currentMood && a.mood !== currentMood) return 1
    return 0
  })
  
  return (
    <div className={`min-h-screen-safe ${moodConfig.mesh} bg-dark`}>
      <Header />
      
      <main className="container-app py-4 sm:py-6" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 96px)' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Upcoming Events</h1>
            <p className="text-white/60 text-sm mt-1">Discover what's happening</p>
          </div>
          <Button mood={currentMood} onClick={() => navigate('/hangout')} className="hidden sm:flex">
            <Plus className="w-4 h-4" />Create
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {filterTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
                  ${activeFilter === tab.id ? `${moodConfig.gradient} text-white ${moodConfig.shadow}` : 'glass text-white/70 hover:text-white'}`}
              >
                <Icon className="w-4 h-4" />{tab.label}
              </button>
            )
          })}
          
          <div className="flex items-center gap-1.5 ml-auto">
            {Object.values(MOODS).map((mood) => (
              <button
                key={mood.id}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${mood.id === currentMood ? mood.gradient : 'bg-white/10'}`}
              >
                <span>{mood.emoji}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          {['today', 'tomorrow', 'weekend'].map((timeframe) => {
            const timeEvents = sortByMood(filterEvents(groupedEvents[timeframe]))
            if (timeEvents.length === 0) return null
            
            return (
              <section key={timeframe}>
                <SectionHeader
                  title={timeframe === 'today' ? 'Today' : timeframe === 'tomorrow' ? 'Tomorrow' : 'This Weekend (Fri-Sun)'}
                  subtitle={`${timeEvents.length} events`}
                  icon={Calendar}
                  mood={currentMood}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {timeEvents.map((event) => (
                    <EventCard key={event.id} event={event} users={users} onClick={() => console.log('View event:', event.id)} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default EventsScreen


