# RAG Chatbot API Documentation

## Base URL
`http://localhost:8000` (development)
`https://your-production-domain.com` (production)

## Endpoints

### 1. Health Check
- **GET** `/health`
- **Description**: Check if the API is running
- **Response**:
  ```json
  {
    "status": "healthy",
    "service": "RAG Chatbot Backend"
  }
  ```

### 2. Chat with RAG
- **POST** `/api/chat`
- **Description**: Send a query and get a response based on the knowledge base
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "query": "Your question here",
    "max_tokens": 500,
    "temperature": 0.1
  }
  ```
- **Response**:
  ```json
  {
    "response": "Generated response from AI",
    "sources": ["List of source documents used"],
    "tokens_used": null,
    "confidence": null
  }
  ```
- **Errors**:
  - `400 Bad Request`: Empty query or query too long (>500 chars)
  - `500 Internal Server Error`: Processing errors

### 3. Chat with Selected Text
- **POST** `/api/chat-selected-text`
- **Description**: Send a query with specific text context
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "query": "Your question here",
    "selected_text": "The specific text to base the answer on",
    "max_tokens": 500,
    "temperature": 0.1
  }
  ```
- **Response**:
  ```json
  {
    "response": "Generated response from AI",
    "sources": ["Selected Text"],
    "tokens_used": null,
    "confidence": null
  }
  ```

## CORS Configuration
- **Development**: `allow_origins=["*"]`
- **Production**: Update with specific frontend URLs:
  ```python
  allow_origins=[
    "http://localhost:3000",      # Local development
    "http://localhost:3001",      # Alternative dev port
    "https://yourdomain.com",     # Production
    "https://www.yourdomain.com"  # Production www
  ]
  ```

## Error Codes
- `400`: Bad Request (validation errors)
- `429`: Rate Limit Exceeded (API quota issues)
- `500`: Internal Server Error (processing failures)

## Example cURL Requests

### Chat Request:
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is humanoid robotics?",
    "max_tokens": 500,
    "temperature": 0.1
  }'
```

### Selected Text Request:
```bash
curl -X POST http://localhost:8000/api/chat-selected-text \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Explain this concept",
    "selected_text": "Humanoid robotics is a branch of robotics...",
    "max_tokens": 500,
    "temperature": 0.1
  }'
```

## Frontend Integration Tips

1. **CORS Headers**: The API allows all origins in development, but restrict in production
2. **Request Timeout**: Set appropriate timeouts (recommended: 30 seconds)
3. **Error Handling**: Handle 400, 429, and 500 errors gracefully
4. **Rate Limits**: Implement client-side throttling to avoid rate limits