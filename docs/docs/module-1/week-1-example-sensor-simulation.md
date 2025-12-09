---
title: "Week 1 Example: Basic Sensor Simulation"
description: "A conceptual example demonstrating how robots use sensors to perceive their environment"
tags: [example, module-1, sensors]
gpu: false
os: [Ubuntu 22.04]
---

# Week 1 Example: Basic Sensor Simulation

## Overview

This example demonstrates the fundamental concept of how robots use sensors to perceive their environment. We'll create a simple simulation that shows how different sensor types provide information about the world around a robot.

## The Sensor Simulation Concept

In this conceptual example, we imagine a robot equipped with basic sensors that continuously gather information about its environment. The robot has:

- **Camera sensor**: Provides visual information about objects in its field of view
- **IMU (Inertial Measurement Unit)**: Measures orientation and acceleration
- **Touch sensors**: Detect physical contact with objects
- **Microphone**: Captures audio information from the environment

## Simulation Framework

```python
# Conceptual Sensor Simulation Framework
from typing import Dict, Any, List
import time
import random

class RobotSensorSimulation:
    """
    A conceptual framework showing how a robot might process sensor data
    """

    def __init__(self):
        self.camera_data = None
        self.imu_data = None
        self.touch_data = None
        self.audio_data = None
        self.environment_state = {}

    def sense_environment(self) -> Dict[str, Any]:
        """
        Simulate the robot sensing its environment using various sensors
        """
        # Camera simulation - detects objects in the environment
        self.camera_data = {
            'objects': self._detect_objects(),
            'colors': self._detect_colors(),
            'distances': self._measure_distances()
        }

        # IMU simulation - measures orientation and movement
        self.imu_data = {
            'orientation': self._get_orientation(),
            'acceleration': self._get_acceleration(),
            'angular_velocity': self._get_angular_velocity()
        }

        # Touch simulation - detects physical contact
        self.touch_data = {
            'contacts': self._detect_contacts(),
            'pressure': self._measure_pressure()
        }

        # Audio simulation - captures sounds
        self.audio_data = {
            'sounds': self._detect_sounds(),
            'volume': self._measure_volume()
        }

        return {
            'camera': self.camera_data,
            'imu': self.imu_data,
            'touch': self.touch_data,
            'audio': self.audio_data
        }

    def _detect_objects(self) -> List[str]:
        """Simulate object detection"""
        objects = ['table', 'chair', 'person', 'box', 'wall']
        return random.sample(objects, k=random.randint(1, 3))

    def _detect_colors(self) -> Dict[str, str]:
        """Simulate color detection"""
        return {'table': 'brown', 'chair': 'black', 'box': 'red'}

    def _measure_distances(self) -> Dict[str, float]:
        """Simulate distance measurement"""
        return {'table': 1.2, 'chair': 0.8, 'box': 2.5}  # in meters

    def _get_orientation(self) -> Dict[str, float]:
        """Simulate orientation measurement"""
        return {'roll': 0.1, 'pitch': 0.05, 'yaw': 1.2}

    def _get_acceleration(self) -> Dict[str, float]:
        """Simulate acceleration measurement"""
        return {'x': 0.02, 'y': 0.01, 'z': 9.81}  # z is gravity

    def _get_angular_velocity(self) -> Dict[str, float]:
        """Simulate angular velocity measurement"""
        return {'x': 0.0, 'y': 0.0, 'z': 0.01}

    def _detect_contacts(self) -> List[str]:
        """Simulate touch contact detection"""
        return ['left_arm', 'right_foot'] if random.random() > 0.7 else []

    def _measure_pressure(self) -> Dict[str, float]:
        """Simulate pressure measurement"""
        return {'left_arm': 5.2, 'right_foot': 12.8}  # in Newtons

    def _detect_sounds(self) -> List[str]:
        """Simulate sound detection"""
        sounds = ['footsteps', 'voice', 'music', 'silence']
        return [random.choice(sounds)]

    def _measure_volume(self) -> float:
        """Simulate volume measurement"""
        return random.uniform(0.0, 1.0)

def main():
    """
    Main function demonstrating the sensor simulation
    """
    robot = RobotSensorSimulation()

    print("Starting robot sensor simulation...")

    # Simulate sensing for 5 time steps
    for i in range(5):
        print(f"\n--- Time Step {i+1} ---")

        # Sense the environment
        sensor_data = robot.sense_environment()

        # Process and display sensor data
        print(f"Camera detected: {sensor_data['camera']['objects']}")
        print(f"IMU orientation: {sensor_data['imu']['orientation']}")
        print(f"Touch contacts: {sensor_data['touch']['contacts']}")
        print(f"Audio detected: {sensor_data['audio']['sounds']}")

        # In a real robot, this data would be processed by perception algorithms
        print("Data processed by perception system...")

        # Simulate time delay
        time.sleep(0.5)

if __name__ == "__main__":
    main()
```
```python

```

## Key Learning Points

This conceptual example illustrates several important concepts in Physical AI:

1. **Multi-modal Sensing**: The robot gathers information from multiple sensor types simultaneously, creating a rich representation of its environment.

2. **Real-time Processing**: Sensors continuously provide data that must be processed in real-time to enable responsive behavior.

3. **Sensor Fusion**: Information from different sensors can be combined to create a more complete understanding of the environment than any single sensor could provide.

4. **Embodied Perception**: The robot's physical position and movement affect what its sensors can detect, demonstrating the tight coupling between embodiment and perception.

## Practical Implications

In real robotic systems, sensor simulation like this helps developers understand how different sensor configurations might perform in various environments. It also provides a testing framework for perception algorithms before deployment on actual hardware.

The key insight from this example is that sensing is not just about collecting data, but about creating meaningful representations of the world that can guide intelligent action. This represents a fundamental difference from traditional AI systems that process pre-collected data in isolation from the physical world.