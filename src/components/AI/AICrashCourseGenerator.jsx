'use client'

import { useState } from 'react'
import axios from 'axios'
import { useGroqAI } from './useGroqAI'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader2, Book, AlertCircle, FileText, Link, Code, MessageSquare, BookOpen, ExternalLink, Globe, Youtube } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import CourseChat from './CourseChat'
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';

const highlightCode = (code) => {
  return Prism.highlight(code, Prism.languages.javascript, 'javascript');
};

export default function AICrashCourseGenerator() {
  const [input, setInput] = useState('')
  const [course, setCourse] = useState(null)
  const [isScrapingLoading, setIsScrapingLoading] = useState(false)
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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">AI Crash Course Generator</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a topic or URL"
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading || isScrapingLoading}>
            {isLoading || isScrapingLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isScrapingLoading ? 'Scraping...' : 'Generating...'}
              </>
            ) : (
              'Generate Course'
            )}
          </Button>
        </div>
      </form>

      {(scrapingError || courseError) && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {scrapingError || courseError}
          </AlertDescription>
        </Alert>
      )}

      {course && (
        <Tabs defaultValue="outline" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="outline">Course Outline</TabsTrigger>
            <TabsTrigger value="chat">Course Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="outline">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2" />
                  Generated Course Outline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <Accordion type="single" collapsible className="w-full">
                    {course.map((chapter, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center">
                            <FileText className="mr-2" />
                            Chapter {index + 1}: {chapter.title}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="mb-4">{chapter.description}</p>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <Link className="mr-2" />
                            Subtopics:
                          </h3>
                          <ul className="list-disc pl-6 mb-4">
                            {chapter.subtopics.map((subtopic, subIndex) => (
                              <li key={subIndex}>
                                <Badge variant="secondary" className="mr-2">
                                  {subIndex + 1}
                                </Badge>
                                <a href={`${input}#${subtopic.replace(/\s+/g, '-').toLowerCase()}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                  {subtopic}
                                </a>
                              </li>
                            ))}
                          </ul>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <Code className="mr-2" />
                            Examples:
                          </h3>
                          <ul className="list-none pl-0">
                            {chapter.examples.map((example, exIndex) => (
                              <li key={exIndex} className="mb-4">
                                <Badge variant="outline" className="mb-2">
                                  Example {exIndex + 1}
                                </Badge>
                                <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                                  <code dangerouslySetInnerHTML={{ __html: highlightCode(example) }} />
                                </pre>
                              </li>
                            ))}
                          </ul>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <BookOpen className="mr-2" />
                            Key Points:
                          </h3>
                          <ul className="list-disc pl-6 mb-4">
                            {chapter.keyPoints.map((point, pointIndex) => (
                              <li key={pointIndex}>{point}</li>
                            ))}
                          </ul>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <ExternalLink className="mr-2" />
                            Resources:
                          </h3>
                          <ul className="list-none pl-0">
                            {chapter.resources.map((resource, resIndex) => (
                              <li key={resIndex} className="mb-2">
                                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                                  {resource.url.includes('youtube.com') ? (
                                    <Youtube className="mr-2 text-red-500" />
                                  ) : (
                                    <Globe className="mr-2" />
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
  )
}

