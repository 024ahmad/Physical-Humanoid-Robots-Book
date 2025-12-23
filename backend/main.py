from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat
import logging

# Configure basic logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Create FastAPI app instance
app = FastAPI(title="RAG Chatbot API", version="1.0.0")

# Configure CORS middleware for frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development, specify actual frontend URLs in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    # For production, replace with specific frontend URLs:
    # allow_origins=["http://localhost:3000", "http://localhost:3001", "https://yourdomain.com"],
)

# Include chat router
app.include_router(chat.router, prefix="/api", tags=["chat"])

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "RAG Chatbot Backend"}

# Additional health check endpoints can be added here

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)