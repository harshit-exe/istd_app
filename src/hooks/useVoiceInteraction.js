'use client';

import { useState, useCallback, useEffect } from 'react'
import { useSpeechRecognition } from 'react-speech-recognition'

export function useVoiceInteraction() {
  const [isListening, setIsListening] = useState(false)
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  const startListening = useCallback(() => {
    setIsListening(true)
    if (typeof window !== 'undefined' && window.SpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.start();
    }
  }, [])

  const stopListening = useCallback(() => {
    setIsListening(false)
    if (typeof window !== 'undefined' && window.SpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.stop();
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && !browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition.")
    }
  }, [browserSupportsSpeechRecognition])

  return {
    isListening,
    startListening,
    stopListening,
    transcript,
    resetTranscript
  }
}

