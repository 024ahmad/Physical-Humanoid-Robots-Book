---
title: "Week 2 Example: Simple Sensor Loop"
description: "A conceptual example demonstrating the sensor processing loop in robotics"
tags: [example, module-1, sensors, perception]
gpu: false
os: [Ubuntu 22.04]
---

# Week 2 Example: Simple Sensor Loop

## Overview

This conceptual example demonstrates the fundamental sensor processing loop that underlies robotic perception. The sensor loop continuously acquires data from sensors, processes it, and uses the results to inform decision-making and action.

## The Sensor Processing Loop

The sensor processing loop is a continuous cycle that runs throughout a robot's operation. It consists of four main stages:

1. **Acquire**: Collect raw data from sensors
2. **Process**: Convert raw data into meaningful information
3. **Integrate**: Combine sensor information with prior knowledge
4. **Act**: Use the processed information to guide behavior

## Conceptual Implementation

```python
# Conceptual Sensor Processing Loop
from typing import Dict, Any, List
import time
import random

class SensorLoop:
    """
    A conceptual implementation of the sensor processing loop
    """

    def __init__(self):
        self.sensors = {
            'camera': CameraSensor(),
            'imu': IMUSensor(),
            'range': RangeSensor(),
            'microphone': MicrophoneSensor()
        }
        self.perception_system = PerceptionSystem()
        self.world_model = WorldModel()
        self.running = True

    def run_sensor_loop(self):
        """
        Execute the continuous sensor processing loop
        """
        while self.running:
            # Stage 1: Acquire - Collect raw data from all sensors
            raw_sensor_data = self.acquire_sensor_data()

            # Stage 2: Process - Convert raw data into meaningful information
            processed_data = self.process_sensor_data(raw_sensor_data)

            # Stage 3: Integrate - Update world model with new information
            self.update_world_model(processed_data)

            # Stage 4: Act - Use perception to inform behavior
            self.inform_behavior(processed_data)

            # Brief pause to simulate real-time constraints
            time.sleep(0.1)  # 10Hz loop

    def acquire_sensor_data(self) -> Dict[str, Any]:
        """
        Collect raw data from all sensors
        """
        raw_data = {}
        for sensor_name, sensor in self.sensors.items():
            raw_data[sensor_name] = sensor.read()
        return raw_data

    def process_sensor_data(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process raw sensor data into meaningful information
        """
        processed = {}
        for sensor_name, data in raw_data.items():
            processed[sensor_name] = self.perception_system.process(data, sensor_name)
        return processed

    def update_world_model(self, processed_data: Dict[str, Any]):
        """
        Integrate processed sensor data into the world model
        """
        self.world_model.update(processed_data)

    def inform_behavior(self, processed_data: Dict[str, Any]):
        """
        Use processed sensor data to inform robot behavior
        """
        # This would typically call a behavior system or motion planner
        pass

class CameraSensor:
    """
    Conceptual camera sensor
    """
    def read(self):
        # Simulate camera reading
        return {
            'image': self._capture_image(),
            'timestamp': time.time()
        }

    def _capture_image(self):
        # Simulate image capture
        return {'objects': ['table', 'chair'], 'colors': ['brown', 'black']}

class IMUSensor:
    """
    Conceptual IMU sensor
    """
    def read(self):
        # Simulate IMU reading
        return {
            'orientation': {'roll': 0.1, 'pitch': 0.05, 'yaw': 1.2},
            'acceleration': {'x': 0.02, 'y': 0.01, 'z': 9.81},
            'timestamp': time.time()
        }

class RangeSensor:
    """
    Conceptual range sensor
    """
    def read(self):
        # Simulate range sensor reading
        return {
            'distances': [1.2, 0.8, 2.5, 1.0],
            'timestamp': time.time()
        }

class MicrophoneSensor:
    """
    Conceptual microphone sensor
    """
    def read(self):
        # Simulate microphone reading
        return {
            'audio': ['footsteps', 'voice'],
            'volume': 0.6,
            'timestamp': time.time()
        }

class PerceptionSystem:
    """
    Conceptual perception system that processes raw sensor data
    """
    def process(self, raw_data: Any, sensor_type: str) -> Any:
        """
        Process raw sensor data based on sensor type
        """
        if sensor_type == 'camera':
            return self._process_camera_data(raw_data)
        elif sensor_type == 'imu':
            return self._process_imu_data(raw_data)
        elif sensor_type == 'range':
            return self._process_range_data(raw_data)
        elif sensor_type == 'microphone':
            return self._process_audio_data(raw_data)
        else:
            return raw_data

    def _process_camera_data(self, data):
        # Extract meaningful information from camera data
        objects = data['image']['objects']
        processed = {
            'detected_objects': objects,
            'object_locations': self._estimate_locations(objects),
            'features': self._extract_features(data['image'])
        }
        return processed

    def _process_imu_data(self, data):
        # Process IMU data to extract orientation and motion information
        return {
            'orientation': data['orientation'],
            'stability': self._calculate_stability(data['acceleration']),
            'motion_state': self._determine_motion_state(data)
        }

    def _process_range_data(self, data):
        # Process range data to detect obstacles and free space
        return {
            'obstacles': self._detect_obstacles(data['distances']),
            'free_space': self._detect_free_space(data['distances'])
        }

    def _process_audio_data(self, data):
        # Process audio data to identify sounds and sources
        return {
            'sound_types': data['audio'],
            'sound_intensity': data['volume'],
            'sound_direction': self._estimate_direction(data)
        }

    def _estimate_locations(self, objects):
        # Conceptual function to estimate object locations
        return {obj: f"relative_position_{i}" for i, obj in enumerate(objects)}

    def _extract_features(self, image_data):
        # Conceptual function to extract features from image
        return ['edges', 'corners', 'textures']

    def _calculate_stability(self, acceleration):
        # Conceptual function to calculate stability
        return abs(sum(acceleration.values())) < 0.5

    def _determine_motion_state(self, data):
        # Conceptual function to determine motion state
        return "stationary" if all(abs(v) < 0.1 for v in data['acceleration'].values()) else "moving"

    def _detect_obstacles(self, distances):
        # Conceptual function to detect obstacles
        return [d for d in distances if d < 1.0]  # Obstacles within 1 meter

    def _detect_free_space(self, distances):
        # Conceptual function to detect free space
        return [d for d in distances if d >= 1.0]

    def _estimate_direction(self, audio_data):
        # Conceptual function to estimate sound direction
        return "front"  # Simplified

class WorldModel:
    """
    Conceptual world model that maintains the robot's understanding of its environment
    """
    def __init__(self):
        self.objects = {}
        self.robot_state = {}
        self.environment_map = {}
        self.last_update_time = time.time()

    def update(self, sensor_data: Dict[str, Any]):
        """
        Update the world model with new sensor information
        """
        # Update objects based on camera data
        if 'camera' in sensor_data:
            self._update_objects(sensor_data['camera'])

        # Update robot state based on IMU data
        if 'imu' in sensor_data:
            self._update_robot_state(sensor_data['imu'])

        # Update environment map based on range data
        if 'range' in sensor_data:
            self._update_environment_map(sensor_data['range'])

        self.last_update_time = time.time()

    def _update_objects(self, camera_data):
        """
        Update the objects in the world model based on camera perception
        """
        for obj, location in camera_data['detected_objects'].items():
            self.objects[obj] = {
                'location': location,
                'last_seen': time.time(),
                'properties': camera_data.get('features', [])
            }

    def _update_robot_state(self, imu_data):
        """
        Update the robot's state based on IMU data
        """
        self.robot_state.update({
            'orientation': imu_data['orientation'],
            'stability': imu_data['stability'],
            'motion_state': imu_data['motion_state']
        })

    def _update_environment_map(self, range_data):
        """
        Update the environment map based on range sensor data
        """
        self.environment_map.update({
            'obstacles': range_data['obstacles'],
            'free_space': range_data['free_space']
        })

def main():
    """
    Main function demonstrating the sensor loop
    """
    print("Starting conceptual sensor processing loop...")

    # Create and start the sensor loop
    sensor_loop = SensorLoop()

    # Run for a few iterations to demonstrate the concept
    iteration_count = 0
    max_iterations = 5  # For demonstration purposes

    try:
        while iteration_count < max_iterations:
            # Simulate one iteration of the sensor loop
            print(f"\n--- Sensor Loop Iteration {iteration_count + 1} ---")

            # Stage 1: Acquire sensor data
            raw_data = sensor_loop.acquire_sensor_data()
            print("Stage 1: Raw sensor data acquired")

            # Stage 2: Process sensor data
            processed_data = sensor_loop.process_sensor_data(raw_data)
            print("Stage 2: Sensor data processed")

            # Stage 3: Update world model
            sensor_loop.update_world_model(processed_data)
            print("Stage 3: World model updated")

            # Stage 4: Inform behavior (conceptual)
            sensor_loop.inform_behavior(processed_data)
            print("Stage 4: Behavior informed")

            iteration_count += 1
            time.sleep(0.1)  # Brief pause

    except KeyboardInterrupt:
        print("\nSensor loop interrupted by user")

    print(f"\nCompleted {iteration_count} iterations of the sensor processing loop")

if __name__ == "__main__":
    main()
```

## Key Learning Points

This conceptual example illustrates several important concepts about sensor processing in robotics:

1. **Continuous Operation**: The sensor loop runs continuously, providing real-time information about the environment.

2. **Multi-stage Processing**: Raw sensor data undergoes multiple stages of processing to extract meaningful information.

3. **Integration**: Information from different sensors is integrated into a coherent world model.

4. **Real-time Constraints**: The loop operates at a fixed frequency to ensure timely responses.

5. **Modularity**: Each sensor type and processing stage can be developed and maintained independently.

## Practical Applications

In real robotic systems, sensor loops like this form the foundation of perception capabilities. They enable robots to:
- Navigate safely through dynamic environments
- Manipulate objects with appropriate force and precision
- Respond to changes in their environment
- Maintain awareness of their own state and position

## Conclusion

The sensor processing loop is a fundamental pattern in robotics that enables continuous perception of the physical world. Understanding this loop is crucial for developing effective robotic perception systems that can support intelligent behavior in Physical AI applications.