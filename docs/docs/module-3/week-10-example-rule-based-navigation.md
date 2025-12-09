---
title: "Week 10 Example: Rule-Based Navigation"
description: "A conceptual example demonstrating rule-based navigation for humanoid robots"
tags: [example, module-3, navigation, path-planning]
gpu: false
os: [Ubuntu 22.04]
---

# Week 10 Example: Rule-Based Navigation

## Overview

This conceptual example demonstrates how humanoid robots can navigate using simple rule-based systems. Rule-based navigation uses predefined logical rules to determine appropriate actions based on environmental conditions and sensor inputs. This approach provides a transparent and predictable navigation system that is particularly useful for well-structured environments.

## The Rule-Based Navigation Scenario: Office Environment Navigation

In this scenario, we'll explore how a humanoid robot navigates through an office environment using simple rules based on sensor inputs. The robot must reach a target location while avoiding obstacles and following social conventions.

## Conceptual Rule-Based Navigation Implementation

```python
# Conceptual Rule-Based Navigation Example: Office Environment
from typing import Dict, List, Tuple, Any, Optional
import math
import time
import random

class RuleBasedNavigator:
    """
    A conceptual implementation of rule-based navigation for humanoid robotics
    """

    def __init__(self):
        # Robot state
        self.position = [0.0, 0.0]  # x, y coordinates
        self.orientation = 0.0      # angle in radians
        self.velocity = [0.0, 0.0]  # x, y velocity
        self.target = [10.0, 10.0]  # target position

        # Sensor simulation
        self.front_distance = float('inf')
        self.left_distance = float('inf')
        self.right_distance = float('inf')
        self.back_distance = float('inf')

        # Navigation state
        self.obstacle_detected = False
        self.closest_obstacle_dir = None
        self.path_history = []
        self.rule_activation_history = []

        # Navigation parameters
        self.min_obstacle_distance = 0.5  # meters
        self.max_velocity = 1.0           # m/s
        self.rotation_speed = 0.5         # rad/s
        self.step_size = 0.1              # meters per step

        # Rule base
        self.rules = [
            self._rule_avoid_immediate_collision,
            self._rule_follow_wall_right,
            self._rule_move_towards_goal,
            self._rule_explore_free_space,
            self._rule_social_navigation
        ]

        # Rule priorities (lower number = higher priority)
        self.rule_priorities = {
            '_rule_avoid_immediate_collision': 1,
            '_rule_follow_wall_right': 2,
            '_rule_move_towards_goal': 3,
            '_rule_explore_free_space': 4,
            '_rule_social_navigation': 5
        }

    def _rule_avoid_immediate_collision(self, sensor_data: Dict[str, float]) -> Optional[Dict[str, Any]]:
        """
        Rule 1: Avoid immediate collision
        If obstacle is closer than minimum distance, stop and change direction
        """
        if sensor_data['front'] < self.min_obstacle_distance:
            return {
                'action': 'stop_and_avoid',
                'velocity': [0.0, 0.0],
                'rotation': math.pi / 2,  # Turn 90 degrees
                'priority': 1
            }
        return None

    def _rule_follow_wall_right(self, sensor_data: Dict[str, float]) -> Optional[Dict[str, Any]]:
        """
        Rule 2: Follow wall on the right
        If there's a wall on the right and front is clear, follow it
        """
        if (sensor_data['right'] < 1.0 and
            sensor_data['right'] > 0.3 and
            sensor_data['front'] > 1.0):
            return {
                'action': 'follow_wall_right',
                'velocity': [0.5, 0.0],  # Move forward
                'adjustment': 'slight_right',  # Slight turn right to maintain wall distance
                'priority': 2
            }
        return None

    def _rule_move_towards_goal(self, sensor_data: Dict[str, float]) -> Optional[Dict[str, Any]]:
        """
        Rule 3: Move towards the goal
        Calculate direction to goal and move in that direction if path is clear
        """
        # Calculate direction to goal
        dx = self.target[0] - self.position[0]
        dy = self.target[1] - self.position[1]
        distance_to_goal = math.sqrt(dx**2 + dy**2)

        # Only activate if we're reasonably far from obstacles
        if (sensor_data['front'] > 1.5 and
            sensor_data['left'] > 1.0 and
            sensor_data['right'] > 1.0):

            # Calculate desired heading
            desired_angle = math.atan2(dy, dx)
            angle_diff = desired_angle - self.orientation

            # Normalize angle difference
            while angle_diff > math.pi:
                angle_diff -= 2 * math.pi
            while angle_diff < -math.pi:
                angle_diff += 2 * math.pi

            # Calculate movement vector
            speed = min(self.max_velocity, distance_to_goal)
            vx = speed * math.cos(desired_angle)
            vy = speed * math.sin(desired_angle)

            return {
                'action': 'move_towards_goal',
                'velocity': [vx, vy],
                'desired_heading': desired_angle,
                'priority': 3
            }
        return None

    def _rule_explore_free_space(self, sensor_data: Dict[str, float]) -> Optional[Dict[str, Any]]:
        """
        Rule 4: Explore free space
        If multiple directions are free, choose the one that seems most promising
        """
        free_directions = []
        if sensor_data['front'] > 1.0:
            free_directions.append(('front', sensor_data['front'], 0))
        if sensor_data['left'] > 1.0:
            free_directions.append(('left', sensor_data['left'], -math.pi/2))
        if sensor_data['right'] > 1.0:
            free_directions.append(('right', sensor_data['right'], math.pi/2))
        if sensor_data['back'] > 1.0:
            free_directions.append(('back', sensor_data['back'], math.pi))

        if len(free_directions) > 1:
            # Choose the direction with the longest clear distance
            best_dir = max(free_directions, key=lambda x: x[1])

            # Calculate movement in that direction
            angle = best_dir[2] + self.orientation
            vx = self.max_velocity * 0.7 * math.cos(angle)
            vy = self.max_velocity * 0.7 * math.sin(angle)

            return {
                'action': 'explore_free_space',
                'velocity': [vx, vy],
                'chosen_direction': best_dir[0],
                'priority': 4
            }
        return None

    def _rule_social_navigation(self, sensor_data: Dict[str, float]) -> Optional[Dict[str, Any]]:
        """
        Rule 5: Social navigation conventions
        Yield to humans, maintain personal space, follow traffic patterns
        """
        # Simulate detection of human presence
        if random.random() < 0.1:  # 10% chance of detecting human
            return {
                'action': 'social_yield',
                'velocity': [0.0, 0.0],  # Stop temporarily
                'wait_time': 1.0,  # Wait 1 second
                'priority': 5
            }
        return None

    def update_sensors(self):
        """
        Simulate sensor readings
        """
        # Add some randomness to simulate sensor noise
        self.front_distance = max(0.1, random.gauss(2.0, 0.3))
        self.left_distance = max(0.1, random.gauss(1.5, 0.2))
        self.right_distance = max(0.1, random.gauss(1.8, 0.4))
        self.back_distance = max(0.1, random.gauss(3.0, 0.5))

        # Simulate obstacles based on position relative to target
        dx = self.target[0] - self.position[0]
        dy = self.target[1] - self.position[1]
        distance_to_target = math.sqrt(dx**2 + dy**2)

        # Create artificial obstacles as we get closer to target
        if distance_to_target < 5.0:
            # More obstacles near target to make navigation interesting
            if random.random() < 0.3:
                self.front_distance = min(self.front_distance, random.uniform(0.2, 0.8))
            if random.random() < 0.2:
                self.left_distance = min(self.left_distance, random.uniform(0.3, 1.0))
            if random.random() < 0.2:
                self.right_distance = min(self.right_distance, random.uniform(0.3, 1.0))

    def evaluate_rules(self) -> Optional[Dict[str, Any]]:
        """
        Evaluate all rules and return the action from the highest priority activated rule
        """
        sensor_data = {
            'front': self.front_distance,
            'left': self.left_distance,
            'right': self.right_distance,
            'back': self.back_distance
        }

        active_rules = []

        for rule_func in self.rules:
            rule_name = rule_func.__name__
            result = rule_func(sensor_data)
            if result is not None:
                result['rule_name'] = rule_name
                active_rules.append(result)

        if active_rules:
            # Sort by priority (lower number = higher priority)
            highest_priority_rule = min(active_rules, key=lambda x: x['priority'])
            return highest_priority_rule

        # Default action if no rules fire
        return {
            'action': 'default_forward',
            'velocity': [0.5, 0.0],
            'priority': 100,
            'rule_name': 'default'
        }

    def execute_navigation_step(self, rule_result: Dict[str, Any]):
        """
        Execute the navigation action determined by the active rule
        """
        print(f"Active rule: {rule_result['rule_name']}")
        print(f"Action: {rule_result['action']}")

        # Update robot position based on rule result
        if 'velocity' in rule_result:
            dt = 0.1  # Time step
            self.velocity = rule_result['velocity']

            # Update position
            self.position[0] += self.velocity[0] * dt
            self.position[1] += self.velocity[1] * dt

            # Update orientation if there's a rotation component
            if 'rotation' in rule_result:
                self.orientation += rule_result['rotation']

        # Add to history
        self.path_history.append((self.position[0], self.position[1]))
        self.rule_activation_history.append(rule_result['rule_name'])

        # Check if we reached the target
        dx = self.target[0] - self.position[0]
        dy = self.target[1] - self.position[1]
        distance_to_target = math.sqrt(dx**2 + dy**2)

        return distance_to_target < 0.5  # Return True if reached target

    def navigate_to_target(self, max_steps: int = 200) -> Dict[str, Any]:
        """
        Execute the complete navigation task
        """
        print("=== Rule-Based Navigation Simulation ===")
        print(f"Starting position: ({self.position[0]:.2f}, {self.position[1]:.2f})")
        print(f"Target position: ({self.target[0]:.2f}, {self.target[1]:.2f})")
        print(f"Initial orientation: {math.degrees(self.orientation):.2f}°")
        print()

        for step in range(max_steps):
            print(f"--- Step {step + 1} ---")
            print(f"Current position: ({self.position[0]:.2f}, {self.position[1]:.2f})")

            # Update sensors
            self.update_sensors()
            print(f"Sensor readings - Front: {self.front_distance:.2f}m, "
                  f"Left: {self.left_distance:.2f}m, "
                  f"Right: {self.right_distance:.2f}m")

            # Evaluate rules
            active_rule = self.evaluate_rules()
            print(f"Highest priority rule activated: {active_rule['rule_name']}")

            # Execute navigation step
            reached_target = self.execute_navigation_step(active_rule)

            if reached_target:
                print("✅ Target reached!")
                break

            # Calculate remaining distance
            dx = self.target[0] - self.position[0]
            dy = self.target[1] - self.position[1]
            distance_to_target = math.sqrt(dx**2 + dy**2)
            print(f"Distance to target: {distance_to_target:.2f}m")

            print()

            # Small delay to simulate real-time operation
            time.sleep(0.01)

        # Navigation results
        results = {
            'final_position': self.position.copy(),
            'target_position': self.target,
            'path_history': self.path_history.copy(),
            'rule_activation_sequence': self.rule_activation_history.copy(),
            'total_steps': len(self.path_history),
            'reached_target': distance_to_target < 0.5
        }

        return results

    def analyze_navigation_performance(self, results: Dict[str, Any]):
        """
        Analyze the navigation performance and rule activation patterns
        """
        print("=== Navigation Performance Analysis ===")

        # Path efficiency
        if len(self.path_history) > 1:
            # Calculate actual path length
            total_path_length = 0.0
            for i in range(1, len(self.path_history)):
                dx = self.path_history[i][0] - self.path_history[i-1][0]
                dy = self.path_history[i][1] - self.path_history[i-1][1]
                total_path_length += math.sqrt(dx*dx + dy*dy)

            # Calculate straight-line distance
            dx = self.target[0] - self.path_history[0][0]
            dy = self.target[1] - self.path_history[0][1]
            straight_line_distance = math.sqrt(dx*dx + dy*dy)

            efficiency_ratio = straight_line_distance / total_path_length if total_path_length > 0 else 0
            print(f"Path efficiency: {efficiency_ratio:.2f} (1.0 = perfectly straight)")
            print(f"Actual path length: {total_path_length:.2f}m")
            print(f"Straight-line distance: {straight_line_distance:.2f}m")

        # Rule activation statistics
        if self.rule_activation_history:
            rule_counts = {}
            for rule in self.rule_activation_history:
                rule_counts[rule] = rule_counts.get(rule, 0) + 1

            print(f"Rule activation counts:")
            for rule, count in rule_counts.items():
                percentage = (count / len(self.rule_activation_history)) * 100
                print(f"  {rule}: {count} times ({percentage:.1f}%)")

        print(f"Total navigation steps: {results['total_steps']}")
        print(f"Target reached: {'Yes' if results['reached_target'] else 'No'}")

def main():
    """
    Main function demonstrating rule-based navigation concepts
    """
    print("=== Rule-Based Navigation Example ===")
    print("Demonstrating how robots can navigate using simple logical rules\n")

    # Create navigator instance
    navigator = RuleBasedNavigator()

    # Set a more interesting target
    navigator.target = [8.0, 6.0]

    # Run the navigation simulation
    results = navigator.navigate_to_target(max_steps=150)

    # Analyze results
    navigator.analyze_navigation_performance(results)

    print(f"\nKey Rule-Based Navigation Concepts Demonstrated:")
    print("1. Priority-based rule selection")
    print("2. Conditional action triggering")
    print("3. Sensor-driven decision making")
    print("4. Multiple competing behaviors")
    print("5. Reactive navigation strategies")
    print("6. Social navigation conventions")

    print(f"\nRule System Characteristics:")
    print("• Transparent decision-making process")
    print("• Predictable behavior based on rules")
    print("• Easy to modify and extend")
    print("• Handles multiple competing objectives")
    print("• Real-time responsive to environment")

if __name__ == "__main__":
    main()
```

## Key Learning Points

This conceptual example illustrates several important rule-based navigation concepts:

1. **Rule Prioritization**: How rules are prioritized to handle conflicts between competing behaviors.

2. **Conditional Logic**: How rules are triggered based on specific sensor conditions.

3. **Multiple Objectives**: How different navigation objectives (goal-seeking, obstacle avoidance, social behavior) are balanced.

4. **Reactive Behavior**: How the robot responds immediately to changes in its environment.

5. **Simple Decision Making**: How complex navigation behavior can emerge from simple rules.

## Practical Applications

In real robotic systems, rule-based navigation is particularly useful for:
- Well-structured environments with predictable layouts
- Safety-critical applications where behavior must be predictable
- Systems that need to follow specific regulations or protocols
- Environments with clear social navigation conventions
- Applications where transparency in decision-making is important

## Conclusion

Rule-based navigation provides a transparent and predictable approach to robot navigation that can be effective in many scenarios. While more sophisticated approaches exist, rule-based systems offer the advantage of clear, understandable behavior that can be easily modified and extended based on specific requirements.