import React from 'react';
import { FloatingChatbot, SelectedTextHandler} from '../../../frontend/dist/chatbot.es';
import '../../../frontend/styles/chatbot.css';

// Extract the components from the default export if needed
const FloatingChatbotComponent = FloatingChatbot?.default || FloatingChatbot;
const SelectedTextHandlerComponent = SelectedTextHandler?.default || SelectedTextHandler;

export default function ChatbotWrapper() {
  return (
    <>
      <FloatingChatbot />
      <SelectedTextHandler />
    </>
  );
}