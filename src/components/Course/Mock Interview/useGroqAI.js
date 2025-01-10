import { useState } from 'react';

const GROQ_API_KEY = "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"
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export function useGroqAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQuestions = async (topics, count, testName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: 'You are an AI assistant that generates multiple-choice questions for technical topics.' },
            { role: 'user', content: `Generate ${count} multiple-choice questions for a test named "${testName}" on the following topics: ${topics.join(', ')}. Provide the questions as a JSON array of objects, where each object has the following structure: { question: string, options: string[], correctAnswer: string, hint: string }` }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate questions with Groq AI: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      let questionsJson;
      try {
        questionsJson = JSON.parse(content);
      } catch (parseError) {
        console.error('Error parsing Groq AI response:', parseError);
        console.log('Raw response:', content);
        
        const jsonArrayMatch = content.match(/\[[\s\S]*\]/);
        if (jsonArrayMatch) {
          try {
            questionsJson = JSON.parse(jsonArrayMatch[0]);
          } catch (extractError) {
            console.error('Error extracting JSON array from response:', extractError);
            throw new Error('Failed to parse questions from Groq AI response');
          }
        } else {
          throw new Error('Failed to extract questions from Groq AI response');
        }
      }

      if (!Array.isArray(questionsJson)) {
        throw new Error('Groq AI response is not an array of questions');
      }

      return questionsJson;
    } catch (error) {
      console.error('Error generating questions with Groq AI:', error);
      setError(error.message || "Failed to generate questions. Please try again later.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { generateQuestions, isLoading, error };
}

