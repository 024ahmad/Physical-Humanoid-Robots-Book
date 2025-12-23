---
sidebar_position: 2
---

# Chapter 2 (Week 12): Conversational AI and Voice Commands

## Overview

Conversational AI enables humanoid robots to interact naturally with humans through speech and dialogue. This chapter explores the integration of large language models with robotic systems for natural human-robot interaction.

## Core Concepts

### Conversational Architecture
- Speech Recognition: Converting speech to text
- Language Understanding: Interpreting user intent
- Dialogue Management: Maintaining conversation context
- Response Generation: Creating natural responses
- Text-to-Speech: Converting text to speech
- Context Awareness: Understanding conversation history
- Multi-turn conversations: Complex dialogue management

### LLM Integration
- Task Planning: Breaking down complex commands
- Context Understanding: Maintaining conversation history
- Multimodal Integration: Combining language with sensor data
- Personalization: Adapting responses to users
- Knowledge Retrieval: Accessing stored information
- Reasoning: Logical inference and decision making
- Safety Filtering: Preventing harmful responses

### Voice Commands
- Intent Classification: Understanding user's desired action
- Entity Extraction: Identifying objects or locations
- Action Mapping: Translating commands to robot actions
- Feedback Generation: Providing status updates
- Wake Word Detection: Activating voice recognition
- Speech Enhancement: Improving recognition accuracy
- Noise Robustness: Operating in challenging environments

### Natural Language Processing
- Tokenization: Breaking text into meaningful units
- Named Entity Recognition: Identifying people, places, objects
- Part-of-speech tagging: Understanding grammatical structure
- Dependency parsing: Analyzing sentence relationships
- Sentiment analysis: Understanding emotional context
- Coreference resolution: Linking pronouns to objects
- Semantic parsing: Converting to executable commands

## Essential Code Example

```python
import speech_recognition as sr
import openai
import json

class VoiceCommandProcessor:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.recognizer.energy_threshold = 3000
        self.recognizer.dynamic_energy_threshold = True

        # openai.api_key = "your-api-key"

        # Command mapping
        self.command_patterns = {
            'move_forward': ['move forward', 'go forward', 'forward'],
            'move_backward': ['move backward', 'go backward', 'backward'],
            'turn_left': ['turn left', 'left'],
            'turn_right': ['turn right', 'right'],
            'stop': ['stop', 'halt', 'freeze'],
            'greet': ['hello', 'hi', 'hey', 'greetings']
        }

    def recognize_speech(self, audio):
        try:
            text = self.recognizer.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            return None
        except sr.RequestError as e:
            print(f"Error: {e}")
            return None

    def process_command(self, text):
        # Use GPT for natural language understanding
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful robot assistant. Respond in JSON format with action and parameters."},
                    {"role": "user", "content": text}
                ],
                max_tokens=100,
                temperature=0.3
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"GPT Error: {e}")
            return json.dumps({"action": "unknown", "response": "Sorry, I couldn't understand that."})

    def extract_intent(self, text):
        """Simple intent classification based on keywords"""
        for action, patterns in self.command_patterns.items():
            for pattern in patterns:
                if pattern in text.lower():
                    return action
        return 'unknown'
```

## Key Takeaways

1. Conversational AI enables natural human-robot interaction
2. GPT integration provides sophisticated language understanding
3. Voice commands require speech recognition and action mapping
4. Context awareness enhances conversation quality
5. Safety considerations are essential for robot commands

---