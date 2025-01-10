import { useState } from 'react';

const GROQ_API_KEY = "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"
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export function useGroqAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSubtasks = async (taskDescription) => {
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
            { role: 'system', content: 'You are an AI assistant that creates detailed learning roadmaps.' },
            { role: 'user', content: `${taskDescription} Provide the roadmap as a JSON array of objects, where each object represents a step in the roadmap and includes 'title', 'subtopics' (an array of 3-5 strings), and 'resources' (an array of 2-3 objects with 'name' and 'url' properties).` }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate roadmap with Groq AI: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      let roadmapJson;
      try {
        roadmapJson = JSON.parse(content);
      } catch (parseError) {
        console.error('Error parsing Groq AI response:', parseError);
        console.log('Raw response:', content);
        
        const jsonArrayMatch = content.match(/\[[\s\S]*\]/);
        if (jsonArrayMatch) {
          try {
            roadmapJson = JSON.parse(jsonArrayMatch[0]);
          } catch (extractError) {
            console.error('Error extracting JSON array from response:', extractError);
            throw new Error('Failed to parse roadmap from Groq AI response');
          }
        } else {
          throw new Error('Failed to extract roadmap from Groq AI response');
        }
      }

      if (!Array.isArray(roadmapJson)) {
        throw new Error('Groq AI response is not an array of roadmap steps');
      }

      return roadmapJson;
    } catch (error) {
      console.error('Error generating roadmap with Groq AI:', error);
      setError(error.message || "Failed to generate roadmap. Please try again later.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { generateSubtasks, isLoading, error };
}

