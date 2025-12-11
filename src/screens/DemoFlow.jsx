/**
 * Demo Flow Screen
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Home, Calendar, Clock, Plus, MessageCircle, Briefcase } from 'lucide-react'
import { useMood } from '../context/MoodContext'
import { Button, GlassCard } from '../components/ui'

const demoSteps = [
  { id: 1, title: 'Home Feed', path: '/home', icon: Home, description: 'See friend memories, vibe selection, and recommendations' },
  { id: 2, title: 'Career Hub', path: '/career', icon: Briefcase, description: 'Find hackathons, workshops, webinars, and study buddies' },
  { id: 3, title: 'Events', path: '/events', icon: Calendar, description: 'Discover events happening today, tomorrow, and this weekend' },
  { id: 4, title: 'MyTime', path: '/timeline', icon: Clock, description: 'Plan your schedule and find free time slots' },
  { id: 5, title: 'Create Hangout', path: '/hangout', icon: Plus, description: 'Create a quick hangout or study session' },
  { id: 6, title: 'Chat', path: '/chats', icon: MessageCircle, description: 'Message friends and plan together' },
]

function DemoFlow() {
  const navigate = useNavigate()
  const { moodConfig } = useMood()
  const [currentStep, setCurrentStep] = useState(0)
  
  const handleStart = () => { navigate(demoSteps[0].path) }
  const handleStepClick = (step) => { navigate(step.path) }
  
  return (
    <div className={`min-h-screen-safe ${moodConfig.mesh} bg-dark`}>
      <div className="container-app py-8 sm:py-12 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-party shadow-neon-party flex items-center justify-center"><span className="text-4xl">🎉</span></div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">Welcome to PeerPool</h1>
          <p className="text-white/60 text-lg">Your mood-based social discovery platform</p>
        </div>
        
        <div className="space-y-3 mb-8">
          {demoSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <button key={step.id} onClick={() => handleStepClick(step)} className="w-full p-4 rounded-xl glass hover:bg-white/10 flex items-center gap-4 text-left transition-all active:scale-[0.98]">
                <div className={`w-12 h-12 rounded-xl ${moodConfig.gradient} flex items-center justify-center flex-shrink-0`}><Icon className="w-6 h-6 text-white" /></div>
                <div className="flex-1 min-w-0"><h3 className="font-semibold text-white">{step.title}</h3><p className="text-sm text-white/60 truncate">{step.description}</p></div>
                <ArrowRight className="w-5 h-5 text-white/40 flex-shrink-0" />
              </button>
            )
          })}
        </div>
        
        <Button mood="party" fullWidth size="lg" onClick={handleStart}><ArrowRight className="w-5 h-5" />Start Exploring</Button>
      </div>
    </div>
  )
}

export default DemoFlow
