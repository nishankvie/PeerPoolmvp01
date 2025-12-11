/**
 * Onboarding Screen
 * 
 * Welcome flow for new users to:
 * 1. Set up their profile
 * 2. Select interests
 * 3. Choose what they're looking for
 * 
 * Features:
 * - Multi-step wizard with progress indicator
 * - Interest category selection with visual feedback
 * - Accessible form controls
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Sparkles, Users, Calendar, Gamepad2, BookOpen, PartyPopper } from 'lucide-react'
import { Button, Card, Input } from '../components/ui'
import { interestCategories } from '../data/mockData'

const lookingForOptions = [
  { id: 'study', label: 'Study Partners', icon: BookOpen, description: 'Find people to learn with' },
  { id: 'gaming', label: 'Gaming Buddies', icon: Gamepad2, description: 'Team up for games' },
  { id: 'events', label: 'Event Companions', icon: PartyPopper, description: 'Go to events together' },
  { id: 'hackathons', label: 'Hackathon Teams', icon: Users, description: 'Build projects together' },
]

function Onboarding({ onComplete }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    selectedInterests: [],
    lookingFor: [],
  })
  
  const totalSteps = 3
  
  // Toggle interest selection
  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter(i => i !== interest)
        : [...prev.selectedInterests, interest]
    }))
  }
  
  // Toggle looking for option
  const toggleLookingFor = (id) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(id)
        ? prev.lookingFor.filter(i => i !== id)
        : [...prev.lookingFor, id]
    }))
  }
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Complete onboarding
      if (onComplete) {
        onComplete()
      } else {
        navigate('/feed')
      }
    }
  }
  
  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.length > 0
      case 2:
        return formData.selectedInterests.length >= 3
      case 3:
        return formData.lookingFor.length > 0
      default:
        return true
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="container-app py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center text-white font-bold text-lg">
            M8
          </div>
          <span className="font-display font-bold text-xl text-gray-900">MatchM8</span>
        </div>
      </header>
      
      <main className="container-app pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-12" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={totalSteps}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
              <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Step 1: Welcome & Basic Info */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to MatchM8
                </h1>
                <p className="text-xl text-gray-600 max-w-lg mx-auto">
                  Find your perfect study partner, gaming buddy, or event companion. Let's get you set up!
                </p>
              </div>
              
              <Card padding="lg" className="space-y-6">
                <Input
                  label="What should we call you?"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  autoFocus
                />
                
                <Input
                  label="Where are you based?"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  helper="This helps us find matches near you"
                />
              </Card>
            </div>
          )}
          
          {/* Step 2: Interest Selection */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  What are you into?
                </h1>
                <p className="text-xl text-gray-600">
                  Select at least 3 interests to help us find your best matches.
                </p>
              </div>
              
              <div className="space-y-6">
                {interestCategories.map((category) => (
                  <Card key={category.id} padding="md">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                      <span className="text-2xl">{category.icon}</span>
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.interests.map((interest) => {
                        const isSelected = formData.selectedInterests.includes(interest)
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`
                              px-4 py-2 rounded-full text-sm font-medium
                              transition-all duration-200
                              ${isSelected
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }
                            `}
                            aria-pressed={isSelected}
                          >
                            {isSelected && <Check className="inline w-4 h-4 mr-1" />}
                            {interest}
                          </button>
                        )
                      })}
                    </div>
                  </Card>
                ))}
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-6">
                {formData.selectedInterests.length} of 3 minimum selected
              </p>
            </div>
          )}
          
          {/* Step 3: Looking For */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  What are you looking for?
                </h1>
                <p className="text-xl text-gray-600">
                  Select all that apply. You can always change this later.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lookingForOptions.map((option) => {
                  const isSelected = formData.lookingFor.includes(option.id)
                  const Icon = option.icon
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleLookingFor(option.id)}
                      className={`
                        p-6 rounded-md border-2 text-left
                        transition-all duration-200
                        ${isSelected
                          ? 'border-primary bg-primary-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                        }
                      `}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`
                          w-12 h-12 rounded-lg flex items-center justify-center
                          ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
                        `}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {option.label}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            {step > 1 ? (
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : (
              <div />
            )}
            
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
              icon={ArrowRight}
              iconPosition="right"
            >
              {step === totalSteps ? "Get Started" : "Continue"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Onboarding


