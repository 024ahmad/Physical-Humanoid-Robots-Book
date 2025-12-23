---
id: "001"
title: "Create Backend Spec"
stage: "spec"
date: "2025-12-15"
model: "Claude Sonnet 4.5"
feature: "002-rag-chatbot"
branch: "002-rag-chatbot"
user: "user"
command: "/sp.specify"
labels: ["spec", "backend", "rag-chatbot"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "specs/002-rag-chatbot/backend/spec.md"
tests: []
---

## Prompt Text
```
You are working on a multi-part project with isolated specifications.

If the target path does not exist, you MUST create the full directory structure before writing the file.

TARGET PATH: specs/002-rag-chatbot/backend/spec.md

# 📘 Backend Specification
## Physical AI Book – RAG Chatbot

### 🔹 Project Overview
This backend is a RAG-based chatbot engine designed to work strictly on the Physical AI & Humanoid Robotics textbook content. The chatbot must only answer questions using the book's data.

### 🔹 Purpose
- Answer user questions based on book content
- Prevent hallucinations
- Support answers based on user-selected text only

### 🔹 Tech Stack
- FastAPI → Backend APIs
- Qdrant Cloud (Free Tier) → Vector Database
- Cohere → Text Embeddings
- OpenAI Agents SDK → Agent orchestration
- Gemini Free Model → LLM responses

### 🔹 Core Responsibilities
1. **Content Ingestion**
   - Receive book chapters
   - Split text into logical chunks

2. **Embedding Generation**
   - Generate embeddings for each chunk using Cohere

3. **Vector Storage**
   - Store embeddings in Qdrant

4. **Query Handling**
   - Convert user queries into embeddings
   - Retrieve relevant chunks from Qdrant

5. **Answer Generation**
   - Pass retrieved context to the Agent
   - Generate responses using Gemini model
   - Use only the provided context

6. **Selected Text Mode**
   - If the user selects text
   - Answer must be based only on that selected text

### 🔹 API Endpoints (Minimum)
- **/ingest** - Ingest book content into the vector database
- **/chat** - Standard RAG-based chatbot queries
- **/chat/selected-text** - Answers based only on selected text

### 🔹 Non-Goals
- UI handling
- Authentication
- Docusaurus book rendering

### 🔹 Strict Rule
The LLM must only use context retrieved from Qdrant. No external or general knowledge is allowed.
```

## Response Text
Created the backend specification file with all required sections including project overview, purpose, tech stack, core responsibilities, API endpoints, non-goals, and strict rules.