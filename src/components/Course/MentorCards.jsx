'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, CuboidIcon as Cube } from 'lucide-react'
import Image from "next/image"


const mentors = [
  {
    name: "Dr. Sarah Johnson",
    photo: "/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300",
    expertise: ["Frontend Development", "UI/UX Design"],
    description: "Expert in creating intuitive and responsive user interfaces with 10+ years of experience.",
  },
  {
    name: "Michael Chen",
    photo: "/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300",
    expertise: ["Backend Development", "Database Design"],
    description: "Specializes in scalable backend architectures and efficient database systems.",
  },
  {
    name: "Emily Rodriguez",
    photo: "/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300",
    expertise: ["Full Stack Development", "DevOps"],
    description: "Full stack developer with expertise in cloud technologies and CI/CD pipelines.",
  },
]

export default function MentorCards() {
  const [selectedMentor, setSelectedMentor] = useState(null)

  const handleVideoCall = (mentorName) => {
    setSelectedMentor(mentorName)
    window.open('https://example.com/video-call', '_blank')
  }

  const handleMetaverseJoin = (mentorName) => {
    setSelectedMentor(mentorName)
    window.open('https://example.com/metaverse', '_blank')
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-bold text-center mb-12 text-purple-600 tracking-tight">
        Meet Our Expert Mentors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((mentor, index) => (
          <Card
            key={index}
            className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 border-purple-100 border-2"
          >
            <div className="relative h-64">
              <Image
                src={mentor.photo}
                alt={mentor.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600 to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-2xl font-bold text-white">
                  {mentor.name}
                </h2>
              </div>
            </div>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertise.map((skill, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-purple-50 text-purple-600 border border-purple-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-600 mb-4">{mentor.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => handleVideoCall(mentor.name)}
              >
                <Video className="w-4 h-4 mr-2" />
                Join Video Call
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleMetaverseJoin(mentor.name)}
              >
                <Cube className="w-4 h-4 mr-2" />
                Join in Metaverse
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedMentor && (
        <p className="mt-8 text-center text-lg text-purple-600">
          You've selected to connect with {selectedMentor}. Check your new browser tab for the connection.
        </p>
      )}
    </div>
  )
}

