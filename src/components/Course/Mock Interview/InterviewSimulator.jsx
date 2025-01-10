"use client"
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InterviewScene } from './InterviewScene';
import { BehaviorGraph } from './BehaviorGraph';
import { useGroqAI } from '@/hooks/useGroqAI';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const interviewTypes = [
  { value: 'react', label: 'React' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'backend', label: 'Backend' },
];

export function InterviewSimulator() {
  const [interviewType, setInterviewType] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [behaviorData, setBehaviorData] = useState([]);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const { generateQuestion, evaluateAnswer, isLoading, error: aiError } = useGroqAI();
  const { startListening, stopListening, transcript, error: voiceError } = useVoiceInput();
  const { speak, stop: stopSpeaking } = useTextToSpeech();

  const startInterview = useCallback(async () => {
    if (!interviewType) return;
    setIsInterviewStarted(true);
    setError(null);
    try {
      const question = await generateQuestion(interviewType);
      setCurrentQuestion(question);
      speakWithTracking(question);
    } catch (err) {
      setError('Failed to start the interview. Please try again.');
      setIsInterviewStarted(false);
    }
  }, [interviewType, generateQuestion]);

  const startAnswering = useCallback(() => {
    setIsAnswering(true);
    setError(null);
    startListening();
  }, [startListening]);

  const stopAnswering = useCallback(async () => {
    setIsAnswering(false);
    stopListening();
    setUserAnswer(transcript);
    try {
      const evaluation = await evaluateAnswer(currentQuestion, transcript);
      setFeedback(evaluation);
      speakWithTracking(evaluation);
    } catch (err) {
      setError('Failed to evaluate the answer. Please try again.');
    }
  }, [stopListening, transcript, currentQuestion, evaluateAnswer]);

  const nextQuestion = useCallback(async () => {
    setError(null);
    try {
      const question = await generateQuestion(interviewType);
      setCurrentQuestion(question);
      speakWithTracking(question);
      setUserAnswer('');
      setFeedback('');
    } catch (err) {
      setError('Failed to generate the next question. Please try again.');
    }
  }, [interviewType, generateQuestion]);

  const speakWithTracking = (text) => {
    setIsSpeaking(true);
    speak(text);
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleDataUpdate = useCallback((newData) => {
    setBehaviorData(prevData => [
      ...prevData,
      {
        timestamp: new Date().toISOString(),
        ...newData,
        ...newData.expressions
      }
    ]);
  }, []);

  React.useEffect(() => {
    if (aiError) setError(aiError);
    if (voiceError) setError(voiceError);
  }, [aiError, voiceError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black p-8">
      <h1 className="text-4xl font-bold mb-8">AI-Powered Interview Simulator</h1>

      {error && (
        <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
          <p>{error}</p>
        </div>
      )}

      {!isInterviewStarted ? (
        <div className="flex flex-col items-center gap-4">
          <Select onValueChange={setInterviewType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select interview type" />
            </SelectTrigger>
            <SelectContent>
              {interviewTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={startInterview} disabled={!interviewType || isLoading}>
            {isLoading ? 'Loading...' : 'Start Interview'}
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="mb-8 flex  flex-col md:flex-row gap-4">
            <div className="w-1/2 h-[300px] rounded-lg overflow-hidden bg-gray-100 relative">
              <InterviewScene onDataUpdate={handleDataUpdate} />
            </div>
          </div>
          <div className=" p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Current Question:</h2>
            <p className="text-xl mb-6">{currentQuestion}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Your Answer:</h3>
              <p className="italic">{isAnswering ? transcript : userAnswer}</p>
            </div>
            {!isAnswering ? (
              <Button onClick={startAnswering} className="mb-4">
                Start Answering
              </Button>
            ) : (
              <Button onClick={stopAnswering} className="mb-4">
                Stop Answering
              </Button>
            )}
            {feedback && (
              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-2">Feedback:</h3>
                <p>{feedback}</p>
                {isSpeaking && (
                  <Button onClick={handleStopSpeaking} className="mt-2">
                    Stop Speaking
                  </Button>
                )}
              </div>
            )}
            <Button onClick={nextQuestion} className="mt-4">
              Next Question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

