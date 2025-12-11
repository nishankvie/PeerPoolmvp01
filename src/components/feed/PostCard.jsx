/**
 * PostCard Component - Immersive memory card
 */
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Star, RefreshCw, ChevronLeft, ChevronRight, Users, MoreHorizontal, Send, X } from 'lucide-react'
import { MOODS, useMood } from '../../context/MoodContext'

function ImageCarousel({ images, title }) {
  const [current, setCurrent] = useState(0)
  const touchStart = useRef(0)
  const goTo = (idx) => setCurrent(Math.max(0, Math.min(images.length - 1, idx)))
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => { const diff = touchStart.current - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) diff > 0 ? goTo(current + 1) : goTo(current - 1) }
  
  return (
    <div className="relative aspect-[4/5] sm:aspect-[4/3] overflow-hidden bg-dark-200" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="flex h-full transition-transform duration-300 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, i) => <img key={i} src={img} alt={`${title} - ${i + 1}`} className="w-full h-full object-cover flex-shrink-0" loading={i === 0 ? 'eager' : 'lazy'} />)}
      </div>
      {images.length > 1 && (
        <>
          <button onClick={() => goTo(current - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white opacity-0 sm:opacity-100 hover:bg-black/70 transition-all"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={() => goTo(current + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white opacity-0 sm:opacity-100 hover:bg-black/70 transition-all"><ChevronRight className="w-5 h-5" /></button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => <button key={i} onClick={() => goTo(i)} className={`h-1.5 rounded-full transition-all ${i === current ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />)}
          </div>
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur text-xs text-white">{current + 1}/{images.length}</div>
        </>
      )}
    </div>
  )
}

function CommentsPanel({ comments, onClose, onSubmit }) {
  const [text, setText] = useState('')
  const { moodConfig } = useMood()
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-dark-100 rounded-t-2xl sm:rounded-2xl max-h-[70vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10"><h3 className="font-semibold text-white">Comments</h3><button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg"><X className="w-5 h-5 text-white/60" /></button></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <img src={c.user.avatar} alt={c.user.name} className="w-8 h-8 rounded-full object-cover" />
              <div className="flex-1"><div className="bg-white/5 rounded-2xl rounded-tl-sm px-3 py-2"><span className="font-medium text-white text-sm">{c.user.name}</span><p className="text-white/80 text-sm">{c.text}</p></div><p className="text-xs text-white/40 mt-1 ml-2">{c.timestamp}</p></div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if(text.trim()) { onSubmit(text); setText('') }}} className="p-4 border-t border-white/10 flex gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment..." className="flex-1 bg-white/5 px-4 py-2.5 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:bg-white/10" />
          <button type="submit" disabled={!text.trim()} className={`p-2.5 rounded-xl transition-all ${text.trim() ? `${moodConfig.gradient}` : 'bg-white/10'}`}><Send className="w-5 h-5 text-white" /></button>
        </form>
      </div>
    </div>
  )
}

function PostCard({ post, onRecreate }) {
  const navigate = useNavigate()
  const { moodConfig } = useMood()
  const postMoodConfig = MOODS[post.mood]
  const [likes, setLikes] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [wishCount, setWishCount] = useState(post.wishCount)
  const [isWished, setIsWished] = useState(post.isWished)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(post.comments)
  const [showConfetti, setShowConfetti] = useState(false)
  
  const handleLike = () => { setIsLiked(!isLiked); setLikes(prev => isLiked ? prev - 1 : prev + 1) }
  const handleWish = () => { if (!isWished) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 1000) }; setIsWished(!isWished); setWishCount(prev => isWished ? prev - 1 : prev + 1) }
  const handleRecreate = () => { if (onRecreate) onRecreate(post); else navigate('/hangout', { state: { prefillMood: post.mood, prefillTitle: post.eventTitle } }) }
  const handleAddComment = (text) => { setComments([...comments, { id: Date.now(), user: { name: 'You', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' }, text, timestamp: 'Just now' }]) }
  
  return (
    <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-3 sm:p-4 flex items-center gap-3">
        <div className="relative"><img src={post.user.avatar} alt={post.user.name} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-offset-2 ring-offset-dark ${postMoodConfig.ring}`} /><span className="absolute -bottom-0.5 -right-0.5 text-sm">{postMoodConfig.emoji}</span></div>
        <div className="flex-1 min-w-0"><p className="font-semibold text-white text-sm sm:text-base">{post.user.name}</p><p className={`text-xs sm:text-sm ${postMoodConfig.text}`}>{post.moodCaption}</p></div>
        <div className="flex items-center gap-2"><span className="text-xs text-white/40">{post.createdAt}</span><button className="p-1.5 hover:bg-white/10 rounded-lg"><MoreHorizontal className="w-5 h-5 text-white/40" /></button></div>
      </div>
      <ImageCarousel images={post.images} title={post.eventTitle} />
      <div className="p-3 sm:p-4 space-y-3">
        <div><h3 className="font-display font-bold text-lg sm:text-xl text-white">{post.eventTitle}</h3><p className="text-sm text-white/60">{post.eventSubtitle}</p></div>
        {post.participants.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">{post.participants.slice(0, 4).map((p, i) => <img key={p.id} src={p.avatar} alt={p.name} className="w-7 h-7 rounded-full ring-2 ring-dark object-cover" style={{ zIndex: 4 - i }} />)}{post.participantCount > 4 && <div className="w-7 h-7 rounded-full bg-white/20 ring-2 ring-dark flex items-center justify-center text-xs text-white">+{post.participantCount - 4}</div>}</div>
            <span className="text-xs text-white/60">{post.participants.slice(0, 2).map(p => p.name.split(' ')[0]).join(', ')}{post.participantCount > 2 && ` +${post.participantCount - 2} others`}</span>
          </div>
        )}
        {post.mutualFriends > 0 && <p className="text-xs text-white/50 flex items-center gap-1"><Users className="w-3.5 h-3.5" />{post.mutualFriends} mutual friends attended</p>}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={handleLike} className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl transition-all active:scale-95 ${isLiked ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/10 text-white/70'}`}><Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} /><span className="text-sm font-medium">{likes}</span></button>
            <button onClick={() => setShowComments(true)} className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl hover:bg-white/10 text-white/70 transition-all active:scale-95"><MessageCircle className="w-5 h-5" /><span className="text-sm font-medium">{comments.length}</span></button>
            <button onClick={handleWish} className={`relative flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl transition-all active:scale-95 ${isWished ? `${moodConfig.gradient} text-white ${moodConfig.shadow}` : 'hover:bg-white/10 text-white/70'}`}><Star className={`w-5 h-5 ${isWished ? 'fill-current' : ''}`} /><span className="text-sm font-medium hidden xs:inline">{wishCount}</span>{showConfetti && <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">{[...Array(6)].map((_, i) => <span key={i} className="absolute text-xs animate-ping" style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%`, animationDelay: `${i * 50}ms`, animationDuration: '500ms' }}>✨</span>)}</div>}</button>
          </div>
          <button onClick={handleRecreate} className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl ${moodConfig.gradient} text-white ${moodConfig.shadow} transition-all active:scale-95 hover:brightness-110 text-sm font-semibold`}><RefreshCw className="w-4 h-4" /><span className="hidden sm:inline">Recreate</span></button>
        </div>
        {comments.length > 0 && (
          <div className="space-y-2">
            {comments.slice(0, 2).map((c) => <div key={c.id} className="flex gap-2"><img src={c.user.avatar} alt={c.user.name} className="w-6 h-6 rounded-full object-cover flex-shrink-0" /><p className="text-sm"><span className="font-semibold text-white">{c.user.name}</span>{' '}<span className="text-white/70">{c.text}</span></p></div>)}
            {comments.length > 2 && <button onClick={() => setShowComments(true)} className="text-sm text-white/50 hover:text-white/70">View all {comments.length} comments</button>}
          </div>
        )}
      </div>
      {showComments && <CommentsPanel comments={comments} onClose={() => setShowComments(false)} onSubmit={handleAddComment} />}
    </article>
  )
}

export default PostCard


