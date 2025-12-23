#!/usr/bin/env python3
"""
Script to populate Qdrant vector database with textbook content from docs folder
following exact requirements:
1. Delete existing collection
2. Split text into 1000 character chunks with 200 character overlap
3. Generate embeddings using Cohere API
4. Store with proper payload including complete text
"""

import sys
import os
import glob
import re
import time
from typing import List, Dict, Tuple
from uuid import uuid4

# Add the backend directory to the path so we can import modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '.'))

def extract_content_from_md_file(file_path: str) -> Dict[str, str]:
    """Extract content from a markdown file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract title from frontmatter or first heading
    title_match = re.search(r'^title:\s*(.+)$', content, re.MULTILINE)
    if title_match:
        title = title_match.group(1).strip()
    else:
        # Try to find first heading
        heading_match = re.search(r'^# (.+)$', content, re.MULTILINE)
        if heading_match:
            title = heading_match.group(1).strip()
        else:
            title = os.path.basename(file_path).replace('.md', '').replace('-', ' ').title()

    # Remove frontmatter (content between ---)
    content = re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)

    # Remove markdown headers but keep the text
    content = re.sub(r'^#.*$\n?', '', content, flags=re.MULTILINE)

    # Clean up extra whitespace
    content = re.sub(r'\n\s*\n', '\n\n', content)
    content = content.strip()

    return {
        'title': title,
        'content': content,
        'file_path': file_path
    }

def chunk_text_with_overlap(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
    """Split text into overlapping chunks of exact specified size with overlap"""
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size

        # Adjust end if we're near the end of the text
        if end > len(text):
            end = len(text)

        # Extract the chunk
        chunk = text[start:end]
        chunks.append(chunk)

        # Move start position forward by chunk_size minus overlap
        start = end - overlap

        # If no progress is made (e.g., chunk_size is too small compared to overlap)
        if start <= start:  # This shouldn't happen, but for safety
            start = end

        # Break if we've reached the end
        if start >= len(text):
            break

    # Filter out empty or very short chunks
    chunks = [chunk for chunk in chunks if len(chunk.strip()) > 10]

    return chunks

def delete_existing_collection():
    """Delete the existing Qdrant collection"""
    from app.services.qdrant_service import qdrant_service
    from app.config.settings import QDRANT_COLLECTION_NAME

    print(f"🗑️  Deleting existing collection: {QDRANT_COLLECTION_NAME}")

    try:
        # Check if collection exists
        try:
            collection_info = qdrant_service.client.get_collection(QDRANT_COLLECTION_NAME)
            print(f"   Found existing collection with {collection_info.points_count} points")

            # Actually delete the collection
            qdrant_service.client.delete_collection(QDRANT_COLLECTION_NAME)
            print("   ✅ Collection deleted successfully")

        except:
            print("   ℹ️  Collection doesn't exist yet, continuing...")

        # Create new collection
        from qdrant_client.http.models import Distance, VectorParams
        import numpy as np

        # Get embedding size from model
        # We'll create a test embedding to determine the size
        from app.services.embedding_service import embedding_service
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

def populate_qdrant_from_docs():
    """Populate Qdrant with content from docs folder"""
    print("📚 Populating Qdrant Vector Database from Docs Folder")
    print("="*70)

    try:
        from app.services.qdrant_service import qdrant_service
        from app.services.embedding_service import embedding_service
        from app.config.settings import QDRANT_COLLECTION_NAME, CHUNK_SIZE, CHUNK_OVERLAP

        # Use hardcoded values as per requirements
        chunk_size = 1000
        overlap = 200
        print(f"📊 Using chunk size: {chunk_size}, overlap: {overlap}")

        # Delete existing collection first
        if not delete_existing_collection():
            return False

        # Find all markdown files in docs/docs folder
        docs_path = "/mnt/e/Quarter_4_of_GIAIC/Hackathon/humanaroid-robots-book/docs/docs"
        md_files = glob.glob(os.path.join(docs_path, "**/*.md"), recursive=True)

        print(f"1. Found {len(md_files)} markdown files in docs folder")

        if not md_files:
            print("❌ No markdown files found in docs/docs folder")
            return False

        # Process files
        total_chunks = 0
        processed_files = 0
        api_calls_made = 0

        print("2. Processing files and generating embeddings...")

        for file_idx, file_path in enumerate(md_files):
            print(f"   Processing file {file_idx+1}/{len(md_files)}: {os.path.basename(file_path)}")

            try:
                # Extract content from file
                file_data = extract_content_from_md_file(file_path)
                title = file_data['title']
                content = file_data['content']

                if not content.strip():
                    print(f"     ⚠️  Skipping {os.path.basename(file_path)} - no content")
                    continue

                # Create chunks from content with exact specifications
                chunks = chunk_text_with_overlap(content, chunk_size=chunk_size, overlap=overlap)

                print(f"     Generated {len(chunks)} chunks from {os.path.basename(file_path)}")

                # Process each chunk
                for chunk_idx, chunk in enumerate(chunks):
                    # Use the complete chunk as the text (not combined with title)
                    text_content = chunk.strip()

                    # Generate embedding for the chunk
                    try:
                        embedding = embedding_service.generate_document_embeddings([text_content])[0]
                        api_calls_made += 1

                        # Prepare metadata
                        metadata = {
                            "chapter_name": title,
                            "file_path": file_path,
                            "chunk_index": chunk_idx,
                            "total_chunks": len(chunks),
                            "source": "docs_folder",
                            "page_number": 1,  # Not available for markdown files
                            "original_file": os.path.basename(file_path)
                        }

                        # Generate a unique ID for the point
                        point_id = str(uuid4())

                        # Prepare payload
                        payload = {
                            "text": text_content,  # Complete chunk text as required
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
                        print(f"     ✅ Chunk {chunk_idx+1}/{len(chunks)} stored (API call #{api_calls_made})")

                        # Rate limiting - pause to respect API limits
                        if api_calls_made % 5 == 0:  # Pause every 5 API calls
                            print(f"     ⏱️  Brief pause to respect rate limits...")
                            time.sleep(1)  # Brief pause

                    except Exception as e:
                        error_msg = str(e)
                        if "429" in error_msg or "rate limit" in error_msg.lower():
                            print(f"     ⚠️  Rate limit hit, waiting 30 seconds...")
                            time.sleep(30)  # Wait for rate limit to reset
                        else:
                            print(f"     ❌ Error processing chunk {chunk_idx+1}: {str(e)}")
                            continue

                processed_files += 1
                print(f"   ✅ Completed {os.path.basename(file_path)} ({len(chunks)} chunks)")

            except Exception as e:
                print(f"   ❌ Error processing {file_path}: {str(e)}")
                import traceback
                traceback.print_exc()
                continue

        print(f"\n3. Final Summary:")
        print(f"   Files processed: {processed_files}/{len(md_files)}")
        print(f"   Chunks successfully stored: {total_chunks}")
        print(f"   Total API calls made: {api_calls_made}")

        # Verify the collection has been populated
        try:
            final_count = qdrant_service.count_points()
            print(f"   Points in collection after population: {final_count}")

            if final_count > 0:
                print(f"\n✅ SUCCESS! Qdrant database updated successfully!")
                print(f"   - Collection '{QDRANT_COLLECTION_NAME}' has been recreated")
                print(f"   - {total_chunks} content chunks have been stored")
                print(f"   - Each chunk contains complete text (not just titles)")
                print(f"   - Proper metadata includes chapter name, file path, and chunk index")
                print(f"   - Ready for RAG system to use actual textbook content")

                # Show a sample of what was stored
                print(f"\n📝 Sample chunk stored:")
                sample_chunks = qdrant_service.client.scroll(
                    collection_name=QDRANT_COLLECTION_NAME,
                    limit=1
                )[0]  # Get first point as sample

                if sample_chunks:
                    sample = sample_chunks[0]  # Get the first point
                    text_preview = sample.payload["text"][:200] + "..." if len(sample.payload["text"]) > 200 else sample.payload["text"]
                    print(f"   Text preview: {text_preview}")
                    print(f"   Metadata: {sample.payload['metadata']}")

                return True
            else:
                print(f"\n⚠️  Warning: Collection appears to be empty after population")
                return False

        except Exception as e:
            print(f"   ❌ Error verifying collection: {str(e)}")
            return False

    except Exception as e:
        print(f"❌ Error populating Qdrant from docs: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("🚀 Starting Qdrant Population Process")
    print("   - Will delete existing collection")
    print("   - Will process all markdown files in docs/docs")
    print("   - Will create 1000-character chunks with 200-char overlap")
    print("   - Will store complete text with proper metadata")
    print("-" * 70)

    success = populate_qdrant_from_docs()

    if success:
        print("\n🎉 Qdrant population completed successfully!")
        print("💡 The database now contains actual textbook content with complete chunks")
        print("   instead of just titles, enabling better RAG functionality.")
    else:
        print("\n💥 Qdrant population failed!")
        print("   Check the error messages above for details.")