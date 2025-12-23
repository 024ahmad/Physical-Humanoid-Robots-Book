---
id: "002"
title: "Create Backend Plan"
stage: "plan"
date: "2025-12-15"
model: "Claude Sonnet 4.5"
feature: "002-rag-chatbot"
branch: "003-rag-chatbot-backend-plan"
user: "user"
command: "/sp.specify"
labels: ["plan", "backend", "rag-chatbot"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "specs/002-rag-chatbot/backend/plan.md"
  - "specs/002-rag-chatbot/backend/checklists/plan-checklist.md"
tests: []
---

## Prompt Text
```
You are working on a multi-part project with isolated specifications.

If the target path does not exist, you MUST create the full directory structure before writing the file.

TARGET PATH: specs/002-rag-chatbot/backend/plan.md

# 🛠️ Backend Development Plan

## 🔹 Root Level Structure
The project root will contain:
- `/backend`
- `/frontend`

This document covers backend only.

## 🔹 Backend Folder Structure
backend/
├─ app/
│ ├─ main.py
│ ├─ config.py
│ ├─ routers/
│ │ ├─ ingest.py
│ │ └─ chat.py
│ ├─ services/
│ │ ├─ embedding_service.py
│ │ ├─ qdrant_service.py
│ │ └─ agent_service.py
│ ├─ schemas/
│ │ └─ chat_schema.py
│ └─ utils/
│ └─ text_splitter.py
├─ requirements.txt
└─ README.md

## 🔹 File-wise Responsibilities
### main.py
- Initialize FastAPI application
- Register API routers

### config.py
- Store API keys
- Qdrant configuration
- Model settings

### routers/ingest.py
- Receive book content
- Trigger ingestion pipeline

### routers/chat.py
- Handle normal chat queries
- Handle selected-text-based queries

### services/embedding_service.py
- Generate embeddings using Cohere

### services/qdrant_service.py
- Insert vectors
- Perform similarity search

### services/agent_service.py
- Use OpenAI Agents SDK
- Provide controlled context to Gemini model

### utils/text_splitter.py
- Split book text into manageable chunks

## 🔹 Backend Processing Flow
1. Book text is received
2. Text is split into chunks
3. Embeddings are generated
4. Embeddings are stored in Qdrant
5. User submits a query
6. Relevant content is retrieved from Qdrant
7. Agent + Gemini generate an answer using only retrieved content

## 🔹 Final Output
- Clean and scalable backend
- Accurate RAG-based chatbot
- Ready-to-use APIs for frontend (ChatKit + Docusaurus)
```

## Response Text
Created the backend development plan with directory structure, file responsibilities, processing flow, and final output expectations. Also created a checklist to track plan implementation.