/**
 * PeerPool - Mock Data
 * 
 * Placeholder data for rendering screens during development.
 */

// User profile data
export const users = [
  {
    id: '1',
    name: 'Alex Chen',
    username: '@alexc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'CS student @ Stanford. Love competitive programming and board games.',
    location: 'San Francisco, CA',
    interests: ['Coding', 'Hackathons', 'Board Games', 'Chess'],
    matchScore: 92,
    currentMood: 'play',
    availability: 'Weekends',
    lookingFor: ['Study Partners', 'Hackathon Team'],
    verified: true,
    online: true,
  },
  {
    id: '2',
    name: 'Maya Rodriguez',
    username: '@mayar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: 'Design student who loves gaming and creative projects.',
    location: 'Los Angeles, CA',
    interests: ['Gaming', 'Design', 'Art', 'Music'],
    matchScore: 88,
    currentMood: 'party',
    availability: 'Evenings',
    lookingFor: ['Gaming Buddies', 'Project Partners'],
    verified: true,
    online: true,
  },
  {
    id: '3',
    name: 'Jordan Kim',
    username: '@jordank',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face',
    bio: 'MBA candidate interested in fintech and basketball.',
    location: 'New York, NY',
    interests: ['Finance', 'Basketball', 'Networking', 'Startups'],
    matchScore: 85,
    currentMood: 'focus',
    availability: 'Flexible',
    lookingFor: ['Study Partners', 'Sports Buddies'],
    verified: false,
    online: false,
  },
  {
    id: '4',
    name: 'Sam Taylor',
    username: '@samt',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
    bio: 'Medical student and trivia enthusiast.',
    location: 'Chicago, IL',
    interests: ['Trivia', 'Medicine', 'Running', 'Podcasts'],
    matchScore: 79,
    currentMood: 'chill',
    availability: 'Mornings',
    lookingFor: ['Study Partners', 'Event Buddies'],
    verified: true,
    online: true,
  },
  {
    id: '5',
    name: 'Riley Park',
    username: '@rileyp',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face',
    bio: 'Full-stack developer and esports fan.',
    location: 'Seattle, WA',
    interests: ['Esports', 'Web Dev', 'VR', 'Anime'],
    matchScore: 94,
    currentMood: 'social',
    availability: 'Nights',
    lookingFor: ['Gaming Buddies', 'Hackathon Team'],
    verified: true,
    online: false,
  },
  {
    id: '6',
    name: 'Casey Morgan',
    username: '@caseym',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    bio: 'Grad student in physics. Love escape rooms and sci-fi.',
    location: 'Boston, MA',
    interests: ['Physics', 'Escape Rooms', 'Sci-Fi', 'Photography'],
    matchScore: 81,
    currentMood: 'play',
    availability: 'Weekends',
    lookingFor: ['Study Partners', 'Event Buddies'],
    verified: false,
    online: true,
  },
]

// Events data with mood-based properties
export const events = [
  {
    id: '1',
    title: 'Tech Trivia Night',
    description: 'Test your knowledge of tech history and programming!',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    date: 'today',
    time: '7:00 PM',
    location: 'The Hacker Lounge',
    mood: 'social',
    category: 'Social',
    capacity: 48,
    attendees: ['1', '2', '5'],
    attendeeCount: 32,
    price: 'Free',
    isPublic: true,
  },
  {
    id: '2',
    title: 'Weekend Hackathon: AI Edition',
    description: 'Build something amazing with AI in 48 hours.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
    date: 'weekend',
    time: '9:00 AM - Sunday 6PM',
    location: 'TechHub Campus',
    mood: 'focus',
    category: 'Hackathon',
    capacity: 200,
    attendees: ['1', '3', '5', '6'],
    attendeeCount: 156,
    price: '$25',
    isPublic: true,
  },
  {
    id: '3',
    title: 'Board Game Meetup',
    description: 'Monthly board game session for strategy enthusiasts.',
    image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=600&h=400&fit=crop',
    date: 'tomorrow',
    time: '2:00 PM',
    location: 'Game Cafe Downtown',
    mood: 'play',
    category: 'Gaming',
    capacity: 24,
    attendees: ['1', '2', '4'],
    attendeeCount: 18,
    price: '$5',
    isPublic: true,
  },
  {
    id: '4',
    title: 'Rooftop Chill Session',
    description: 'Sunset vibes and good company.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop',
    date: 'today',
    time: '5:30 PM',
    location: 'Sky Lounge',
    mood: 'chill',
    category: 'Social',
    capacity: 30,
    attendees: ['2', '4'],
    attendeeCount: 12,
    price: 'Free',
    isPublic: true,
  },
  {
    id: '5',
    title: 'Startup Networking Mixer',
    description: 'Connect with founders and investors.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    date: 'tomorrow',
    time: '6:00 PM',
    location: 'The Hub',
    mood: 'social',
    category: 'Networking',
    capacity: 100,
    attendees: ['3', '5'],
    attendeeCount: 67,
    price: 'Free',
    isPublic: true,
  },
  {
    id: '6',
    title: 'Neon Pool Party',
    description: 'Dance the night away with neon lights!',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
    date: 'weekend',
    time: '9:00 PM',
    location: 'Club Pulse',
    mood: 'party',
    category: 'Party',
    capacity: 200,
    attendees: ['2', '5'],
    attendeeCount: 145,
    price: '$15',
    isPublic: true,
  },
]

