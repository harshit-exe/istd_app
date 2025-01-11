"use client"

import React, { useState, useEffect, useRef } from 'react'
import { useGroqAI } from './useGroqAI'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader2, Code, Lightbulb, RefreshCw, Play } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
]

const GroqAICodingAssistant = () => {
  const [language, setLanguage] = useState('javascript')
  const [task, setTask] = useState('')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [fullCode, setFullCode] = useState('')
  const { generateTask, evaluateCode, isLoading, error } = useGroqAI()
  const editorRef = useRef(null)

  useEffect(() => {
    handleGenerateTask()
  }, [language])

  const handleGenerateTask = async () => {
    const newTask = await generateTask(language)
    setTask(newTask.replace(/\*\*/g, ''))
    setCode('')
    setOutput('')
    setFeedback('')
    setShowHint(false)
    setFullCode('')
  }

  const handleEvaluateCode = async () => {
    const evaluation = await evaluateCode(language, task, code)
    setFeedback(evaluation.replace(/\*\*/g, ''))
  }

  const handleShowHint = async () => {
    if (!showHint) {
      const hint = await generateTask(language + ' hint')
      setTask(prevTask => prevTask + '\n\nHint: ' + hint.replace(/\*\*/g, ''))
      setShowHint(true)
    }
  }

  const handleShowFullCode = async () => {
    if (!fullCode) {
      const solution = await generateTask(language + ' full solution')
      setFullCode(solution.replace(/\*\*/g, ''))
    }
  }

  const handleRunCode = () => {
    if (editorRef.current) {
      const editorCode = editorRef.current.getValue()
      try {
        let result
        switch (language) {
          case 'javascript':
            // Capture console.log output
            const originalLog = console.log
            let output = ''
            console.log = (...args) => {
              output += args.join(' ') + '\n'
            }
            // Use Function constructor to create a sandboxed environment
            new Function(editorCode)()
            console.log = originalLog
            result = output || "Code executed successfully, but produced no output."
            break
          case 'python':
          case 'java':
            result = "Code execution for Python and Java is not supported in the browser."
            break
          default:
            result = "Unsupported language"
        }
        setOutput(result)
      } catch (error) {
        setOutput(`Error: ${error.message}`)
      }
    }
  }

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <Card className="shadow-lg">
        <CardHeader className=" text-blue-500">
          <CardTitle className="flex justify-between items-center">
            <span className="text-2xl">Coding Challenge</span>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[140px] bg-white text-black">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="task">
                <AccordionTrigger>Task Description</AccordionTrigger>
                <AccordionContent>
                  <p className="whitespace-pre-wrap">{task || 'Click "New Challenge" to get started.'}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={handleShowHint} disabled={isLoading || showHint}>
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Hint
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get a hint for the current task</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={handleShowFullCode} disabled={isLoading}>
                    <Code className="w-4 h-4 mr-2" />
                    Full Solution
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Full Solution</DialogTitle>
                  </DialogHeader>
                  <MonacoEditor
                    height="60vh"
                    language={language}
                    theme="vs-dark"
                    value={fullCode}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      wordWrap: 'on',
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            {feedback && (
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Feedback:</h3>
                <p className="whitespace-pre-wrap">{feedback}</p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <MonacoEditor
              height="40vh"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
              }}
            />
            <div className="flex justify-between">
              <Button onClick={handleEvaluateCode} disabled={isLoading || !code} className="bg-green-500 hover:bg-green-600">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Evaluate Code
              </Button>
              <Button onClick={handleRunCode} disabled={isLoading || !code} className="bg-yellow-500 hover:bg-yellow-600">
                <Play className="mr-2 h-4 w-4" />
                Run Code
              </Button>
              <Button onClick={handleGenerateTask} disabled={isLoading} className="bg-blue-500 hover:bg-blue-600">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                New Challenge
              </Button>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <h3 className="font-bold mb-2">Output:</h3>
              <pre className="whitespace-pre-wrap">{output || 'Run your code to see the output here.'}</pre>
            </div>
          </div>
        </CardContent>
      </Card>
      {error && <p className="text-red-500 font-bold">{error}</p>}
    </div>
  )
}

export default GroqAICodingAssistant

