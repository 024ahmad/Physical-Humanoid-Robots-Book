from fastapi import APIRouter, HTTPException, status
from typing import List, Dict
import logging
import time
from datetime import datetime
import asyncio

from app.schemas.chat_schema import ChatRequest, ChatResponse, Document
from app.services.embedding_service import embedding_service
from app.services.qdrant_service import qdrant_service
from app.services.agent_service import agent_service

router = APIRouter()


def format_context_for_agent(documents: List[Dict]) -> str:
    """
    T040: Format the retrieved documents into a readable context for the agent
    """
    if not documents:
        return ""

    formatted_context = []
    for i, doc in enumerate(documents, 1):
        text = doc.get("text", "")
        metadata = doc.get("metadata", {})
        formatted_doc = f"Document {i}:\n{text}\nMetadata: {metadata}\n"
        formatted_context.append(formatted_doc)

    return "\n".join(formatted_context)


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat_request: ChatRequest):
    """
    Main chat endpoint that processes user queries using RAG pipeline
    """
    # T041: Track response time from start
    start_time = time.time()
    query = chat_request.query.strip()

    # T043: Log at pipeline stage - request received
    logging.info(f"Received chat request: {query[:100]}{'...' if len(query) > 100 else ''}")

    # T052: Handle empty query → return "Please enter a question"
    if not query:
        logging.error("Empty query received")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter a question"
        )

    # T053: Handle very long queries → truncate or return error
    if len(query) > 500:
        logging.error(f"Query too long: {len(query)} characters")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Query too long. Maximum 500 characters allowed."
        )

    try:
        # T039: Step 1 - Generate embedding for the query
        # T043: Log at pipeline stage - embedding generation
        logging.info("Starting embedding generation")
        query_embedding = embedding_service.generate_query_embedding(query)
        logging.info("Successfully generated query embedding")

        # T039: Step 2 - Search Qdrant using qdrant_service
        # T043: Log at pipeline stage - vector search
        logging.info("Starting vector search in Qdrant")
        search_results = qdrant_service.search_similar(query_embedding, limit=5)
        logging.info(f"Found {len(search_results)} similar documents from Qdrant")

        # T054: Handle no results from Qdrant → "No relevant information found"
        if not search_results:
            logging.warning("No relevant documents found in Qdrant")
            response = "No relevant information found in the textbook for your query."
            processing_time = time.time() - start_time
            logging.info(f"Request processed with no results in {processing_time:.2f} seconds")

            return ChatResponse(
                response=response,
                sources=[],
                tokens_used=None,
                confidence=None
            )

        # T039: Step 3 - Format context from search results
        # T040: Implement context formatting for agent
        # T043: Log at pipeline stage - context formatting
        logging.info("Formatting context for agent")
        context = []
        sources = []
        for result in search_results:
            context.append({
                "text": result["text"],
                "metadata": result["metadata"]
            })
            sources.append(result["text"][:200] + "..." if len(result["text"]) > 200 else result["text"])

        # T039: Step 4 - Pass to agent using agent_service
        # T043: Log at pipeline stage - agent processing
        logging.info("Sending query and context to agent service")

        # T055: Handle agent timeout (> 30 seconds) → return timeout error
        # Set a timeout for the agent response generation
        try:
            response = await asyncio.wait_for(
                asyncio.get_event_loop().run_in_executor(
                    None,
                    agent_service.generate_response,
                    query,
                    context,
                    chat_request.max_tokens,
                    chat_request.temperature
                ),
                timeout=30.0  # 30 seconds timeout
            )
        except asyncio.TimeoutError:
            logging.error("Agent response generation timed out (> 30 seconds)")
            raise HTTPException(
                status_code=status.HTTP_408_REQUEST_TIMEOUT,
                detail="Request timeout. The AI service is taking too long to respond."
            )

        logging.info("Successfully received response from agent")

        # T039: Step 5 - Return formatted response
        # T041: Calculate and log total processing time
        processing_time = time.time() - start_time
        logging.info(f"Request processed in {processing_time:.2f} seconds")

        # T036: Add logging for all requests/responses with timestamps
        logging.info(f"Response length: {len(response)} characters")

        return ChatResponse(
            response=response,
            sources=sources,
            tokens_used=None,  # Token count not available from agent service
            confidence=None    # Confidence score not available
        )

    except HTTPException:
        # Re-raise HTTP exceptions as they are
        raise
    except Exception as e:
        # T042: Comprehensive error handling
        error_msg = str(e)
        logging.error(f"Error in chat endpoint pipeline: {error_msg}")

        # T056: Handle rate limit errors → return "Too many requests, try again"
        if "429" in error_msg or "rate limit" in error_msg.lower() or "quota" in error_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many requests, try again later."
            )

        # T042: Different error responses based on error type
        if "embedding" in error_msg.lower():
            detail_msg = "Error with embedding generation. Please try again."
        elif "qdrant" in error_msg.lower() or "search" in error_msg.lower():
            detail_msg = "Error searching the knowledge base. Please try again."
        elif "agent" in error_msg.lower() or "gemini" in error_msg.lower():
            # T058: Add fallback response when agent fails after retries
            detail_msg = "I'm currently experiencing issues with the AI service. Please try again later."
        else:
            detail_msg = f"Error processing request: {error_msg}"

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail_msg
        )


