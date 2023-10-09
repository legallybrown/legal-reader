import React, { useState, useEffect } from 'react';
import FileUpload from '/components/FileUpload';
import useSummary from '/src/hooks/useSummary'; // Adjust import path as needed

function Home() {
  const [originalText, setOriginalText] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  // Call your useSummary hook with the original text
  const summary = useSummary(originalText);

  const handleTextExtracted = (extractedText) => {
    console.log('Extracted Text:', extractedText);
    setOriginalText(extractedText);
    setShowSummary(true);
  };

  return (
    <div>
      <h1>File Upload</h1>
      <FileUpload onTextExtracted={handleTextExtracted} />
      {showSummary && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            <h2>Original Text</h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{originalText}</pre>
          </div>
          <div style={{ width: '45%' }}>
            <h2>Summary</h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{summary}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
