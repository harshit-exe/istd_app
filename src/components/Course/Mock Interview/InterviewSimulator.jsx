"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterviewScene } from './InterviewScene';
import { useGroqAI } from '@/hooks/useGroqAI';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { AlertCircle, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const defaultInterviewTypes = [
  { value: 'react-js', label: 'React' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'fullstack', label: 'Full Stack' },
];

const difficultyLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export function InterviewSimulator() {
  const [interviewTypes, setInterviewTypes] = useState(defaultInterviewTypes);
  const [interviewType, setInterviewType] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('intermediate');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [behaviorData, setBehaviorData] = useState([]);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [useAIVoice, setUseAIVoice] = useState(true);
  const [interviewDuration, setInterviewDuration] = useState(15);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60);
  const [showTimer, setShowTimer] = useState(true);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [overallPerformance, setOverallPerformance] = useState(0);
  const [newTopic, setNewTopic] = useState('');
  const [isIntroduction, setIsIntroduction] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [currentTab, setCurrentTab] = useState('interview');

  const { generateQuestion, evaluateAnswer, isLoading, error: aiError } = useGroqAI();
  const { startListening, stopListening, resetTranscript, transcript, isListening, error: voiceError } = useVoiceInput();
  const { speak, stop: stopSpeaking } = useTextToSpeech();

  const startInterview = useCallback(async () => {
    if (!interviewType) return;
    setIsInterviewStarted(true);
    setError(null);
    setTimeRemaining(interviewDuration * 60);
    setQuestionCount(0);
    setOverallPerformance(0);
    setIsIntroduction(true);
    setInterviewHistory([]);
    enterFullScreen();
    try {
      const introQuestion = "Please introduce yourself and tell me about your background in " + interviewType + ".";
      setCurrentQuestion(introQuestion);
      setQuestionCount(prev => prev + 1);
      if (useAIVoice) speakWithTracking(introQuestion);
    } catch (err) {
      setError('Failed to start the interview. Please try again.');
      setIsInterviewStarted(false);
    }
  }, [interviewType, interviewDuration, useAIVoice]);

  const startAnswering = useCallback(() => {
    setIsAnswering(true);
    setError(null);
    resetTranscript();
    startListening();
  }, [startListening, resetTranscript]);

  const stopAnswering = useCallback(async () => {
    setIsAnswering(false);
    stopListening();
    setUserAnswer(transcript);
    try {
      const evaluation = await evaluateAnswer(currentQuestion, transcript, difficultyLevel);
      setFeedback(evaluation);
      if (useAIVoice) speakWithTracking(evaluation);

      const score = extractConfidenceScore(evaluation);
      setConfidenceScore(score);
      setOverallPerformance(prev => (prev * (questionCount - 1) + score) / questionCount);

      setInterviewHistory(prev => [...prev, {
        question: currentQuestion,
        answer: transcript,
        feedback: evaluation,
        score: score
      }]);
    } catch (err) {
      setError('Failed to evaluate the answer. Please try again.');
    }
  }, [stopListening, transcript, currentQuestion, evaluateAnswer, difficultyLevel, useAIVoice, questionCount]);

  const nextQuestion = useCallback(async () => {
    setError(null);
    try {
      if (isIntroduction) {
        setIsIntroduction(false);
      }
      const question = await generateQuestion(interviewType, difficultyLevel);
      setCurrentQuestion(question);
      setQuestionCount(prev => prev + 1);
      if (useAIVoice) speakWithTracking(question);
      setUserAnswer('');
      setFeedback('');
      setConfidenceScore(0);
    } catch (err) {
      setError('Failed to generate the next question. Please try again.');
    }
  }, [interviewType, difficultyLevel, generateQuestion, useAIVoice, isIntroduction]);

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

  const stopInterview = () => {
    setIsInterviewStarted(false);
    setCurrentQuestion('');
    setUserAnswer('');
    setFeedback('');
    handleStopSpeaking();
    stopListening();
    exitFullScreen();
  };

  const addNewTopic = () => {
    if (newTopic.trim() !== '') {
      setInterviewTypes(prev => [...prev, { value: newTopic.toLowerCase().replace(/\s+/g, '-'), label: newTopic }]);
      setNewTopic('');
    }
  };

  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  };

  useEffect(() => {
    if (aiError) setError(aiError);
    if (voiceError) setError(voiceError);
  }, [aiError, voiceError]);

  useEffect(() => {
    let timer;
    if (isInterviewStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      stopInterview();
    }
    return () => clearInterval(timer);
  }, [isInterviewStarted, timeRemaining]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isInterviewStarted && document.hidden) {
        setShowWarning(true);
      }
    };

    const handleBeforeUnload = (e) => {
      if (isInterviewStarted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isInterviewStarted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const extractConfidenceScore = (evaluation) => {
    // This is a placeholder function. In a real application, you would
    // implement logic to extract a numerical confidence score from the
    // AI's evaluation text.
    return Math.random() * 100; // Placeholder: returns a random score between 0 and 100
  };

  return (
    <div className={`min-h-screen  p-8 ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 text-center mx-auto">AI Interview Assistant</h1>
          {isInterviewStarted && (
            <div className="flex items-center space-x-4">
              {showTimer && (
                <div className="text-2xl font-bold">
                  Time: {formatTime(timeRemaining)}
                </div>
              )}
              <Button 
                variant="destructive" 
                onClick={stopInterview}
                className="bg-red-600 hover:bg-red-700"
              >
                Stop Interview
              </Button>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {showWarning && (
          <Alert variant="warning" className="mb-4 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              You've switched tabs or left the interview. Please stay focused on the interview.
            </AlertDescription>
          </Alert>
        )}

        {!isInterviewStarted ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">Master Your Interview Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-8 text-center">
                Practice interviews with AI-powered feedback and real-time coaching
              </p>
              <div className="flex flex-col items-center gap-4">
                <Select onValueChange={setInterviewType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    {interviewTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Add new topic"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                  />
                  <Button onClick={addNewTopic}>Add</Button>
                </div>
                <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="w-full">
                  <Label htmlFor="interview-duration" className="text-sm font-medium text-gray-700 mb-2">
                    Interview Duration: {interviewDuration} minutes
                  </Label>
                  <Slider
                    id="interview-duration"
                    min={5}
                    max={30}
                    step={5}
                    value={[interviewDuration]}
                    onValueChange={(value) => setInterviewDuration(value[0])}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ai-voice"
                    checked={useAIVoice}
                    onCheckedChange={setUseAIVoice}
                  />
                  <Label htmlFor="ai-voice" className="text-sm font-medium text-gray-700">
                    Use AI Voice
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-timer"
                    checked={showTimer}
                    onCheckedChange={setShowTimer}
                  />
                  <Label htmlFor="show-timer" className="text-sm font-medium text-gray-700">
                    Show Timer
                  </Label>
                </div>
                <Button 
                  onClick={startInterview} 
                  disabled={!interviewType || isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? 'Preparing Interview...' : 'Start Interview'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="interview">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="h-[400px] relative mb-4">
                      <InterviewScene onDataUpdate={handleDataUpdate} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Confidence Score</span>
                          <span>{confidenceScore.toFixed(2)}%</span>
                        </div>
                        <Progress value={confidenceScore} className="w-full" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Overall Performance</span>
                          <span>{overallPerformance.toFixed(2)}%</span>
                        </div>
                        <Progress value={overallPerformance} className="w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Current Question:</h2>
                      <p className="text-lg text-slate-700">{currentQuestion}</p>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Your Answer:</h3>
                      <p className="italic text-slate-600">{isAnswering ? transcript : userAnswer}</p>
                    </div>
                    <div className="flex gap-4 mb-6">
                      {!isAnswering ? (
                        <Button 
                          onClick={startAnswering}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Mic className="mr-2 h-4 w-4" /> Start Answering
                        </Button>
                      ) : (
                        <Button 
                          onClick={stopAnswering}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          <MicOff className="mr-2 h-4 w-4" /> Stop Answering
                        </Button>
                      )}
                      {isSpeaking ? (
                        <Button 
                          onClick={handleStopSpeaking}
                          variant="outline"
                        >
                          <VolumeX className="mr-2 h-4 w-4" /> Stop AI Voice
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => speakWithTracking(currentQuestion)}
                          variant="outline"
                          disabled={!useAIVoice}
                        >
                          <Volume2 className="mr-2 h-4 w-4" /> Repeat Question
                        </Button>
                      )}
                    </div>
                    {feedback && (
                      <div className="bg-slate-50 p-4 rounded-lg mb-4">
                        <h3 className="text-lg font-semibold mb-2">Feedback:</h3>
                        <p className="text-slate-700">{feedback}</p>
                      </div>
                    )}
                    <Button 
                      onClick={nextQuestion}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Next Question
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Interview History</h2>
                  {interviewHistory.map((item, index) => (
                    <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow">
                      <h3 className="text-lg font-semibold mb-2">Question {index + 1}:</h3>
                      <p className="text-slate-700 mb-2">{item.question}</p>
                      <h4 className="text-md font-semibold mb-1">Your Answer:</h4>
                      <p className="text-slate-600 mb-2">{item.answer}</p>
                      <h4 className="text-md font-semibold mb-1">Feedback:</h4>
                      <p className="text-slate-600 mb-2">{item.feedback}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Confidence Score:</span>
                        <span className="text-sm font-bold">{item.score.toFixed(2)}%</span>
                      </div>
                      <Progress value={item.score} className="w-full mt-1" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

