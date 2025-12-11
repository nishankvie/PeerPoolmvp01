/**
 * Event Detail Screen
 * 
 * Comprehensive event view showing:
 * - Event header with image
 * - Description and details
 * - Attendee list
 * - RSVP actions
 * - Location map placeholder
 * 
 * Features inviting friends and scheduling
 */
import { useNavigate, useParams } from 'react-router-dom'
import { 
  ArrowLeft, Calendar, Clock, MapPin, Users, 
  Share2, Bookmark, Check, DollarSign, Tag,
  MessageCircle, ExternalLink, Plus
} from 'lucide-react'
import { Header } from '../components/layout'
import { Button, Card, Avatar, Badge, AvatarGroup } from '../components/ui'
import { events, users } from '../data/mockData'

function EventDetail({ event: propEvent, onInviteFriend, onBack }) {
  const navigate = useNavigate()
  const { id } = useParams()
  
  // Get event from props or URL params
  const event = propEvent || events.find(e => e.id === id) || events[0]
  
  // Get attendee user objects
  const attendeeUsers = users.filter(u => event.attendeesList.includes(u.id))
  
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }
  
  const handleInviteFriend = (user) => {
    if (onInviteFriend) {
      onInviteFriend(user)
    } else {
      navigate(`/chat/${user.id}`)
    }
  }
  
  // Format date nicely
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container-app py-8">
        {/* Back Navigation */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </button>
        
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content - 8 columns */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Hero Image */}
            <div className="relative rounded-md overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge variant="accent" size="lg">
                  {event.category}
                </Badge>
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
                  aria-label="Bookmark event"
                >
                  <Bookmark className="w-5 h-5 text-gray-700" />
                </button>
                <button 
                  className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
                  aria-label="Share event"
                >
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              
              {/* Event Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {event.title}
                </h1>
                <p className="text-white/80 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </span>
                </p>
              </div>
            </div>
            
            {/* Event Details Card */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About This Event
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {event.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="gray" size="md" icon={Tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-md">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{event.location}</h4>
                    <p className="text-sm text-gray-500">{event.address}</p>
                    <a 
                      href="#" 
                      className="text-sm text-primary hover:text-primary-600 flex items-center gap-1 mt-1"
                    >
                      View Map <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-accent-100 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Price</h4>
                    <p className="text-sm text-gray-500">{event.price}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Capacity</h4>
                    <p className="text-sm text-gray-500">
                      {event.attendees} / {event.capacity} spots filled
                    </p>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={event.host.avatar} 
                      alt={event.host.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Hosted by</h4>
                    <p className="text-sm text-gray-500">{event.host.name}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Attendees Section */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  People Going ({event.attendees})
                </h2>
                <AvatarGroup users={attendeeUsers} max={5} size="md" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attendeeUsers.map((user) => (
                  <div 
                    key={user.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
                  >
                    <Avatar
                      src={user.avatar}
                      name={user.name}
                      size="md"
                      verified={user.verified}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.matchScore}% match with you
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInviteFriend(user)}
                      aria-label={`Message ${user.name}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                +{event.attendees - attendeeUsers.length} more people going
              </p>
            </Card>
          </div>
          
          {/* Sidebar - 4 columns */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* RSVP Card */}
            <Card className="sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {event.price}
                </p>
                <p className="text-sm text-gray-500">
                  {event.capacity - event.attendees} spots remaining
                </p>
              </div>
              
              <div className="space-y-3">
                <Button variant="accent" className="w-full">
                  <Check className="w-5 h-5" />
                  RSVP Now
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Plus className="w-5 h-5" />
                  Invite Friends
                </Button>
              </div>
              
              <hr className="my-6 border-gray-100" />
              
              {/* Quick Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{event.location}</span>
                </div>
              </div>
            </Card>
            
            {/* Find Teammates Card */}
            <Card className="bg-gradient-to-br from-primary-50 to-accent-50 border-0">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Need a Teammate?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Find people to join you at this event
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Find Companions
                </Button>
              </div>
            </Card>
            
            {/* Similar Events */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">
                Similar Events
              </h3>
              <div className="space-y-3">
                {events.filter(e => e.id !== event.id).slice(0, 2).map((similarEvent) => (
                  <div 
                    key={similarEvent.id}
                    className="flex gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                    onClick={() => navigate(`/event/${similarEvent.id}`)}
                  >
                    <img
                      src={similarEvent.image}
                      alt={similarEvent.title}
                      className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate text-sm">
                        {similarEvent.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(similarEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default EventDetail


