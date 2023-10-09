import React, { useState, useEffect } from 'react';
import FileUpload from '/components/FileUpload';
import useSummary from '/src/hooks/useSummary'; // Adjust import path as needed

function Home() {
  const [originalText, setOriginalText] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4'); // Default to GPT-4

  // Call your useSummary hook with the original text
  const summary = useSummary(originalText, selectedModel);

  const handleTextExtracted = (extractedText) => {
    setOriginalText(extractedText);
    setShowSummary(true);
  };

  return (
    <div>
      <h1>Contract Review</h1>
      <div style={{ display: 'flex', padding: '20px' }} onChange={(e) => setSelectedModel(e.target.value)}>
        <input type="radio" value="gpt-3.5-turbo-16k" name="model" checked={selectedModel === 'gpt-3.5-turbo-16k'} /> GPT-3.5 (turbo-16k)
        <input type="radio" value="gpt-4" name="model" checked={selectedModel === 'gpt-4'} /> GPT-4
      </div>
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
