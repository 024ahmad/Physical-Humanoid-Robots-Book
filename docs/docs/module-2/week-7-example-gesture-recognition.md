---
title: "Week 7 Example: Gesture Recognition in Human-Robot Interaction"
description: "A conceptual example demonstrating gesture recognition for human-robot interaction"
tags: [example, module-2, hri, gesture]
gpu: false
os: [Ubuntu 22.04]
---

# Week 7 Example: Gesture Recognition in Human-Robot Interaction

## Overview

This conceptual example demonstrates how humanoid robots can recognize and interpret human gestures as part of human-robot interaction. The example shows the complete pipeline from gesture detection to interpretation and appropriate response.

## The Gesture Recognition Scenario: Collaborative Assembly Task

In this scenario, we'll explore how a humanoid robot can recognize common gestures used in collaborative tasks, such as pointing to objects, indicating directions, and signaling approval or disapproval.

## Conceptual Gesture Recognition Implementation

```python
# Conceptual Gesture Recognition Example: Human-Robot Interaction
from typing import Dict, List, Tuple, Any
import math
import time
from enum import Enum

class GestureType(Enum):
    POINTING = "pointing"
    WAVING = "waving"
    THUMBS_UP = "thumbs_up"
    THUMBS_DOWN = "thumbs_down"
    NOD = "nod"
    SHAKE_HEAD = "shake_head"
    beckon = "beckon"
    STOP = "stop"

class GestureRecognizer:
    """
    A conceptual implementation of gesture recognition for human-robot interaction
    """

    def __init__(self):
        self.gesture_templates = self._initialize_gesture_templates()
        self.current_gesture_sequence = []
        self.confidence_threshold = 0.7
        self.tracking_history = []
        self.interaction_context = "neutral"

    def _initialize_gesture_templates(self) -> Dict[str, Any]:
        """
        Initialize gesture templates with characteristic features
        """
        return {
            GestureType.POINTING: {
                'hand_position': 'extended_arm',
                'finger_configuration': 'index_finger_extended',
                'motion_pattern': 'static_or_slow_movement',
                'orientation': 'toward_object',
                'confidence_weight': 0.9
            },
            GestureType.WAVING: {
                'hand_position': 'shoulder_level',
                'finger_configuration': 'open_hand',
                'motion_pattern': 'repetitive_lateral',
                'orientation': 'side_to_side',
                'confidence_weight': 0.85
            },
            GestureType.THUMBS_UP: {
                'hand_position': 'chest_level',
                'finger_configuration': 'thumb_extended_other_folded',
                'motion_pattern': 'static',
                'orientation': 'upward',
                'confidence_weight': 0.95
            },
            GestureType.THUMBS_DOWN: {
                'hand_position': 'chest_level',
                'finger_configuration': 'thumb_extended_other_folded',
                'motion_pattern': 'static',
                'orientation': 'downward',
                'confidence_weight': 0.95
            },
            GestureType.NOD: {
                'body_part': 'head',
                'motion_pattern': 'vertical_oscillation',
                'amplitude': 'small',
                'frequency': 'moderate',
                'confidence_weight': 0.8
            },
            GestureType.SHAKE_HEAD: {
                'body_part': 'head',
                'motion_pattern': 'horizontal_oscillation',
                'amplitude': 'moderate',
                'frequency': 'moderate',
                'confidence_weight': 0.8
            },
            GestureType.beckon: {
                'hand_position': 'extended_arm',
                'finger_configuration': 'fingers_flexed_extended',
                'motion_pattern': 'repetitive_pull_toward_body',
                'orientation': 'toward_robot',
                'confidence_weight': 0.85
            },
            GestureType.STOP: {
                'hand_position': 'extended_arm',
                'finger_configuration': 'open_palm',
                'motion_pattern': 'static',
                'orientation': 'facing_away',
                'confidence_weight': 0.9
            }
        }

    def detect_gesture_features(self, skeleton_data: Dict[str, List[float]]) -> Dict[str, Any]:
        """
        Extract features from human skeleton data for gesture recognition
        """
        features = {}

        # Extract hand positions and configurations
        if 'left_hand' in skeleton_data and 'right_hand' in skeleton_data:
            left_hand = skeleton_data['left_hand']
            right_hand = skeleton_data['right_hand']

            # Calculate hand positions relative to body
            features['left_hand_position'] = self._calculate_body_relative_position(
                left_hand, skeleton_data.get('torso', [0, 0, 0])
            )
            features['right_hand_position'] = self._calculate_body_relative_position(
                right_hand, skeleton_data.get('torso', [0, 0, 0])
            )

            # Calculate hand orientations
            features['left_hand_orientation'] = self._calculate_hand_orientation(
                skeleton_data, 'left'
            )
            features['right_hand_orientation'] = self._calculate_hand_orientation(
                skeleton_data, 'right'
            )

        # Extract head movement for nod/shake gestures
        if 'head' in skeleton_data and 'neck' in skeleton_data:
            features['head_movement'] = self._analyze_head_movement(
                skeleton_data['head'], skeleton_data.get('previous_head', skeleton_data['head'])
            )

        # Calculate joint angles for finger configurations
        features['finger_configurations'] = self._analyze_finger_configurations(skeleton_data)

        return features

    def _calculate_body_relative_position(self, hand_pos: List[float], torso_pos: List[float]) -> str:
        """
        Calculate hand position relative to body
        """
        dx = hand_pos[0] - torso_pos[0]
        dy = hand_pos[1] - torso_pos[1]
        dz = hand_pos[2] - torso_pos[2]

        distance = math.sqrt(dx**2 + dy**2 + dz**2)

        if distance < 0.2:  # Close to body
            return 'close_to_body'
        elif distance < 0.5 and abs(dy) < 0.2:  # Extended at shoulder level
            return 'shoulder_level'
        elif dy > 0.3:  # Above head
            return 'above_head'
        elif dy < -0.3:  # Below waist
            return 'below_waist'
        else:
            return 'extended_arm'

    def _calculate_hand_orientation(self, skeleton_data: Dict[str, List[float]], hand: str) -> Dict[str, float]:
        """
        Calculate hand orientation based on finger positions
        """
        # Simplified orientation calculation
        return {
            'palm_facing': 'forward',  # Simplified
            'thumb_direction': 'up'     # Simplified
        }

    def _analyze_head_movement(self, current_head: List[float], previous_head: List[float]) -> Dict[str, float]:
        """
        Analyze head movement for nod/shake detection
        """
        dx = current_head[0] - previous_head[0]
        dy = current_head[1] - previous_head[1]
        dz = current_head[2] - previous_head[2]

        movement_magnitude = math.sqrt(dx**2 + dy**2 + dz**2)

        return {
            'horizontal_movement': abs(dx),
            'vertical_movement': abs(dy),
            'depth_movement': abs(dz),
            'total_movement': movement_magnitude
        }

    def _analyze_finger_configurations(self, skeleton_data: Dict[str, List[float]]) -> Dict[str, str]:
        """
        Analyze finger configurations
        """
        # Simplified finger analysis
        return {
            'left_hand': 'open',  # Simplified
            'right_hand': 'closed'  # Simplified
        }

    def match_gesture(self, features: Dict[str, Any]) -> Tuple[GestureType, float]:
        """
        Match detected features to known gestures
        """
        best_match = None
        best_confidence = 0.0

        for gesture_type, template in self.gesture_templates.items():
            confidence = self._calculate_gesture_match(features, template, gesture_type)
            if confidence > best_confidence:
                best_confidence = confidence
                best_match = gesture_type

        return best_match, best_confidence

    def _calculate_gesture_match(self, features: Dict[str, Any], template: Dict[str, Any], gesture_type: GestureType) -> float:
        """
        Calculate match confidence between features and gesture template
        """
        score = 0.0
        max_score = 0.0

        # Check position match
        if 'left_hand_position' in features and 'hand_position' in template:
            if features['left_hand_position'] == template['hand_position']:
                score += 1.0
            max_score += 1.0

        if 'right_hand_position' in features and 'hand_position' in template:
            if features['right_hand_position'] == template['hand_position']:
                score += 1.0
            max_score += 1.0

        # Check finger configuration
        if 'finger_configurations' in features and 'finger_configuration' in template:
            # Simplified check
            score += 0.5
            max_score += 0.5

        # Check motion pattern
        if 'head_movement' in features and 'motion_pattern' in template:
            # Simplified check for head gestures
            score += 0.5
            max_score += 0.5

        # Calculate normalized score
        if max_score > 0:
            normalized_score = score / max_score
            # Apply confidence weight from template
            final_score = normalized_score * template.get('confidence_weight', 1.0)
            return min(final_score, 1.0)
        else:
            return 0.0

    def interpret_gesture_context(self, gesture: GestureType, context: str) -> str:
        """
        Interpret gesture meaning based on interaction context
        """
        context_interpretations = {
            "collaboration": {
                GestureType.POINTING: "directing_attention_to_object",
                GestureType.THUMBS_UP: "approval_of_robot_action",
                GestureType.THUMBS_DOWN: "disapproval_of_robot_action",
                GestureType.beckon: "request_for_robot_approach",
                GestureType.STOP: "request_for_robot_to_stop_action",
                GestureType.NOD: "agreement_with_robot_proposal",
                GestureType.SHAKE_HEAD: "disagreement_with_robot_proposal"
            },
            "greeting": {
                GestureType.WAVING: "greeting_acknowledgment",
                GestureType.NOD: "polite_acknowledgment",
                GestureType.THUMBS_UP: "positive_greeting"
            },
            "instruction": {
                GestureType.POINTING: "object_identification",
                GestureType.beckon: "approach_instruction",
                GestureType.STOP: "action_halt_instruction"
            }
        }

        return context_interpretations.get(context, {}).get(gesture, "unknown_meaning")

    def generate_robot_response(self, gesture: GestureType, confidence: float) -> Dict[str, Any]:
        """
        Generate appropriate robot response based on recognized gesture
        """
        if confidence < self.confidence_threshold:
            return {
                'action': 'request_clarification',
                'behavior': 'head_tilt_and_attention',
                'speech': 'Could you please repeat that gesture?'
            }

        response_map = {
            GestureType.POINTING: {
                'action': 'identify_object',
                'behavior': 'gaze_shift_to_pointed_location',
                'speech': 'I see you are pointing at something.'
            },
            GestureType.WAVING: {
                'action': 'greeting_response',
                'behavior': 'wave_back',
                'speech': 'Hello! How can I help you?'
            },
            GestureType.THUMBS_UP: {
                'action': 'acknowledge_approval',
                'behavior': 'nod_back',
                'speech': 'Thank you for the positive feedback!'
            },
            GestureType.THUMBS_DOWN: {
                'action': 'acknowledge_disapproval',
                'behavior': 'slight_bow',
                'speech': 'I apologize. How can I improve?'
            },
            GestureType.NOD: {
                'action': 'acknowledge_agreement',
                'behavior': 'verbal_confirmation',
                'speech': 'I agree with your assessment.'
            },
            GestureType.SHAKE_HEAD: {
                'action': 'acknowledge_disagreement',
                'behavior': 'request_clarification',
                'speech': 'I understand there might be a disagreement. Can you clarify?'
            },
            GestureType.beckon: {
                'action': 'approach_human',
                'behavior': 'move_closer',
                'speech': 'Coming to you now.'
            },
            GestureType.STOP: {
                'action': 'halt_current_action',
                'behavior': 'freeze_motion',
                'speech': 'Stopping current action.'
            }
        }

        return response_map.get(gesture, {
            'action': 'unknown_gesture',
            'behavior': 'neutral_posture',
            'speech': 'I did not recognize that gesture.'
        })

    def process_interaction_sequence(self, skeleton_sequence: List[Dict[str, List[float]]]) -> List[Dict[str, Any]]:
        """
        Process a sequence of skeleton data to recognize gestures over time
        """
        results = []

        for i, skeleton_data in enumerate(skeleton_sequence):
            # Detect features
            features = self.detect_gesture_features(skeleton_data)

            # Match to gestures
            recognized_gesture, confidence = self.match_gesture(features)

            if recognized_gesture and confidence > self.confidence_threshold:
                # Interpret in context
                interpretation = self.interpret_gesture_context(
                    recognized_gesture, self.interaction_context
                )

                # Generate response
                response = self.generate_robot_response(recognized_gesture, confidence)

                result = {
                    'frame': i,
                    'gesture': recognized_gesture.value,
                    'confidence': confidence,
                    'interpretation': interpretation,
                    'response': response,
                    'features': features
                }

                results.append(result)
                print(f"Frame {i}: Recognized {recognized_gesture.value} (confidence: {confidence:.2f})")

        return results

def simulate_human_robot_interaction():
    """
    Simulate a human-robot interaction scenario with various gestures
    """
    print("=== Gesture Recognition in Human-Robot Interaction ===")
    print("Simulating recognition of various human gestures\n")

    # Create gesture recognizer
    recognizer = GestureRecognizer()

    # Simulate a sequence of human gestures
    # Each entry represents skeleton data at a point in time
    # In a real system, this would come from vision processing
    skeleton_sequence = [
        # Gesture 1: Pointing to an object
        {
            'left_hand': [0.8, 0.5, 1.2],  # Extended arm pointing
            'right_hand': [0.1, 0.2, 1.0],  # Neutral position
            'head': [0.0, 1.6, 0.0],
            'torso': [0.0, 1.0, 0.0],
            'previous_head': [0.0, 1.6, 0.0]  # For movement analysis
        },
        # Gesture 2: Waving
        {
            'left_hand': [0.3, 1.5, 0.8],  # Raised, moving laterally
            'right_hand': [0.1, 0.2, 1.0],
            'head': [0.0, 1.6, 0.0],
            'torso': [0.0, 1.0, 0.0],
            'previous_head': [0.0, 1.6, 0.0]
        },
        # Gesture 3: Thumbs up
        {
            'left_hand': [0.1, 1.2, 0.8],  # Thumbs up position
            'right_hand': [0.1, 0.2, 1.0],
            'head': [0.0, 1.6, 0.0],
            'torso': [0.0, 1.0, 0.0],
            'previous_head': [0.0, 1.6, 0.0]
        },
        # Gesture 4: Beckoning
        {
            'left_hand': [0.6, 1.3, 0.9],  # Extended, pulling motion
            'right_hand': [0.1, 0.2, 1.0],
            'head': [0.0, 1.6, 0.0],
            'torso': [0.0, 1.0, 0.0],
            'previous_head': [0.0, 1.6, 0.0]
        }
    ]

    # Process the interaction sequence
    results = recognizer.process_interaction_sequence(skeleton_sequence)

    print(f"\n=== Interaction Summary ===")
    print(f"Total gestures recognized: {len(results)}")

    for i, result in enumerate(results):
        print(f"\nGesture {i+1}: {result['gesture']}")
        print(f"  Confidence: {result['confidence']:.2f}")
        print(f"  Interpretation: {result['interpretation']}")
        print(f"  Robot response: {result['response']['speech']}")

    # Demonstrate context sensitivity
    print(f"\n=== Context Sensitivity Demonstration ===")
    test_gesture = GestureType.POINTING
    contexts = ["collaboration", "greeting", "instruction"]

    for context in contexts:
        interpretation = recognizer.interpret_gesture_context(test_gesture, context)
        print(f"In {context} context, pointing means: {interpretation}")

    print(f"\nKey Gesture Recognition Concepts Demonstrated:")
    print("1. Feature extraction from human pose data")
    print("2. Template matching for gesture recognition")
    print("3. Context-aware gesture interpretation")
    print("4. Appropriate robot response generation")
    print("5. Confidence-based decision making")

if __name__ == "__main__":
    simulate_human_robot_interaction()
```

## Key Learning Points

This conceptual example illustrates several important gesture recognition concepts in human-robot interaction:

1. **Feature Extraction**: How robots extract relevant features from human pose data to identify gestures.

2. **Template Matching**: The process of matching detected features to known gesture templates.

3. **Context Sensitivity**: How the same gesture can have different meanings depending on the interaction context.

4. **Confidence Assessment**: The importance of confidence thresholds in gesture recognition.

5. **Appropriate Response**: How robots generate appropriate responses based on recognized gestures.

## Practical Applications

In real humanoid robots, gesture recognition enables:
- Natural human-robot communication without requiring special devices
- Collaborative tasks where humans can direct robot attention
- Social interactions that feel intuitive to humans
- Accessibility for users who prefer visual communication
- Hands-free interaction when humans are occupied with other tasks

## Conclusion

Gesture recognition is a fundamental capability for effective human-robot interaction. By recognizing and appropriately responding to human gestures, robots can engage in more natural and intuitive communication with humans, making them more accessible and easier to work with in collaborative environments.