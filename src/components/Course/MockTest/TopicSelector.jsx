import { motion } from 'framer-motion'

const topics = ['React', 'JavaScript', 'Node.js', 'Backend', 'Database', 'Frontend', 'React Native']

export default function TopicSelector({ selectedTopics, setSelectedTopics }) {
  const toggleTopic = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Topics:</h2>
      <div className="flex flex-wrap gap-3">
        {topics.map(topic => (
          <motion.button
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedTopics.includes(topic)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {topic}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

