---
title: "Week 3 Example: Balance Logic"
description: "A conceptual example demonstrating balance control in humanoid robots"
tags: [example, module-1, motor-control, balance]
gpu: false
os: [Ubuntu 22.04]
---

# Week 3 Example: Balance Logic

## Overview

This conceptual example demonstrates the fundamental principles of balance control in humanoid robots. Balance is critical for bipedal locomotion and stable operation, requiring continuous adjustment of the robot's posture based on sensory feedback.

## The Balance Control Problem

Maintaining balance in a humanoid robot involves keeping the center of mass (CoM) within the support polygon defined by the feet. This requires:
- Real-time monitoring of body orientation and position
- Continuous adjustment of joint angles and forces
- Rapid response to disturbances and perturbations
- Coordination of multiple joints and actuators

## Conceptual Balance Control System

```python
# Conceptual Balance Control System
from typing import Dict, List, Tuple
import math
import time

class BalanceController:
    """
    A conceptual implementation of balance control for humanoid robots
    """

    def __init__(self):
        self.com_position = [0.0, 0.0, 0.8]  # Center of mass [x, y, z]
        self.support_polygon = self._calculate_support_polygon()
        self.joint_targets = {}
        self.balance_threshold = 0.05  # meters
        self.max_correction = 0.1      # maximum correction per step
        self.stability_margin = 0.1    # minimum distance from polygon edge

    def update_balance(self, sensor_data: Dict) -> Dict[str, float]:
        """
        Main balance control function that processes sensor data and generates
        corrective actions to maintain balance
        """
        # Get current state from sensors
        current_com = sensor_data.get('center_of_mass', self.com_position)
        current_orientation = sensor_data.get('orientation', [0, 0, 0])
        support_polygon = sensor_data.get('support_polygon', self.support_polygon)

        # Calculate balance error
        balance_error = self._calculate_balance_error(
            current_com, support_polygon
        )

        # Determine corrective actions
        corrections = self._calculate_corrections(
            balance_error, current_orientation
        )

        # Generate joint commands
        joint_commands = self._generate_joint_commands(corrections)

        # Update internal state
        self.com_position = current_com
        self.support_polygon = support_polygon

        return joint_commands

    def _calculate_balance_error(self, com: List[float],
                                support_polygon: List[Tuple[float, float]]) -> float:
        """
        Calculate how far the center of mass is from being stable
        """
        # Project CoM onto ground plane (z=0)
        com_xy = [com[0], com[1]]

        # Check if CoM is inside support polygon
        if self._point_in_polygon(com_xy, support_polygon):
            # Calculate distance to nearest edge for stability margin
            distance_to_edge = self._distance_to_polygon_edge(com_xy, support_polygon)
            if distance_to_edge < self.stability_margin:
                return self.stability_margin - distance_to_edge
            else:
                return 0.0
        else:
            # Calculate distance to nearest point in polygon
            distance_to_polygon = self._distance_to_polygon(com_xy, support_polygon)
            return distance_to_polygon

    def _point_in_polygon(self, point: List[float],
                         polygon: List[Tuple[float, float]]) -> bool:
        """
        Determine if a point is inside a polygon using ray casting
        """
        x, y = point
        n = len(polygon)
        inside = False

        p1x, p1y = polygon[0]
        for i in range(1, n + 1):
            p2x, p2y = polygon[i % n]
            if y > min(p1y, p2y):
                if y <= max(p1y, p2y):
                    if x <= max(p1x, p2x):
                        if p1y != p2y:
                            xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                        if p1x == p2x or x <= xinters:
                            inside = not inside
            p1x, p1y = p2x, p2y

        return inside

    def _distance_to_polygon_edge(self, point: List[float],
                                 polygon: List[Tuple[float, float]]) -> float:
        """
        Calculate the minimum distance from a point to the edges of a polygon
        """
        min_distance = float('inf')

        for i in range(len(polygon)):
            p1 = polygon[i]
            p2 = polygon[(i + 1) % len(polygon)]

            distance = self._distance_point_to_line(point, p1, p2)
            min_distance = min(min_distance, distance)

        return min_distance

    def _distance_point_to_line(self, point: List[float],
                               line_start: Tuple[float, float],
                               line_end: Tuple[float, float]) -> float:
        """
        Calculate the minimum distance from a point to a line segment
        """
        px, py = point
        x1, y1 = line_start
        x2, y2 = line_end

        # Vector from line_start to line_end
        line_vec = [x2 - x1, y2 - y1]
        line_len = math.sqrt(line_vec[0]**2 + line_vec[1]**2)

        if line_len == 0:
            return math.sqrt((px - x1)**2 + (py - y1)**2)

        # Normalize line vector
        line_unit = [line_vec[0] / line_len, line_vec[1] / line_len]

        # Vector from line_start to point
        point_vec = [px - x1, py - y1]

        # Project point_vec onto line_unit
        projection_len = point_vec[0] * line_unit[0] + point_vec[1] * line_unit[1]

        # Clamp projection to line segment
        projection_len = max(0, min(line_len, projection_len))

        # Find closest point on line segment
        closest = [x1 + line_unit[0] * projection_len,
                   y1 + line_unit[1] * projection_len]

        # Return distance to closest point
        return math.sqrt((px - closest[0])**2 + (py - closest[1])**2)

    def _calculate_corrections(self, balance_error: float,
                              orientation: List[float]) -> Dict[str, float]:
        """
        Calculate necessary corrections based on balance error and orientation
        """
        corrections = {}

        # If balance error is significant, calculate corrective actions
        if balance_error > self.balance_threshold:
            # Calculate hip and ankle adjustments to shift CoM
            corrections['left_hip_roll'] = -balance_error * 0.5
            corrections['right_hip_roll'] = balance_error * 0.5
            corrections['left_ankle_roll'] = -balance_error * 0.3
            corrections['right_ankle_roll'] = balance_error * 0.3

            # Adjust based on orientation feedback
            pitch_correction = -orientation[1] * 0.2  # Correct for pitch
            corrections['left_hip_pitch'] = pitch_correction
            corrections['right_hip_pitch'] = pitch_correction
        else:
            # Minimal adjustments for fine balance
            corrections['left_ankle_roll'] = -orientation[0] * 0.1
            corrections['right_ankle_roll'] = orientation[0] * 0.1
            corrections['left_ankle_pitch'] = -orientation[1] * 0.1
            corrections['right_ankle_pitch'] = orientation[1] * 0.1

        # Limit corrections to prevent excessive movements
        for joint, value in corrections.items():
            corrections[joint] = max(-self.max_correction,
                                   min(self.max_correction, value))

        return corrections

    def _generate_joint_commands(self, corrections: Dict[str, float]) -> Dict[str, float]:
        """
        Generate final joint commands based on calculated corrections
        """
        # Add corrections to current joint positions
        commands = {}
        for joint, correction in corrections.items():
            # In a real system, this would be based on current joint positions
            commands[joint] = correction

        return commands

    def _calculate_support_polygon(self) -> List[Tuple[float, float]]:
        """
        Calculate the default support polygon (area where feet can maintain balance)
        """
        # For a bipedal robot, this might be an area around the feet
        return [
            (-0.1, -0.05),  # left foot back-left
            (-0.1, 0.05),   # left foot back-right
            (0.1, 0.05),    # right foot front-right
            (0.1, -0.05)    # right foot front-left
        ]

class BalanceControlSystem:
    """
    Higher-level system that manages the balance controller and integrates with
    other robot systems
    """

    def __init__(self):
        self.balance_controller = BalanceController()
        self.active = True

    def run_balance_loop(self, sensor_interface):
        """
        Continuous balance control loop that runs during robot operation
        """
        while self.active:
            # Get sensor data
            sensor_data = sensor_interface.get_sensor_data()

            # Update balance
            joint_commands = self.balance_controller.update_balance(sensor_data)

            # Send commands to actuators
            sensor_interface.send_joint_commands(joint_commands)

            # Small delay to simulate real-time operation
            time.sleep(0.01)  # 100Hz control loop

class MockSensorInterface:
    """
    Mock sensor interface for demonstration purposes
    """

    def __init__(self):
        self.com = [0.01, -0.02, 0.8]  # Slightly off balance
        self.orientation = [0.05, -0.03, 0.0]  # Small orientation error

    def get_sensor_data(self):
        """
        Simulate getting sensor data from the robot
        """
        # Simulate some sensor noise and drift
        import random
        noise = [random.uniform(-0.01, 0.01) for _ in range(3)]

        return {
            'center_of_mass': [
                self.com[0] + noise[0],
                self.com[1] + noise[1],
                self.com[2]
            ],
            'orientation': [
                self.orientation[0] + noise[0],
                self.orientation[1] + noise[1],
                self.orientation[2] + noise[2]
            ],
            'support_polygon': [
                (-0.1, -0.05),
                (-0.1, 0.05),
                (0.1, 0.05),
                (0.1, -0.05)
            ]
        }

    def send_joint_commands(self, commands):
        """
        Simulate sending commands to robot joints
        """
        # In a real system, this would send commands to actuators
        print(f"Sending joint commands: {dict(list(commands.items())[:3])}...")  # Show first 3

def main():
    """
    Main function demonstrating the balance control system
    """
    print("Starting conceptual balance control demonstration...")

    # Create mock sensor interface
    sensor_interface = MockSensorInterface()

    # Create balance control system
    balance_system = BalanceControlSystem()

    # Run a few iterations to demonstrate balance correction
    controller = BalanceController()

    print("\nInitial state - CoM slightly off balance")
    initial_data = sensor_interface.get_sensor_data()
    print(f"Initial CoM: {initial_data['center_of_mass']}")

    # Simulate several control cycles
    for i in range(5):
        print(f"\n--- Balance Control Cycle {i+1} ---")

        # Get sensor data
        sensor_data = sensor_interface.get_sensor_data()
        print(f"CoM position: [{sensor_data['center_of_mass'][0]:.3f}, {sensor_data['center_of_mass'][1]:.3f}]")

        # Update balance
        joint_commands = controller.update_balance(sensor_data)
        print(f"Balance error: {controller._calculate_balance_error(sensor_data['center_of_mass'], sensor_data['support_polygon']):.3f}")
        print(f"Generated {len(joint_commands)} joint commands")

        # Simulate the effect of commands on CoM (in a real system this would happen physically)
        # For demo, we'll just show that the system is working
        print("Balance correction applied")

        # Brief pause
        time.sleep(0.01)

    print("\nBalance control demonstration completed")
    print("The system successfully calculated corrective actions to maintain balance")

if __name__ == "__main__":
    main()
```

## Key Learning Points

This conceptual example illustrates several important concepts about balance control in robotics:

1. **Real-time Processing**: Balance control must operate continuously with strict timing requirements.

2. **Multi-sensor Integration**: The system uses information from multiple sensors to determine the robot's state.

3. **Proactive Correction**: The system anticipates balance issues and applies corrections before falling occurs.

4. **Joint Coordination**: Multiple joints work together to achieve balance, not just individual adjustments.

5. **Stability Margins**: The system maintains safety margins to handle unexpected disturbances.

## Practical Applications

In real humanoid robots, balance control systems like this enable:
- Stable standing and walking
- Recovery from external disturbances
- Safe interaction with the environment
- Efficient energy use through controlled movements

## Conclusion

Balance control is fundamental to humanoid robotics and represents a key challenge in Physical AI. The tight coupling between sensing, computation, and action required for balance demonstrates the essential role of embodiment in intelligent behavior. Understanding these principles is crucial for developing robots that can operate effectively in the physical world.