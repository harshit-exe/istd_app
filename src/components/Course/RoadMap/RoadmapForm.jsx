'use client'

import { useState } from 'react'
import { useGroqAI } from './useGroqAI'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const topics = [
  { name: 'JavaScript', icon: 'logos:javascript' },
  { name: 'HTML', icon: 'vscode-icons:file-type-html' },
  { name: 'CSS', icon: 'vscode-icons:file-type-css' },
  { name: 'React', icon: 'logos:react' },
  { name: 'Node.js', icon: 'logos:nodejs-icon' },
  { name: 'Python', icon: 'logos:python' },
  { name: 'Java', icon: 'logos:java' },
  { name: 'C++', icon: 'logos:c-plusplus' },
  { name: 'Ruby', icon: 'logos:ruby' },
  { name: 'PHP', icon: 'logos:php' },
  { name: 'Swift', icon: 'logos:swift' },
  { name: 'Kotlin', icon: 'logos:kotlin-icon' },
  { name: 'Go', icon: 'logos:go' },
  { name: 'Rust', icon: 'logos:rust' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'SQL', icon: 'vscode-icons:file-type-sql' },
  { name: 'MongoDB', icon: 'logos:mongodb-icon' },
  { name: 'GraphQL', icon: 'logos:graphql' },
  { name: 'Docker', icon: 'logos:docker-icon' },
  { name: 'Kubernetes', icon: 'logos:kubernetes' },
  { name: 'AWS', icon: 'logos:aws' },
  { name: 'Azure', icon: 'logos:microsoft-azure' },
  { name: 'Git', icon: 'logos:git-icon' },
  { name: 'M.L', icon: 'carbon:machine-learning-model' },
  { name: 'A.I', icon: 'carbon:ai-status' }
]

const timeframeOptions = [
  { value: '1 month', label: '1 Month' },
  { value: '3 months', label: '3 Months' },
  { value: '6 months', label: '6 Months' },
  { value: '1 year', label: '1 Year' },
  { value: '2 years', label: '2 Years' },
]

export default function RoadmapForm({ setRoadmapData, onComplete }) {
  const [selectedTopics, setSelectedTopics] = useState([])
  const [timeframe, setTimeframe] = useState('')
  const [customTimeframe, setCustomTimeframe] = useState('')
  const { generateSubtasks, isLoading, error } = useGroqAI()

  const handleTopicToggle = (topicName) => {
    setSelectedTopics(prev => 
      prev.includes(topicName)
        ? prev.filter(t => t !== topicName)
        : [...prev, topicName]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const finalTimeframe = timeframe === 'custom' ? customTimeframe : timeframe
    const prompt = `Create a detailed learning roadmap for ${selectedTopics.join(', ')} with a timeframe of ${finalTimeframe}. Include main topics, subtopics, and resource links for each step.`
    const roadmapSteps = await generateSubtasks(prompt)
    
    if (Array.isArray(roadmapSteps) && roadmapSteps.length > 0) {
      setRoadmapData(roadmapSteps)
      onComplete()
    } else {
      console.error('Invalid roadmap data received:', roadmapSteps)
      // Handle the error, maybe set an error state or show a message to the user
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <Label htmlFor="topics" className="text-lg font-medium text-gray-700 mb-6">Select Multiple Topics :</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {topics.map((t) => (
            <Button
              key={t.name}
              type="button"
              onClick={() => handleTopicToggle(t.name)}
              variant={selectedTopics.includes(t.name) ? "default" : "outline"}
              className="flex items-center justify-center h-20 text-lg"
            >
              {t.icon && <Icon icon={t.icon} className=" w-6 h-6 mr-2" />}
              <span>{t.name}</span>
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="timeframe" className="text-lg font-medium text-gray-700 mb-3">Timeframe:</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {timeframeOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              onClick={() => setTimeframe(option.value)}
              variant={timeframe === option.value ? "default" : "outline"}
            >
              {option.label}
            </Button>
          ))}
          <Button
            type="button"
            onClick={() => setTimeframe('custom')}
            variant={timeframe === 'custom' ? "default" : "outline"}
          >
            Custom
          </Button>
        </div>
        {timeframe === 'custom' && (
          <Input
            type="text"
            value={customTimeframe}
            onChange={(e) => setCustomTimeframe(e.target.value)}
            placeholder="Enter custom timeframe"
            className="mt-4"
          />
        )}
      </div>
      <Button
        type="submit"
        className="w-full text-lg font-semibold h-12"
        disabled={isLoading || selectedTopics.length === 0 || (!timeframe && !customTimeframe)}
      >
        {isLoading ? (
          <>
            <Icon icon="eos-icons:loading" className="animate-spin mr-2" />
            Generating...
          </>
        ) : (
          <>
            <Icon icon="carbon:roadmap" className="mr-2" />
            Generate Roadmap
          </>
        )}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  )
}

