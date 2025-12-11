/**
 * Main Feed Screen (Discover)
 * 
 * The primary discovery interface showing:
 * - Match recommendations with scores
 * - Upcoming events
 * - Filter controls
 * - Quick actions (view profile, invite)
 * 
 * Layout: 12-column grid with main content and sidebar
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MapPin, Calendar, Filter, Sparkles, ChevronRight, 
  Heart, X, MessageCircle, Users, Clock, Star
} from 'lucide-react'
import { Header } from '../components/layout'
import { Button, Card, Avatar, Badge, AvatarGroup } from '../components/ui'
import { users, events } from '../data/mockData'

// Person Card Component
function PersonCard({ user, onViewProfile, onInvite }) {
  return (
    <Card hover className="group overflow-hidden">
      <div className="relative">
        {/* Match Score Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">{user.matchScore}%</span>
          </div>
        </div>
        
        {/* Avatar Section */}
        <div className="p-6 pb-4 text-center">
          <Avatar
            src={user.avatar}
            name={user.name}
            size="xl"
            verified={user.verified}
            className="mx-auto mb-4 ring-4 ring-primary-100"
          />
          
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {user.name}
          </h3>
          
          <p className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-3">
            <MapPin className="w-4 h-4" />
            {user.location}
          </p>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {user.bio}
          </p>
          
          {/* Interest Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {user.interests.slice(0, 3).map((interest) => (
              <Badge key={interest} variant="primary" size="sm">
                {interest}
              </Badge>
            ))}
            {user.interests.length > 3 && (
              <Badge variant="gray" size="sm">
                +{user.interests.length - 3}
              </Badge>
            )}
          </div>
          
          {/* Looking For */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
            <Users className="w-3.5 h-3.5" />
            Looking for: {user.lookingFor.join(', ')}
          </div>
        </div>
        
        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewProfile(user)}
          >
            View Profile
          </Button>
          <Button
            variant="accent"
            className="flex-1"
            onClick={() => onInvite(user)}
          >
            <MessageCircle className="w-4 h-4" />
            Invite
          </Button>
        </div>
      </div>
    </Card>
  )
}

// Event Preview Card Component
function EventPreviewCard({ event, onClick }) {
  const attendeeUsers = users.filter(u => event.attendeesList.includes(u.id))
  
  return (
    <Card hover padding="none" onClick={onClick} className="overflow-hidden">
      <div className="flex gap-4 p-4">
        <img
          src={event.image}
          alt={event.title}
          className="w-20 h-20 rounded-md object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <Badge variant="accent" size="sm" className="mb-2">
            {event.category}
          </Badge>
          <h4 className="font-semibold text-gray-900 truncate mb-1">
            {event.title}
          </h4>
          <p className="flex items-center gap-1 text-sm text-gray-500 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time}
          </p>
          <div className="flex items-center gap-2">
            <AvatarGroup users={attendeeUsers} max={3} size="xs" />
            <span className="text-xs text-gray-500">
              {event.attendees} going
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Filter Chip Component
function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all
        ${active 
          ? 'bg-primary text-white' 
          : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
        }
      `}
    >
      {label}
    </button>
  )
}

function MainFeed({ onViewProfile, onInvite, onViewEvent }) {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  
  const filters = [
    { id: 'all', label: 'All Matches' },
    { id: 'study', label: 'Study Partners' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'events', label: 'Events' },
    { id: 'hackathons', label: 'Hackathons' },
  ]
  
  const handleViewProfile = (user) => {
    if (onViewProfile) {
      onViewProfile(user)
    } else {
      navigate(`/profile/${user.id}`)
    }
  }
  
  const handleInvite = (user) => {
    if (onInvite) {
      onInvite(user)
    } else {
      navigate(`/chat/${user.id}`)
    }
  }
  
  const handleViewEvent = (event) => {
    if (onViewEvent) {
      onViewEvent(event)
    } else {
      navigate(`/event/${event.id}`)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container-app py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Your Next Match
          </h1>
          <p className="text-gray-600">
            People who share your interests and goals
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-thin">
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            />
          ))}
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* People Grid - 8 columns */}
          <section className="col-span-12 lg:col-span-8" aria-labelledby="matches-heading">
            <h2 id="matches-heading" className="sr-only">Match Recommendations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {users.map((user, index) => (
                <div 
                  key={user.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PersonCard
                    user={user}
                    onViewProfile={handleViewProfile}
                    onInvite={handleInvite}
                  />
                </div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Matches
              </Button>
            </div>
          </section>
          
          {/* Sidebar - 4 columns */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* Upcoming Events */}
            <Card padding="none">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming Events
                  </h3>
                  <button className="text-sm text-primary hover:text-primary-600 flex items-center gap-1">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {events.map((event) => (
                  <EventPreviewCard
                    key={event.id}
                    event={event}
                    onClick={() => handleViewEvent(event)}
                  />
                ))}
              </div>
            </Card>
            
            {/* Quick Stats */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Your Activity
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary-50 rounded-md text-center">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-gray-600">New Matches</p>
                </div>
                <div className="p-4 bg-accent-50 rounded-md text-center">
                  <p className="text-2xl font-bold text-accent">5</p>
                  <p className="text-sm text-gray-600">Pending Invites</p>
                </div>
                <div className="p-4 bg-green-50 rounded-md text-center">
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-sm text-gray-600">Connections</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-md text-center">
                  <p className="text-2xl font-bold text-purple-600">3</p>
                  <p className="text-sm text-gray-600">Events Joined</p>
                </div>
              </div>
            </Card>
            
            {/* Match Tips */}
            <Card className="bg-gradient-to-br from-primary-50 to-accent-50 border-0">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Boost Your Matches
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Complete your profile to get 2x more match recommendations.
                  </p>
                  <Button variant="primary" size="sm">
                    Complete Profile
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

export default MainFeed


