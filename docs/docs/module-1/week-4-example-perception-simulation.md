---
title: "Week 4 Example: Perception Simulation"
description: "A conceptual example demonstrating the perception pipeline in robotics"
tags: [example, module-1, perception, pipeline]
gpu: false
os: [Ubuntu 22.04]
---

# Week 4 Example: Perception Simulation

## Overview

This conceptual example demonstrates the perception pipeline that transforms raw sensor data into meaningful environmental understanding. The example shows how a robot processes visual information through multiple stages to identify objects and understand their relationships in the environment.

## The Perception Pipeline Simulation

```python
# Conceptual Perception Pipeline Simulation
from typing import Dict, List, Any, Tuple
import random
import time

class PerceptionPipeline:
    """
    A conceptual implementation of a multi-stage perception pipeline
    """

    def __init__(self):
        self.raw_data = {}
        self.processed_features = {}
        self.detected_objects = []
        self.scene_understanding = {}

    def process_sensor_data(self, raw_sensor_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process raw sensor data through the complete perception pipeline
        """
        print("Starting perception pipeline...")

        # Stage 1: Raw Data Acquisition
        self.raw_data = self._acquire_raw_data(raw_sensor_data)
        print("Stage 1: Raw data acquired")

        # Stage 2: Preprocessing and Calibration
        preprocessed_data = self._preprocess_data(self.raw_data)
        print("Stage 2: Data preprocessed and calibrated")

        # Stage 3: Feature Extraction
        self.processed_features = self._extract_features(preprocessed_data)
        print("Stage 3: Features extracted")

        # Stage 4: Object Detection and Recognition
        self.detected_objects = self._detect_objects(self.processed_features)
        print("Stage 4: Objects detected and recognized")

        # Stage 5: Scene Understanding
        self.scene_understanding = self._understand_scene(
            self.detected_objects, self.processed_features
        )
        print("Stage 5: Scene understood")

        # Stage 6: State Estimation
        final_understanding = self._estimate_state(self.scene_understanding)
        print("Stage 6: State estimated")

        return final_understanding

    def _acquire_raw_data(self, raw_sensor_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Simulate raw data acquisition from sensors
        """
        return {
            'image_data': raw_sensor_data.get('image', [[0]*640 for _ in range(480)]),
            'depth_data': raw_sensor_data.get('depth', [[1.0]*640 for _ in range(480)]),
            'timestamp': time.time()
        }

    def _preprocess_data(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Preprocess raw data to reduce noise and calibrate sensors
        """
        # Simulate noise reduction
        image_data = raw_data['image_data']
        processed_image = [
            [pixel + random.uniform(-5, 5) for pixel in row]
            for row in image_data
        ]

        # Simulate calibration
        calibrated_depth = [
            [depth * random.uniform(0.99, 1.01) for depth in row]
            for row in raw_data['depth_data']
        ]

        return {
            'image': processed_image,
            'depth': calibrated_depth,
            'timestamp': raw_data['timestamp']
        }

    def _extract_features(self, preprocessed_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extract relevant features from preprocessed data
        """
        image = preprocessed_data['image']

        # Simulate edge detection
        edges = self._detect_edges(image)

        # Simulate corner detection
        corners = self._detect_corners(image)

        # Simulate texture analysis
        textures = self._analyze_textures(image)

        # Simulate motion detection (simplified)
        motion = self._detect_motion()

        return {
            'edges': edges,
            'corners': corners,
            'textures': textures,
            'motion': motion
        }

    def _detect_edges(self, image: List[List[float]]) -> List[Tuple[int, int]]:
        """
        Simulate edge detection
        """
        # Simplified edge detection simulation
        edges = []
        height, width = len(image), len(image[0]) if image else (0, 0)

        for i in range(1, height-1):
            for j in range(1, width-1):
                if random.random() < 0.1:  # 10% chance of edge
                    edges.append((i, j))

        return edges[:50]  # Limit to 50 edges for simplicity

    def _detect_corners(self, image: List[List[float]]) -> List[Tuple[int, int]]:
        """
        Simulate corner detection
        """
        corners = []
        height, width = len(image), len(image[0]) if image else (0, 0)

        for i in range(2, height-2):
            for j in range(2, width-2):
                if random.random() < 0.05:  # 5% chance of corner
                    corners.append((i, j))

        return corners[:20]  # Limit to 20 corners

    def _analyze_textures(self, image: List[List[float]]) -> List[Dict[str, Any]]:
        """
        Simulate texture analysis
        """
        textures = []

        # Simulate detection of different textures
        texture_types = ['smooth', 'rough', 'patterned', 'textured']

        for i in range(3):
            textures.append({
                'type': random.choice(texture_types),
                'location': (random.randint(0, 100), random.randint(0, 100)),
                'confidence': random.uniform(0.7, 1.0)
            })

        return textures

    def _detect_motion(self) -> List[Dict[str, Any]]:
        """
        Simulate motion detection
        """
        motion_regions = []

        # Simulate detection of moving objects
        for i in range(random.randint(0, 2)):
            motion_regions.append({
                'region': (random.randint(0, 640), random.randint(0, 480),
                          random.randint(50, 200), random.randint(50, 200)),
                'velocity': (random.uniform(-10, 10), random.uniform(-10, 10)),
                'confidence': random.uniform(0.6, 0.9)
            })

        return motion_regions

    def _detect_objects(self, features: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Detect and classify objects based on extracted features
        """
        objects = []

        # Simulate object detection based on features
        num_objects = len(features['corners']) // 5  # Rough estimate

        for i in range(min(num_objects, 5)):  # Max 5 objects
            object_type = random.choice(['person', 'chair', 'table', 'box', 'plant'])

            objects.append({
                'type': object_type,
                'location': (
                    random.randint(50, 590),  # x coordinate
                    random.randint(50, 430),  # y coordinate
                    random.randint(30, 150),  # width
                    random.randint(30, 150)   # height
                ),
                'confidence': random.uniform(0.7, 0.95),
                'pose': {
                    'rotation': random.uniform(0, 360),
                    'scale': random.uniform(0.8, 1.2)
                }
            })

        return objects

    def _understand_scene(self, objects: List[Dict[str, Any]],
                         features: Dict[str, Any]) -> Dict[str, Any]:
        """
        Perform high-level scene understanding
        """
        # Analyze spatial relationships
        relationships = self._analyze_relationships(objects)

        # Identify functional zones
        zones = self._identify_zones(objects)

        # Context interpretation
        context = self._interpret_context(objects)

        return {
            'objects': objects,
            'relationships': relationships,
            'zones': zones,
            'context': context,
            'semantic_labels': self._assign_semantic_labels(objects)
        }

    def _analyze_relationships(self, objects: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Analyze spatial relationships between objects
        """
        relationships = []

        for i, obj1 in enumerate(objects):
            for j, obj2 in enumerate(objects[i+1:], i+1):
                # Calculate distance between object centers
                x1 = obj1['location'][0] + obj1['location'][2] // 2
                y1 = obj1['location'][1] + obj1['location'][3] // 2
                x2 = obj2['location'][0] + obj2['location'][2] // 2
                y2 = obj2['location'][1] + obj2['location'][3] // 2

                distance = ((x1 - x2)**2 + (y1 - y2)**2)**0.5

                relationships.append({
                    'object1': obj1['type'],
                    'object2': obj2['type'],
                    'relationship': 'near' if distance < 100 else 'far',
                    'distance': distance
                })

        return relationships

    def _identify_zones(self, objects: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Identify functional zones in the scene
        """
        zones = []

        # Identify potential interaction zones based on object types
        if any(obj['type'] == 'table' for obj in objects):
            zones.append({
                'type': 'interaction',
                'location': 'center',
                'purpose': 'object manipulation'
            })

        if any(obj['type'] == 'chair' for obj in objects):
            zones.append({
                'type': 'seating',
                'location': 'perimeter',
                'purpose': 'resting'
            })

        return zones

    def _interpret_context(self, objects: List[Dict[str, Any]]) -> str:
        """
        Interpret the context of the scene
        """
        object_types = [obj['type'] for obj in objects]

        if 'table' in object_types and 'chair' in object_types:
            return 'dining area'
        elif 'chair' in object_types:
            return 'seating area'
        elif 'plant' in object_types and len(object_types) <= 2:
            return 'decoration area'
        else:
            return 'general space'

    def _assign_semantic_labels(self, objects: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Assign semantic labels to regions of the scene
        """
        semantic_labels = []

        for obj in objects:
            semantic_labels.append({
                'object': obj['type'],
                'region': obj['location'],
                'label': f"{obj['type']}_region",
                'confidence': obj['confidence']
            })

        return semantic_labels

    def _estimate_state(self, scene_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Combine all perception results into a coherent understanding
        """
        return {
            'environment_map': self._create_environment_map(scene_data),
            'object_states': self._track_object_states(scene_data),
            'navigation_paths': self._identify_navigation_paths(scene_data),
            'interaction_opportunities': self._identify_interactions(scene_data),
            'confidence': self._calculate_confidence(scene_data)
        }

    def _create_environment_map(self, scene_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a structured map of the environment
        """
        return {
            'objects': scene_data['objects'],
            'free_space': self._identify_free_space(),
            'obstacles': self._identify_obstacles(scene_data['objects']),
            'landmarks': self._identify_landmarks(scene_data['objects'])
        }

    def _track_object_states(self, scene_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Track states of detected objects
        """
        states = []

        for obj in scene_data['objects']:
            states.append({
                'object': obj['type'],
                'state': 'stationary',  # Simplified for this example
                'position': obj['location'],
                'last_seen': time.time()
            })

        return states

    def _identify_navigation_paths(self, scene_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Identify potential navigation paths
        """
        return [
            {
                'start': (0, 0),
                'end': (640, 480),
                'feasibility': 0.8,
                'obstacles': len(scene_data['objects'])
            }
        ]

    def _identify_interactions(self, scene_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Identify potential interaction opportunities
        """
        interactions = []

        for obj in scene_data['objects']:
            if obj['type'] in ['chair', 'table']:
                interactions.append({
                    'object': obj['type'],
                    'action': 'approach',
                    'location': obj['location']
                })

        return interactions

    def _identify_free_space(self) -> List[Tuple[int, int, int, int]]:
        """
        Identify free space in the environment
        """
        return [(50, 50, 540, 380)]  # Simplified for this example

    def _identify_obstacles(self, objects: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Identify obstacles based on object positions
        """
        obstacles = []

        for obj in objects:
            obstacles.append({
                'type': obj['type'],
                'position': obj['location'],
                'size': (obj['location'][2], obj['location'][3])
            })

        return obstacles

    def _identify_landmarks(self, objects: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Identify distinctive landmarks
        """
        landmarks = []

        for obj in objects:
            if obj['confidence'] > 0.85:  # High confidence detections
                landmarks.append({
                    'type': obj['type'],
                    'position': obj['location'],
                    'significance': 'high'
                })

        return landmarks

    def _calculate_confidence(self, scene_data: Dict[str, Any]) -> float:
        """
        Calculate overall confidence in the scene understanding
        """
        if not scene_data['objects']:
            return 0.1  # Low confidence if no objects detected

        avg_confidence = sum(obj['confidence'] for obj in scene_data['objects']) / len(scene_data['objects'])
        return min(avg_confidence, 0.95)  # Cap at 0.95

def main():
    """
    Main function demonstrating the perception pipeline
    """
    print("Starting perception pipeline simulation...")

    # Create a perception pipeline instance
    pipeline = PerceptionPipeline()

    # Simulate raw sensor data
    raw_data = {
        'image': [[random.randint(0, 255) for _ in range(640)] for _ in range(480)],
        'depth': [[random.uniform(0.5, 5.0) for _ in range(640)] for _ in range(480)]
    }

    # Process the data through the pipeline
    result = pipeline.process_sensor_data(raw_data)

    print("\nPerception pipeline completed!")
    print(f"Detected {len(result['environment_map']['objects'])} objects")
    print(f"Overall confidence: {result['confidence']:.2f}")
    print(f"Identified {len(result['interaction_opportunities'])} interaction opportunities")

    # Display some results
    print("\nDetected objects:")
    for obj in result['environment_map']['objects']:
        print(f"  - {obj['type']} at {obj['location'][:2]} with confidence {obj['confidence']:.2f}")

if __name__ == "__main__":
    main()
```

## Key Learning Points

This conceptual example illustrates several important concepts about perception pipelines in robotics:

1. **Multi-stage Processing**: Raw sensor data flows through multiple stages of processing to create increasingly abstract representations.

2. **Feature Extraction**: Low-level features like edges and corners are extracted before higher-level object recognition.

3. **Object Detection**: Objects are identified and classified based on extracted features.

4. **Scene Understanding**: The system interprets spatial relationships and contextual information.

5. **State Estimation**: The final output includes tracking, navigation information, and interaction opportunities.

## Practical Applications

In real robotic systems, perception pipelines like this enable:
- Autonomous navigation through complex environments
- Object manipulation and interaction
- Human-robot collaboration
- Situational awareness and adaptive behavior

## Conclusion

The perception pipeline is fundamental to Physical AI, transforming raw sensor data into meaningful understanding that supports intelligent action. This example demonstrates how multiple processing stages work together to enable robots to interpret and interact with their environment effectively.