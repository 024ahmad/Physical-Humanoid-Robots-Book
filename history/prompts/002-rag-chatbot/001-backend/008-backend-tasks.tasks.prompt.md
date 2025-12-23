---
id: "003"
title: "Create Backend Tasks"
stage: "tasks"
date: "2025-12-15"
model: "Claude Sonnet 4.5"
feature: "002-rag-chatbot"
branch: "003-rag-chatbot-backend-plan"
user: "user"
command: "/sp.tasks"
labels: ["tasks", "backend", "rag-chatbot"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "specs/002-rag-chatbot/backend/tasks.md"
tests: []
---

## Prompt Text
```
You are working on a multi-part project with isolated specifications.

If the target path does not exist, you MUST create the full directory structure before writing the file.

**TARGET PATH:** specs/002-rag-chatbot/backend/plan.md

# ✅ Backend Tasks
## Physical AI Book – RAG Chatbot

### 🔹 Phase 0: Environment & Dependencies
- Create Python virtual environment
- Install core dependencies:
  - FastAPI, Uvicorn
  - Qdrant Client
  - Cohere SDK
  - OpenAI Agents SDK
  - Gemini client (via Agents SDK)
  - python-dotenv
- Add all dependencies to requirements.txt

### 🔹 Phase 1: Environment Configuration
- Create .env file in backend/ root
- Store all secrets in .env:
  - QDRANT_URL
  - QDRANT_API_KEY
  - COHERE_API_KEY
  - GEMINI_API_KEY
- Add .env to .gitignore

### 🔹 Phase 2: Config Management
- Implement config.py
- Load environment variables using python-dotenv
- Centralize all API keys and settings in config.py
- Ensure no hardcoded secrets in codebase

### 🔹 Phase 3: Project Structure Setup
- Create backend folder structure:
  - routers/
  - services/
  - schemas/
  - utils/
- Initialize FastAPI app in main.py
- Register routers

### 🔹 Phase 4: Content Ingestion Pipeline
- Create /ingest API endpoint
- Implement text chunking utility
- Generate embeddings using Cohere
- Store embeddings and metadata in Qdrant

### 🔹 Phase 5: Vector Search Layer
- Implement similarity search in Qdrant
- Retrieve top-k relevant chunks
- Validate clean and relevant context output

### 🔹 Phase 6: RAG Chat Implementation
- Create /chat endpoint
- Convert user query to embedding
- Retrieve relevant chunks from Qdrant
- Pass retrieved context to Agent

### 🔹 Phase 7: Selected Text Mode
- Create /chat/selected-text endpoint
- Restrict context strictly to selected text
- Disable external knowledge usage

### 🔹 Phase 8: Agent & LLM Integration
- Setup OpenAI Agents SDK
- Configure Gemini Free Model
- Enforce context-only response rule

### 🔹 Phase 9: Claude Code Rules
- Instruct Claude Code:
  - Read all API keys from config.py
  - Assume .env is pre-configured
  - Never hardcode secrets
  - Follow Spec and TASKS strictly

### 🔹 Phase 10: Testing & Validation
- Test ingestion flow
- Verify RAG answers are book-grounded
- Test selected-text-only responses
- Confirm no hallucinations

### 🔹 Phase 11: Documentation
- Write backend/README.md
- Document API endpoints
- Add setup and run instructions

## ✅ Final Deliverable
- Secure, production-ready RAG backend
- .env-based configuration
- Clean APIs ready for frontend (ChatKit + Docusaurus)
```

## Response Text
Created the backend tasks file with all required phases and tasks organized by user story priority. The tasks follow the checklist format with proper IDs, story labels, and file paths. The implementation strategy follows an incremental approach with setup, foundational components, and user stories in priority order. Each user story is designed to be independently testable.