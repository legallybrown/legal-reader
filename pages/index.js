import React, { useState, useEffect } from 'react';
import FileUpload from '/components/FileUpload';
import styles from './index.module.css';
import useSummary from '/src/hooks/useSummary'; // Adjust import path as needed
import commercialLegalPositions from '/components/commercialLegalPositions'
import litigationLegalPositions from '/components/litigationLegalPositions'

function Home() {
  const [originalText, setOriginalText] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo-1106');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [standardPositions, setStandardPositions] = useState([commercialLegalPositions, litigationLegalPositions]);
  const [customPositions, setCustomPositions] = useState([]);
  const [analysis, setAnalysis] = useState(''); 
  const summary = useSummary(originalText, selectedModel);

  const handleTextExtracted = (extractedText) => {
    setOriginalText(extractedText);
    setShowSummary(true);
  };

  const handleLegalPositionCheck = async () => {
    if (!originalText || !selectedPosition) {
      alert('Please upload a document and select a legal position first.');
      return;
    }

    try {
      const response = await fetch('/api/checkLegalPosition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: originalText, position: selectedPosition, model: selectedModel }), // send text and selected position to server
      });

      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }

      const data = await response.json();
      setAnalysis(data.analysis);  // <-- Set analysis state with the received data
    } catch (error) {
      console.error('Error during legal position check:', error);
      alert('Error during legal position check. Please try again later.');
    }
  };

  const handleAddPosition = () => {
  const newPosition = document.getElementById('newPosition').value;
  if (newPosition && !customPositions.includes(newPosition) && !standardPositions.includes(newPosition)) {
    setCustomPositions([...customPositions, newPosition]);
  }
};

useEffect(() => {
  console.log(selectedPosition);
}, [selectedPosition]);



  return (
    <div>
      <h1 className={styles.title}>Document Checker</h1>
      <div className={styles.label} onChange={(e) => setSelectedModel(e.target.value)}>
        <input type="radio" value="gpt-3.5-turbo-1106" name="model" checked={selectedModel === 'gpt-3.5-turbo-1106'} onChange={(e) => setSelectedModel(e.target.value)} /> GPT-3.5
        <input type="radio" value="gpt-4-1106-preview" name="model" checked={selectedModel === 'gpt-4-1106-preview'} onChange={(e) => setSelectedModel(e.target.value)}  /> GPT-4
      </div>
      <div>
        <FileUpload className={styles.formContainer} onTextExtracted={handleTextExtracted} />
      </div>
      {showSummary && (
        <div className={styles.container}>
          <div className={styles.smallContainer}>
            <h2 className={styles.title}>Uploaded Text</h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{originalText}</pre>
          </div>
          <div className={styles.smallContainer}>
            <h2 className={styles.title} >Document Summary</h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{summary}</pre>
          </div>
        {analysis && (  // <-- Conditional rendering of analysis result
            <div className={styles.smallContainer}>
              <h2 className={styles.title}>Legal Analysis</h2>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
                {analysis}
              </pre>
            </div>
          )}
        </div>
      )}
      <div>
        <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
          <optgroup label="Standard Positions">
              {standardPositions.map((positionGroup) => (
                  <option key={positionGroup.title} value={JSON.stringify(positionGroup.positions)}>
                      {positionGroup.title}
                  </option>
              ))}
          </optgroup>
          <optgroup label="Custom Positions">
            {customPositions.map((position) => <option key={position} value={position}>{position}</option>)}
          </optgroup>
        </select>
        <input type="text" placeholder="New Position" id="newPosition" />
        <button onClick={() => handleAddPosition()}>Add New Legal Position</button>
      </div>
      <button onClick={handleLegalPositionCheck}>Check Legal Position</button>  {/* <-- Button to trigger legal position check */}
    </div>
  );
}

export default Home;
