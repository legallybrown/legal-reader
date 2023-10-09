import { useState, useEffect } from 'react';

const useSummary = (text) => {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (text) {
      const fetchSummary = async () => {
        try {
          const response = await fetch('/api/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
          });
          const data = await response.json();
          setSummary(data.summary); // Assumes the summary is returned under the 'summary' key in the response
        } catch (error) {
          console.error('Error fetching summary:', error);
        }
      };

      fetchSummary();
    }
  }, [text]); // Effect dependency on 'text'

  return summary;
};

export default useSummary;
