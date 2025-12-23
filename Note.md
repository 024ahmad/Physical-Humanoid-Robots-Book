1- config.py me openai agent sdk use or configuration krwana hai with gemini api key, qwen ko hatana hai
2- /api/chat/selected-text endpoint ko (filwqt) k lye remove krwana hai 
3- app/services/qdrant_service.py or  app/routers/ingest.py:

  - Content ingestion API endpoints provide karta hai
  - /api/ingest endpoint: Text content ko vector database me store karne ke liye
  - /api/ingest-file endpoint: File upload aur uske content ko vector database me store karne ke liye
  - Text ko chunks me divide karta hai aur embeddings generate karta hai
  - Qdrant vector database me data store karta hai

  kya ye dono 1 hi kam krte hain


  Server Start krne k lye => python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload







 