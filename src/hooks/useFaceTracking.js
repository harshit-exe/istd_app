import { useState, useEffect, useCallback } from 'react';
import * as faceapi from 'face-api.js';

export function useFaceTracking() {
  const [facePosition, setFacePosition] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState(null);

  const stopTracking = useCallback(() => {
    setIsTracking(false);
    setFacePosition(null);
  }, []);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);
  const startTracking = useCallback(async (videoElement, canvasElement) => {
    if (!videoElement || !canvasElement) return;

    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

      setIsTracking(true);

      const updateFacePosition = async () => {
        if (!isTracking) return;

        try {
          // Ensure the video is ready and has proper dimensions
          if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
            // Set canvas dimensions to match the video
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;

            console.log('Video dimensions:', videoElement.videoWidth, 'x', videoElement.videoHeight);
            console.log('Canvas dimensions:', canvasElement.width, 'x', canvasElement.height);

            // Detect faces
            const detections = await faceapi.detectSingleFace(
              videoElement,
              new faceapi.TinyFaceDetectorOptions()
            ).withFaceLandmarks();

            if (detections) {
              const { x, y, width, height } = detections.detection.box;
              setFacePosition({ x, y, width, height });

              const ctx = canvasElement.getContext('2d');
              ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
              faceapi.draw.drawDetections(canvasElement, [detections]);
              faceapi.draw.drawFaceLandmarks(canvasElement, [detections]);
            }
          }

          requestAnimationFrame(updateFacePosition);
        } catch (err) {
          console.error('Error during face detection:', err);
          setError('Face detection error. Please try refreshing the page.');
          stopTracking();
        }
      };

      updateFacePosition();
    } catch (err) {
      console.error('Error loading face-api.js models:', err);
      setError('Failed to load face detection models. Please check your internet connection and try again.');
    }
  }, [isTracking, stopTracking]);


  return { startTracking, stopTracking, facePosition, error };
}

