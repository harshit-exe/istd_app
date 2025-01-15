import { useState } from 'react';

const GROQ_API_KEY = "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"
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export function useGroqAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCourse = async (content) => {
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
            { role: 'system', content: 'You are an AI assistant that creates detailed and well-structured course outlines.' },
            { role: 'user', content: `Create a comprehensive course outline based on the following content: ${content}. 
            Provide the course structure as a JSON array of objects, where each object represents a chapter and includes:
            - 'title': A concise and descriptive title for the chapter
            - 'description': A brief overview of the chapter's content (2-3 sentences)
            - 'subtopics': An array of 3-5 strings, each representing a key subtopic or concept within the chapter
            - 'examples': An array of 2-3 strings, each providing a practical example or code snippet related to the chapter's content
            - 'keyPoints': An array of 3-5 strings, each highlighting a crucial takeaway or important fact from the chapter
            - 'resources': An array of 1-2 objects, each with 'title' and 'url' properties, pointing to relevant external resources

            Ensure that the content is well-organized, informative, and follows a logical progression. Use clear and concise language, and make sure the examples are relevant and illustrative.` }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Groq AI API endpoint not found. Please check the API URL and your internet connection.');
        }
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw new Error(`Failed to generate course with Groq AI: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content;

      let courseJson;
      try {
        // First, try to parse the response as-is
        courseJson = JSON.parse(generatedContent);
      } catch (parseError) {
        console.error('Error parsing Groq AI response:', parseError);
        console.log('Raw response:', generatedContent);
        
        // If parsing fails, attempt to extract JSON from the response
        const jsonMatch = generatedContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          try {
            courseJson = JSON.parse(jsonMatch[0]);
          } catch (extractError) {
            console.error('Error parsing extracted JSON:', extractError);
            throw new Error('Failed to parse course from Groq AI response. The API might be returning malformed JSON.');
          }
        } else {
          throw new Error('No valid JSON found in the Groq AI response.');
        }
      }

      if (!Array.isArray(courseJson)) {
        throw new Error('Groq AI response is not an array of course chapters. The API might be experiencing issues.');
      }

      // Sanitize and structure the course data
      courseJson = courseJson.map(chapter => ({
        title: chapter.title || 'Untitled Chapter',
        description: chapter.description || 'No description provided.',
        subtopics: Array.isArray(chapter.subtopics) ? chapter.subtopics : [],
        examples: Array.isArray(chapter.examples) ? chapter.examples : [],
        keyPoints: Array.isArray(chapter.keyPoints) ? chapter.keyPoints : [],
        resources: Array.isArray(chapter.resources) ? chapter.resources : []
      }));

      return courseJson;
    } catch (error) {
      console.error('Error generating course with Groq AI:', error);
      setError(error.message || "Failed to generate course. Please try again later.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { generateCourse, isLoading, error };
}

