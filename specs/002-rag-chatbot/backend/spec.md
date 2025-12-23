# RAG Chatbot - Specification Document

## Overview
A professional RAG (Retrieval-Augmented Generation) chatbot that integrates with Docusaurus book content using vector search and AI-powered response generation.

## Architecture Requirements

### 1. Vector Database Layer
- **Qdrant** as vector database
- **Cohere embeddings** for vector generation
- Pre-stored book content with embeddings

### 2. API Layer (FastAPI)
- Single endpoint `/api/chat` for user queries
- Query embedding generation using same Cohere model
- Qdrant similarity search for relevant chunks
- Context collection from retrieved results

### 3. AI Agent Layer
- **OpenAI Agent SDK** for reasoning and response generation
- **Gemini model** via OpenAI-compatible interface
- Input: Original user query + retrieved context
- No direct access to vector database for agent
- Model: `gemini-2.5-flash` (free-tier friendly)

### 4. Technical Specifications

#### FastAPI Endpoints
```
POST /api/chat
{
  "query": "string",
  "max_tokens": "int (default: 500)",
  "temperature": "float (default: 0.1)"
}
```

#### Agent Configuration
- Base URL: `https://generativelanguage.googleapis.com/v1beta/openai/`
- API Key: From `.env` (GEMINI_API_KEY)
- Model: `gemini-2.5-flash`
- Agent SDK with Runner and RunConfig

#### Environment Variables
- `GEMINI_API_KEY`: Gemini API key
- `QDRANT_URL`: Qdrant connection URL
- `QDRANT_API_KEY`: Qdrant API key
- `COHERE_API_KEY`: Cohere API key for embeddings

## Functional Requirements

### 1. Query Processing Flow
1. User submits question
2. Query embedding generated via Cohere
3. Vector search in Qdrant for similar chunks
4. Top-k relevant chunks retrieved
5. Context assembled from chunks
6. Agent generates response using context + query
7. Response returned to user

### 2. Error Handling
- Graceful handling of API limits
- Fallback responses when context not found
- Proper logging and monitoring

### 3. Performance
- Fast response times
- Efficient vector search
- Minimal API calls to AI service

## Non-functional Requirements
- Production-ready code
- Clean, maintainable architecture
- Single responsibility principle
- Minimal dependencies