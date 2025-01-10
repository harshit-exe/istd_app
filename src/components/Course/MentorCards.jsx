'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, CuboidIcon as Cube } from 'lucide-react'
import Image from "next/image"


const mentors = [
  {
    id:1,
    name: "Aman Gupta",
    photo: "https://media.licdn.com/dms/image/v2/D4D03AQE6U8fSOxLvjg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1687175656830?e=1741824000&v=beta&t=oyUDaGIWm9sdLPJ2dzFcvceQ_HubGBWEaK3KA2dZP9A",
    expertise: ["Frontend Development", "UI/UX Design"],
    description: "Expert in creating intuitive and responsive user interfaces with 10+ years of experience.",
  },
  {
    id:2,
    name: "Ritesh Mane",
    photo: "https://media.licdn.com/dms/image/v2/D4E03AQEQrPN9VftV1A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690427043181?e=1741824000&v=beta&t=uBxmvCrL85xXbvGgSi1HReMfQ3tZlbSppVseYN5l-v8",
    expertise: ["Backend Development", "Database Design"],
    description: "Specializes in scalable backend architectures and efficient database systems.",
  },
  {
    id:3,
    name: "Prajjval Jaiswal",
    photo: "https://media.licdn.com/dms/image/v2/D4E03AQFs1_1RGordAA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723619753528?e=1741824000&v=beta&t=zr06OqW8HTMegBHzNcFRB5sKhr2sxgxVjei9FcbhKaw",
    expertise: ["Full Stack Development", "DevOps"],
    description: "Full stack developer with expertise in cloud technologies and CI/CD pipelines.",
  },
]

export default function MentorCards() {
  const [selectedMentor, setSelectedMentor] = useState(null)
  
  const joinMeeting = (roomID) => {
    const url = `/meeting/${roomID}`
    window.open(url, '_blank')
  }
  console

  const handleVideoCall = (mentorName) => {
    setSelectedMentor(mentorName)
    window.open('https://example.com/video-call', '_blank')
  }

  const handleMetaverseJoin = (mentorName) => {
    setSelectedMentor(mentorName)
    window.open('https://framevr.io/mentor', '_blank')
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-bold text-center mb-12 text-blue-600 tracking-tight">
        Meet Our Expert Mentors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((mentor, index) => (
          <Card
            key={index}
            className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 border-blue-100 border-2"
          >
            <div className="relative h-64">
              <Image
                src={mentor.photo}
                alt={mentor.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent opacity-70" />
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
                    className="bg-blue-50 text-blue-600 border border-blue-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-600 mb-4">{mentor.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() =>{ 
                  joinMeeting(mentor.id)
                  handleVideoCall(mentor.name)}}
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
        <p className="mt-8 text-center text-lg text-blue-600">
          You've selected to connect with {selectedMentor}. Check your new browser tab for the connection.
        </p>
      )}
    </div>
  )
}

