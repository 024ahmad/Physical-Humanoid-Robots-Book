from pydantic import BaseModel
from typing import List, Optional, Dict

class ChatRequest(BaseModel):
    """
    Request model for standard RAG chat queries
    """
    query: str
    max_tokens: Optional[int] = 500
    temperature: Optional[float] = 0.1


class ChatResponse(BaseModel):
    """
    Response model for chat queries
    """
    response: str
    sources: List[str]
    tokens_used: Optional[int] = None
    confidence: Optional[float] = None




class Document(BaseModel):
    """
    Document schema for search results
    """
    content: str
    metadata: Dict
    score: float