import { useState, useCallback, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export function useVoiceInteraction() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  const [isListening, setIsListening] = useState(false)

  const startListening = useCallback(() => {
    setIsListening(true)
    SpeechRecognition.startListening({ continuous: true })
  }, [])

  const stopListening = useCallback(() => {
    setIsListening(false)
    SpeechRecognition.stopListening()
  }, [])

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
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

