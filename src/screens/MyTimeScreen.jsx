/**
 * MyTime Timeline Screen - Weekend includes Friday
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Plus, Sun, Sunrise, Moon } from 'lucide-react'
import { useMood, MOODS } from '../context/MoodContext'
import { Header } from '../components/layout'
import { GlassCard, SectionHeader, Button, EventCard } from '../components/ui'
import { users, events } from '../data/mockData'

const timeTabs = [
  { id: 'today', label: 'Today', icon: Sun },
  { id: 'tomorrow', label: 'Tomorrow', icon: Sunrise },
  { id: 'weekend', label: 'Weekend', icon: Moon },
]

const timelineSlots = {
  today: [
    { id: 't1', time: '9:00 AM', label: 'Morning', isFree: false, event: 'Class' },
    { id: 't2', time: '12:00 PM', label: 'Noon', isFree: true },
    { id: 't3', time: '3:00 PM', label: 'Afternoon', isFree: false, event: 'Work' },
    { id: 't4', time: '6:00 PM', label: 'Evening', isFree: true },
    { id: 't5', time: '9:00 PM', label: 'Night', isFree: true },
  ],
  tomorrow: [
    { id: 'tm1', time: '9:00 AM', label: 'Morning', isFree: true },
    { id: 'tm2', time: '12:00 PM', label: 'Noon', isFree: true },
    { id: 'tm3', time: '3:00 PM', label: 'Afternoon', isFree: false, event: 'Meeting' },
    { id: 'tm4', time: '6:00 PM', label: 'Evening', isFree: true },
    { id: 'tm5', time: '9:00 PM', label: 'Night', isFree: true },
  ],
  weekend: [
    { id: 'w-fri-eve', time: 'Friday Evening', label: 'Fri Eve', isFree: true, day: 'Friday' },
    { id: 'w-fri-night', time: 'Friday Night', label: 'Fri Night', isFree: true, day: 'Friday' },
    { id: 'w-sat-am', time: 'Saturday Morning', label: 'Sat AM', isFree: true, day: 'Saturday' },
    { id: 'w-sat-pm', time: 'Saturday Afternoon', label: 'Sat PM', isFree: true, day: 'Saturday' },
    { id: 'w-sat-night', time: 'Saturday Night', label: 'Sat Night', isFree: true, day: 'Saturday' },
    { id: 'w-sun-am', time: 'Sunday Morning', label: 'Sun AM', isFree: false, event: 'Brunch', day: 'Sunday' },
    { id: 'w-sun-pm', time: 'Sunday Afternoon', label: 'Sun PM', isFree: true, day: 'Sunday' },
  ],
}

function MyTimeScreen() {
  const navigate = useNavigate()
  const { currentMood, moodConfig } = useMood()
  const [activeTab, setActiveTab] = useState('today')
  
  const currentSlots = timelineSlots[activeTab] || []
  const freeSlots = currentSlots.filter(s => s.isFree).length
  
  const weekendByDay = activeTab === 'weekend' 
    ? currentSlots.reduce((acc, slot) => {
        const day = slot.day || 'Other'
        if (!acc[day]) acc[day] = []
        acc[day].push(slot)
        return acc
      }, {})
    : null
  
  return (
    <div className={`min-h-screen-safe ${moodConfig.mesh} bg-dark`}>
      <Header />
      
      <main className="container-app py-4 sm:py-6" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 96px)' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">MyTime ⏰</h1>
            <p className="text-white/60 text-sm mt-1">Plan your time, find moments</p>
          </div>
          <div className="px-3 py-1.5 rounded-xl glass">
            <span className={`font-semibold ${moodConfig.text}`}>{freeSlots}</span>
            <span className="text-white/60 text-sm"> / {currentSlots.length} free</span>
          </div>
        </div>
        
        <div className="flex gap-2 sm:gap-3 mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {timeTabs.map((tab) => {
            const Icon = tab.icon
            const tabSlots = timelineSlots[tab.id] || []
            const tabFreeSlots = tabSlots.filter(s => s.isFree).length
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl font-medium transition-all flex-1 max-w-[180px]
                  ${activeTab === tab.id ? `${moodConfig.gradient} text-white ${moodConfig.shadow}` : 'glass text-white/70 hover:text-white'}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-sm">{tab.label}</p>
                  <p className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-white/50'}`}>
                    {tabFreeSlots} free{tab.id === 'weekend' && ' (Fri-Sun)'}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            {activeTab === 'weekend' && weekendByDay ? (
              Object.entries(weekendByDay).map(([day, slots]) => (
                <div key={day} className="space-y-3">
                  <h3 className={`font-display font-semibold text-lg ${moodConfig.text} flex items-center gap-2`}>
                    {day === 'Friday' && '🎉'}{day === 'Saturday' && '✨'}{day === 'Sunday' && '☀️'}{day}
                  </h3>
                  {slots.map((slot, index) => (
                    <div key={slot.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                      {slot.isFree ? (
                        <button onClick={() => navigate('/hangout')} className="w-full p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-white/40 flex items-center justify-between min-h-[80px] transition-all active:scale-[0.98]">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl ${moodConfig.gradient} flex items-center justify-center`}><Plus className="w-6 h-6 text-white" /></div>
                            <div className="text-left"><p className="font-medium text-white">{slot.time}</p><p className="text-sm text-white/50">{slot.label} • Free</p></div>
                          </div>
                          <span className="px-4 py-2 rounded-lg bg-white/10 text-sm text-white/60">Plan</span>
                        </button>
                      ) : (
                        <GlassCard padding="sm" className="flex items-center gap-4 min-h-[80px]">
                          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"><Clock className="w-6 h-6 text-white/50" /></div>
                          <div className="flex-1"><p className="font-medium text-white">{slot.time}</p><p className="text-sm text-white/50">{slot.label}</p></div>
                          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-white/70">{slot.event}</div>
                        </GlassCard>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              currentSlots.map((slot, index) => (
                <div key={slot.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  {slot.isFree ? (
                    <button onClick={() => navigate('/hangout')} className="w-full p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-white/40 flex items-center justify-between min-h-[80px] transition-all active:scale-[0.98]">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${moodConfig.gradient} flex items-center justify-center`}><Plus className="w-6 h-6 text-white" /></div>
                        <div className="text-left"><p className="font-medium text-white">{slot.time}</p><p className="text-sm text-white/50">{slot.label} • Free</p></div>
                      </div>
                      <span className="px-4 py-2 rounded-lg bg-white/10 text-sm text-white/60">Plan</span>
                    </button>
                  ) : (
                    <GlassCard padding="sm" className="flex items-center gap-4 min-h-[80px]">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"><Clock className="w-6 h-6 text-white/50" /></div>
                      <div className="flex-1"><p className="font-medium text-white">{slot.time}</p><p className="text-sm text-white/50">{slot.label}</p></div>
                      <div className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-white/70">{slot.event}</div>
                    </GlassCard>
                  )}
                </div>
              ))
            )}
          </div>
          
          <aside className="lg:col-span-5 space-y-4">
            <GlassCard>
              <SectionHeader title="Suggested Events" icon={Calendar} mood={currentMood} />
              <div className="space-y-3">
                {events.slice(0, 3).map((event) => (
                  <EventCard key={event.id} event={event} users={users} variant="compact" />
                ))}
              </div>
            </GlassCard>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default MyTimeScreen


