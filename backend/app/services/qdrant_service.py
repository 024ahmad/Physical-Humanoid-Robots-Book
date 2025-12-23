from qdrant_client import QdrantClient
from typing import List, Dict, Optional
from app.config.settings import QDRANT_URL, QDRANT_API_KEY, QDRANT_COLLECTION_NAME
import logging

class QdrantService:
    """
    Service for interacting with Qdrant vector database
    Handles similarity search operations for RAG system
    """

    def __init__(self):
        # Initialize Qdrant client
        if QDRANT_API_KEY:
            self.client = QdrantClient(
                url=QDRANT_URL,
                api_key=QDRANT_API_KEY,
                timeout=10
            )
        else:
            # For local Qdrant without API key
            self.client = QdrantClient(
                url=QDRANT_URL,
                timeout=10
            )

        self.collection_name = QDRANT_COLLECTION_NAME

    def search_similar(self, query_embedding: List[float], limit: int = 5) -> List[Dict]:
        """
        Search for similar vectors in the Qdrant collection
        """
        try:
            # Perform similarity search using query_points method
            search_results = self.client.query_points(
                collection_name=self.collection_name,
                query=query_embedding,
                limit=limit,
                with_payload=True
            )

            # Format results - query_points returns QueryResponse object with points
            formatted_results = []
            for result in search_results.points:
                formatted_result = {
                    "text": result.payload.get("text", "") if result.payload else "",
                    "metadata": result.payload.get("metadata", {}) if result.payload else {},
                    "score": result.score if hasattr(result, 'score') else getattr(result, 'similarity', 0)
                }
                formatted_results.append(formatted_result)

            return formatted_results
        except Exception as e:
            logging.error(f"Error performing similarity search in Qdrant: {str(e)}")
            raise Exception(f"Error searching in vector database: {str(e)}")

    def count_points(self) -> int:
        """
        Get the total number of points in the collection
        """
        try:
            collection_info = self.client.get_collection(self.collection_name)
            return collection_info.points_count
        except Exception as e:
            logging.error(f"Error getting point count from Qdrant: {str(e)}")
            return 0

    def check_connection(self) -> bool:
        """
        Check if connection to Qdrant is successful
        """
        try:
            # Try to get collection info to verify connection
            self.client.get_collection(self.collection_name)
            return True
        except Exception as e:
            logging.error(f"Error connecting to Qdrant: {str(e)}")
            return False

    def validate_embedding_dimension(self, embedding: List[float]) -> bool:
        """
        Validate if the embedding has the correct dimensions
        """
        try:
            # Perform a simple search with the embedding to validate it
            self.client.query_points(
                collection_name=self.collection_name,
                query=embedding,
                limit=1
            )
            return True
        except Exception as e:
            logging.error(f"Invalid embedding dimension: {str(e)}")
            return False

# Global instance of the Qdrant service
qdrant_service = QdrantService()