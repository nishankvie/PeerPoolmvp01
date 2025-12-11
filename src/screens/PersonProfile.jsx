/**
 * Person Profile Screen
 * 
 * Detailed view of a potential match showing:
 * - Full profile information
 * - Shared interests
 * - Availability
 * - Action buttons (invite, message)
 * 
 * Accessible: Uses semantic HTML and ARIA labels
 */
import { useNavigate, useParams } from 'react-router-dom'
import { 
  ArrowLeft, MapPin, Calendar, Clock, Check, 
  MessageCircle, UserPlus, Share2, Flag, Sparkles,
  Users, Star, ExternalLink
} from 'lucide-react'
import { Header } from '../components/layout'
import { Button, Card, Avatar, Badge } from '../components/ui'
import { users, currentUser } from '../data/mockData'

function PersonProfile({ user: propUser, onInvite, onBack }) {
  const navigate = useNavigate()
  const { id } = useParams()
  
  // Get user from props or from URL params
  const user = propUser || users.find(u => u.id === id) || users[0]
  
  // Calculate shared interests
  const sharedInterests = user.interests.filter(interest => 
    currentUser.interests.includes(interest)
  )
  
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }
  
  const handleInvite = () => {
    if (onInvite) {
      onInvite(user)
    } else {
      navigate(`/chat/${user.id}`)
    }
  }
  
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
          <span>Back to Discover</span>
        </button>
        
        <div className="grid grid-cols-12 gap-8">
          {/* Main Profile Content - 8 columns */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Profile Header Card */}
            <Card padding="lg">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Avatar
                    src={user.avatar}
                    name={user.name}
                    size="2xl"
                    verified={user.verified}
                    className="ring-4 ring-primary-100"
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                          {user.name}
                        </h1>
                        {user.verified && (
                          <Badge variant="primary" size="sm">
                            <Check className="w-3 h-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <p className="flex items-center gap-2 text-gray-500 mb-4">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </p>
                    </div>
                    
                    {/* Match Score */}
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">{user.matchScore}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Match Score</p>
                    </div>
                  </div>
                  
                  {/* Bio */}
                  <p className="text-gray-700 text-lg mb-6">
                    {user.bio}
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Available: <strong>{user.availability}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-primary" />
                      <span>Looking for: <strong>{user.lookingFor.join(', ')}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Interests Section */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Interests & Activities
              </h2>
              
              {/* Shared Interests */}
              {sharedInterests.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Shared with you ({sharedInterests.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sharedInterests.map((interest) => (
                      <Badge key={interest} variant="primary" size="md">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* All Interests */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  All Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge 
                      key={interest} 
                      variant={sharedInterests.includes(interest) ? 'primary' : 'gray'} 
                      size="md"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
            
            {/* What they're looking for */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                What {user.name.split(' ')[0]} is Looking For
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.lookingFor.map((item) => (
                  <div 
                    key={item}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-md"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-gray-900">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Sidebar - 4 columns */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* Action Card */}
            <Card className="sticky top-24">
              <div className="space-y-4">
                <Button
                  variant="accent"
                  className="w-full"
                  onClick={handleInvite}
                  icon={MessageCircle}
                >
                  Send Invite
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  icon={Calendar}
                >
                  Suggest Meetup
                </Button>
                
                <hr className="border-gray-100" />
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="flex-1"
                    icon={Share2}
                  >
                    Share
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1"
                    icon={Flag}
                  >
                    Report
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Compatibility Breakdown */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Why You Match
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Shared Interests</span>
                    <span className="font-medium text-primary">
                      {sharedInterests.length}/{user.interests.length}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(sharedInterests.length / user.interests.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Location Match</span>
                    <span className="font-medium text-accent">Same Area</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full w-full" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Goals Alignment</span>
                    <span className="font-medium text-green-600">High</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full w-4/5" />
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Mutual Connections */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Similar Profiles
              </h3>
              <div className="space-y-3">
                {users.slice(0, 3).filter(u => u.id !== user.id).map((similarUser) => (
                  <div 
                    key={similarUser.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                    onClick={() => navigate(`/profile/${similarUser.id}`)}
                  >
                    <Avatar
                      src={similarUser.avatar}
                      name={similarUser.name}
                      size="sm"
                      verified={similarUser.verified}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {similarUser.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {similarUser.matchScore}% match
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
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

export default PersonProfile


