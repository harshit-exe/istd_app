import { useState } from 'react';

const GROQ_API_KEY = "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";
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export function useGroqAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sanitizeJsonString = (str) => {
    // Remove any leading/trailing whitespace
    let cleaned = str.trim();
    
    // Try to find the first '[' and last ']' to extract the JSON array
    const startIndex = cleaned.indexOf('[');
    const endIndex = cleaned.lastIndexOf(']');
    
    if (startIndex !== -1 && endIndex !== -1) {
      cleaned = cleaned.substring(startIndex, endIndex + 1);
    }
    
    return cleaned;
  };

  const validateChapter = (chapter) => {
    const defaultChapter = {
      title: 'Untitled Chapter',
      description: 'No description provided.',
      subtopics: [],
      examples: [],
      keyPoints: [],
      resources: []
    };

    if (!chapter || typeof chapter !== 'object') {
      return defaultChapter;
    }

    return {
      title: typeof chapter.title === 'string' ? chapter.title : defaultChapter.title,
      description: typeof chapter.description === 'string' ? chapter.description : defaultChapter.description,
      subtopics: Array.isArray(chapter.subtopics) ? chapter.subtopics.filter(item => typeof item === 'string') : defaultChapter.subtopics,
      examples: Array.isArray(chapter.examples) ? chapter.examples.filter(item => typeof item === 'string') : defaultChapter.examples,
      keyPoints: Array.isArray(chapter.keyPoints) ? chapter.keyPoints.filter(item => typeof item === 'string') : defaultChapter.keyPoints,
      resources: Array.isArray(chapter.resources) ? chapter.resources.filter(item => 
        item && typeof item === 'object' && typeof item.title === 'string' && typeof item.url === 'string'
      ) : defaultChapter.resources
    };
  };

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
            {
              role: 'system',
              content: 'You are an AI assistant that creates detailed and well-structured course outlines. Always respond with valid JSON array containing chapter objects.'
            },
            {
              role: 'user',
              content: `Create a comprehensive course outline based on the following content: ${content}.
                Return ONLY a JSON array of chapter objects with the following structure:
                [
                  {
                    "title": "Chapter Title",
                    "description": "Chapter description (2-3 sentences)",
                    "subtopics": ["subtopic1", "subtopic2", "subtopic3"],
                    "examples": ["example1", "example2"],
                    "keyPoints": ["keyPoint1", "keyPoint2", "keyPoint3"],
                    "resources": [{"title": "Resource Title", "url": "resource_url"}]
                  }
                ]`
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 404 ? 'Groq AI API endpoint not found' :
          response.status === 429 ? 'Rate limit exceeded' :
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content;
      
      // Clean up the response
      const cleanedContent = sanitizeJsonString(generatedContent);
      
      let courseJson;
      try {
        courseJson = JSON.parse(cleanedContent);
      } catch (parseError) {
        console.error('Initial parsing error:', parseError);
        console.log('Raw content:', generatedContent);
        console.log('Cleaned content:', cleanedContent);
        
        // Try one more time with a more aggressive cleanup
        const jsonMatch = cleanedContent.match(/\[\s*{[\s\S]*}\s*\]/);
        if (jsonMatch) {
          try {
            courseJson = JSON.parse(jsonMatch[0]);
          } catch (retryError) {
            throw new Error('Failed to parse the JSON response after multiple attempts');
          }
        } else {
          throw new Error('No valid JSON array structure found in the response');
        }
      }

      if (!Array.isArray(courseJson)) {
        throw new Error('Response is not a valid array of chapters');
      }

      // Validate and sanitize each chapter
      const validatedCourse = courseJson.map(validateChapter);

      return validatedCourse;
    } catch (error) {
      console.error('Course generation error:', error);
      setError(error.message || 'Failed to generate course. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { generateCourse, isLoading, error };
}