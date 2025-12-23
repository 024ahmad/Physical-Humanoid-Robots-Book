# RAG Chatbot - Task List

## Phase 1: Project Setup and Configuration
- [x] T001 Create new backend project structure (if not exists)
- [x] T002 Initialize Python virtual environment
- [x] T003 Install dependencies
- [x] T004 Set up .env file with required API keys:
  - COHERE_API_KEY (for embeddings)
  - QDRANT_URL (your Qdrant instance URL)
  - QDRANT_API_KEY (if using Qdrant Cloud)
  - GEMINI_API_KEY (for agent)
- [x] T005 Create app directory structure:
  ```
  app/
  ├── main.py
  ├── config/
  │   └── settings.py
  ├── services/
  │   ├── embedding_service.py
  │   ├── qdrant_service.py
  │   └── agent_service.py
  ├── routers/
  │   └── chat.py
  ├── models/
  │   └── schemas.py
  └── utils/
      └── error_handlers.py
  ```
- [x] T006 Create settings.py for environment variable validation
- [x] T007 Test: Verify all API keys are valid and accessible

## Phase 2: Embedding Service (Query Embedding Only)
- [x] T008 Create `embedding_service.py` for Cohere integration
- [x] T009 Implement `generate_query_embedding()` function
  ```python
  def generate_query_embedding(query: str) -> List[float]:
      # Use Cohere to generate embedding
  ```
- [x] T010 Add error handling for embedding failures (API errors, rate limits)
- [x] T011 Add logging for embedding operations
- [x] T012 Test: Generate embeddings for 5 sample queries and verify output format

## Phase 3: Vector Database Service (Search Only)
- [x] T013 Create `qdrant_service.py` for vector search operations
- [x] T014 Initialize Qdrant client with URL and API key
- [x] T015 Implement `search_similar_documents()` function:
  ```python
  def search_similar_documents(query_embedding: List[float], top_k: int = 5):
      # Search in Qdrant collection
      # Return relevant chunks with metadata
  ```
- [x] T016 Get your Qdrant collection name and add to config
- [x] T017 Create Document schema in `models/schemas.py`:
  ```python
  class Document(BaseModel):
      content: str
      metadata: dict
      score: float
  ```
- [x] T018 Add error handling for Qdrant operations (connection errors, empty results)
- [x] T019 Test: Search with sample embeddings and verify results

## Phase 4: Gemini Agent Integration with OpenAI SDK
- [x] T020 Create `agent_service.py` for agent operations
- [x] T021 Import required modules:
  ```python
  from agents import Agent, Runner, AsyncOpenAI, OpenAIChatCompletionsModel, RunConfig
  ```
- [x] T022 Initialize AsyncOpenAI client with Gemini:
  ```python
  external_client = AsyncOpenAI(
      api_key=GEMINI_API_KEY,
      base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
  )
  ```
- [x] T023 Create Agent with system instructions:
  ```python
  agent = Agent(
      name="RAG Assistant",
      instructions="You are a helpful assistant that answers questions based on provided textbook content. Use the context to provide accurate, detailed answers."
  )
  ```
- [x] T024 Configure OpenAIChatCompletionsModel with gemini-2.5-flash
- [x] T025 Create RunConfig with model and client
- [x] T026 Implement `generate_response()` function:
  ```python
  async def generate_response(query: str, context: List[str]) -> str:
      # Format context + query
      # Run agent with Runner.run_sync or Runner.run
      # Return final_output
  ```
- [x] T027 Add retry logic for agent API failures (3 retries with exponential backoff)
- [x] T028 Add error handling for agent failures
- [x] T029 Test: Agent responses with sample context and queries

## Phase 5: FastAPI Endpoint Development
- [x] T030 Create `main.py` with FastAPI app initialization
- [x] T031 Configure CORS middleware for frontend URL:
  ```python
  from fastapi.middleware.cors import CORSMiddleware
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["your-frontend-url"],  # Update with actual URL
      allow_methods=["POST"],
      allow_headers=["*"],
  )
  ```
- [x] T032 Create `chat.py` router in routers/
- [x] T033 Create request/response schemas in `models/schemas.py`:
  ```python
  class ChatRequest(BaseModel):
      query: str

  class ChatResponse(BaseModel):
      answer: str
      sources: List[Document]
      processing_time: float
      error: Optional[str] = None
  ```
- [x] T034 Implement POST `/api/chat` endpoint
- [x] T035 Add request validation (max query length: 500 chars, non-empty query)
- [x] T036 Add logging for all requests/responses with timestamps
- [x] T037 Add health check endpoint GET `/health`
- [x] T038 Test: Endpoint with Postman/Thunder Client/cURL

## Phase 6: Complete Pipeline Integration
- [x] T039 In `/api/chat` endpoint, integrate complete flow:
  1. Receive query from frontend
  2. Generate embedding using `embedding_service`
  3. Search Qdrant using `qdrant_service`
  4. Format context from search results
  5. Pass to agent using `agent_service`
  6. Return formatted response
- [x] T040 Implement context formatting for agent:
  ```python
  def format_context(documents: List[Document]) -> str:
      # Format retrieved chunks into readable context
  ```
