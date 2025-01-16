import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, CheckCircle, XCircle } from 'lucide-react'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const CodeEditor = ({ language, code, setCode, output, setOutput, onEvaluate, feedback, testCases }) => {
  const editorRef = useRef(null)
  const [testResults, setTestResults] = useState([])

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
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

  const runTestCases = () => {
    if (editorRef.current) {
      const editorCode = editorRef.current.getValue()
      const results = testCases.map(testCase => {
        try {
          const testFunction = new Function(editorCode + `\nreturn ${testCase.input}`)
          const result = testFunction()
          return {
            input: testCase.input,
            expected: testCase.output,
            actual: result,
            passed: JSON.stringify(result) === JSON.stringify(testCase.output)
          }
        } catch (error) {
          return {
            input: testCase.input,
            expected: testCase.output,
            actual: `Error: ${error.message}`,
            passed: false
          }
        }
      })
      setTestResults(results)
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-2xl font-bold text-gray-800">Code Editor</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
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
            scrollBeyondLastLine: false,
          }}
        />
        <div className="flex flex-wrap gap-2">
          <Button onClick={onEvaluate} className="bg-blue-500 hover:bg-blue-600 text-white">
            Evaluate Code
          </Button>
          <Button onClick={handleRunCode} className="bg-green-500 hover:bg-green-600 text-white">
            <Play className="mr-2 h-4 w-4" />
            Run Code
          </Button>
          <Button onClick={runTestCases} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Run Test Cases
          </Button>
        </div>
        <Tabs defaultValue="output" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="output" className="text-sm font-medium">Output</TabsTrigger>
            <TabsTrigger value="feedback" className="text-sm font-medium">Feedback</TabsTrigger>
            <TabsTrigger value="testcases" className="text-sm font-medium">Test Cases</TabsTrigger>
          </TabsList>
          <TabsContent value="output" className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-bold mb-2 text-lg text-gray-700">Output:</h3>
            <pre className="whitespace-pre-wrap bg-white p-3 rounded border border-gray-200 text-gray-600 font-mono text-sm">
              {output || 'Run your code to see the output here.'}
            </pre>
          </TabsContent>
          <TabsContent value="feedback" className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-bold mb-2 text-lg text-gray-700">Feedback:</h3>
            <p className="whitespace-pre-wrap text-gray-600">{feedback || 'Evaluate your code to get feedback.'}</p>
          </TabsContent>
          <TabsContent value="testcases" className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-bold mb-2 text-lg text-gray-700">Test Cases:</h3>
            {testResults.length > 0 ? (
              <ul className="space-y-2">
                {testResults.map((result, index) => (
                  <li key={index} className={`flex items-center ${result.passed ? 'text-green-600' : 'text-red-600'} bg-white p-3 rounded border border-gray-200`}>
                    {result.passed ? <CheckCircle className="mr-2 h-5 w-5" /> : <XCircle className="mr-2 h-5 w-5" />}
                    <div>
                      <span className="font-medium">Input:</span> <code className="mx-1 bg-gray-100 px-1 py-0.5 rounded">{result.input}</code>
                      <span className="font-medium ml-2">Expected:</span> <code className="mx-1 bg-gray-100 px-1 py-0.5 rounded">{JSON.stringify(result.expected)}</code>
                      <span className="font-medium ml-2">Actual:</span> <code className="mx-1 bg-gray-100 px-1 py-0.5 rounded">{JSON.stringify(result.actual)}</code>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Run test cases to see results.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default CodeEditor

