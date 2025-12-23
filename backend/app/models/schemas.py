from pydantic import BaseModel
from typing import List, Dict, Optional

class ChatRequest(BaseModel):
    """
    Request model for chat queries
    """
    query: str
    max_tokens: Optional[int] = 500
    temperature: Optional[float] = 0.1

class Document(BaseModel):
    """
    Model for document chunks returned from vector search
    """
    content: str
    metadata: Dict
    score: float

class ChatResponse(BaseModel):
    """
    Response model for chat queries
    """
    response: str
    sources: List[Dict]
    tokens_used: Optional[int] = None
    confidence: Optional[float] = None

class SelectedTextChatRequest(BaseModel):
    """
    Request model for selected text chat queries
    """
    query: str
    selected_text: str
    max_tokens: Optional[int] = 500
    temperature: Optional[float] = 0.1

class SearchResults(BaseModel):
    """
    Model for vector search results
    """
    documents: List[Document]
    count: int