import { NextResponse } from 'next/server';

const GROQ_API_KEY = "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"
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(request) {
  const { message, course } = await request.json();

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
            content: `You are an AI assistant that helps users understand the course content. Use the provided course structure to answer questions accurately and concisely. Structure your responses as follows:

1. Brief Answer: Provide a concise answer to the user's question.
2. Relevant Chapter(s): Mention the chapter(s) most relevant to the question.
3. Key Points: List 2-3 key points related to the question.
4. Example (if applicable): Provide a brief code snippet or practical example.
5. Further Reading: Suggest a relevant resource from the course material.

Use markdown formatting to structure your response.` 
          },
          { 
            role: 'user', 
            content: `Course structure: ${JSON.stringify(course)}

            User question: ${message}

            Please provide a helpful and accurate response based on the course content.` 
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get response from Groq AI: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}

