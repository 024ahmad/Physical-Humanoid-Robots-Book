from agents import Agent, Runner, AsyncOpenAI, OpenAIChatCompletionsModel, RunConfig
from typing import List, Dict, Optional
from app.config.settings import GEMINI_API_KEY, GEMINI_MODEL
import time
import random
import logging
import hashlib
from datetime import datetime, timedelta
import asyncio


class AgentService:
    """
    Service to use OpenAI Agent SDK with Google Gemini model for response generation
    The service ensures responses are based only on provided context
    """

    def __init__(self):
        if not GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY environment variable is not set")

        # Initialize AsyncOpenAI client with Gemini
        self.client = AsyncOpenAI(
            api_key=GEMINI_API_KEY,
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
        )

        # Create Agent with system instructions
        self.agent = Agent(
            name="RAG Assistant",
            instructions="You are a helpful assistant that answers questions based on provided textbook content. Use the context to provide accurate, detailed answers."
        )

        # Configure OpenAIChatCompletionsModel with gemini-2.5-flash
        self.model_config = OpenAIChatCompletionsModel(
            openai_client=self.client,
            model="gemini-2.5-flash"  # Using gemini-2.5-flash as per requirements
        )

        # Create RunConfig with model
        self.run_config = RunConfig(
            model=self.model_config,
            tracing_disabled=True  # Disable tracing as per requirements
        )

        # Initialize in-memory cache
        self.cache = {}
        self.cache_ttl = 300  # 5 minutes TTL for cached responses

    def _generate_cache_key(self, query: str, context: List[Dict], max_tokens: Optional[int], temperature: Optional[float]) -> str:
        """
        Generate a cache key based on the input parameters
        """
        # Create a string representation of the context
        context_str = str(sorted([str(item) for item in context]))
        cache_str = f"{query}_{context_str}_{max_tokens}_{temperature}"
        return hashlib.md5(cache_str.encode()).hexdigest()

    def _get_cached_response(self, cache_key: str) -> Optional[str]:
        """
        Get a cached response if it exists and hasn't expired
        """
        if cache_key in self.cache:
            response_data = self.cache[cache_key]
            if datetime.now() < response_data['expires_at']:
                return response_data['response']
            else:
                # Remove expired cache entry
                del self.cache[cache_key]
        return None

    def _set_cached_response(self, cache_key: str, response: str):
        """
        Cache a response with TTL
        """
        self.cache[cache_key] = {
            'response': response,
            'expires_at': datetime.now() + timedelta(seconds=self.cache_ttl)
        }

    async def generate_response_async(self, query: str, context: List[Dict], max_tokens: Optional[int] = 500,
                         temperature: Optional[float] = 0.1) -> str:
        """
        Generate a response based only on the provided context (async version)
        """
        # Generate cache key
        cache_key = self._generate_cache_key(query, context, max_tokens, temperature)

        # Check if response is already cached
        cached_response = self._get_cached_response(cache_key)
        if cached_response:
            logging.info("Returning cached response for query")
            return cached_response

        # Format the context into a string
        context_text = self._format_context(context)

        # Create a prompt that explicitly instructs the model to use only the provided context
        prompt = f"""
        You are an AI assistant for the Physical AI & Humanoid Robotics textbook.
        Your purpose is to answer questions based ONLY on the provided textbook content.
        Do not use any external knowledge or general information.

        CONTEXT:
        {context_text}

        QUESTION:
        {query}

        INSTRUCTIONS:
        1. Answer the question based ONLY on the provided context
        2. Even if the context seems incomplete, try to provide the best possible answer from the given information
        3. If the answer is clearly not in the context, then say "I cannot answer this question based on the provided textbook content."
        4. Be concise, accurate, and helpful
        5. Reference the source material when possible
        6. For technical questions, provide detailed explanations based on the context
        7. For greetings or non-technical questions, try to find relevant information in the context to provide a helpful response
        """

        # Generate response using the agent with retry logic
        max_retries = 3
        for attempt in range(max_retries):
            try:
                # Use async runner when in event loop
                result = await Runner.run(
                    self.agent,
                    prompt,
                    run_config=self.run_config
                )

                # Extract the final output from the result
                response_text = result.final_output if hasattr(result, 'final_output') else str(result)

                # Cache the successful response
                self._set_cached_response(cache_key, response_text)
                return response_text
            except Exception as e:
                error_msg = str(e)
                logging.error(f"Error generating response with Gemini agent (attempt {attempt + 1}): {error_msg}")

                # Check if it's a quota exceeded error
                if "429" in error_msg or "quota" in error_msg.lower() or "rate limit" in error_msg.lower():
                    if attempt < max_retries - 1:  # Don't sleep on the last attempt
                        # Exponential backoff with jitter
                        wait_time = (2 ** attempt) + random.uniform(0, 1)
                        logging.info(f"Quota exceeded, waiting {wait_time:.2f} seconds before retry...")
                        await asyncio.sleep(wait_time)  # Use async sleep
                        continue
                    else:
                        logging.error("Max retries reached for quota exceeded error")

                # For other types of errors, return the error message
                return "I'm currently experiencing issues with the AI service. Please try again later or check the API key configuration."

        # If we've exhausted retries, return fallback message
        return "I'm currently experiencing issues with the AI service. Please try again later."

    def generate_response(self, query: str, context: List[Dict], max_tokens: Optional[int] = 500,
                         temperature: Optional[float] = 0.1) -> str:
        """
        Generate a response based only on the provided context
        """
        # Check if we're in an async context (event loop running)
        try:
            loop = asyncio.get_running_loop()
            # If we get here, we're in an async context
            import threading
            if threading.current_thread() is threading.main_thread():
                # Use run_in_executor for sync method called from async context
                import concurrent.futures
                with concurrent.futures.ThreadPoolExecutor() as executor:
                    future = executor.submit(self._run_sync_agent, query, context, max_tokens, temperature)
                    return future.result()
            else:
                # We're in a worker thread, so just run normally
                return self._run_sync_agent(query, context, max_tokens, temperature)
        except RuntimeError:
            # No event loop running, we can safely call sync method
            return self._run_sync_agent(query, context, max_tokens, temperature)

    def _run_sync_agent(self, query: str, context: List[Dict], max_tokens: Optional[int], temperature: Optional[float]) -> str:
        """
        Internal method to run the agent synchronously
        """
        # Generate cache key
        cache_key = self._generate_cache_key(query, context, max_tokens, temperature)

        # Check if response is already cached
        cached_response = self._get_cached_response(cache_key)
        if cached_response:
            logging.info("Returning cached response for query")
            return cached_response

        # Format the context into a string
        context_text = self._format_context(context)

        # Create a prompt that explicitly instructs the model to use only the provided context
        prompt = f"""
        You are an AI assistant for the Physical AI & Humanoid Robotics textbook.
        Your purpose is to answer questions based ONLY on the provided textbook content.
        Do not use any external knowledge or general information.

        CONTEXT:
        {context_text}

        QUESTION:
        {query}

        INSTRUCTIONS:
        1. Answer the question based ONLY on the provided context
        2. Even if the context seems incomplete, try to provide the best possible answer from the given information
        3. If the answer is clearly not in the context, then say "I cannot answer this question based on the provided textbook content."
        4. Be concise, accurate, and helpful
        5. Reference the source material when possible
        6. For technical questions, provide detailed explanations based on the context
        7. For greetings or non-technical questions, try to find relevant information in the context to provide a helpful response
        """

        # Generate response using the agent with retry logic
        max_retries = 3
        for attempt in range(max_retries):
            try:
                # Run agent with Runner.run_sync - correct parameter names
                result = Runner.run_sync(
                    self.agent,
                    prompt,
                    run_config=self.run_config
                )

                # Extract the final output from the result
                response_text = result.final_output if hasattr(result, 'final_output') else str(result)

                # Cache the successful response
                self._set_cached_response(cache_key, response_text)
                return response_text
            except Exception as e:
                error_msg = str(e)
                logging.error(f"Error generating response with Gemini agent (attempt {attempt + 1}): {error_msg}")

                # Check if it's a quota exceeded error
                if "429" in error_msg or "quota" in error_msg.lower() or "rate limit" in error_msg.lower():
                    if attempt < max_retries - 1:  # Don't sleep on the last attempt
                        # Exponential backoff with jitter
                        wait_time = (2 ** attempt) + random.uniform(0, 1)
                        logging.info(f"Quota exceeded, waiting {wait_time:.2f} seconds before retry...")
                        time.sleep(wait_time)
                        continue
                    else:
                        logging.error("Max retries reached for quota exceeded error")

                # For other types of errors, return the error message
                return "I'm currently experiencing issues with the AI service. Please try again later or check the API key configuration."


    def _format_context(self, context: List[Dict]) -> str:
        """
        Format the context chunks into a readable string
        """
        formatted_context = []
        for i, chunk in enumerate(context):
            text = chunk.get("text", "")
            metadata = chunk.get("metadata", {})
            formatted_context.append(f"Chunk {i+1}: {text}\nMetadata: {metadata}\n")

        return "\n".join(formatted_context)


# Global instance of the agent service
agent_service = AgentService()