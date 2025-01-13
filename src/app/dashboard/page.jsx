'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, Code2, Lightbulb, MonitorPlay, Users, Brain, Target, CheckCircle, HelpCircle } from 'lucide-react'
import { useEffect, useState } from "react"
import { BaseApiUrl } from "@/utils/constanst"
import Link from "next/link"

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [test, setTest] = useState([]);

  const fetchUser = async () => {
    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const json = await response.json();

    if (json) {
      console.log('asdf', json);
      setData(json.user.user);

      const response2 = await fetch(`http://localhost:4000/api/mocktest`, {
        method: 'GET',
        headers: {
          'userid': json.user.user.id
        }
      });

      console.log('wrking here..', json.user.user.id);


      const json2 = await response2.json();
      if (json2) {
        console.log(json2);
        setTest(json2.test)

        // setData(json.resume[0].data[0])

      }
      // dispatch(setUser(json.user));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen  text-blue-900 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Hello, {data.username} Your Learning Dashboard</h1>
        <p className="text-blue-600">Track your progress and upcoming activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Test Score Overview */}

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
                
                <Link target="_blank" href={``}> Join VR Classroom</Link>
                {/* <Link target="_blank" href={`https://framevr.io/classroommmm`}> Join VR Classroom</Link> */}

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



          {/* VR Classroom */}
          <Card className="bg-white shadow-lg">
          <CardHeader className="border-b border-blue-100">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <MonitorPlay className="w-5 h-5 text-blue-500" />
              Your Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-blue-600">Next Session: Introduction to GraphQL</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href={`/dashboard/resume/${data?.id}`}> Resume Link</Link>
                
              </Button>
            </div>
          </CardContent>
        </Card>

        {test.map((item,index) => (
          <Card className="col-span-full bg-white shadow-lg" key={index}>
            <CardHeader className="border-b border-blue-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-800">Mock Test Results</CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                  {item.data.testName}
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
                  <p className="text-3xl font-bold text-blue-800">{item.data.totalQuestions}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-blue-600">Correct Answers</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-800">{item.data.correctAnswers}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600">Score</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-800">{item.data.score}%</p>
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
                </div>{item.data.topics.map((badge,index)=>(

                  <Badge className="bg-blue-100 text-blue-600" key={index}>{badge}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))

        }
        {/* <Card className="col-span-full bg-white shadow-lg">
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
        </Card> */}

      
      </div>
    </div>
  )
}

