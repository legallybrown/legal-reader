import React, { useCallback } from 'react';

const FileUpload = ({ onTextExtracted }) => {
  const onFormSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('/api/processFile', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('File processed:', data);
        if (data.text) {
          onTextExtracted(data.text);
        } else {
          console.error('No text extracted from file.');
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  }, [onTextExtracted]);

  return (
    <form onSubmit={onFormSubmit} encType="multipart/form-data">
      <input type="file" name="file" required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
