#!/usr/bin/env python3
"""
Script to populate Qdrant using sitemap.xml
Safe for WSL - includes memory management and rate limiting
"""

import sys
import os

# Add the backend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '.'))


def main():
    print("🚀 Starting Qdrant Population Process from Sitemap")
    print("   - Will delete existing collection")
    print("   - Will fetch content from sitemap.xml URLs")
    print("   - Will create 1000-character chunks with 200-char overlap")
    print("   - Will store complete text with proper metadata")
    print("   - Memory-safe with rate limiting to prevent WSL crash")
    print("-" * 70)

    try:
        from app.services.qdrant_data_service import populate_qdrant_from_sitemap

        # Configuration
        SITEMAP_URL = "https://physical-humanoid-robots-book-e6m5.vercel.app/sitemap.xml"
        MAX_PAGES = None  # Set to a number (e.g., 10) for testing
        
        # For testing, use max_pages to limit
        # MAX_PAGES = 10  # Uncomment for testing with 10 pages only

        print(f"\n⚙️  Configuration:")
        print(f"   Sitemap URL: {SITEMAP_URL}")
        print(f"   Max pages: {'All' if MAX_PAGES is None else MAX_PAGES}")
        print(f"   Chunk size: 1000 characters")
        print(f"   Overlap: 200 characters")
        print()

        # Start population
        success = populate_qdrant_from_sitemap(
            sitemap_url=SITEMAP_URL,
            chunk_size=1000,
            overlap=200,
            max_pages=MAX_PAGES
        )

        if success:
            print("\n🎉 Qdrant population completed successfully!")
            print("💡 The database now contains actual textbook content")
            print("   Your chatbot will now answer based on complete book content")
            print("\n📊 Next steps:")
            print("   1. Test your chatbot: ask 'what is physical ai?'")
            print("   2. Check if it returns detailed answers from book content")
            print("   3. If answers are still generic, check embedding service")
        else:
            print("\n💥 Qdrant population failed!")
            print("   Check the error messages above for details.")
            print("\n🔍 Common issues:")
            print("   - Sitemap URL not accessible (check Docusaurus is running)")
            print("   - Cohere API rate limit (wait and retry)")
            print("   - Memory issues (reduce MAX_PAGES for testing)")

    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure all dependencies are installed:")
        print("   pip install beautifulsoup4 requests")
    except Exception as e:
        print(f"❌ Error running Qdrant population: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()