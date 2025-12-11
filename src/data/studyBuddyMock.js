/**
 * StudyBuddy Mock Data
 */
export const universities = [
  { id: 'uniwien', name: 'Universität Wien', city: 'Vienna', studentCount: 89000 },
  { id: 'tuwien', name: 'TU Wien', city: 'Vienna', studentCount: 28000 },
  { id: 'wuwien', name: 'WU Wien', city: 'Vienna', studentCount: 21000 },
  { id: 'boku', name: 'BOKU Vienna', city: 'Vienna', studentCount: 11000 },
  { id: 'meduni', name: 'MedUni Wien', city: 'Vienna', studentCount: 8000 },
]

export const subjects = [
  { id: 'cs', name: 'Computer Science', category: 'STEM', popularCourses: ['Algorithms', 'Data Structures', 'Machine Learning'] },
  { id: 'math', name: 'Mathematics', category: 'STEM', popularCourses: ['Calculus', 'Linear Algebra', 'Statistics'] },
  { id: 'physics', name: 'Physics', category: 'STEM', popularCourses: ['Mechanics', 'Quantum Physics'] },
  { id: 'business', name: 'Business Administration', category: 'Business', popularCourses: ['Marketing', 'Finance'] },
  { id: 'economics', name: 'Economics', category: 'Business', popularCourses: ['Microeconomics', 'Macroeconomics'] },
  { id: 'law', name: 'Law', category: 'Humanities', popularCourses: ['Constitutional Law', 'Civil Law'] },
  { id: 'medicine', name: 'Medicine', category: 'Health', popularCourses: ['Anatomy', 'Physiology'] },
  { id: 'psychology', name: 'Psychology', category: 'Social Sciences', popularCourses: ['Cognitive Psych', 'Clinical Psych'] },
  { id: 'biology', name: 'Biology', category: 'STEM', popularCourses: ['Genetics', 'Molecular Biology'] },
  { id: 'chemistry', name: 'Chemistry', category: 'STEM', popularCourses: ['Organic Chem', 'Inorganic Chem'] },
  { id: 'engineering', name: 'Engineering', category: 'STEM', popularCourses: ['Mechanics', 'Electronics'] },
  { id: 'architecture', name: 'Architecture', category: 'Design', popularCourses: ['Design Studio', 'Building Tech'] },
]

export const studyStyles = [
  { id: 'quiet', label: 'Quiet / Solo Focus', emoji: '🤫', description: 'Prefer silent study with minimal interaction' },
  { id: 'pair', label: 'Study Pair', emoji: '👥', description: 'One-on-one focused sessions' },
  { id: 'group', label: 'Group Study', emoji: '👥👥', description: 'Collaborative learning with 3-6 people' },
  { id: 'teaching', label: 'Teaching/Tutoring', emoji: '🎓', description: 'Explain concepts to learn them better' },
]

export const languages = [
  { id: 'de', name: 'German', native: 'Deutsch' },
  { id: 'en', name: 'English', native: 'English' },
  { id: 'fr', name: 'French', native: 'Français' },
]

export const studyBuddyUsers = [
  { id: 'sb-1', name: 'Sophie Weber', username: '@sophiew', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face', university: 'uniwien', subject: 'cs', course: 'Machine Learning', semester: 5, studyStyle: 'pair', languages: ['de', 'en'], availability: { today: true, tomorrow: true, weekend: false }, preferredTimes: ['afternoon', 'evening'], rating: 4.9, studySessions: 34, bio: 'CS student passionate about AI.', matchScore: 95, mutualFriends: 3, distance: 1.2 },
  { id: 'sb-2', name: 'Max Müller', username: '@maxm', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', university: 'tuwien', subject: 'engineering', course: 'Mechanics', semester: 3, studyStyle: 'group', languages: ['de', 'en'], availability: { today: false, tomorrow: true, weekend: true }, preferredTimes: ['morning', 'afternoon'], rating: 4.7, studySessions: 21, bio: 'Engineering student at TU Wien.', matchScore: 88, mutualFriends: 5, distance: 2.5 },
  { id: 'sb-3', name: 'Lisa Chen', username: '@lisac', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face', university: 'wuwien', subject: 'business', course: 'Finance', semester: 4, studyStyle: 'pair', languages: ['en'], availability: { today: true, tomorrow: true, weekend: true }, preferredTimes: ['afternoon', 'evening'], rating: 4.8, studySessions: 45, bio: 'WU student specializing in Finance.', matchScore: 92, mutualFriends: 2, distance: 0.8 },
  { id: 'sb-4', name: 'Thomas Bauer', username: '@thomasb', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face', university: 'uniwien', subject: 'math', course: 'Linear Algebra', semester: 2, studyStyle: 'teaching', languages: ['de'], availability: { today: true, tomorrow: false, weekend: true }, preferredTimes: ['morning', 'afternoon'], rating: 5.0, studySessions: 67, bio: 'Math tutor and student.', matchScore: 85, mutualFriends: 1, distance: 3.1 },
  { id: 'sb-5', name: 'Anna Kovacs', username: '@annak', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face', university: 'meduni', subject: 'medicine', course: 'Anatomy', semester: 3, studyStyle: 'group', languages: ['de', 'en'], availability: { today: false, tomorrow: true, weekend: true }, preferredTimes: ['evening'], rating: 4.6, studySessions: 28, bio: 'Med student at MedUni.', matchScore: 78, mutualFriends: 4, distance: 4.2 },
  { id: 'sb-6', name: 'David Park', username: '@davidp', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', university: 'tuwien', subject: 'cs', course: 'Algorithms', semester: 4, studyStyle: 'pair', languages: ['en', 'de'], availability: { today: true, tomorrow: true, weekend: false }, preferredTimes: ['afternoon', 'evening'], rating: 4.9, studySessions: 52, bio: 'CS major focusing on algorithms.', matchScore: 97, mutualFriends: 6, distance: 1.5 },
]

export const estimatedCounts = { 'Vienna': 800000, 'Graz': 250000, 'Linz': 180000, 'uniwien': 89000, 'tuwien': 28000, 'wuwien': 21000, 'boku': 11000, 'meduni': 8000, 'cs': 15000, 'math': 8000, 'physics': 5000, 'business': 25000, 'economics': 12000, 'law': 18000, 'medicine': 8000, 'psychology': 14000 }

export const cities = [
  { id: 'vienna', name: 'Vienna', population: 1900000, studentPopulation: 180000 },
  { id: 'graz', name: 'Graz', population: 290000, studentPopulation: 55000 },
  { id: 'linz', name: 'Linz', population: 210000, studentPopulation: 30000 },
  { id: 'salzburg', name: 'Salzburg', population: 155000, studentPopulation: 22000 },
  { id: 'innsbruck', name: 'Innsbruck', population: 130000, studentPopulation: 35000 },
]

export default studyBuddyUsers


