---
title: "Week 5 Example: Digital Twin Simulation"
description: "A conceptual example demonstrating digital twin concepts in robotics"
tags: [example, module-1, digital-twin, modeling]
gpu: false
os: [Ubuntu 22.04]
---

# Week 5 Example: Digital Twin Simulation

## Overview

This conceptual example demonstrates how a robot creates and maintains a digital twin of itself and its environment. The example shows the bidirectional flow between the physical and digital worlds, illustrating how sensory information updates the digital model and how the digital model guides physical action.

## The Digital Twin Simulation System

```python
# Conceptual Digital Twin Simulation
from typing import Dict, List, Any, Tuple
import time
import random

class DigitalTwin:
    """
    A conceptual implementation of a robot's digital twin system
    """

    def __init__(self, robot_id: str):
        self.robot_id = robot_id
        self.physical_world = PhysicalWorld()
        self.environment_model = EnvironmentModel()
        self.self_model = SelfModel()
        self.active = True

    def run_simulation_cycle(self):
        """
        Execute one cycle of the digital twin loop:
        Physical world sensing → Digital model update → Physical action
        """
        # Step 1: Sense the physical world
        sensor_data = self.physical_world.get_sensor_data(self.robot_id)
        print("Step 1: Physical world sensed")

        # Step 2: Update digital models based on sensor data
        self.update_environment_model(sensor_data)
        self.update_self_model(sensor_data)
        print("Step 2: Digital models updated")

        # Step 3: Plan actions using digital models
        planned_actions = self.plan_actions()
        print("Step 3: Actions planned using digital models")

        # Step 4: Execute actions in physical world
        self.physical_world.execute_action(self.robot_id, planned_actions)
        print("Step 4: Actions executed in physical world")

        # Step 5: Update digital twin based on action outcomes
        self.update_after_action(planned_actions)
        print("Step 5: Digital twin updated after action")

    def update_environment_model(self, sensor_data: Dict[str, Any]):
        """
        Update the digital model of the environment based on sensor data
        """
        # Update object positions
        for obj_id, obj_data in sensor_data.get('objects', {}).items():
            self.environment_model.update_object_position(obj_id, obj_data['position'])

        # Update spatial map
        self.environment_model.update_spatial_map(sensor_data.get('spatial_data', {}))

        # Update environmental state
        self.environment_model.update_state(sensor_data.get('environment_state', {}))

    def update_self_model(self, sensor_data: Dict[str, Any]):
        """
        Update the digital model of the robot itself
        """
        # Update robot position and orientation
        self.self_model.update_position(sensor_data.get('position', [0, 0, 0]))
        self.self_model.update_orientation(sensor_data.get('orientation', [0, 0, 0]))

        # Update joint states
        self.self_model.update_joint_states(sensor_data.get('joint_states', {}))

        # Update capabilities
        self.self_model.update_capabilities(sensor_data.get('capabilities', {}))

    def plan_actions(self) -> List[Dict[str, Any]]:
        """
        Plan actions using the digital models
        """
        # Example planning: navigate to a target location
        target = self.environment_model.get_target_location()
        current_pos = self.self_model.get_position()

        if target and current_pos:
            # Calculate path to target
            path = self.calculate_path(current_pos, target)

            # Generate movement commands
            actions = []
            for waypoint in path[:3]:  # Limit to next 3 waypoints
                actions.append({
                    'type': 'move',
                    'target': waypoint,
                    'confidence': 0.9
                })

            return actions

        # Default: random movement if no target
        return [{
            'type': 'move',
            'target': [
                current_pos[0] + random.uniform(-1, 1),
                current_pos[1] + random.uniform(-1, 1),
                current_pos[2]
            ],
            'confidence': 0.7
        }]

    def calculate_path(self, start: List[float], end: List[float]) -> List[List[float]]:
        """
        Calculate a simple path from start to end (conceptual implementation)
        """
        # Simplified path calculation
        path = []
        steps = 5  # Number of waypoints

        for i in range(steps + 1):
            ratio = i / steps
            waypoint = [
                start[0] + (end[0] - start[0]) * ratio,
                start[1] + (end[1] - start[1]) * ratio,
                start[2] + (end[2] - start[2]) * ratio
            ]
            path.append(waypoint)

        return path

    def update_after_action(self, actions: List[Dict[str, Any]]):
        """
        Update the digital twin after physical actions are executed
        """
        # Update self model based on expected outcomes of actions
        for action in actions:
            if action['type'] == 'move':
                # Update expected position
                self.self_model.update_expected_position(action['target'])

        # Predict environmental changes due to actions
        predicted_changes = self.predict_environmental_changes(actions)
        self.environment_model.apply_predicted_changes(predicted_changes)

    def predict_environmental_changes(self, actions: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Predict how actions might change the environment
        """
        changes = {}

        for action in actions:
            if action['type'] == 'move':
                # Moving might disturb objects or change sensor readings
                changes['disturbance_radius'] = random.uniform(0.5, 1.5)
                changes['sensor_update_required'] = True

        return changes

class PhysicalWorld:
    """
    Simulates the physical world that the robot interacts with
    """

    def __init__(self):
        # Initialize with some objects in the environment
        self.objects = {
            'obj_1': {'position': [2.0, 1.5, 0.0], 'type': 'table'},
            'obj_2': {'position': [3.5, 2.0, 0.0], 'type': 'chair'},
            'obj_3': {'position': [1.0, 3.0, 0.0], 'type': 'box'}
        }
        self.robots = {
            'robot_1': {
                'position': [0.0, 0.0, 0.0],
                'orientation': [0.0, 0.0, 0.0],
                'joint_states': {'arm': 0.5, 'leg': 1.0},
                'capabilities': {'max_speed': 1.0, 'max_load': 5.0}
            }
        }
        self.target_location = [4.0, 4.0, 0.0]  # Target for the robot to reach

    def get_sensor_data(self, robot_id: str) -> Dict[str, Any]:
        """
        Simulate getting sensor data from the physical world
        """
        robot = self.robots.get(robot_id, {})
        sensor_noise = 0.05  # Add some noise to simulate real sensors

        # Add noise to object positions
        noisy_objects = {}
        for obj_id, obj_data in self.objects.items():
            noisy_pos = [
                pos + random.uniform(-sensor_noise, sensor_noise)
                for pos in obj_data['position']
            ]
            noisy_objects[obj_id] = {
                'position': noisy_pos,
                'type': obj_data['type'],
                'confidence': random.uniform(0.8, 0.95)
            }

        return {
            'position': [
                pos + random.uniform(-sensor_noise, sensor_noise)
                for pos in robot.get('position', [0, 0, 0])
            ],
            'orientation': [
                rot + random.uniform(-sensor_noise, sensor_noise)
                for rot in robot.get('orientation', [0, 0, 0])
            ],
            'joint_states': robot.get('joint_states', {}),
            'capabilities': robot.get('capabilities', {}),
            'objects': noisy_objects,
            'spatial_data': {'map_resolution': 0.1, 'map_bounds': [-5, 5, -5, 5]},
            'environment_state': {'time': time.time(), 'lighting': 'normal'}
        }

    def execute_action(self, robot_id: str, actions: List[Dict[str, Any]]):
        """
        Execute actions in the physical world
        """
        for action in actions:
            if action['type'] == 'move' and action.get('target'):
                # Update robot position
                self.robots[robot_id]['position'] = action['target']

                # Add some randomness to simulate real movement inaccuracies
                pos = self.robots[robot_id]['position']
                self.robots[robot_id]['position'] = [
                    coord + random.uniform(-0.05, 0.05) for coord in pos
                ]

class EnvironmentModel:
    """
    Digital model of the environment
    """

    def __init__(self):
        self.objects = {}
        self.spatial_map = {}
        self.state = {}
        self.target_location = None

    def update_object_position(self, obj_id: str, position: List[float]):
        """
        Update the position of an object in the digital model
        """
        if obj_id not in self.objects:
            self.objects[obj_id] = {'position': position, 'last_seen': time.time()}
        else:
            self.objects[obj_id]['position'] = position
            self.objects[obj_id]['last_seen'] = time.time()

    def update_spatial_map(self, spatial_data: Dict[str, Any]):
        """
        Update the spatial representation of the environment
        """
        self.spatial_map.update(spatial_data)

    def update_state(self, state_data: Dict[str, Any]):
        """
        Update the environmental state
        """
        self.state.update(state_data)

    def get_target_location(self) -> List[float]:
        """
        Get the target location for navigation
        """
        return self.target_location

class SelfModel:
    """
    Digital model of the robot itself
    """

    def __init__(self):
        self.position = [0.0, 0.0, 0.0]
        self.orientation = [0.0, 0.0, 0.0]
        self.joint_states = {}
        self.capabilities = {}
        self.expected_position = [0.0, 0.0, 0.0]

    def update_position(self, position: List[float]):
        """
        Update the robot's position in the digital model
        """
        self.position = position

    def update_orientation(self, orientation: List[float]):
        """
        Update the robot's orientation in the digital model
        """
        self.orientation = orientation

    def update_joint_states(self, joint_states: Dict[str, float]):
        """
        Update the robot's joint states in the digital model
        """
        self.joint_states.update(joint_states)

    def update_capabilities(self, capabilities: Dict[str, Any]):
        """
        Update the robot's capabilities in the digital model
        """
        self.capabilities.update(capabilities)

    def get_position(self) -> List[float]:
        """
        Get the robot's current position from the digital model
        """
        return self.position

    def update_expected_position(self, expected_pos: List[float]):
        """
        Update the expected position after an action
        """
        self.expected_position = expected_pos

def main():
    """
    Main function demonstrating the digital twin simulation
    """
    print("Starting digital twin simulation...")

    # Create a digital twin system
    twin_system = DigitalTwin("robot_1")

    # Run several simulation cycles
    for cycle in range(5):
        print(f"\n--- Digital Twin Cycle {cycle + 1} ---")

        # Run one simulation cycle
        twin_system.run_simulation_cycle()

        # Brief pause to simulate real-time operation
        time.sleep(0.1)

    print("\nDigital twin simulation completed")
    print("The system demonstrated the continuous loop between physical sensing,")
    print("digital modeling, action planning, and physical execution.")

if __name__ == "__main__":
    main()
```

## Key Learning Points

This conceptual example illustrates several important concepts about digital twins in robotics:

1. **Bidirectional Flow**: Information flows from the physical world to the digital model and back, creating a continuous loop.

2. **Environmental Modeling**: The digital twin maintains models of both the environment and the robot itself.

3. **Prediction and Planning**: The digital model enables prediction of action outcomes and planning of future behaviors.

4. **Real-time Updates**: The digital twin continuously updates based on sensor information and action outcomes.

5. **Uncertainty Handling**: The system accounts for sensor noise and movement inaccuracies.

## Practical Applications

In real robotic systems, digital twin technology enables:
- Predictive planning and collision avoidance
- Simulation-based training and testing
- Real-time state estimation and localization
- Predictive maintenance and performance optimization
- Human-robot collaboration with shared understanding

## Conclusion

Digital twin concepts are fundamental to Physical AI, providing the internal models necessary for intelligent behavior. The continuous loop between physical sensing, digital modeling, and physical action enables robots to operate effectively in complex, dynamic environments by maintaining predictive, adaptive internal representations of themselves and their surroundings.