- [x] T041 Add response time tracking (start to end)
- [x] T042 Implement comprehensive error handling:
  - Embedding generation fails → return error
  - Qdrant search fails → return error
  - No results found → fallback message
  - Agent fails → return error with retry info
- [x] T043 Add logging at each pipeline stage
- [x] T044 Test: End-to-end flow with 10 different queries

## Phase 7: Frontend Integration
- [x] T045 Get frontend chatbot's current API endpoint structure
- [x] T046 Update CORS origins with actual frontend URL (localhost + production)
- [x] T047 Test CORS with frontend (check browser console for errors)
- [x] T048 Document API contract for frontend team:
  - Request format
  - Response format
  - Error codes and messages
- [x] T049 Test API call from frontend chatbot
- [x] T050 Verify response rendering in frontend
- [x] T051 Test: Complete user journey (user types → sees response)

## Phase 8: Error Handling & Edge Cases
- [x] T052 Handle empty query → return "Please enter a question"
- [x] T053 Handle very long queries → truncate or return error
- [x] T054 Handle no results from Qdrant → "No relevant information found"
- [x] T055 Handle agent timeout (> 30 seconds) → return timeout error
- [x] T056 Handle rate limit errors → return "Too many requests, try again"
- [x] T057 Handle malformed requests → return 400 with clear message
- [x] T058 Add fallback response when agent fails after retries
- [x] T059 Test: All error scenarios and verify user-friendly messages

## Phase 9: Testing & Validation
- [x] T060 Create test_queries.txt with 15-20 sample questions from textbook
- [x] T061 Test each query and document results:
  - Query
  - Response accuracy (correct/incorrect)
  - Response time
  - Retrieved sources relevance
- [x] T062 Validate response quality (clear, accurate, contextual)
- [x] T063 Check response time for each query (target: < 5 seconds)
- [x] T064 Test concurrent requests (3-5 simultaneous users)
- [x] T065 Test with questions outside textbook scope (should gracefully handle)
- [x] T066 Frontend-backend integration testing (5 test scenarios)
- [x] T067 Test on different devices (mobile, desktop) from frontend

## Phase 10: Performance Optimization
- [ ] T068 Measure average response time
- [ ] T069 If slow, optimize:
  - Reduce Qdrant search results (top_k)
  - Optimize context formatting
  - Cache common queries (optional)
- [ ] T070 Add request timeout limits (30 seconds max)
- [ ] T071 Test: Response time improvements

## Phase 11: Documentation & Deployment
- [ ] T072 Create `.env.example` file with all required variables
- [ ] T073 Write comprehensive README.md:
  - Project description
  - Setup instructions
  - Environment variables
  - Running the server
  - API endpoints documentation
  - Troubleshooting guide
- [ ] T074 Document API endpoints with examples:
  - Request curl command
  - Response examples
  - Error responses
- [ ] T075 Add code comments in complex functions
- [ ] T076 Create deployment guide (local/cloud)
- [ ] T077 Document Qdrant collection details (name, embedding dimension)

## Phase 12: Final Deployment Prep
- [ ] T078 Test complete system in production-like environment
- [ ] T079 Verify all environment variables in deployment
- [ ] T080 Test with production frontend URL
- [ ] T081 Monitor logs for any errors
- [ ] T082 Create backup plan for service failures
- [ ] T083 Set up basic monitoring (response times, error rates)

## Acceptance Criteria
✅ **Core Functionality:**
- [ ] User submits question from Docusaurus chatbot
- [ ] FastAPI endpoint receives and validates request
- [ ] Query is embedded using Cohere API
- [ ] Qdrant returns relevant textbook chunks (top 3-5)
- [ ] Context is properly formatted for agent
- [ ] Gemini agent (via OpenAI SDK) generates accurate answer
- [ ] Response is sent back to frontend in correct JSON format

✅ **Performance:**
- [ ] Response time < 5 seconds for typical queries
- [ ] Handles 10 concurrent users without issues

✅ **Error Handling:**
- [ ] Graceful error messages for all failure scenarios
- [ ] No crashes or unhandled exceptions
- [ ] User-friendly error messages in frontend

✅ **Integration:**
- [ ] CORS configured correctly for frontend domain
- [ ] Frontend successfully displays agent responses
- [ ] Complete user journey works smoothly

✅ **Code Quality:**
- [ ] Clean, readable, commented code
- [ ] Proper error logging
- [ ] Environment variables properly managed
- [ ] API documentation complete

## Testing Checklist (After Each Phase)
- [ ] Unit test the specific service/function
- [ ] Integration test with previous components
- [ ] Error scenario testing
- [ ] Log verification
- [ ] Performance check

## Notes
- **Gemini Model:** Using gemini-2.5-flash via OpenAI SDK compatibility
- **Base URL:** https://generativelanguage.googleapis.com/v1beta/openai/
- **Data Source:** Textbook data already embedded and stored in Qdrant
- **Frontend:** Chatbot integrated in Docusaurus site
- **Tracing:** Disabled in RunConfig (set `tracing_disabled=True`)
