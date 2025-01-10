import { useState } from 'react';

const GROQ_API_KEY = "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"; // Replace this with your actual Groq API key
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';


export function useGroqAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateInterviewQuestions = async (interviewType) => {
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
            { role: 'system', content: 'You are an AI assistant that generates interview questions for software developers.' },
            { role: 'user', content: `Generate 5 interview questions for a ${interviewType} developer position. Provide the questions as a JSON array of strings.` }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate questions: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      let questionsJson;
      try {
        questionsJson = JSON.parse(content);
      } catch (parseError) {
        console.error('Error parsing Groq AI response:', parseError);
        
        // Attempt to extract a JSON array from the response
        const jsonArrayMatch = content.match(/\[[\s\S]*\]/);
        if (jsonArrayMatch) {
          questionsJson = JSON.parse(jsonArrayMatch[0]);
        } else {
          throw new Error('Failed to extract questions from Groq AI response');
        }
      }

      if (!Array.isArray(questionsJson)) {
        throw new Error('Groq AI response is not an array of questions');
      }

      return { questions: questionsJson, error: null };
    } catch (error) {
      console.error('Error generating questions with Groq AI:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      return { questions: [], error: error instanceof Error ? error.message : 'An unknown error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  return { generateInterviewQuestions, isLoading, error };
}

