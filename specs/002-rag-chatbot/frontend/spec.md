# 📘 Frontend Specification

## 🔹 Project Overview
This frontend is a lightweight chatbot UI layer that will be integrated inside the existing Docusaurus book. Its job is only to make the backend RAG chatbot accessible to users.

## 🔹 Purpose
- Embed chatbot UI in existing Docusaurus book
- Allow questions with selected text from book
- Provide translate (Urdu) action on chapter / selected content
- Stay connected with backend RAG APIs

## 🔹 Tech Stack
- React / JavaScript → UI components
- @openai/chatkit → Chatbot UI SDK (OpenAI ChatKit)
- Axios → HTTP client for backend API calls
- Docusaurus (Existing) → Host environment
- FastAPI Backend → RAG responses

## 🔹 In-Scope Features

### 1. Chatbot UI
- Floating / embedded chatbot widget using ChatKit SDK
- Connect with backend's /chat endpoint
- Display conversation history
- Handle loading and error states

### 2. Selected Text Interaction
- User selects text from book
- Selected text is sent to backend's /chat/selected-text
- Answer is based only on selected text
- Show context menu on text selection

### 3. Translation Action
- Translate (Urdu) button on selected text or chapter
- Receive translated content from backend
- Display translated content in modal/overlay

## 🔹 Out of Scope (IMPORTANT)
- ❌ Creating Docusaurus project
- ❌ Writing or modifying book content
- ❌ Embeddings / vector logic
- ❌ API keys handling
- ❌ Backend RAG implementation

## 🔹 Backend Contract
Frontend will depend only on these APIs:

### POST /chat
- Request: { "message": "string" }
- Response: { "answer": "string", "sources": [...] }

### POST /chat/selected-text
- Request: { "selected_text": "string", "question": "string" }
- Response: { "answer": "string", "sources": [...] }

## 🔹 Security Rules
- No API key will be in frontend
- All intelligence will be in backend
- Frontend will only handle request / response
- Environment variables for backend URL only

## 🔹 Compatibility Rule
Frontend implementation should be compatible with backend Spec, Plan and TASKS without any changes.

## 🔹 Dependencies
- @openai/chatkit - ChatKit SDK for UI
- react and react-dom - UI framework
- axios - HTTP client