// Hangout templates for quick creation
export const hangoutTemplates = [
  { id: 'study', label: 'Study Session', emoji: '📚', mood: 'focus', duration: '2 hours' },
  { id: 'party', label: 'Party', emoji: '🎉', mood: 'party', duration: '4 hours' },
  { id: 'chill', label: 'Chill Hangout', emoji: '😌', mood: 'chill', duration: '2 hours' },
  { id: 'game', label: 'Game Night', emoji: '🎮', mood: 'play', duration: '3 hours' },
  { id: 'coffee', label: 'Coffee Chat', emoji: '☕', mood: 'social', duration: '1 hour' },
  { id: 'workout', label: 'Workout', emoji: '💪', mood: 'social', duration: '1 hour' },
]

// Mood suggestions for chat
export const moodSuggestions = {
  '1': { message: 'Both of you feel playful today! 🎮', suggestion: 'Start a game night?' },
  '2': { message: 'Maya is feeling festive! 🎉', suggestion: 'Plan a party together?' },
  '3': { message: 'Jordan is in focus mode 📚', suggestion: 'Schedule a study session?' },
  '4': { message: 'Sam wants to chill 😌', suggestion: 'Grab coffee together?' },
  '5': { message: "Riley's ready to connect! 🤝", suggestion: 'Start a conversation?' },
  '6': { message: 'Casey is up for games! 🎮', suggestion: 'Join an escape room?' },
}

// Chat messages
export const chatMessages = [
  {
    id: '1',
    senderId: '1',
    content: "Hey! I saw you're also looking for hackathon teammates. What kind of projects are you into?",
    timestamp: '2024-02-08T14:30:00',
    type: 'text',
  },
  {
    id: '2',
    senderId: 'me',
    content: "Hi Alex! I'm really into AI/ML projects. I've done a few NLP projects before. What about you?",
    timestamp: '2024-02-08T14:35:00',
    type: 'text',
  },
  {
    id: '3',
    senderId: '1',
    content: "Perfect! I'm more on the full-stack side, so we'd complement each other well. Want to team up for the AI Hackathon?",
    timestamp: '2024-02-08T14:40:00',
    type: 'text',
  },
  {
    id: '4',
    senderId: 'me',
    content: "Absolutely! Should we meet up beforehand to brainstorm ideas?",
    timestamp: '2024-02-08T14:42:00',
    type: 'text',
  },
  {
    id: '5',
    senderId: '1',
    content: "Great idea! How about coffee this Saturday? ☕",
    timestamp: '2024-02-08T14:45:00',
    type: 'text',
  },
]

// Interest categories
export const interestCategories = [
  { id: 'study', name: 'Study & Learning', icon: '📚', interests: ['Study Groups', 'Exam Prep', 'Language Exchange', 'Book Clubs'] },
  { id: 'gaming', name: 'Gaming', icon: '🎮', interests: ['PC Gaming', 'Console Gaming', 'Board Games', 'Esports'] },
  { id: 'tech', name: 'Tech & Building', icon: '💻', interests: ['Hackathons', 'Open Source', 'Startups', 'Web Dev'] },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽', interests: ['Running', 'Basketball', 'Soccer', 'Gym Buddies'] },
  { id: 'social', name: 'Social Events', icon: '🎉', interests: ['Concerts', 'Trivia Nights', 'Networking', 'Escape Rooms'] },
  { id: 'creative', name: 'Creative', icon: '🎨', interests: ['Art', 'Music', 'Photography', 'Writing'] },
]

// Available time slots
export const availableSlots = [
  { id: '1', date: '2024-02-10', time: '10:00 AM', duration: '1 hour' },
  { id: '2', date: '2024-02-10', time: '2:00 PM', duration: '1 hour' },
  { id: '3', date: '2024-02-11', time: '11:00 AM', duration: '1 hour' },
  { id: '4', date: '2024-02-11', time: '3:00 PM', duration: '1 hour' },
  { id: '5', date: '2024-02-12', time: '9:00 AM', duration: '1 hour' },
]

// Current user
export const currentUser = {
  id: 'me',
  name: 'You',
  username: '@you',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  interests: ['Coding', 'AI/ML', 'Hackathons', 'Gaming'],
  location: 'San Francisco, CA',
  currentMood: 'party',
  friends: ['1', '2', '3', '4', '5', '6'],
}

// Memories (past events)
export const memories = [
  {
    id: 'm1',
    title: 'Beach Day with Friends',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    date: 'Last weekend',
    mood: 'chill',
    participants: ['2', '4'],
  },
  {
    id: 'm2',
    title: 'Hackathon Win! 🏆',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
    date: '2 weeks ago',
    mood: 'focus',
    participants: ['1', '5'],
  },
  {
    id: 'm3',
    title: 'Game Night Marathon',
    image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=600&h=400&fit=crop',
    date: 'Last month',
    mood: 'play',
    participants: ['1', '6'],
  },
]

// Friend activities
export const friendActivities = [
  { id: 'fa1', user: users[0], activity: 'Joining Tech Trivia Night', time: 'Today', mood: 'social' },
  { id: 'fa2', user: users[1], activity: 'Hosting Pool Party', time: 'This Weekend', mood: 'party' },
  { id: 'fa3', user: users[2], activity: 'Study session for CFA', time: 'Tomorrow', mood: 'focus' },
  { id: 'fa4', user: users[3], activity: 'Looking for running buddy', time: 'Today', mood: 'social' },
]

export default {
  users,
  events,
  hangoutTemplates,
  moodSuggestions,
  chatMessages,
  interestCategories,
  availableSlots,
  currentUser,
  memories,
  friendActivities,
}
