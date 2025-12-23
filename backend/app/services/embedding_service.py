import cohere
from typing import List
import logging
from app.config.settings import COHERE_API_KEY, EMBEDDING_MODEL

class EmbeddingService:
    """
    Service to generate embeddings using Cohere API
    """

    def __init__(self):
        if not COHERE_API_KEY:
            raise ValueError("COHERE_API_KEY environment variable is not set")

        # Initialize Cohere client
        self.client = cohere.Client(api_key=COHERE_API_KEY)
        self.model = EMBEDDING_MODEL

    def generate_query_embedding(self, query: str) -> List[float]:
        """
        Generate embedding for a query string
        """
        logging.info(f"Generating embedding for query: {query[:50]}...")
        try:
            response = self.client.embed(
                texts=[query],
                model=self.model,
                input_type="search_query"  # Updated to use valid input_type
            )
            logging.info(f"Successfully generated embedding for query: {query[:50]}...")
            return response.embeddings[0]
        except Exception as e:
            logging.error(f"Error generating query embedding for query '{query[:50]}...': {str(e)}")
            raise Exception(f"Error generating query embedding: {str(e)}")

    def generate_document_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for a list of document texts
        """
        logging.info(f"Generating embeddings for {len(texts)} document texts")
        try:
            response = self.client.embed(
                texts=texts,
                model=self.model,
                input_type="search_document"  # Updated to use valid input_type
            )
            logging.info(f"Successfully generated embeddings for {len(texts)} document texts")
            return response.embeddings
        except Exception as e:
            logging.error(f"Error generating document embeddings: {str(e)}")
            raise Exception(f"Error generating document embeddings: {str(e)}")

# Global instance of the embedding service
embedding_service = EmbeddingService()