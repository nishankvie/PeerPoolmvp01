/**
 * Home Screen - Friend Memories Feed
 * 
 * Features:
 * - DualTileHero for vibe selection (swipe-only)
 * - PostCard-dominated feed (8 posts)
 * - DiscoverFriendsRow after 2nd post and at bottom
 * - Proper safe-area padding for bottom nav
 */
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Bell, Zap } from 'lucide-react'
import { useMood } from '../context/MoodContext'
import { Header } from '../components/layout'
import { Avatar } from '../components/ui'
import DualTileHero from '../components/ui/DualTileHero'
import { PostCard, DiscoverFriendsRow } from '../components/feed'
import { feedPosts, recommendedFriends } from '../data/homeFeedMock'
import { currentUser } from '../data/mockData'

function HomeScreen() {
  const navigate = useNavigate()
  const { currentMood, setCurrentMood, moodConfig } = useMood()
  const [posts] = useState(feedPosts)
  
  // Sort posts: mood match first, then recent
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (a.mood === currentMood && b.mood !== currentMood) return -1
      if (b.mood === currentMood && a.mood !== currentMood) return 1
      return 0
    })
  }, [posts, currentMood])
  
  const handleVibeSelect = (mode) => {
    console.log('Vibe selected:', mode)
  }
  
  const handleCategorySelect = (category) => {
    console.log('Category selected:', category)
  }
  
  const handleRecreate = (post) => {
    navigate('/hangout', { state: { prefillMood: post.mood, prefillTitle: post.eventTitle } })
  }
  
  // Render feed with discover rows interspersed
  const renderFeed = () => {
    const items = []
    
    sortedPosts.forEach((post, index) => {
      // Insert DiscoverFriendsRow after 2nd post
      if (index === 2) {
        items.push(
          <DiscoverFriendsRow
            key="discover-1"
            friends={recommendedFriends.slice(0, 4)}
            title="People You Might Vibe With"
          />
        )
      }
      
      items.push(
        <PostCard
          key={post.id}
          post={post}
          onRecreate={handleRecreate}
        />
      )
    })
    
    return items
  }
  
  return (
    <div className={`min-h-screen-safe ${moodConfig.mesh} bg-dark transition-all duration-500`}>
      <Header />
      
      {/* Main scroll container with safe-area padding */}
      <main className="container-app py-4 sm:py-6" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 96px)' }}>
        {/* DualTileHero - Swipe-only vibe selector */}
        <DualTileHero
          onVibeSelect={handleVibeSelect}
          onCategorySelect={handleCategorySelect}
        />
        
        {/* Feed Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-white">Friend Memories</h2>
            <p className="text-sm text-white/60">See what your circle has been up to</p>
          </div>
          <button
            onClick={() => navigate('/hangout')}
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl ${moodConfig.gradient} text-white ${moodConfig.shadow} font-semibold text-sm transition-all hover:brightness-110 active:scale-95`}
          >
            <Sparkles className="w-4 h-4" />
            Create
          </button>
        </div>
        
        {/* Feed Content */}
        <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
          {renderFeed()}
        </div>
        
        {/* Bottom Discover Row */}
        <div className="max-w-2xl mx-auto mt-6">
          <DiscoverFriendsRow
            friends={recommendedFriends.slice(2)}
            title="Discover More People"
          />
        </div>
        
        {/* Load More */}
        <div className="max-w-2xl mx-auto mt-6 text-center">
          <button className="px-6 py-3 rounded-xl glass text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
            Load More Memories
          </button>
        </div>
      </main>
    </div>
  )
}

export default HomeScreen


