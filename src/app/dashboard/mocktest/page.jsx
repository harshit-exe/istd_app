'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGroqAI } from '@/components/Course/Mock Interview/useGroqAI'
import TopicSelector from '@/components/Course/MockTest/TopicSelector'
import TestSettings from '@/components/Course/MockTest/TestSettings'
import QuizComponent from '@/components/Course/MockTest/QuizComponent'
import ResultComponent from '@/components/Course/MockTest/ResultComponent'


export default function Home() {
    const [selectedTopics, setSelectedTopics] = useState([])
    const [questionCount, setQuestionCount] = useState(10)
    const [timeLimit, setTimeLimit] = useState(30)
    const [questions, setQuestions] = useState([])
    const [quizStarted, setQuizStarted] = useState(false)
    const [quizFinished, setQuizFinished] = useState(false)
    const [results, setResults] = useState(null)
    const [testName, setTestName] = useState('')
  
    const { generateQuestions, isLoading, error } = useGroqAI()
  
    const handleStartQuiz = async () => {
      const generatedQuestions = await generateQuestions(selectedTopics, questionCount, testName)
      setQuestions(generatedQuestions)
      setQuizStarted(true)
    }
  
    const handleFinishQuiz = (results) => {
      setResults(results)
      setQuizFinished(true)
    }
  
    return (
      <div className="min-h-screen  py-8 px-4 sm:px-6 ">
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl font-extrabold text-center mb-8 text-black"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Mock Test Generator
          </motion.h1>
          <AnimatePresence mode="wait">
            {!quizStarted && !quizFinished && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-2xl p-6"
              >
                <TopicSelector
                  selectedTopics={selectedTopics}
                  setSelectedTopics={setSelectedTopics}
                />
                <TestSettings
                  questionCount={questionCount}
                  setQuestionCount={setQuestionCount}
                  timeLimit={timeLimit}
                  setTimeLimit={setTimeLimit}
                  testName={testName}
                  setTestName={setTestName}
                />
                <motion.button
                  onClick={handleStartQuiz}
                  disabled={isLoading || selectedTopics.length === 0}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg disabled:opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? 'Generating Questions...' : 'Start Quiz'}
                </motion.button>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
              </motion.div>
            )}
            {quizStarted && !quizFinished && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <QuizComponent
                  questions={questions}
                  timeLimit={timeLimit}
                  onFinish={handleFinishQuiz}
                />
              </motion.div>
            )}
            {quizFinished && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ResultComponent 
                  results={results} 
                  testName={testName}
                  topics={selectedTopics}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }
  
  
