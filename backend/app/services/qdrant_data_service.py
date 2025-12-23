"""
Qdrant Data Service for populating vector database with textbook content
following exact requirements:
1. Delete existing collection
2. Fetch content from sitemap.xml URLs
3. Split text into 1000 character chunks with 200 character overlap
4. Generate embeddings using Cohere API
5. Store with proper payload including complete text
"""

import os
import re
import time
import requests
import xml.etree.ElementTree as ET
from typing import List, Dict, Optional
from uuid import uuid4
import logging
import gc
from bs4 import BeautifulSoup

from app.services.qdrant_service import qdrant_service
from app.services.embedding_service import embedding_service
from app.config.settings import QDRANT_COLLECTION_NAME

logger = logging.getLogger(__name__)


def fetch_sitemap_urls(sitemap_url: str) -> List[str]:
    """Fetch all URLs from sitemap.xml"""
    print(f"📥 Fetching sitemap from: {sitemap_url}")
    
    try:
        response = requests.get(sitemap_url, timeout=30)
        response.raise_for_status()
        
        # Parse XML
        root = ET.fromstring(response.content)
        
        # Extract URLs (handle namespace)
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        urls = [loc.text for loc in root.findall('.//ns:loc', namespace)]
        
        print(f"   ✅ Found {len(urls)} URLs in sitemap")
        return urls
        
    except Exception as e:
        print(f"   ❌ Error fetching sitemap: {str(e)}")
        return []


def fetch_page_content(url: str) -> Optional[Dict[str, str]]:
    """Fetch and extract content from a single page"""
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract title
        title_tag = soup.find('title')
        title = title_tag.get_text().strip() if title_tag else url.split('/')[-1]
        
        # Extract main content (adjust selectors based on your site structure)
        # Try common content containers
        content_selectors = [
            'article',
            'main',
            '.markdown',
            '.content',
            '#content',
            '.post-content'
        ]
        
        content = ""
        for selector in content_selectors:
            content_tag = soup.select_one(selector)
            if content_tag:
                content = content_tag.get_text(separator='\n', strip=True)
                break
        
        # If no content found, get body text
        if not content:
            body = soup.find('body')
            if body:
                # Remove script and style tags
                for tag in body(['script', 'style', 'nav', 'header', 'footer']):
                    tag.decompose()
                content = body.get_text(separator='\n', strip=True)
        
        # Clean content
        content = re.sub(r'\n\s*\n', '\n\n', content)
        content = content.strip()
        
        if len(content) < 100:  # Skip pages with very little content
            return None
        
        return {
            'title': title,
            'content': content,
            'url': url
        }
        
    except Exception as e:
        print(f"     ⚠️ Error fetching {url}: {str(e)}")
        return None


