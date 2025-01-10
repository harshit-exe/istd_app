'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import RoadmapForm from '@/components/Course/RoadMap/RoadmapForm'
import RoadmapVisualization from '@/components/Course/RoadMap/RoadmapVisualization'

export default function Home() {
  const [roadmapData, setRoadmapData] = useState(null)
  const [showForm, setShowForm] = useState(true)

  const toggleForm = () => setShowForm(!showForm)

  return (
    <div className="min-h-screen  py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-indigo-800 tracking-tight">
          Custom Roadmap Generator
        </h1>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {showForm ? (
            <RoadmapForm setRoadmapData={setRoadmapData} onComplete={() => setShowForm(false)} />
          ) : (
            <Button onClick={toggleForm} className="mb-8">
              <Icon icon="mdi:form-select" className="mr-2" />
              Show Form
            </Button>
          )}
          {roadmapData && <RoadmapVisualization roadmapData={roadmapData} />}
        </div>
      </div>
    </div>
  )
}

