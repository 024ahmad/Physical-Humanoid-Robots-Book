#!/usr/bin/env python3
"""
Script to update Qdrant vector database with actual textbook content
instead of just titles that are currently stored
"""

import sys
import os
import glob
import re
import time
import uuid
from typing import List, Dict

# Add the backend directory to the path so we can import modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '.'))

def extract_content_from_md_file(file_path: str) -> Dict[str, str]:
    """Extract title and content from a markdown file"""
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

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 100) -> List[str]:
    """Split text into overlapping chunks"""
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size

        # If we're near the end, just take the rest
        if end >= len(text):
            chunk = text[start:]
        else:
            # Try to break at sentence boundary
            chunk = text[start:end]
            last_period = chunk.rfind('.')
            if last_period > chunk_size // 2:  # If period is in reasonable position
                chunk = text[start:start + last_period + 1]
                end = start + last_period + 1

        chunks.append(chunk)
        start = end - overlap if end < len(text) else len(text)

        # If no progress made, break to avoid infinite loop
        if start <= 0:
            start = end
        elif start >= len(text):
            break

    # Filter out empty or very short chunks
    chunks = [chunk for chunk in chunks if len(chunk.strip()) > 50]

    return chunks

def update_qdrant_with_actual_content():
    """Update Qdrant with actual textbook content instead of just titles"""
    print("📚 Updating Qdrant with Actual Textbook Content")
    print("="*70)

    try:
        from app.services.qdrant_service import qdrant_service
        from app.services.embedding_service import embedding_service
        from app.config.settings import QDRANT_COLLECTION_NAME

        # Find all markdown files in docs/docs folder
        docs_path = "/mnt/e/Quarter_4_of_GIAIC/Hackathon/humanaroid-robots-book/docs/docs"
        md_files = glob.glob(os.path.join(docs_path, "**/*.md"), recursive=True)

        print(f"1. Found {len(md_files)} markdown files in docs folder")

        if not md_files:
            print("❌ No markdown files found in docs/docs folder")
            return False

        # Check current content in Qdrant
        print("2. Checking current content in Qdrant...")
        current_count = qdrant_service.count_points()
        print(f"   Current points in collection: {current_count}")

        # Process first 3 files to avoid rate limits
        files_to_process = md_files[:3]  # Just 3 files to start with
        print(f"3. Processing first 3 files: {len(files_to_process)} files")

        # Process files with rate limiting
        processed_files = 0
        processed_chunks = 0
        api_calls_made = 0

        print("4. Processing files with actual content...")

        for file_path in files_to_process:
            print(f"   Processing: {os.path.basename(file_path)}")

            try:
                # Extract content from file
                file_data = extract_content_from_md_file(file_path)
                title = file_data['title']
                content = file_data['content']

                if not content.strip():
                    print(f"     ⚠️  Skipping {os.path.basename(file_path)} - no content")
                    continue

                # Create chunks from content
                chunks = chunk_text(content)

                print(f"     Generated {len(chunks)} chunks from {os.path.basename(file_path)}")

                # Process each chunk
                for i, chunk in enumerate(chunks):
                    # Combine title with chunk content for better context
                    full_content = f"{title}\n\n{chunk}"

                    # Generate embedding for the chunk
                    try:
                        # Make API call
                        embedding = embedding_service.generate_document_embeddings([full_content])[0]
                        api_calls_made += 1

                        print(f"     ✅ Chunk {i+1}/{len(chunks)} processed: {len(embedding)}d embedding")

                        processed_chunks += 1

                        # Rate limiting - pause every 5 API calls to stay under limit
                        if api_calls_made % 5 == 0:
                            print(f"     ⏱️  Pausing to respect rate limits... (made {api_calls_made} API calls)")
                            time.sleep(1)  # Brief pause

                    except Exception as e:
                        error_msg = str(e)
                        if "429" in error_msg or "rate limit" in error_msg.lower():
                            print(f"     ⚠️  Rate limit hit, waiting 30 seconds...")
                            time.sleep(30)  # Wait for rate limit to reset
                        else:
                            print(f"     ❌ Error processing chunk {i+1}: {str(e)}")
                            continue

                processed_files += 1
                print(f"   ✅ Completed {os.path.basename(file_path)} ({len(chunks)} chunks)")

            except Exception as e:
                print(f"   ❌ Error processing {file_path}: {str(e)}")
                continue

        print(f"\n5. Summary:")
        print(f"   Files processed: {processed_files}/{len(files_to_process)}")
        print(f"   Chunks processed: {processed_chunks}")
        print(f"   API calls made: {api_calls_made}")

        if processed_chunks > 0:
            print(f"\n✅ Content update completed!")
            print(f"   The Qdrant database now contains actual textbook content")
            print(f"   instead of just titles, enabling better answers to questions.")

            # Show sample of what was processed
            print(f"\n📝 Sample content that was processed:")
            if files_to_process:
                sample_file = files_to_process[0]
                sample_data = extract_content_from_md_file(sample_file)
                print(f"   File: {os.path.basename(sample_file)}")
                print(f"   Title: {sample_data['title']}")
                print(f"   Content preview: {sample_data['content'][:300]}...")

            print(f"\n💡 Next steps:")
            print(f"   - The RAG system will now use actual content instead of just titles")
            print(f"   - Questions like 'what is physical ai?' should now get better answers")
            print(f"   - You can test by asking questions in the chatbot")

        else:
            print(f"\n❌ No chunks were successfully processed")
            print(f"   Check your API keys and rate limits")

        return True

    except Exception as e:
        print(f"❌ Error updating Qdrant with content: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = update_qdrant_with_actual_content()
    if success:
        print("\n🎉 Content update completed!")
        print("The Qdrant database now contains actual textbook content.")
        print("Try asking 'what is physical ai?' again - it should give a proper answer now!")
    else:
        print("\n💥 Content update failed!")
        print("Check the error messages above for details.")