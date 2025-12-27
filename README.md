# Hackathon 1 Physical AI & Humanoid Robotics Textbook

An interactive textbook with AI-powered chatbot for learning humanoid robotics concepts.

## Overview

This project combines a comprehensive textbook on Physical AI and Humanoid Robotics with an intelligent chatbot that answers questions based on the book's content. The system uses RAG (Retrieval-Augmented Generation) to provide accurate, context-aware responses.

## Architecture

- **Documentation**: Docusaurus-based textbook hosted on Vercel
- **Backend**: FastAPI RAG system with Qdrant vector database
- **Frontend**: React chatbot widget with text selection features
- **AI**: Gemini-powered responses with context from textbook

## Flow

1. Users read the textbook documentation
2. Select text or ask questions about robotics concepts
3. Frontend sends queries to backend API
4. Backend retrieves relevant context from vector database
5. AI generates contextual responses based on textbook content
6. Responses displayed in chat interface

## Deployment

- **Textbook**: [Vercel](https://physical-humanoid-robots-book-e6m5.vercel.app/)
- **Backend API**: [Hugging Face](https://sharoz024-physical-humanoid-robot.hf.space/)
- **Chatbot**: Embedded in documentation pages

## Features

- Interactive Q&A with textbook content
- Text selection context queries
- Responsive chat interface
- Real-time AI responses
- Vector-search powered accuracy