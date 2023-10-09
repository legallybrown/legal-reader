import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import useSummary from '../src/hooks/useSummary'; // Adjust the path based on your folder structure

const Home = () => {
  const [text, setText] = useState(''); // State to store extracted text
  const [showSummary, setShowSummary] = useState(false); // New state to control whether to show summary
  const summary = useSummary(showSummary ? text : ''); // Only pass text to hook if showSummary is true

  const handleTextExtracted = (extractedText) => {
    console.log('Extracted Text:', extractedText);
    setText(extractedText); // Set the extracted text when file is uploaded
    setShowSummary(false); // Reset showSummary state when new text is extracted
  };

  return (
    <div>
      <h1>File Upload</h1>
      <FileUpload onTextExtracted={handleTextExtracted} />
      {text && (
        <>
          <h2>Original Text</h2>
          <p>{text}</p>
          <button onClick={() => setShowSummary(true)}>Generate Summary</button> {/* Button to trigger summary */}
        </>
      )}
      {showSummary && summary && (
        <>
          <h2>Summary</h2>
          <p>{summary}</p>
        </>
      )}
    </div>
  );
};

export default Home;
