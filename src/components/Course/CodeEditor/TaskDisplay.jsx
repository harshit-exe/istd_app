import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TaskDisplay = ({ task }) => {
  const highlightKeywords = (text) => {
    const keywords = ['function', 'return', 'if', 'else', 'for', 'while', 'class', 'const', 'let', 'var']
    return text.split(' ').map((word, index) => 
      keywords.includes(word.toLowerCase()) 
        ? <span key={index} className="font-semibold text-blue-600">{word} </span>
        : word + ' '
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-2xl font-bold text-gray-800">{task.name || 'Coding Challenge'}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description" className="text-sm font-medium">Description</TabsTrigger>
            <TabsTrigger value="details" className="text-sm font-medium">Details</TabsTrigger>
            <TabsTrigger value="example" className="text-sm font-medium">Example</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4">
            <h3 className="font-bold mb-2 text-lg text-gray-700">Task Description:</h3>
            <p className="whitespace-pre-wrap text-gray-600">{highlightKeywords(task.description)}</p>
          </TabsContent>
          <TabsContent value="details" className="p-4">
            <h3 className="font-bold mb-2 text-lg text-gray-700">Details:</h3>
            <p className="whitespace-pre-wrap text-gray-600">{highlightKeywords(task.details)}</p>
          </TabsContent>
          <TabsContent value="example" className="p-4">
            <h3 className="font-bold mb-2 text-lg text-gray-700">Example:</h3>
            <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-200 text-gray-600 font-mono text-sm">
              {task.example}
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default TaskDisplay

