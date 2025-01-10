import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, HelpCircle, Clock } from 'lucide-react'

export default function QuizComponent({ questions, timeLimit, onFinish }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(''))
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintUsed, setHintUsed] = useState(new Array(questions.length).fill(false))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          handleFinish()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answer
    setSelectedAnswers(newAnswers)
    setIsAnswered(true)
    setShowHint(false)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setIsAnswered(selectedAnswers[currentQuestion + 1] !== '')
      setShowHint(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setIsAnswered(selectedAnswers[currentQuestion - 1] !== '')
      setShowHint(false)
    }
  }

  const handleFinish = () => {
    const results = questions.map((question, index) => ({
      ...question,
      userAnswer: selectedAnswers[index],
      isCorrect: selectedAnswers[index] === question.correctAnswer,
      hintUsed: hintUsed[index]
    }))
    onFinish(results)
  }

  const toggleHint = () => {
    if (!showHint && !hintUsed[currentQuestion]) {
      const newHintUsed = [...hintUsed]
      newHintUsed[currentQuestion] = true
      setHintUsed(newHintUsed)
    }
    setShowHint(!showHint)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>
  }

  const question = questions[currentQuestion]

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold text-gray-800">Question {currentQuestion + 1} of {questions.length}</div>
        <div className="text-lg font-semibold text-blue-600 flex items-center">
          <Clock className="mr-2 w-5 h-5" />
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">{question.question}</h2>
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left p-3 rounded-lg transition duration-200 flex items-center ${
                  selectedAnswers[currentQuestion] === option
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {selectedAnswers[currentQuestion] === option ? (
                  <CheckCircle className="mr-2 w-5 h-5 text-blue-500 flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400 mr-2 flex-shrink-0" />
                )}
                <span className="text-base">{option}</span>
              </motion.button>
            ))}
          </div>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-yellow-100 rounded-lg"
            >
              <p className="text-base font-medium text-yellow-800">{question.hint}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between mt-6">
        <motion.button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-base font-medium flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="mr-1 w-4 h-4" />
          Previous
        </motion.button>
        <motion.button
          onClick={toggleHint}
          className={`px-4 py-2 rounded-lg text-base font-medium flex items-center ${
            showHint ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HelpCircle className="mr-1 w-4 h-4" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </motion.button>
        {currentQuestion === questions.length - 1 ? (
          <motion.button
            onClick={handleFinish}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-base font-medium flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Finish
            <CheckCircle className="ml-1 w-4 h-4" />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 text-base font-medium flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
            <ChevronRight className="ml-1 w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  )
}

