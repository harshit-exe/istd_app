import { useState } from 'react';

const GROQ_API_KEY = "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"; // Replace this with your actual Groq API key
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export function useGroqAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callGroqAPI = async (messages) => {
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
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to call Groq API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error calling Groq API:', error);
      setError(error.message);
      return 'Failed to process request. Please try again.';
    } finally {
      setIsLoading(false);
    }
  };

  const generateTask = async (prompt) => {
    const messages = [
      { role: 'system', content: 'You are an AI coding assistant that generates concise coding tasks, hints, and solutions.' },
      { role: 'user', content: `Generate a ${prompt}. 
      If it's a task, include three sections separated by two newlines:
      1. A brief task description
      2. Detailed instructions and requirements
      3. An example input/output or usage scenario
      Ensure the task is solvable within the browser environment for JavaScript. Keep each section concise.
      If it's a hint, provide a helpful tip without giving away the full solution. 
      If it's a full solution, provide complete, working code with inline comments explaining the solution. 
      Structure the code properly with appropriate indentation and formatting.` }
    ];
    return callGroqAPI(messages);
  };

  const evaluateCode = async (language, task, code) => {
    const messages = [
      { role: 'system', content: 'You are an AI coding assistant that evaluates code submissions.' },
      { role: 'user', content: `Language: ${language}\nTask: ${task}\nCode:\n${code}\n\nEvaluate the code and provide constructive feedback in 2-3 sentences. Include suggestions for improvement if necessary. Clearly state if the solution is correct or incorrect.` }
    ];
    return callGroqAPI(messages);
  };

  return { generateTask, evaluateCode, isLoading, error };
}

