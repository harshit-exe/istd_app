import { BaseApiUrl } from '@/utils/constanst'
import { motion } from 'framer-motion'
import { Printer, Share2, CheckCircle, XCircle, HelpCircle } from 'lucide-react'

export default function ResultComponent({ results, testName, topics }) {
  const correctAnswers = results.filter((result) => result.isCorrect).length
  const totalQuestions = results.length
  const score = Math.round((correctAnswers / totalQuestions) * 100)
  const hintsUsed = results.filter((result) => result.hintUsed).length

  const handlePrint = () => {
    window.print()
  }

  const handleShareWhatsApp = async () => {
    const resultJson = JSON.stringify({
      testName,
      date: new Date().toISOString(),
      totalQuestions,
      correctAnswers,
      score,
      hintsUsed,
      topics
    })

    var message = `Test Report
📝 Test Name: ${testName}
📊 Total Questions: ${totalQuestions}
✅ Correct Answers: ${correctAnswers}
🎯 Score: ${score}%
💡 Hints Used: ${hintsUsed}
📚 Topics Covered: ${topics}`
    // {"testName":"","date":"2025-01-11T02:41:23.858Z","totalQuestions":5,"correctAnswers":1,"score":20,"hintsUsed":0,"topics":["Node.js"]}

    const response = await fetch(`${BaseApiUrl}/mocktest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: '9922041218', testName: testName, totalQuestions: totalQuestions, correctAnswers: correctAnswers,
        score: score, topics: topics
      }),
    });

    const response2 = await fetch(`${BaseApiUrl}/whatsapp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: '9922041218', text: `Hii Your Mocktest Result : ${message}` }),
    });
    const json = await response.json();
    console.log( resultJson,json)

  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{testName} Results</h2>
      <div className="text-2xl mb-3">
        Your Score: <span className="font-semibold text-blue-600">{score}%</span> ({correctAnswers} out of {totalQuestions} correct)
      </div>
      <div className="text-lg mb-6 text-gray-600">
        Hints Used: {hintsUsed} out of {totalQuestions}
      </div>
      <div className="space-y-6 mb-8">
        {results.map((result, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-lg ${result.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center mb-2">
              {result.isCorrect ? (
                <CheckCircle className="text-green-600 mr-2 w-5 h-5 flex-shrink-0" />
              ) : (
                <XCircle className="text-red-600 mr-2 w-5 h-5 flex-shrink-0" />
              )}
              <p className="font-semibold text-lg">Question {index + 1}: {result.question}</p>
            </div>
            <p className="mb-1 text-base">Your answer: {result.userAnswer}</p>
            <p className="mb-1 text-base">Correct answer: {result.correctAnswer}</p>
            {result.hintUsed && (
              <p className="text-yellow-600 flex items-center text-sm">
                <HelpCircle className="mr-1 w-4 h-4" />
                Hint was used
              </p>
            )}
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <motion.button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-base font-medium flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Printer className="mr-1 w-4 h-4" />
          Print Results
        </motion.button>
        <motion.button
          onClick={handleShareWhatsApp}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-base font-medium flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="mr-1 w-4 h-4" />
          Share on WhatsApp
        </motion.button>
      </div>
    </div>
  )
}

