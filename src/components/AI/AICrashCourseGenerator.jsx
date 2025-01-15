'use client'

import { useState } from 'react'
import axios from 'axios'
import { useGroqAI } from './useGroqAI'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader2, Book, AlertCircle, FileText, Link, Code, MessageSquare, BookOpen, ExternalLink, Globe, Youtube, Zap, Brain, Rocket, Target } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'
import CourseChat from './CourseChat'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism-tomorrow.css'

const highlightCode = (code) => {
  return Prism.highlight(code, Prism.languages.javascript, 'javascript')
}

export default function AICrashCourseGenerator() {
  const [input, setInput] = useState('')
  const [course, setCourse] = useState(null)
  const [isScrapingLoading, setIsScrapingLoading] = useState(false)
  const [isPresent, setisPresent] = useState(false)
  const [scrapingError, setScrapingError] = useState(null)
  const { generateCourse, isLoading, error: courseError } = useGroqAI()

  const handleInputChange = (e) => setInput(e.target.value)

  const scrapeWebsite = async (url) => {
    setIsScrapingLoading(true)
    setScrapingError(null)
    try {
      const response = await axios.get('/api/scrape', { 
        params: { url },
        timeout: 30000 // 30 seconds timeout
      })
      return response.data.content
    } catch (error) {
      console.error('Error scraping website:', error)
      if (error.code === 'ECONNABORTED') {
        setScrapingError('Request timed out. The website might be slow or unavailable.')
      } else if (error.response && error.response.status === 404) {
        setScrapingError('The requested page was not found. Please check the URL and try again.')
      } else {
        setScrapingError('Failed to scrape website content. Please check the URL and try again.')
      }
      throw error
    } finally {
      setIsScrapingLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let content = ''
    setisPresent(true)

    try {
      if (input.startsWith('http')) {
        content = await scrapeWebsite(input)
      } else {
        content = input
      }

      const generatedCourse = await generateCourse(content)
      setCourse(generatedCourse)
    } catch (error) {
      console.error('Error generating course:', error)
    }
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-8">
        <h1 className="text-6xl font-extrabold mb-8 text-center text-black drop-shadow-lg">
          AI Crash Course Generator
        </h1>
        
        {/* Bento Grid Layout */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ${isPresent ? 'hidden' : null}`}>
          <Card className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center">
              <Zap className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Quick Learning</h2>
              <p className="text-center text-gray-600">Generate courses in seconds and start learning immediately!</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center">
              <Brain className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">AI-Powered</h2>
              <p className="text-center text-gray-600">Leverage cutting-edge AI to create personalized learning experiences.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center">
              <Rocket className="w-12 h-12 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Boost Your Skills</h2>
              <p className="text-center text-gray-600">Accelerate your learning and stay ahead in your field.</p>
            </CardContent>
          </Card>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter a topic or URL"
              className="flex-grow text-lg rounded-xl border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Button 
              type="submit" 
              disabled={isLoading || isScrapingLoading}
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading || isScrapingLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isScrapingLoading ? 'Scraping...' : 'Generating...'}
                </>
              ) : (
                <>
                  <Target className="mr-2 h-5 w-5" />
                  Generate Course
                </>
              )}
            </Button>
          </div>
        </form>

        {(scrapingError || courseError) && (
          <Alert variant="destructive" className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl">
            <AlertCircle className="h-6 w-6 mr-2" />
            <AlertTitle className="font-bold">Error</AlertTitle>
            <AlertDescription>
              {scrapingError || courseError}
            </AlertDescription>
          </Alert>
        )}

        {course && (
          <Tabs defaultValue="outline" className="mt-8">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-white/50 backdrop-blur-md rounded-xl p-1">
              <TabsTrigger value="outline" className="text-lg font-semibold rounded-xl data-[state=active]:bg-white data-[state=active]:text-blue-600">Course Outline</TabsTrigger>
              <TabsTrigger value="chat" className="text-lg font-semibold rounded-xl data-[state=active]:bg-white data-[state=active]:text-blue-600">Course Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="outline">
              <Card className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-pink-500 text-white">
                  <CardTitle className="flex items-center text-2xl">
                    <Book className="mr-3 h-6 w-6" />
                    Generated Course Outline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[70vh] pr-4">
                    <Accordion type="single" collapsible className="w-full">
                      {course.map((chapter, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-blue-100">
                          <AccordionTrigger className="text-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
                            <div className="flex items-center">
                              <FileText className="mr-2 text-blue-500" />
                              Chapter {index + 1}: {chapter.title}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="mb-4 text-gray-700">{chapter.description}</p>
                            <h3 className="font-semibold mb-2 flex items-center text-blue-600">
                              <Link className="mr-2" />
                              Subtopics:
                            </h3>
                            <ul className="list-disc pl-6 mb-4">
                              {chapter.subtopics.map((subtopic, subIndex) => (
                                <li key={subIndex}>
                                  <Badge variant="secondary" className="mr-2 bg-blue-100 text-blue-600">
                                    {subIndex + 1}
                                  </Badge>
                                  <a href={`${input}#${subtopic.replace(/\s+/g, '-').toLowerCase()}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    {subtopic}
                                  </a>
                                </li>
                              ))}
                            </ul>
                            <h3 className="font-semibold mb-2 flex items-center text-blue-600">
                              <Code className="mr-2" />
                              Examples:
                            </h3>
                            <ul className="list-none pl-0">
                              {chapter.examples.map((example, exIndex) => (
                                <li key={exIndex} className="mb-4">
                                  <Badge variant="outline" className="mb-2 border-blue-300 text-blue-600">
                                    Example {exIndex + 1}
                                  </Badge>
                                  <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-2">
                                    <code dangerouslySetInnerHTML={{ __html: highlightCode(example) }} />
                                  </pre>
                                </li>
                              ))}
                            </ul>
                            <h3 className="font-semibold mb-2 flex items-center text-blue-600">
                              <BookOpen className="mr-2" />
                              Key Points:
                            </h3>
                            <ul className="list-disc pl-6 mb-4">
                              {chapter.keyPoints.map((point, pointIndex) => (
                                <li key={pointIndex} className="text-gray-700">{point}</li>
                              ))}
                            </ul>
                            <h3 className="font-semibold mb-2 flex items-center text-blue-600">
                              <ExternalLink className="mr-2" />
                              Resources:
                            </h3>
                            <ul className="list-none pl-0">
                              {chapter.resources.map((resource, resIndex) => (
                                <li key={resIndex} className="mb-2">
                                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline flex items-center">
                                    {resource.url.includes('youtube.com') ? (
                                      <Youtube className="mr-2 text-red-500" />
                                    ) : (
                                      <Globe className="mr-2 text-blue-500" />
                                    )}
                                    {resource.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chat">
              <CourseChat course={course} />
            </TabsContent>
          </Tabs>
        )}

       
      </div>
    </div>
  )
}

