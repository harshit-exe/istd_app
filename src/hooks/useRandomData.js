import { useState, useEffect, useCallback } from 'react';

export function useRandomData() {
  const [data, setData] = useState(null);

  const generateRandomData = useCallback(() => {
    return {
      confidence: Math.random() * 4 + 1,
      movement: Math.random() * 4 + 1,
      expressions: {
        happy: Math.random() * 4 + 1,
        sad: Math.random() * 4 + 1,
        angry: Math.random() * 4 + 1,
        surprised: Math.random() * 4 + 1,
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 5000);

    return () => clearInterval(interval);
  }, [generateRandomData]);

  return { data };
}

