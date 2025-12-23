import React, { useState, useEffect } from 'react';
import { sendSelectedText } from '../utils/apiClient.js';

const SelectedTextHandler = () => {
  const [selectedText, setSelectedText] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleSelection = () => {
      const text = window.getSelection().toString().trim();
      if (text.length > 0) {
        setSelectedText(text);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, []);

  const handleAskQuestion = async () => {
    if (!selectedText || !question) return;

    setIsLoading(true);
    try {
      const result = await sendSelectedText(selectedText, question);
      setResponse(result.response);
      setShowModal(true);
    } catch (error) {
      console.error('Error sending selected text:', error);
      setResponse('Sorry, I encountered an error. Please try again.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!selectedText) return;

    setIsLoading(true);
    try {
      // Using mock translation since backend translation endpoint may not exist
      const result = await import('../utils/apiClient.js').then(module => module.translateText(selectedText));
      setResponse(result.translated_text);
      setShowModal(true);
    } catch (error) {
      console.error('Error translating text:', error);
      setResponse('Translation failed. Please try again.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="selected-text-handler">
      {selectedText && (
        <div className="context-menu">
          <button onClick={handleAskQuestion} disabled={isLoading}>
            {isLoading ? 'Asking...' : 'Ask about this'}
          </button>
          <button onClick={handleTranslate} disabled={isLoading}>
            Translate
          </button>
          <button onClick={() => setSelectedText('')}>Close</button>
        </div>
      )}

      {showModal && (
        <div className="response-modal">
          <div className="modal-content">
            <h4>Response</h4>
            <p>{response}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedTextHandler;