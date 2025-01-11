'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, Code2, Lightbulb, MonitorPlay, Users, Brain, Target, CheckCircle, HelpCircle } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen  text-blue-900 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">My Learning Dashboard</h1>
        <p className="text-blue-600">Track your progress and upcoming activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Test Score Overview */}
        <Card className="col-span-full bg-white shadow-lg">
          <CardHeader className="border-b border-blue-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-800">Mock Test Results</CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                mytest
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-600">Total Questions</span>
                </div>
                <p className="text-3xl font-bold text-blue-800">5</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-blue-600">Correct Answers</span>
                </div>
                <p className="text-3xl font-bold text-blue-800">1</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-600">Score</span>
                </div>
                <p className="text-3xl font-bold text-blue-800">20%</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-blue-600">Hints Used</span>
                </div>
                <p className="text-3xl font-bold text-blue-800">0</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-600">Topics Covered</span>
              </div>
              <Badge className="bg-blue-100 text-blue-600">Node.js</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Mentoring */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="border-b border-blue-100">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Recent Mentoring Session
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-800">Advanced Node.js Patterns</h3>
                <p className="text-sm text-blue-600">with Sarah Johnson</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Clock className="w-4 h-4" />
                <span>2 hours ago</span>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                View Session Notes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* VR Classroom */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="border-b border-blue-100">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <MonitorPlay className="w-5 h-5 text-blue-500" />
              VR Classroom
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-blue-600">Next Session: Introduction to GraphQL</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Join VR Classroom
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="border-b border-blue-100">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">Advanced Node.js Workshop</p>
                  <p className="text-sm text-blue-600">Tomorrow, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                <Users className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">Tech Meetup</p>
                  <p className="text-sm text-blue-600">Jan 15, 6:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Tips */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="border-b border-blue-100">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Interview Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {[
                "Practice Node.js fundamentals",
                "Review async/await patterns",
                "Prepare system design examples"
              ].map((tip, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <p className="text-blue-700">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

