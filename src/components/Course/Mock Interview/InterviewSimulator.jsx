'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InterviewScene } from './InterviewScene';
import { useVoiceInteraction } from '@/hooks/useVoiceInteraction';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useGroqAI } from '@/hooks/useGroqAI';
import { analyzeAudio } from '@/utils/audioAnalysis';

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

  const { generateInterviewQuestions, isLoading, error: aiError } = useGroqAI();
  const { startListening, stopListening, transcript, resetTranscript } = useVoiceInteraction();
  const { startRecording, stopRecording, audioBlob, isRecording } = useAudioRecorder();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const startInterview = useCallback(async () => {
    if (!interviewType) return;
    const { questions, error } = await generateInterviewQuestions(interviewType);
    if (error) {
      setFeedback(`Error: ${error}`);
      return;
    }
    setQuestions(questions);
    setCurrentQuestionIndex(0);
    setIsInterviewStarted(true);
  }, [interviewType, generateInterviewQuestions]);

  const askQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      // Use text-to-speech to ask the question
      const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
      speechSynthesis.speak(utterance);
      startListening();
      startRecording();
    } else {
      setIsInterviewStarted(false);
      setFeedback('Interview completed. Thank you for your participation!');
    }
  }, [currentQuestionIndex, questions, startListening, startRecording]);

  const submitAnswer = useCallback(async () => {
    stopListening();
    stopRecording();
    setUserAnswer(transcript);
    resetTranscript();

    if (audioBlob) {
      const analysis = await analyzeAudio(audioBlob);
      setFeedback(analysis);
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  }, [stopListening, stopRecording, transcript, resetTranscript, audioBlob]);

  useEffect(() => {
    if (isInterviewStarted && questions.length > 0) {
      askQuestion();
    }
  }, [isInterviewStarted, questions, askQuestion]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8"
      >
        AI-Powered Interview Simulator
      </motion.h1>

      {!isInterviewStarted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
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
          {aiError && <p className="text-red-500">{aiError}</p>}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <div className="mb-8 h-[400px] rounded-lg overflow-hidden">
            <InterviewScene />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Current Question:</h2>
            <p className="text-xl mb-6">{currentQuestion}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Your Answer:</h3>
              <p className="italic">{transcript}</p>
            </div>
            <Button onClick={submitAnswer} className="mb-4" disabled={!isRecording}>
              {isRecording ? 'Stop Recording & Submit' : 'Submit Answer'}
            </Button>
            {feedback && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Feedback:</h3>
                <p>{feedback}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
