/**
 * PeerPool - App Component
 */
import { Routes, Route, Navigate } from 'react-router-dom'
import { MoodProvider } from './context/MoodContext'
import { BottomNav } from './components/layout'

import HomeScreen from './screens/HomeScreen'
import EventsScreen from './screens/EventsScreen'
import MyTimeScreen from './screens/MyTimeScreen'
import HangoutScreen from './screens/HangoutScreen'
import ChatScreen from './screens/ChatScreen'
import ChatListScreen from './screens/ChatListScreen'
import DemoFlow from './screens/DemoFlow'

// Career screens
import CareerHubScreen from './screens/CareerHubScreen'
import CareerHackathonsScreen from './screens/CareerHackathonsScreen'
import CareerWorkshopsScreen from './screens/CareerWorkshopsScreen'
import CareerWebinarsScreen from './screens/CareerWebinarsScreen'
import StudyBuddyFinderScreen from './screens/StudyBuddyFinderScreen'

function App() {
  return (
    <MoodProvider>
      <div className="min-h-screen-safe bg-dark flex flex-col">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/events" element={<EventsScreen />} />
          <Route path="/timeline" element={<MyTimeScreen />} />
          <Route path="/hangout" element={<HangoutScreen />} />
          <Route path="/chats" element={<ChatListScreen />} />
          <Route path="/chat/:id" element={<ChatScreen />} />
          <Route path="/demo" element={<DemoFlow />} />
          
          {/* Career routes */}
          <Route path="/career" element={<CareerHubScreen />} />
          <Route path="/career/hackathons" element={<CareerHackathonsScreen />} />
          <Route path="/career/workshops" element={<CareerWorkshopsScreen />} />
          <Route path="/career/webinars" element={<CareerWebinarsScreen />} />
          <Route path="/career/studybuddy" element={<StudyBuddyFinderScreen />} />
          
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        
        <BottomNav />
      </div>
    </MoodProvider>
  )
}

export default App
