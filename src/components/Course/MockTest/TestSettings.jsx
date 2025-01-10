import { motion } from 'framer-motion'

export default function TestSettings({ questionCount, setQuestionCount, timeLimit, setTimeLimit, testName, setTestName }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Test Settings:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-100 p-6 rounded-lg shadow-md"
        >
          <label htmlFor="testName" className="block text-lg font-medium text-gray-700 mb-2">
            Test Name:
          </label>
          <input
            type="text"
            id="testName"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
            placeholder="Enter test name"
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-100 p-6 rounded-lg shadow-md"
        >
          <label htmlFor="questionCount" className="block text-lg font-medium text-gray-700 mb-2">
            Number of Questions:
          </label>
          <input
            type="number"
            id="questionCount"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            min="1"
            max="50"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-100 p-6 rounded-lg shadow-md"
        >
          <label htmlFor="timeLimit" className="block text-lg font-medium text-gray-700 mb-2">
            Time Limit (minutes):
          </label>
          <input
            type="number"
            id="timeLimit"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            min="1"
            max="120"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
          />
        </motion.div>
      </div>
    </div>
  )
}

