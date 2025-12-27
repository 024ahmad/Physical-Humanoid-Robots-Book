#!/usr/bin/env python3
"""
Script to populate Qdrant database from sitemap.xml
Fetches URLs, extracts content, chunks it, generates embeddings, and saves to Qdrant
"""

import os
import time
import gc
import requests
from typing import List, Dict, Optional
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
from app.services.qdrant_service import qdrant_service
from app.services.embedding_service import EmbeddingService

def fetch_sitemap_urls(sitemap_url: str) -> List[str]:
    """
    Fetch all URLs from sitemap.xml
    """
    try:
        response = requests.get(sitemap_url)
        response.raise_for_status()

        # Parse the sitemap XML
        root = ET.fromstring(response.content)

        # Handle both regular sitemap and sitemap index
        urls = []
        for url_elem in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
            urls.append(url_elem.text.strip())

        # If no URLs found with namespace, try without namespace
        if not urls:
            for url_elem in root.findall('.//url/loc'):
                urls.append(url_elem.text.strip())

        return urls
    except Exception as e:
        print(f"Error fetching sitemap: {str(e)}")
        return []

def extract_content_from_url(url: str) -> Optional[Dict[str, str]]:
    """
    Extract title and content from a given URL
    """
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')

        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()

        # Extract title
        title = soup.find('title')
        title = title.get_text().strip() if title else "No Title"

        # Extract main content - prioritize main content areas
        content_selectors = [
            'main', 'article', '.content', '#content',
            '.post-content', '.entry-content', 'body'
        ]

        content = ""
        for selector in content_selectors:
            element = soup.select_one(selector)
            if element:
                content = element.get_text(separator=' ', strip=True)
                break

        # If no content found with selectors, get from body
        if not content:
            body = soup.find('body')
            if body:
                content = body.get_text(separator=' ', strip=True)

        # Clean up the content
        content = ' '.join(content.split())

        return {
            "title": title,
            "content": content,
            "url": url
        }
    except Exception as e:
        print(f"Error extracting content from {url}: {str(e)}")
        return None

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
    """
    Split text into chunks of specified size with overlap
    """
    if len(text) <= chunk_size:
        return [text]

    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)

        # Move start by chunk_size - overlap to create overlap
        start = end - overlap

        # Handle case where remaining text is smaller than chunk_size
        if len(text) - start < chunk_size:
            if start < len(text):
                chunks.append(text[start:])
            break

    return chunks

def populate_from_sitemap():
    """
    Main function to populate Qdrant from sitemap
    """
    print("Starting sitemap population process...")

    # Fetch URLs from sitemap
    sitemap_url = "https://physical-humanoid-robots-book-e6m5.vercel.app/sitemap.xml"
    print("Fetching URLs from sitemap...")
    urls = fetch_sitemap_urls(sitemap_url)

    if not urls:
        print("No URLs found in sitemap")
        return

    print(f"Found {len(urls)} URLs to process")

    # Initialize services
    embedding_service = EmbeddingService()

    # Process each URL
    processed_count = 0
    api_call_count = 0
    total_chunks = 0

    for i, url in enumerate(urls):
        print(f"Processing URL {i+1}/{len(urls)}: {url}")

        # Extract content from URL
        content_data = extract_content_from_url(url)
        if not content_data:
            print(f"Failed to extract content from {url}")
            continue

        # Chunk the content
        chunks = chunk_text(content_data["content"], chunk_size=1000, overlap=200)
        total_chunks += len(chunks)

        print(f"Generated {len(chunks)} chunks for {url}")

        # Process each chunk
        for chunk_idx, chunk in enumerate(chunks):
            # Generate embedding with retry logic
            embedding = None
            retry_count = 0
            max_retries = 3

            while retry_count < max_retries and embedding is None:
                try:
                    # Using generate_document_embeddings for single chunk
                    embeddings = embedding_service.generate_document_embeddings([chunk])
                    embedding = embeddings[0]  # Get the first (and only) embedding
                    api_call_count += 1

                    # Add delay after every 3 API calls
                    if api_call_count % 3 == 0:
                        print("Waiting 3 seconds to respect rate limits...")
                        time.sleep(3)

                except requests.exceptions.RequestException as e:
                    if "429" in str(e) or "rate limit" in str(e).lower():
                        wait_time = (2 ** retry_count) * 5  # Exponential backoff
                        print(f"Rate limit hit, waiting {wait_time} seconds before retry...")
                        time.sleep(wait_time)
                        retry_count += 1
                    else:
                        print(f"Error generating embedding for chunk {chunk_idx} of {url}: {str(e)}")
                        break
                except Exception as e:
                    print(f"Error generating embedding for chunk {chunk_idx} of {url}: {str(e)}")
                    break

            if embedding is None:
                print(f"Failed to generate embedding for chunk {chunk_idx} of {url} after {max_retries} retries")
                continue

            # Prepare payload for Qdrant
            payload = {
                "text": chunk,
                "metadata": {
                    "title": content_data["title"],
                    "url": url,
                    "chunk_index": chunk_idx
                }
            }

            # Save to Qdrant (this would need to be implemented in qdrant_service)
            # For now, we'll use the client directly
            try:
                # Create collection if it doesn't exist
                if processed_count == 0:
                    try:
                        qdrant_service.client.get_collection(qdrant_service.collection_name)
                    except:
                        # Create collection with appropriate vector size
                        # Get embedding dimension from the first embedding
                        from qdrant_client.http.models import Distance, VectorParams
                        qdrant_service.client.create_collection(
                            collection_name=qdrant_service.collection_name,
                            vectors_config=VectorParams(size=len(embedding), distance=Distance.COSINE)
                        )

                # Upsert the point
                from qdrant_client.http.models import PointStruct
                import uuid

                point = PointStruct(
                    id=str(uuid.uuid4()),
                    vector=embedding,
                    payload=payload
                )

                qdrant_service.client.upsert(
                    collection_name=qdrant_service.collection_name,
                    points=[point]
                )

                processed_count += 1
                print(f"Saved chunk {chunk_idx} of {url} to Qdrant ({processed_count}/{total_chunks} chunks saved)")

            except Exception as e:
                print(f"Error saving chunk {chunk_idx} of {url} to Qdrant: {str(e)}")
                continue

        # Run garbage collection every 5 pages
        if (i + 1) % 5 == 0:
            print("Running garbage collection...")
            gc.collect()

    print(f"Processing complete. Total chunks processed: {total_chunks}")

    print(f"Successfully processed and saved {processed_count} chunks to Qdrant")
    print("Sitemap population process completed!")

if __name__ == "__main__":
    populate_from_sitemap()