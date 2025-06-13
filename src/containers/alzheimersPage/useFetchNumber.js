import { useEffect, useState } from 'react';

export const useFetchNumber = (url) => {
  const [number, setNumber] = useState(null);

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setNumber(data.total); // assuming response is { number: 42 }
      } catch (err) {
        console.error(err);
      }
    };

    fetchNumber();
  }, [url]);

  return number;
};
