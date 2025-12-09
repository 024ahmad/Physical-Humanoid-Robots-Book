---
title: "Week 7 Example: Dialogue Management in Human-Robot Interaction"
description: "A conceptual example demonstrating dialogue management for human-robot interaction"
tags: [example, module-2, hri, dialogue]
gpu: false
os: [Ubuntu 22.04]
---

# Week 7 Example: Dialogue Management in Human-Robot Interaction

## Overview

This conceptual example demonstrates how humanoid robots can manage dialogue with humans in a natural and contextually appropriate way. The example shows the complete dialogue loop including turn management, context awareness, and multimodal integration.

## The Dialogue Management Scenario: Task-Oriented Interaction

In this scenario, we'll explore how a humanoid robot can engage in a task-oriented dialogue with a human, managing turns, maintaining context, and integrating multiple communication modalities like speech, gestures, and gaze.

## Conceptual Dialogue Management Implementation

```python
# Conceptual Dialogue Management Example: Human-Robot Interaction
from typing import Dict, List, Tuple, Any, Optional
import math
import time
import random
from enum import Enum

class DialogueState(Enum):
    IDLE = "idle"
    LISTENING = "listening"
    PROCESSING = "processing"
    SPEAKING = "speaking"
    WAITING_FOR_RESPONSE = "waiting_for_response"
    ERROR = "error"

class CommunicationModality(Enum):
    SPEECH = "speech"
    GESTURE = "gesture"
    GAZE = "gaze"
    TACTILE = "tactile"

class DialogueManager:
    """
    A conceptual implementation of dialogue management for human-robot interaction
    """

    def __init__(self):
        self.dialogue_state = DialogueState.IDLE
        self.context_history = []
        self.utterance_history = []
        self.current_topic = "greeting"
        self.turn_queue = []
        self.response_timers = {}
        self.interruption_threshold = 2.0  # seconds before considering interruption
        self.listening_timeout = 10.0  # seconds before timeout
        self.confidence_threshold = 0.7
        self.multimodal_weights = {
            'speech': 0.6,
            'gesture': 0.3,
            'gaze': 0.1
        }

    def update_context(self, input_data: Dict[str, Any]):
        """
        Update the dialogue context based on input
        """
        context_entry = {
            'timestamp': time.time(),
            'input_modality': input_data.get('modality', 'speech'),
            'content': input_data.get('content', ''),
            'confidence': input_data.get('confidence', 1.0),
            'intent': input_data.get('intent', 'unknown'),
            'entities': input_data.get('entities', []),
            'speaker': input_data.get('speaker', 'human')
        }

        self.context_history.append(context_entry)

        # Keep only recent context (last 10 entries)
        if len(self.context_history) > 10:
            self.context_history = self.context_history[-10:]

    def recognize_intent(self, text: str) -> Dict[str, Any]:
        """
        Recognize intent from text input
        """
        # Define intent patterns
        intent_patterns = {
            'greeting': ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
            'goodbye': ['bye', 'goodbye', 'see you', 'farewell'],
            'request_action': ['please', 'can you', 'could you', 'help me', 'assist'],
            'request_information': ['what', 'how', 'where', 'when', 'why', 'tell me'],
            'affirmation': ['yes', 'sure', 'okay', 'ok', 'alright'],
            'negation': ['no', 'not', 'never', 'nope'],
            'gratitude': ['thank', 'thanks', 'appreciate'],
            'apology': ['sorry', 'apologize', 'excuse me'],
            'instruction': ['move', 'go', 'pick', 'place', 'put', 'take'],
            'question': ['?', 'explain', 'describe', 'show me']
        }

        text_lower = text.lower()
        recognized_intent = 'unknown'
        confidence = 0.0

        for intent, patterns in intent_patterns.items():
            for pattern in patterns:
                if pattern in text_lower:
                    # Calculate confidence based on pattern match
                    confidence = min(confidence + 0.3, 1.0)
                    if confidence > 0.5:
                        recognized_intent = intent

        return {
            'intent': recognized_intent,
            'confidence': confidence,
            'original_text': text
        }

    def extract_entities(self, text: str) -> List[Dict[str, str]]:
        """
        Extract entities from text (simplified version)
        """
        # Define common entities
        entities = []

        # Object entities
        objects = ['block', 'box', 'tool', 'part', 'item', 'object', 'robot', 'human']
        for obj in objects:
            if obj in text.lower():
                entities.append({'type': 'object', 'value': obj})

        # Location entities
        locations = ['here', 'there', 'left', 'right', 'front', 'back', 'above', 'below', 'on', 'under', 'near']
        for loc in locations:
            if loc in text.lower():
                entities.append({'type': 'location', 'value': loc})

        # Action entities
        actions = ['move', 'go', 'pick', 'place', 'take', 'put', 'show', 'give', 'help']
        for act in actions:
            if act in text.lower():
                entities.append({'type': 'action', 'value': act})

        return entities

    def generate_response(self, intent: str, entities: List[Dict[str, str]],
                         context: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Generate appropriate response based on intent and context
        """
        response_templates = {
            'greeting': [
                "Hello! How can I assist you today?",
                "Hi there! What can I do for you?",
                "Greetings! I'm ready to help."
            ],
            'goodbye': [
                "Goodbye! Feel free to call me if you need anything.",
                "See you later! Have a great day!",
                "Farewell! I'll be here if you need assistance."
            ],
            'request_action': [
                "I can help with that. Could you please specify what you need?",
                "Sure, I can assist with that. What exactly would you like me to do?",
                "I'm ready to help. Can you give me more details?"
            ],
            'request_information': [
                "I'd be happy to provide that information.",
                "Let me explain that for you.",
                "Here's what I know about that topic."
            ],
            'affirmation': [
                "Great! I'll proceed with that.",
                "Understood. I'll continue with the task.",
                "Perfect! I'll keep going."
            ],
            'negation': [
                "I understand. Would you like me to do something else?",
                "No problem. How else can I assist?",
                "Okay, I'll wait for further instructions."
            ],
            'gratitude': [
                "You're welcome! I'm happy to help.",
                "My pleasure! Is there anything else?",
                "Glad I could be of service!"
            ],
            'apology': [
                "No problem at all. How can I assist you?",
                "No need to apologize. What would you like me to do?",
                "Don't worry about it. How can I help?"
            ],
            'instruction': [
                "I understand. I'll carry out that instruction now.",
                "Got it. I'll execute that action.",
                "Processing your instruction now."
            ],
            'question': [
                "I'll do my best to answer your question.",
                "Let me provide information about that.",
                "I can explain that for you."
            ],
            'unknown': [
                "I'm not sure I understood that correctly. Could you please rephrase?",
                "I didn't catch that. Could you say it again?",
                "I'm not sure what you mean. Can you clarify?"
            ]
        }

        # Select a response based on intent
        responses = response_templates.get(intent, response_templates['unknown'])
        selected_response = random.choice(responses)

        # Enhance response based on entities
        if entities and intent not in ['greeting', 'goodbye', 'gratitude', 'apology']:
            object_entities = [e for e in entities if e['type'] == 'object']
            location_entities = [e for e in entities if e['type'] == 'location']
            action_entities = [e for e in entities if e['type'] == 'action']

            if object_entities:
                obj = object_entities[0]['value']
                selected_response = f"Regarding the {obj}, " + selected_response.lower()
            elif action_entities:
                act = action_entities[0]['value']
                selected_response = f"About {act}ing, " + selected_response.lower()

        return {
            'text': selected_response,
            'intent': intent,
            'confidence': 0.9 if intent != 'unknown' else 0.3
        }

    def manage_turns(self, speaker: str, timestamp: float) -> bool:
        """
        Manage turn-taking in the dialogue
        """
        current_time = time.time()

        # Add speaker to turn queue
        self.turn_queue.append({
            'speaker': speaker,
            'timestamp': timestamp
        })

        # Keep only recent turns (last 5)
        if len(self.turn_queue) > 5:
            self.turn_queue = self.turn_queue[-5:]

        # Check for turn violations (interruption)
        if len(self.turn_queue) >= 2:
            last_turn = self.turn_queue[-2]
            current_turn = self.turn_queue[-1]

            if (last_turn['speaker'] == current_turn['speaker'] and
                current_turn['timestamp'] - last_turn['timestamp'] < self.interruption_threshold):
                return False  # Same speaker too quickly - possible interruption

        return True

    def integrate_multimodal_input(self, speech_input: Optional[str] = None,
                                 gesture_input: Optional[str] = None,
                                 gaze_input: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Integrate multiple communication modalities
        """
        # Process speech input
        speech_result = None
        if speech_input:
            intent_recognition = self.recognize_intent(speech_input)
            entities = self.extract_entities(speech_input)
            speech_result = {
                'text': speech_input,
                'intent': intent_recognition['intent'],
                'confidence': intent_recognition['confidence'],
                'entities': entities
            }

        # Process gesture input
        gesture_result = None
        if gesture_input:
            gesture_intent = self._map_gesture_to_intent(gesture_input)
            gesture_result = {
                'gesture': gesture_input,
                'intent': gesture_intent,
                'confidence': 0.8
            }

        # Process gaze input
        gaze_result = None
        if gaze_input:
            gaze_result = {
                'gaze_target': gaze_input.get('target'),
                'attention': gaze_input.get('attention_type', 'focus'),
                'confidence': 0.9
            }

        # Combine modalities based on weights
        combined_result = {
            'primary_modality': 'speech',
            'intent': 'unknown',
            'confidence': 0.0,
            'content': '',
            'all_modalities': {
                'speech': speech_result,
                'gesture': gesture_result,
                'gaze': gaze_result
            }
        }

        # Determine primary intent from modalities
        intents_and_confidences = []
        if speech_result:
            intents_and_confidences.append((speech_result['intent'],
                                          speech_result['confidence'] * self.multimodal_weights['speech']))
        if gesture_result:
            intents_and_confidences.append((gesture_result['intent'],
                                          gesture_result['confidence'] * self.multimodal_weights['gesture']))
        if gaze_result:
            # Gaze might not have a direct intent but can modify context
            pass

        if intents_and_confidences:
            # Select the intent with highest weighted confidence
            best_intent, best_confidence = max(intents_and_confidences, key=lambda x: x[1])
            combined_result['intent'] = best_intent
            combined_result['confidence'] = best_confidence
            if speech_result:
                combined_result['content'] = speech_result['text']

        return combined_result

    def _map_gesture_to_intent(self, gesture: str) -> str:
        """
        Map gesture to corresponding intent
        """
        gesture_intent_map = {
            'pointing': 'request_information',
            'waving': 'greeting',
            'beckoning': 'request_attention',
            'thumbs_up': 'affirmation',
            'thumbs_down': 'negation',
            'stop': 'negation',
            'nodding': 'affirmation',
            'shaking_head': 'negation'
        }

        return gesture_intent_map.get(gesture.lower(), 'unknown')

    def handle_dialogue_turn(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle a complete dialogue turn
        """
        # Update dialogue state
        self.dialogue_state = DialogueState.PROCESSING

        # Integrate multimodal input
        multimodal_result = self.integrate_multimodal_input(
            input_data.get('speech'),
            input_data.get('gesture'),
            input_data.get('gaze')
        )

        # Update context with the input
        context_input = {
            'modality': 'multimodal',
            'content': multimodal_result['content'],
            'confidence': multimodal_result['confidence'],
            'intent': multimodal_result['intent'],
            'entities': multimodal_result.get('entities', []),
            'speaker': 'human'
        }
        self.update_context(context_input)

        # Check if turn management allows response
        turn_ok = self.manage_turns('human', time.time())
        if not turn_ok:
            return {
                'response': "It seems we spoke at the same time. Please go ahead.",
                'action': 'yield_turn',
                'state': self.dialogue_state.value
            }

        # Generate response based on intent
        if multimodal_result['confidence'] > self.confidence_threshold:
            response = self.generate_response(
                multimodal_result['intent'],
                multimodal_result.get('entities', []),
                self.context_history
            )
        else:
            response = self.generate_response(
                'unknown',
                [],
                self.context_history
            )

        # Add response to history
        response_entry = {
            'modality': 'speech',
            'content': response['text'],
            'confidence': response['confidence'],
            'intent': response['intent'],
            'speaker': 'robot'
        }
        self.utterance_history.append(response_entry)

        # Update dialogue state
        self.dialogue_state = DialogueState.SPEAKING

        # Prepare response data
        result = {
            'response_text': response['text'],
            'response_intent': response['intent'],
            'input_intent': multimodal_result['intent'],
            'confidence': multimodal_result['confidence'],
            'context_size': len(self.context_history),
            'state': self.dialogue_state.value,
            'multimodal_input': multimodal_result['all_modalities']
        }

        return result

    def simulate_dialogue_interaction(self) -> List[Dict[str, Any]]:
        """
        Simulate a complete dialogue interaction
        """
        print("=== Dialogue Management in Human-Robot Interaction ===")
        print("Simulating task-oriented dialogue with multimodal integration\n")

        # Define a sequence of human inputs
        interaction_sequence = [
            {
                'speech': 'Hello robot',
                'gesture': 'waving',
                'gaze': {'target': 'robot', 'attention_type': 'focus'}
            },
            {
                'speech': 'Can you help me with the red block?',
                'gesture': 'pointing',
                'gaze': {'target': 'red_block', 'attention_type': 'focus'}
            },
            {
                'speech': 'Please pick it up and place it on the table',
                'gesture': 'pointing',
                'gaze': {'target': 'red_block', 'attention_type': 'focus'}
            },
            {
                'speech': 'Yes, that is correct',
                'gesture': 'nodding',
                'gaze': {'target': 'robot', 'attention_type': 'focus'}
            },
            {
                'speech': 'Thank you very much',
                'gesture': 'waving',
                'gaze': {'target': 'robot', 'attention_type': 'focus'}
            },
            {
                'speech': 'Goodbye for now',
                'gesture': 'waving',
                'gaze': {'target': 'robot', 'attention_type': 'focus'}
            }
        ]

        results = []

        for i, input_data in enumerate(interaction_sequence):
            print(f"--- Dialogue Turn {i+1} ---")
            print(f"Input: {input_data['speech']}")
            print(f"Gesture: {input_data.get('gesture', 'none')}")
            print(f"Gaze: {input_data.get('gaze', {}).get('target', 'none')}")

            # Handle the dialogue turn
            result = self.handle_dialogue_turn(input_data)

            print(f"Robot response: {result['response_text']}")
            print(f"Recognition confidence: {result['confidence']:.2f}")
            print(f"Dialog state: {result['state']}\n")

            results.append(result)

        return results

def main():
    """
    Main function demonstrating dialogue management concepts
    """
    print("=== Dialogue Management in Human-Robot Interaction ===")
    print("This example demonstrates how robots manage natural dialogue with humans\n")

    # Create dialogue manager
    manager = DialogueManager()

    # Run the dialogue simulation
    results = manager.simulate_dialogue_interaction()

    print(f"=== Dialogue Management Summary ===")
    print(f"Total dialogue turns: {len(results)}")

    successful_exchanges = sum(1 for r in results if r['confidence'] > manager.confidence_threshold)
    print(f"Successful recognition exchanges: {successful_exchanges}/{len(results)}")

    # Analyze response patterns
    intents = [r['response_intent'] for r in results]
    if intents:
        most_common_intent = max(set(intents), key=intents.count)
        print(f"Most common response intent: {most_common_intent}")

    print(f"\nKey Dialogue Management Concepts Demonstrated:")
    print("1. Multimodal input integration (speech, gesture, gaze)")
    print("2. Intent recognition and entity extraction")
    print("3. Context maintenance across dialogue turns")
    print("4. Turn management and interruption handling")
    print("5. Appropriate response generation based on context")
    print("6. Confidence-based decision making")
    print("7. Task-oriented dialogue flow")

    print(f"\nDialogue Loop Components:")
    print("- Input Recognition: Converting multimodal input to structured data")
    print("- Context Integration: Updating dialogue state with new information")
    print("- Response Generation: Creating appropriate responses based on context")
    print("- Output Generation: Converting response to natural language and actions")
    print("- Turn Management: Coordinating speaking and listening turns")

if __name__ == "__main__":
    main()
```

## Key Learning Points

This conceptual example illustrates several important dialogue management concepts in human-robot interaction:

1. **Multimodal Integration**: How robots combine speech, gesture, and gaze information for richer understanding.

2. **Intent Recognition**: The process of identifying human intentions from various input modalities.

3. **Context Maintenance**: Keeping track of conversation history to maintain coherent dialogue.

4. **Turn Management**: Managing speaking and listening turns to ensure natural interaction flow.

5. **Response Generation**: Creating appropriate responses based on context and recognized intent.

6. **Confidence Assessment**: Evaluating the reliability of input recognition for robust interaction.

## Practical Applications

In real humanoid robots, dialogue management enables:
- Natural, human-like conversations with appropriate turn-taking
- Understanding of complex instructions combining speech and gestures
- Context-aware responses that build on previous interactions
- Smooth handling of interruptions and clarification requests
- Multimodal communication that feels natural to humans

## Conclusion

Dialogue management is fundamental to creating robots that can engage in natural, intuitive communication with humans. By integrating multiple communication modalities and maintaining coherent conversation context, robots can participate in meaningful interactions that feel natural and efficient to human users.