def chunk_text_with_overlap(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
    """Split text into overlapping chunks of exact specified size with overlap"""
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size

        if end > len(text):
            end = len(text)

        chunk = text[start:end]
        chunks.append(chunk)

        start = end - overlap

        if start >= len(text):
            break

    chunks = [chunk for chunk in chunks if len(chunk.strip()) > 10]
    return chunks


def delete_existing_collection():
    """Delete the existing Qdrant collection"""
    print(f"🗑️  Deleting existing collection: {QDRANT_COLLECTION_NAME}")

    try:
        try:
            collection_info = qdrant_service.client.get_collection(QDRANT_COLLECTION_NAME)
            print(f"   Found existing collection with {collection_info.points_count} points")

            qdrant_service.client.delete_collection(QDRANT_COLLECTION_NAME)
            print("   ✅ Collection deleted successfully")

        except:
            print("   ℹ️  Collection doesn't exist yet, continuing...")

        from qdrant_client.http.models import Distance, VectorParams

        test_embedding = embedding_service.generate_query_embedding("test")
        embedding_size = len(test_embedding)

        print(f"   📐 Creating new collection with {embedding_size}-dimensional vectors")

        qdrant_service.client.create_collection(
            collection_name=QDRANT_COLLECTION_NAME,
            vectors_config=VectorParams(size=embedding_size, distance=Distance.COSINE)
        )

        print("   ✅ New collection created")
        return True

    except Exception as e:
        print(f"   ❌ Error deleting/creating collection: {str(e)}")
        return False


def populate_qdrant_from_sitemap(
    sitemap_url: str = "http://localhost:3000/sitemap.xml",
    chunk_size: int = 1000,
    overlap: int = 200,
    max_pages: Optional[int] = None
):
    """Populate Qdrant with content from sitemap.xml URLs"""
    print("📚 Populating Qdrant Vector Database from Sitemap")
    print("="*70)

    try:
        print(f"📊 Using chunk size: {chunk_size}, overlap: {overlap}")

        # Delete existing collection first
        if not delete_existing_collection():
            return False

        # Fetch URLs from sitemap
        urls = fetch_sitemap_urls(sitemap_url)
        
        if not urls:
            print("❌ No URLs found in sitemap")
            return False

        # Limit pages if specified (for testing)
        if max_pages:
            urls = urls[:max_pages]
            print(f"⚠️  Processing only first {max_pages} pages (testing mode)")

        total_chunks = 0
        processed_pages = 0
        api_calls_made = 0

        print(f"2. Processing {len(urls)} pages from sitemap...")

        for page_idx, url in enumerate(urls):
            print(f"\n   📄 Processing page {page_idx+1}/{len(urls)}: {url}")

            try:
                # Fetch page content
                page_data = fetch_page_content(url)
                
                if not page_data:
                    print(f"     ⚠️  Skipping - no content extracted")
                    continue

                title = page_data['title']
                content = page_data['content']

                # Create chunks
                chunks = chunk_text_with_overlap(content, chunk_size=chunk_size, overlap=overlap)
                print(f"     Generated {len(chunks)} chunks")

                # Process each chunk
                for chunk_idx, chunk in enumerate(chunks):
                    text_content = chunk.strip()

                    try:
                        # Generate embedding
                        embedding = embedding_service.generate_document_embeddings([text_content])[0]
                        api_calls_made += 1

                        # Prepare metadata
                        metadata = {
                            "title": title,
                            "url": url,
                            "chunk_index": chunk_idx,
                            "total_chunks": len(chunks),
                            "source": "sitemap"
                        }

                        # Generate unique ID
                        point_id = str(uuid4())

                        # Prepare payload
                        payload = {
                            "text": text_content,
                            "metadata": metadata
                        }

                        # Upsert to Qdrant
                        qdrant_service.client.upsert(
                            collection_name=QDRANT_COLLECTION_NAME,
                            points=[
                                {
                                    "id": point_id,
                                    "vector": embedding,
                                    "payload": payload
                                }
                            ]
                        )

                        total_chunks += 1
                        print(f"     ✅ Chunk {chunk_idx+1}/{len(chunks)} stored")

                        # Rate limiting - pause every 3 API calls
                        if api_calls_made % 3 == 0:
                            print(f"     ⏱️  Pausing to respect rate limits...")
                            time.sleep(3)

                    except Exception as e:
                        error_msg = str(e)
                        if "429" in error_msg or "rate limit" in error_msg.lower():
                            print(f"     ⚠️  Rate limit hit, waiting 30 seconds...")
                            time.sleep(30)
                        else:
                            print(f"     ❌ Error processing chunk: {str(e)}")
                            continue

                processed_pages += 1
                print(f"   ✅ Completed {title} ({len(chunks)} chunks)")

                # Memory cleanup every 5 pages
                if (page_idx + 1) % 5 == 0:
                    print(f"   🧹 Cleaning memory after {page_idx+1} pages...")
                    gc.collect()
                    time.sleep(2)

            except MemoryError:
                print(f"   💥 Out of memory! Stopping at page {page_idx+1}")
                break
            except KeyboardInterrupt:
                print(f"   ⏹️  Stopped by user at page {page_idx+1}")
                break
            except Exception as e:
                print(f"   ❌ Error processing page: {str(e)}")
                time.sleep(3)
                continue

        print(f"\n3. Final Summary:")
        print(f"   Pages processed: {processed_pages}/{len(urls)}")
        print(f"   Chunks successfully stored: {total_chunks}")
        print(f"   Total API calls made: {api_calls_made}")

        # Verify collection
        try:
            final_count = qdrant_service.count_points()
            print(f"   Points in collection: {final_count}")

            if final_count > 0:
                print(f"\n✅ SUCCESS! Qdrant database updated successfully!")
                print(f"   - Collection '{QDRANT_COLLECTION_NAME}' recreated")
                print(f"   - {total_chunks} content chunks stored")
                print(f"   - Each chunk contains complete text from sitemap pages")
                print(f"   - Ready for RAG system with actual textbook content")

                # Show sample
                sample_chunks = qdrant_service.client.scroll(
                    collection_name=QDRANT_COLLECTION_NAME,
                    limit=1
                )[0]

                if sample_chunks:
                    sample = sample_chunks[0]
                    text_preview = sample.payload["text"][:200] + "..." if len(sample.payload["text"]) > 200 else sample.payload["text"]
                    print(f"\n📝 Sample chunk stored:")
                    print(f"   Text preview: {text_preview}")
                    print(f"   Metadata: {sample.payload['metadata']}")

                return True
            else:
                print(f"\n⚠️  Warning: Collection empty after population")
                return False

        except Exception as e:
            print(f"   ❌ Error verifying collection: {str(e)}")
            return False

    except Exception as e:
        print(f"❌ Error populating Qdrant from sitemap: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


def get_qdrant_stats():
    """Get statistics about the Qdrant collection"""
    try:
        collection_info = qdrant_service.client.get_collection(QDRANT_COLLECTION_NAME)
        return {
            "points_count": collection_info.points_count,
            "collection_name": QDRANT_COLLECTION_NAME,
            "vectors_count": collection_info.vectors_count,
            "indexed_vectors_count": collection_info.indexed_vectors_count
        }
    except Exception as e:
        logger.error(f"Error getting Qdrant stats: {str(e)}")
        return None