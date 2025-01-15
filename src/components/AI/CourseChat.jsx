'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, User, Bot, ChevronDown, ChevronUp } from 'lucide-react'
import Typewriter from './Typewriter'

export default function CourseChat({ course }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [expandedMessages, setExpandedMessages] = useState({})
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, expandedMessages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, course }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message, isTyping: true }])
      
      // Simulate typing effect
      setTimeout(() => {
        setMessages(prev => prev.map((msg, idx) => 
          idx === prev.length - 1 ? { ...msg, isTyping: false } : msg
        ))
      }, data.message.length * 20) // Adjust timing based on message length
    } catch (error) {
      console.error('Error in chat:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMessageExpansion = (index) => {
    setExpandedMessages(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Send className="mr-2" />
          Course Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow mb-4 pr-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-lg max-w-[80%] ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {message.role === 'assistant' && message.isTyping ? (
                    <Typewriter text={message.content} />
                  ) : (
                    <>
                      {expandedMessages[index] || message.content.length <= 100 ? (
                        <div>{message.content}</div>
                      ) : (
                        <>
                          <div>{message.content.slice(0, 100)}...</div>
                          <Button 
                            variant="link" 
                            onClick={() => toggleMessageExpansion(index)}
                            className="p-0 h-auto font-normal text-blue-500"
                          >
                            Read More <ChevronDown className="ml-1 h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {expandedMessages[index] && message.content.length > 100 && (
                        <Button 
                          variant="link" 
                          onClick={() => toggleMessageExpansion(index)}
                          className="p-0 h-auto font-normal text-blue-500"
                        >
                          Show Less <ChevronUp className="ml-1 h-4 w-4" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${message.role === 'user' ? 'bg-blue-500 ml-2' : 'bg-gray-500 mr-2'}`}>
                  {message.role === 'user' ? <User className="text-white w-5 h-5" /> : <Bot className="text-white w-5 h-5" />}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the course..."
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
