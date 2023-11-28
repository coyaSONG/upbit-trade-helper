import { useState } from 'react';
import axios from 'axios';

export const useBuy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buy = async (market: string, volume: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/buy', { market, volume });
      setLoading(false);
      return response.data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { buy, loading, error };
};