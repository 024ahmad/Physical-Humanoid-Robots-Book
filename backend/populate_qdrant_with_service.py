#!/usr/bin/env python3
"""
Script to populate Qdrant using the new Qdrant data service
"""

import sys
import os

# Add the backend directory to the path so we can import modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '.'))

def main():
    print("🚀 Starting Qdrant Population Process using Qdrant Data Service")
    print("   - Will delete existing collection")
    print("   - Will process all markdown files in docs/docs")
    print("   - Will create 1000-character chunks with 200-char overlap")
    print("   - Will store complete text with proper metadata")
    print("-" * 70)

    try:
        from app.services.qdrant_data_service import populate_qdrant_from_docs

        success = populate_qdrant_from_docs()

        if success:
            print("\n🎉 Qdrant population completed successfully using the service!")
            print("💡 The database now contains actual textbook content with complete chunks")
            print("   instead of just titles, enabling better RAG functionality.")
        else:
            print("\n💥 Qdrant population failed!")
            print("   Check the error messages above for details.")

    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure all dependencies are installed and paths are correct.")
    except Exception as e:
        print(f"❌ Error running Qdrant population: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()