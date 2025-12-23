import axios from 'axios';
import { config } from './config.js';

const apiClient = axios.create({
  baseURL: config.backendUrl,
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any common headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API functions
export const sendMessage = async (message) => {
  try {
    const response = await apiClient.post('/api/chat', { query: message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const sendSelectedText = async (selectedText, question) => {
  try {
    const response = await apiClient.post('/api/chat/selected-text', {
      selected_text: selectedText,
      query: question
    });
    return response.data;
  } catch (error) {
    console.error('Error sending selected text:', error);
    throw error;
  }
};

export const translateText = async (text) => {
  // Note: The backend might not have a translate endpoint implemented yet
  // This is a placeholder - you may need to implement this in the backend
  try {
    // Using a mock response for now, or you can call an actual translation endpoint
    // if one exists in your backend
    console.warn('Translation endpoint not implemented in backend yet');
    return { translated_text: `Mock translation of: ${text}` };
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};

export default apiClient;