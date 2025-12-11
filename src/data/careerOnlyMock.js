/**
 * Career-Only Mock Data
 */
export const careerEvents = [
  { id: 'hack-1', title: 'TechCrunch Disrupt Hackathon', description: 'Build the next big thing in 48 hours', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop', category: 'hackathon', mood: 'focus', date: 'weekend', time: 'Fri 6PM - Sun 6PM', location: 'Tech Campus Vienna', attendees: ['1', '3', '5'], attendeeCount: 156, isPublic: true, price: 'Free', prizes: '€10,000 Grand Prize', skills: ['React', 'Node.js', 'AI/ML'] },
  { id: 'hack-2', title: 'Climate Action Hack', description: 'Sustainability-focused hackathon', image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&h=400&fit=crop', category: 'hackathon', mood: 'focus', date: 'tomorrow', time: 'Sat 9AM - Sun 5PM', location: 'Green Innovation Hub', attendees: ['2', '4'], attendeeCount: 89, isPublic: true, price: 'Free', prizes: '€5,000', skills: ['Sustainability', 'IoT'] },
  { id: 'work-1', title: 'Advanced React Patterns', description: 'Deep dive into React performance', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop', category: 'workshop', mood: 'focus', date: 'today', time: '6:00 PM - 9:00 PM', location: 'TechHub Vienna', attendees: ['3'], attendeeCount: 24, isPublic: true, price: '€45', instructor: 'Maria Schmidt', skills: ['React', 'TypeScript'] },
  { id: 'work-2', title: 'UI/UX Design Sprint', description: 'Learn design thinking', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop', category: 'workshop', mood: 'focus', date: 'tomorrow', time: '10:00 AM - 5:00 PM', location: 'Design District', attendees: ['2', '4'], attendeeCount: 18, isPublic: true, price: '€75', instructor: 'Lukas Meyer', skills: ['Figma', 'User Research'] },
  { id: 'web-1', title: 'Startup Fundraising 101', description: 'How to pitch to VCs', image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop', category: 'webinar', mood: 'social', date: 'today', time: '7:00 PM - 8:30 PM', location: 'Online (Zoom)', attendees: ['5'], attendeeCount: 234, isPublic: true, price: 'Free', speaker: 'Peter Thiel', skills: ['Pitching', 'Fundraising'] },
  { id: 'web-2', title: 'AI in 2025', description: 'Latest trends in AI', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop', category: 'webinar', mood: 'focus', date: 'tomorrow', time: '5:00 PM - 6:30 PM', location: 'Online (Teams)', attendees: ['1', '3', '6'], attendeeCount: 512, isPublic: true, price: 'Free', speaker: 'Dr. Sarah Chen', skills: ['AI/ML', 'LLMs'] },
]

export const careerPosts = [
  { id: 'career-post-1', user: { id: '3', name: 'Jordan Kim', username: '@jordank', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face' }, mood: 'focus', moodCaption: 'just won 📚 first hackathon!', images: ['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop'], eventTitle: 'TechCrunch Disrupt Vienna', eventSubtitle: 'First Place Winner! 🏆', participants: [{ id: '1', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }], participantCount: 4, likes: 234, wishCount: 89, comments: [], createdAt: '5 hours ago', mutualFriends: 8, category: 'hackathon' },
]

export const careerCategories = [
  { id: 'hackathon', label: 'Hackathons', emoji: '🏆', count: 2 },
  { id: 'workshop', label: 'Workshops', emoji: '🛠️', count: 2 },
  { id: 'webinar', label: 'Webinars', emoji: '📺', count: 2 },
  { id: 'studybuddy', label: 'Study Buddy', emoji: '📚', count: 0 },
]

export default careerEvents


