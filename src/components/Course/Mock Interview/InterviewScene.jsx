import React, { useRef, useEffect, useState } from 'react'
import { useFaceTracking } from '@/hooks/useFaceTracking'
import { Button } from '@/components/ui/button'

export function InterviewScene({ onFaceDataUpdate }) {
  const videoRef = useRef(null)
  const { startTracking, stopTracking, faceData, error, useFallback } = useFaceTracking()
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let interval
    const initializeTracking = async () => {
      if (videoRef.current) {
        try {
          await startTracking(videoRef.current)
          interval = setInterval(() => useFallback ? 2000 : 100)
        } catch (err) {
          console.error('Failed to initialize tracking:', err)
        }
      }
    }

    initializeTracking()

    return () => {
      if (interval) clearInterval(interval)
      stopTracking()
    }
  }, [startTracking, stopTracking, retryCount, useFallback])

  useEffect(() => {
    if (faceData) {
      onFaceDataUpdate(faceData)
    }
  }, [faceData, onFaceDataUpdate])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch(err => console.error("Error accessing the camera", err))
  }, [])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted
      />
      {/* {error && (
        <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-2">
          {/* <p>{error}</p>
          {!useFallback && <Button onClick={handleRetry} className="mt-2">Retry</Button>} */}
        {/* </div>
      )}
      {useFallback && (
        <div className="absolute bottom-0 left-0 w-full bg-yellow-500 text-white p-2">
          <p>Using fallback data</p>
        </div>
      )} */} 
    </div>
  )
}

