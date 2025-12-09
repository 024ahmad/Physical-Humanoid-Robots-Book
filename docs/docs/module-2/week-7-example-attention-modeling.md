---
title: "Week 7 Example: Attention Modeling in Human-Robot Interaction"
description: "A conceptual example demonstrating attention modeling for human-robot interaction"
tags: [example, module-2, hri, attention]
gpu: false
os: [Ubuntu 22.04]
---

# Week 7 Example: Attention Modeling in Human-Robot Interaction

## Overview

This conceptual example demonstrates how humanoid robots can model and respond to human attention during interaction. The example shows the robot's ability to detect where humans are looking, what they're focusing on, and how to appropriately respond to maintain natural interaction.

## The Attention Modeling Scenario: Collaborative Task Environment

In this scenario, we'll explore how a humanoid robot can detect human attention in a collaborative workspace, understand joint attention, and respond appropriately to maintain effective collaboration.

## Conceptual Attention Modeling Implementation

```python
# Conceptual Attention Modeling Example: Human-Robot Interaction
from typing import Dict, List, Tuple, Any, Optional
import math
import time
import random
from enum import Enum

class AttentionType(Enum):
    VISUAL = "visual"
    AUDITORY = "auditory"
    TACTILE = "tactile"
    TASK_FOCUS = "task_focus"

class AttentionState(Enum):
    FOCUSED = "focused"
    DIVERTED = "diverted"
    JOINT = "joint_attention"
    SHARED = "shared_attention"

class AttentionModel:
    """
    A conceptual implementation of attention modeling for human-robot interaction
    """

    def __init__(self):
        self.human_attention_history = []
        self.robot_attention_targets = []
        self.attention_threshold = 0.7  # Confidence threshold for attention detection
        self.joint_attention_objects = []
        self.shared_attention_context = "workplace"
        self.attention_decay_rate = 0.95  # How quickly attention decays over time
        self.social_attention_weights = {
            'gaze_following': 0.8,
            'pointing_following': 0.7,
            'verbal_cue_responding': 0.9,
            'proximity_responding': 0.6
        }

    def detect_human_gaze(self, head_pose: Dict[str, float], eye_data: Dict[str, float]) -> Dict[str, Any]:
        """
        Detect where the human is looking based on head pose and eye data
        """
        # Calculate gaze direction from head pose and eye orientation
        gaze_direction = [
            math.cos(head_pose['yaw']) * math.cos(head_pose['pitch']),
            math.sin(head_pose['pitch']),
            math.sin(head_pose['yaw']) * math.cos(head_pose['pitch'])
        ]

        # Apply eye offset to refine gaze direction
        refined_gaze = [
            gaze_direction[0] + eye_data.get('horizontal_offset', 0),
            gaze_direction[1] + eye_data.get('vertical_offset', 0),
            gaze_direction[2]
        ]

        # Normalize the gaze vector
        magnitude = math.sqrt(sum(x**2 for x in refined_gaze))
        if magnitude > 0:
            refined_gaze = [x/magnitude for x in refined_gaze]

        # Calculate where gaze intersects with the workspace
        workspace_height = 0.8  # meters above ground
        if refined_gaze[1] != 0:  # Avoid division by zero
            t = (workspace_height - head_pose['position'][1]) / refined_gaze[1]
            if t > 0:  # Looking downward (toward workspace)
                gaze_target = [
                    head_pose['position'][0] + t * refined_gaze[0],
                    workspace_height,
                    head_pose['position'][2] + t * refined_gaze[2]
                ]
                confidence = 0.9  # High confidence in gaze detection
            else:
                gaze_target = None
                confidence = 0.0
        else:
            gaze_target = None
            confidence = 0.0

        return {
            'gaze_direction': refined_gaze,
            'gaze_target': gaze_target,
            'confidence': confidence,
            'timestamp': time.time()
        }

    def detect_pointing_gesture(self, hand_position: List[float], body_orientation: float) -> Dict[str, Any]:
        """
        Detect if human is pointing and where they are pointing
        """
        # Calculate pointing direction based on hand position relative to body
        body_center = [0, 1.0, 0]  # Approximate body center
        pointing_vector = [
            hand_position[0] - body_center[0],
            hand_position[1] - body_center[1],
            hand_position[2] - body_center[2]
        ]

        # Normalize the vector
        magnitude = math.sqrt(sum(x**2 for x in pointing_vector))
        if magnitude > 0:
            pointing_direction = [x/magnitude for x in pointing_vector]
        else:
            return {'target': None, 'confidence': 0.0}

        # Calculate intersection with workspace
        workspace_height = 0.8
        if pointing_direction[1] != 0:
            t = (workspace_height - hand_position[1]) / pointing_direction[1]
            if t > 0:
                pointing_target = [
                    hand_position[0] + t * pointing_direction[0],
                    workspace_height,
                    hand_position[2] + t * pointing_direction[2]
                ]
                confidence = 0.85  # High confidence in pointing detection
            else:
                pointing_target = None
                confidence = 0.0
        else:
            pointing_target = None
            confidence = 0.0

        return {
            'target': pointing_target,
            'direction': pointing_direction,
            'confidence': confidence,
            'timestamp': time.time()
        }

    def detect_verbal_attention_cue(self, speech_content: str, speaker_direction: float) -> Dict[str, Any]:
        """
        Detect attention cues from speech content and direction
        """
        attention_keywords = {
            'look': 0.9,
            'see': 0.8,
            'here': 0.7,
            'this': 0.6,
            'that': 0.6,
            'there': 0.7,
            'attention': 0.9,
            'focus': 0.8,
            'watch': 0.9
        }

        # Check for attention-related keywords
        words = speech_content.lower().split()
        attention_score = 0.0
        for word in words:
            clean_word = word.strip('.,!?')
            if clean_word in attention_keywords:
                attention_score = max(attention_score, attention_keywords[clean_word])

        # Consider speaker direction
        speaker_attention = {
            'direction': speaker_direction,
            'importance': attention_score,
            'timestamp': time.time()
        }

        return speaker_attention

    def calculate_attention_probability(self, object_position: List[float],
                                      gaze_data: Dict[str, Any],
                                      pointing_data: Dict[str, Any]) -> float:
        """
        Calculate the probability that a human is attending to a specific object
        """
        probability = 0.0
        total_weight = 0.0

        # Gaze-based attention probability
        if gaze_data.get('gaze_target') is not None and gaze_data['confidence'] > 0:
            gaze_distance = math.sqrt(
                sum((gaze_data['gaze_target'][i] - object_position[i])**2
                    for i in range(3))
            )
            # Closer objects have higher attention probability
            gaze_prob = max(0, 1 - gaze_distance/2.0)  # Normalize to 0-1
            probability += gaze_prob * gaze_data['confidence'] * self.social_attention_weights['gaze_following']
            total_weight += self.social_attention_weights['gaze_following']

        # Pointing-based attention probability
        if pointing_data.get('target') is not None and pointing_data['confidence'] > 0:
            pointing_distance = math.sqrt(
                sum((pointing_data['target'][i] - object_position[i])**2
                    for i in range(3))
            )
            pointing_prob = max(0, 1 - pointing_distance/2.0)
            probability += pointing_prob * pointing_data['confidence'] * self.social_attention_weights['pointing_following']
            total_weight += self.social_attention_weights['pointing_following']

        # If we have both cues, combine them; otherwise, return 0 if no cues
        if total_weight > 0:
            return min(probability / total_weight, 1.0)
        else:
            return 0.0

    def detect_joint_attention(self, human_attention_targets: List[Dict[str, Any]],
                              robot_attention_targets: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Detect when human and robot are attending to the same object or location
        """
        joint_attention_instances = []

        for h_target in human_attention_targets:
            for r_target in robot_attention_targets:
                if h_target.get('position') and r_target.get('position'):
                    distance = math.sqrt(
                        sum((h_target['position'][i] - r_target['position'][i])**2
                            for i in range(3))
                    )

                    # If targets are close, consider it joint attention
                    if distance < 0.3:  # Within 30cm
                        joint_attention_instances.append({
                            'object_position': h_target['position'],
                            'human_attention_confidence': h_target.get('confidence', 0.8),
                            'robot_attention_confidence': r_target.get('confidence', 0.8),
                            'joint_attention_strength': max(0, 1 - distance/0.3),
                            'timestamp': time.time()
                        })

        return joint_attention_instances

    def predict_human_intention(self, attention_history: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Predict human intentions based on attention patterns
        """
        if len(attention_history) < 2:
            return {'intention': 'unknown', 'confidence': 0.0}

        # Analyze attention patterns over time
        recent_targets = attention_history[-3:]  # Last 3 attention targets

        # Check if attention is focused on a single object over time (intent to manipulate)
        if len(recent_targets) >= 2:
            positions = [t['position'] for t in recent_targets if 'position' in t]
            if len(positions) >= 2:
                # Calculate if positions are clustered (indicating focus)
                avg_pos = [
                    sum(p[i] for p in positions) / len(positions)
                    for i in range(3)
                ]

                # Calculate variance of positions
                variance = sum(
                    sum((positions[j][i] - avg_pos[i])**2 for i in range(3))
                    for j in range(len(positions))
                ) / len(positions)

                if variance < 0.01:  # Low variance indicates focused attention
                    return {
                        'intention': 'manipulate_object',
                        'target_position': avg_pos,
                        'confidence': 0.8
                    }

        # Check for alternating attention (comparing objects)
        if len(recent_targets) >= 4:
            positions = [t['position'] for t in recent_targets if 'position' in t]
            if len(positions) >= 4:
                # Look for pattern of switching between two locations
                unique_positions = []
                for pos in positions:
                    is_new = True
                    for existing_pos in unique_positions:
                        dist = math.sqrt(sum((pos[i] - existing_pos[i])**2 for i in range(3)))
                        if dist < 0.3:  # Within 30cm
                            is_new = False
                            break
                    if is_new and len(unique_positions) < 3:
                        unique_positions.append(pos)

                if len(unique_positions) == 2:
                    return {
                        'intention': 'compare_objects',
                        'target_positions': unique_positions,
                        'confidence': 0.7
                    }

        return {'intention': 'monitor_environment', 'confidence': 0.6}

    def generate_attention_response(self, attention_state: AttentionState,
                                  detected_object: Optional[str] = None) -> Dict[str, Any]:
        """
        Generate appropriate robot response based on attention state
        """
        response_map = {
            AttentionState.FOCUSED: {
                'action': 'maintain_attention',
                'behavior': 'follow_human_attention',
                'speech': f'I see you are focusing on {detected_object or "that object"}. How can I help?'
            },
            AttentionState.DIVERTED: {
                'action': 'reacquire_attention',
                'behavior': 'gently_get_attention',
                'speech': 'Excuse me, are you still working on the task?'
            },
            AttentionState.JOINT: {
                'action': 'acknowledge_joint_attention',
                'behavior': 'confirm_shared_focus',
                'speech': 'We are both looking at the same thing. Should I proceed?'
            },
            AttentionState.SHARED: {
                'action': 'collaborate',
                'behavior': 'coordinate_actions',
                'speech': 'I understand we are working together on this task.'
            }
        }

        return response_map.get(attention_state, {
            'action': 'monitor_attention',
            'behavior': 'maintain_readiness',
            'speech': 'I am ready to assist when needed.'
        })

    def simulate_attention_interaction(self, scenario_objects: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Simulate a human-robot interaction with attention modeling
        """
        print("=== Attention Modeling in Human-Robot Interaction ===")
        print("Simulating attention detection and response in a collaborative task\n")

        results = []

        # Simulate a sequence of attention events
        for step in range(8):
            print(f"--- Step {step + 1} ---")

            # Simulate human attention data
            # In a real system, this would come from sensors
            head_pose = {
                'yaw': random.uniform(-0.5, 0.5),
                'pitch': random.uniform(-0.2, 0.3),
                'position': [random.uniform(-1, 1), 1.6, random.uniform(-1, 1)]
            }
            eye_data = {
                'horizontal_offset': random.uniform(-0.1, 0.1),
                'vertical_offset': random.uniform(-0.1, 0.1)
            }

            # Detect human gaze
            gaze_data = self.detect_human_gaze(head_pose, eye_data)
            print(f"Gaze detected: {gaze_data['gaze_target'] if gaze_data['gaze_target'] else 'None'}")

            # Simulate hand position for pointing detection
            hand_position = [gaze_data['gaze_target'][0] + random.uniform(-0.2, 0.2) if gaze_data['gaze_target'] else 0.5,
                             1.2,
                             gaze_data['gaze_target'][2] + random.uniform(-0.2, 0.2) if gaze_data['gaze_target'] else 0.1]

            # Detect pointing gesture
            pointing_data = self.detect_pointing_gesture(hand_position, head_pose['yaw'])
            print(f"Pointing detected: {pointing_data['target'] if pointing_data['target'] else 'None'}")

            # Calculate attention probabilities for each object
            attention_results = []
            for obj in scenario_objects:
                prob = self.calculate_attention_probability(obj['position'], gaze_data, pointing_data)
                if prob > self.attention_threshold:
                    attention_results.append({
                        'object': obj['name'],
                        'position': obj['position'],
                        'attention_probability': prob,
                        'confidence': prob
                    })
                    print(f"High attention to {obj['name']}: {prob:.2f}")

            # Predict intention based on attention pattern
            if attention_results:
                # Add to attention history
                for att in attention_results:
                    self.human_attention_history.append(att)

                # Keep only recent history (last 5)
                if len(self.human_attention_history) > 5:
                    self.human_attention_history = self.human_attention_history[-5:]

                # Predict intention
                intention = self.predict_human_intention(self.human_attention_history)
                print(f"Predicted intention: {intention['intention']} (confidence: {intention['confidence']:.2f})")

                # Detect joint attention
                robot_target = random.choice(scenario_objects)  # Robot focusing on an object
                self.robot_attention_targets.append({
                    'position': robot_target['position'],
                    'confidence': 0.9
                })

                joint_attention = self.detect_joint_attention(attention_results, self.robot_attention_targets[-1:])
                if joint_attention:
                    print(f"Joint attention detected on object at {joint_attention[0]['object_position']}")

                # Determine attention state
                if joint_attention:
                    attention_state = AttentionState.JOINT
                elif attention_results:
                    attention_state = AttentionState.FOCUSED
                else:
                    attention_state = AttentionState.DIVERTED

                # Generate robot response
                response = self.generate_attention_response(attention_state,
                                                          attention_results[0]['object'] if attention_results else None)
                print(f"Robot response: {response['speech']}")

                # Record results
                step_result = {
                    'step': step,
                    'gaze_data': gaze_data,
                    'pointing_data': pointing_data,
                    'attention_results': attention_results,
                    'predicted_intention': intention,
                    'joint_attention': joint_attention,
                    'attention_state': attention_state.value,
                    'robot_response': response
                }
                results.append(step_result)

            time.sleep(0.1)  # Simulate real-time processing

        return results

def main():
    """
    Main function demonstrating attention modeling concepts
    """
    print("=== Attention Modeling in Human-Robot Interaction ===")
    print("This example demonstrates how robots model and respond to human attention\n")

    # Create attention model
    model = AttentionModel()

    # Define objects in the scenario workspace
    scenario_objects = [
        {'name': 'red_block', 'position': [0.3, 0.8, 0.2], 'type': 'block'},
        {'name': 'blue_block', 'position': [0.5, 0.8, 0.4], 'type': 'block'},
        {'name': 'green_block', 'position': [0.1, 0.8, 0.6], 'type': 'block'},
        {'name': 'assembly_station', 'position': [0.7, 0.8, 0.1], 'type': 'station'},
        {'name': 'tool_box', 'position': [-0.2, 0.8, 0.3], 'type': 'container'}
    ]

    # Run the simulation
    results = model.simulate_attention_interaction(scenario_objects)

    print(f"\n=== Attention Modeling Summary ===")
    print(f"Total interaction steps: {len(results)}")

    focused_steps = sum(1 for r in results if r['attention_state'] == 'focused')
    joint_steps = sum(1 for r in results if r['attention_state'] == 'joint_attention')

    print(f"Steps with focused attention: {focused_steps}")
    print(f"Steps with joint attention: {joint_steps}")

    # Analyze attention patterns
    all_attention_results = []
    for result in results:
        all_attention_results.extend(result['attention_results'])

    if all_attention_results:
        most_attended = max(set([r['object'] for r in all_attention_results]),
                          key=[r['object'] for r in all_attention_results].count)
        print(f"Most attended object: {most_attended}")

    print(f"\nKey Attention Modeling Concepts Demonstrated:")
    print("1. Gaze detection and tracking")
    print("2. Pointing gesture recognition")
    print("3. Attention probability calculation")
    print("4. Joint attention detection")
    print("5. Intention prediction from attention patterns")
    print("6. Appropriate robot response generation")

if __name__ == "__main__":
    main()
```

## Key Learning Points

This conceptual example illustrates several important attention modeling concepts in human-robot interaction:

1. **Gaze Detection**: How robots detect where humans are looking using head pose and eye tracking data.

2. **Pointing Recognition**: The process of identifying when and where humans are pointing.

3. **Attention Probability**: Calculating the likelihood that a human is attending to specific objects or locations.

4. **Joint Attention**: Detecting when human and robot are attending to the same object or location.

5. **Intention Prediction**: Using attention patterns to predict human intentions and goals.

6. **Appropriate Response**: How robots should respond based on detected attention states.

## Practical Applications

In real humanoid robots, attention modeling enables:
- Natural collaboration by understanding what humans are focusing on
- Proactive assistance when robots detect human intent
- Smooth handover of objects or tasks
- Socially appropriate behavior during interaction
- Enhanced safety by monitoring human attention to potential hazards

## Conclusion

Attention modeling is crucial for creating robots that can engage in natural, intuitive interactions with humans. By understanding where humans are focusing their attention, robots can provide more relevant and timely assistance, leading to more effective collaboration and better user experience.