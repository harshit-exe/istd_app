import { useCallback } from 'react';

export function useBehaviorTracking() {
  const trackBehavior = useCallback((facePosition) => {
    const timestamp = new Date().toISOString();
    const confidence = facePosition ? Math.random() * 0.5 + 0.5 : 0; // Simulated confidence
    const movement = facePosition ? Math.random() * 10 : 0; // Simulated movement

    return {
      timestamp,
      confidence,
      movement,
    };
  }, []);

  return { trackBehavior };
}

