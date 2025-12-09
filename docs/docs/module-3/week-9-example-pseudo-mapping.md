---
title: "Week 9 Example: Pseudo Mapping"
description: "A conceptual example demonstrating mapping concepts in robotic environments"
tags: [example, module-3, mapping, slam]
gpu: false
os: [Ubuntu 22.04]
---

# Week 9 Example: Pseudo Mapping

## Overview

This conceptual example demonstrates how robots perform mapping of their environment using a simplified approach. The example illustrates the key concepts of Simultaneous Localization and Mapping (SLAM) and shows how robots can build representations of their environment from sensor data.

## The Pseudo Mapping Scenario: Indoor Room Exploration

In this scenario, we'll explore how a robot can map an indoor room using simple sensor readings and motion estimates. The robot moves through the environment, collects range measurements, and builds a map of obstacles while simultaneously estimating its own position.

## Conceptual Mapping Implementation

```python
# Conceptual Pseudo Mapping Example: Indoor Room Exploration
from typing import Dict, List, Tuple, Any, Optional
import math
import random
import numpy as np
from dataclasses import dataclass

@dataclass
class RobotPose:
    """Represents the robot's position and orientation"""
    x: float
    y: float
    theta: float  # Heading in radians

@dataclass
class Landmark:
    """Represents a detected landmark in the environment"""
    id: int
    x: float
    y: float
    confidence: float

class PseudoMapper:
    """
    A conceptual implementation of a simplified mapping system for humanoid robotics
    """

    def __init__(self, map_size: Tuple[int, int] = (20, 20)):
        self.map_size = map_size  # Size of the map in meters
        self.grid_resolution = 0.1  # 10cm per grid cell
        self.grid_width = int(map_size[0] / self.grid_resolution)
        self.grid_height = int(map_size[1] / self.grid_resolution)

        # Initialize occupancy grid (log odds representation)
        self.occupancy_grid = [[0.0 for _ in range(self.grid_width)] for _ in range(self.grid_height)]

        # Robot state
        self.robot_pose = RobotPose(10.0, 10.0, 0.0)  # Start in middle of map
        self.odometry_pose = RobotPose(10.0, 10.0, 0.0)  # Odometry estimate

        # Known landmarks and their estimated positions
        self.landmarks: Dict[int, Landmark] = {}
        self.next_landmark_id = 1

        # Mapping parameters
        self.sensor_range = 5.0  # Maximum sensor range in meters
        self.laser_angles = [i * math.pi / 180 for i in range(-90, 91, 10)]  # Laser angles every 10 degrees
        self.prob_hit = 0.7  # Probability of hit in sensor model
        self.prob_miss = 0.4  # Probability of miss in sensor model

        # Motion uncertainty parameters
        self.motion_noise = 0.05  # Standard deviation of motion noise

    def sensor_model(self, range_reading: float, expected_range: float) -> float:
        """
        Simple sensor model to compute probability of a range reading
        given the expected range to an obstacle
        """
        if range_reading > self.sensor_range - 0.1:
            # Max range reading - probably free space
            if expected_range > self.sensor_range:
                return 0.6  # Reasonable if really free
            else:
                return 0.3  # Unexpected max range
        elif abs(range_reading - expected_range) < 0.2:
            # Good match
            return 0.8
        else:
            # Poor match
            return 0.1

    def ray_casting(self, start_x: float, start_y: float, angle: float) -> Tuple[float, float, bool]:
        """
        Simple ray casting to find intersection with obstacles in the grid
        """
        # Convert to grid coordinates
        grid_start_x = int(start_x / self.grid_resolution)
        grid_start_y = int(start_y / self.grid_resolution)

        # Calculate step direction
        dx = math.cos(angle) * self.grid_resolution
        dy = math.sin(angle) * self.grid_resolution

        # Ray cast
        x, y = start_x, start_y
        distance = 0.0

        while distance < self.sensor_range:
            grid_x = int(x / self.grid_resolution)
            grid_y = int(y / self.grid_resolution)

            # Check bounds
            if (grid_x < 0 or grid_x >= self.grid_width or
                grid_y < 0 or grid_y >= self.grid_height):
                break

            # Check if cell is occupied (log odds > 0 means probably occupied)
            if self.occupancy_grid[grid_y][grid_x] > 0:
                return distance, math.sqrt((x - start_x)**2 + (y - start_y)**2), True  # Hit detected

            # Move along ray
            x += dx
            y += dy
            distance = math.sqrt((x - start_x)**2 + (y - start_y)**2)

        # No hit within sensor range
        return self.sensor_range, distance, False

    def update_grid_cell(self, x: float, y: float, log_odds_update: float):
        """
        Update a single grid cell with a log odds update
        """
        grid_x = int(x / self.grid_resolution)
        grid_y = int(y / self.grid_resolution)

        if (0 <= grid_x < self.grid_width and 0 <= grid_y < self.grid_height):
            # Apply log odds update with bounds checking
            new_value = self.occupancy_grid[grid_y][grid_x] + log_odds_update
            self.occupancy_grid[grid_y][grid_x] = max(-10.0, min(10.0, new_value))

    def update_map_with_scan(self, ranges: List[float]):
        """
        Update the occupancy grid based on laser scan measurements
        """
        robot_x, robot_y, robot_theta = self.robot_pose.x, self.robot_pose.y, self.robot_pose.theta

        for i, measured_range in enumerate(self.laser_angles):
            # Calculate the angle of this beam in global frame
            global_angle = robot_theta + measured_range

            # Ray trace to find expected range
            expected_dist, actual_dist, hit_detected = self.ray_casting(robot_x, robot_y, global_angle)

            # Update cells along the ray (free space)
            step_size = 0.1  # 10cm steps
            distance = step_size
            while distance < min(measured_range, self.sensor_range):
                x = robot_x + distance * math.cos(global_angle)
                y = robot_y + distance * math.sin(global_angle)

                # Update as free space
                log_odds_update = math.log(self.prob_miss / (1 - self.prob_miss))
                self.update_grid_cell(x, y, log_odds_update)

                distance += step_size

            # Update endpoint (occupied space if we got a reading less than max range)
            if measured_range < self.sensor_range - 0.1:  # Valid measurement
                end_x = robot_x + measured_range * math.cos(global_angle)
                end_y = robot_y + measured_range * math.sin(global_angle)

                # Update as occupied space
                log_odds_update = math.log(self.prob_hit / (1 - self.prob_hit))
                self.update_grid_cell(end_x, end_y, log_odds_update)

    def move_robot(self, delta_x: float, delta_y: float, delta_theta: float):
        """
        Move the robot by a relative amount with added noise
        """
        # Add motion noise
        noisy_delta_x = delta_x + random.gauss(0, self.motion_noise)
        noisy_delta_y = delta_y + random.gauss(0, self.motion_noise)
        noisy_delta_theta = delta_theta + random.gauss(0, self.motion_noise * 0.1)

        # Update robot pose
        self.robot_pose.x += noisy_delta_x
        self.robot_pose.y += noisy_delta_y
        self.robot_pose.theta += noisy_delta_theta

        # Normalize angle
        self.robot_pose.theta = math.atan2(
            math.sin(self.robot_pose.theta),
            math.cos(self.robot_pose.theta)
        )

        # Update odometry (without noise for comparison)
        self.odometry_pose.x += delta_x
        self.odometry_pose.y += delta_y
        self.odometry_pose.theta += delta_theta
        self.odometry_pose.theta = math.atan2(
            math.sin(self.odometry_pose.theta),
            math.cos(self.odometry_pose.theta)
        )

    def simulate_sensor_data(self) -> List[float]:
        """
        Simulate sensor readings based on the current map and robot position
        """
        ranges = []

        for angle in self.laser_angles:
            # Global angle of the beam
            global_angle = self.robot_pose.theta + angle

            # Simulate ray tracing in a simple environment
            # In a real implementation, this would come from actual sensors
            simulated_range, _, _ = self.ray_casting(
                self.robot_pose.x,
                self.robot_pose.y,
                global_angle
            )

            # Add sensor noise
            noisy_range = simulated_range + random.gauss(0, 0.05)
            noisy_range = max(0.1, min(self.sensor_range, noisy_range))

            ranges.append(noisy_range)

        return ranges

    def detect_landmarks(self, ranges: List[float]) -> List[Tuple[float, float]]:
        """
        Detect potential landmarks from range data (simplified approach)
        """
        landmarks = []
        robot_x, robot_y, robot_theta = self.robot_pose.x, self.robot_pose.y, self.robot_pose.theta

        for i, range_val in enumerate(ranges):
            if range_val < self.sensor_range - 0.5:  # Valid measurement
                angle = robot_theta + self.laser_angles[i]

                # Convert to global coordinates
                landmark_x = robot_x + range_val * math.cos(angle)
                landmark_y = robot_y + range_val * math.sin(angle)

                # Check if this is significantly different from existing landmarks
                is_new = True
                for existing_landmark in self.landmarks.values():
                    dist = math.sqrt(
                        (landmark_x - existing_landmark.x)**2 +
                        (landmark_y - existing_landmark.y)**2
                    )
                    if dist < 0.5:  # Within 50cm of existing landmark
                        is_new = False
                        break

                if is_new:
                    landmarks.append((landmark_x, landmark_y))

        return landmarks

    def add_landmarks(self, landmark_positions: List[Tuple[float, float]]):
        """
        Add detected landmarks to the map
        """
        for x, y in landmark_positions:
            new_landmark = Landmark(
                id=self.next_landmark_id,
                x=x,
                y=y,
                confidence=0.8
            )
            self.landmarks[self.next_landmark_id] = new_landmark
            self.next_landmark_id += 1

    def explore_environment(self, num_steps: int = 100):
        """
        Simulate the robot exploring the environment and building a map
        """
        print("Starting environment exploration and mapping...")
        print(f"Map size: {self.map_size[0]}m x {self.map_size[1]}m")
        print(f"Grid resolution: {self.grid_resolution}m per cell")
        print(f"Robot starting position: ({self.robot_pose.x:.2f}, {self.robot_pose.y:.2f})")
        print()

        exploration_path = [(self.robot_pose.x, self.robot_pose.y)]

        for step in range(num_steps):
            print(f"Step {step + 1}/{num_steps}")

            # Simulate sensor data
            ranges = self.simulate_sensor_data()
            print(f"  Collected {len(ranges)} range measurements")

            # Update map with scan
            self.update_map_with_scan(ranges)
            print(f"  Updated occupancy grid")

            # Detect and add landmarks
            detected_landmarks = self.detect_landmarks(ranges)
            if detected_landmarks:
                self.add_landmarks(detected_landmarks)
                print(f"  Detected {len(detected_landmarks)} new landmarks")

            # Move robot in a spiral pattern for exploration
            angle = step * 0.1  # Gradually turn
            radius = 0.5 + step * 0.01  # Gradually spiral outward
            dx = math.cos(angle) * 0.1  # Small movement
            dy = math.sin(angle) * 0.1
            dtheta = (random.random() - 0.5) * 0.1  # Small heading adjustment

            self.move_robot(dx, dy, dtheta)
            exploration_path.append((self.robot_pose.x, self.robot_pose.y))

            print(f"  Moved to: ({self.robot_pose.x:.2f}, {self.robot_pose.y:.2f})")
            print(f"  Estimated landmarks: {len(self.landmarks)}")
            print()

            # Occasionally print progress
            if (step + 1) % 20 == 0:
                occupied_cells = sum(
                    1 for row in self.occupancy_grid
                    for cell in row if cell > 0.5
                )
                print(f"Progress: {step + 1}/{num_steps} steps completed")
                print(f"Occupied cells in map: {occupied_cells}")
                print(f"Known landmarks: {len(self.landmarks)}")
                print()

        return exploration_path

    def get_map_as_array(self) -> List[List[float]]:
        """
        Convert the occupancy grid to a probability representation
        """
        prob_grid = []
        for row in self.occupancy_grid:
            prob_row = []
            for cell_log_odds in row:
                # Convert log odds to probability
                prob = 1 - (1 / (1 + math.exp(cell_log_odds)))
                prob_row.append(prob)
            prob_grid.append(prob_row)
        return prob_grid

    def print_map_summary(self):
        """
        Print a summary of the mapping results
        """
        print("=== Mapping Results Summary ===")
        print(f"Final robot position: ({self.robot_pose.x:.2f}, {self.robot_pose.y:.2f})")
        print(f"Final orientation: {math.degrees(self.robot_pose.theta):.2f}°")

        occupied_cells = sum(
            1 for row in self.occupancy_grid
            for cell in row if cell > 0.5
        )
        total_cells = self.grid_width * self.grid_height
        occupancy_rate = occupied_cells / total_cells if total_cells > 0 else 0

        print(f"Occupied cells: {occupied_cells} out of {total_cells} ({occupancy_rate:.2%})")
        print(f"Landmarks detected: {len(self.landmarks)}")

        if self.landmarks:
            avg_confidence = sum(l.confidence for l in self.landmarks.values()) / len(self.landmarks)
            print(f"Average landmark confidence: {avg_confidence:.2f}")

def create_simple_environment(mapper: PseudoMapper):
    """
    Create a simple indoor environment with walls and obstacles
    """
    # Add boundary walls
    wall_thickness = 0.5

    # Bottom wall
    for x in range(int(mapper.map_size[0] / mapper.grid_resolution)):
        for thickness in range(int(wall_thickness / mapper.grid_resolution)):
            gx = x
            gy = thickness
            if 0 <= gx < mapper.grid_width and 0 <= gy < mapper.grid_height:
                mapper.occupancy_grid[gy][gx] = 5.0  # Highly occupied

    # Top wall
    for x in range(int(mapper.map_size[0] / mapper.grid_resolution)):
        for thickness in range(int(wall_thickness / mapper.grid_resolution)):
            gx = x
            gy = mapper.grid_height - 1 - thickness
            if 0 <= gx < mapper.grid_width and 0 <= gy < mapper.grid_height:
                mapper.occupancy_grid[gy][gx] = 5.0

    # Left wall
    for y in range(int(mapper.map_size[1] / mapper.grid_resolution)):
        for thickness in range(int(wall_thickness / mapper.grid_resolution)):
            gx = thickness
            gy = y
            if 0 <= gx < mapper.grid_width and 0 <= gy < mapper.grid_height:
                mapper.occupancy_grid[gy][gx] = 5.0

    # Right wall
    for y in range(int(mapper.map_size[1] / mapper.grid_resolution)):
        for thickness in range(int(wall_thickness / mapper.grid_resolution)):
            gx = mapper.grid_width - 1 - thickness
            gy = y
            if 0 <= gx < mapper.grid_width and 0 <= gy < mapper.grid_height:
                mapper.occupancy_grid[gy][gx] = 5.0

    # Add some internal obstacles
    obstacles = [
        (5.0, 5.0, 1.0),   # x, y, size
        (15.0, 8.0, 0.8),
        (12.0, 15.0, 1.2)
    ]

    for obs_x, obs_y, obs_size in obstacles:
        grid_obs_x = int(obs_x / mapper.grid_resolution)
        grid_obs_y = int(obs_y / mapper.grid_resolution)
        grid_size = int(obs_size / mapper.grid_resolution)

        for dx in range(-grid_size//2, grid_size//2 + 1):
            for dy in range(-grid_size//2, grid_size//2 + 1):
                gx = grid_obs_x + dx
                gy = grid_obs_y + dy
                if (0 <= gx < mapper.grid_width and 0 <= gy < mapper.grid_height):
                    mapper.occupancy_grid[gy][gx] = 5.0

def main():
    """
    Main function demonstrating the pseudo mapping concepts
    """
    print("=== Pseudo Mapping Example ===")
    print("Demonstrating how robots map their environment using sensor data and motion estimates\n")

    # Create mapper instance
    mapper = PseudoMapper(map_size=(20, 20))

    # Create a simple indoor environment
    print("Setting up simple indoor environment...")
    create_simple_environment(mapper)
    print("Environment created with walls and obstacles.\n")

    # Explore the environment and build map
    exploration_path = mapper.explore_environment(num_steps=50)

    # Print mapping results
    mapper.print_map_summary()

    print(f"\nExploration path length: {len(exploration_path)} positions")

    print(f"\nKey Mapping Concepts Demonstrated:")
    print("1. Occupancy Grid Mapping: Representing environment as probabilistic grid")
    print("2. Sensor Integration: Using range data to update map beliefs")
    print("3. Motion Estimation: Tracking robot position through odometry")
    print("4. Landmark Detection: Identifying distinctive features in the environment")
    print("5. Uncertainty Management: Handling sensor and motion noise")
    print("6. Incremental Mapping: Building map over time as robot explores")

if __name__ == "__main__":
    main()
```

## Key Learning Points

This conceptual example illustrates several important mapping concepts in robotics:

1. **Occupancy Grid Mapping**: How robots represent environments as probabilistic grids where each cell has a probability of being occupied.

2. **Sensor Integration**: The process of incorporating sensor data (range measurements) to update the map.

3. **Motion Estimation**: How robots track their position using odometry information.

4. **Landmark Detection**: Identifying distinctive features in the environment that can be used for localization.

5. **Uncertainty Management**: Handling noise in both sensor readings and motion estimates.

6. **Incremental Mapping**: Building maps progressively as the robot explores the environment.

## Practical Applications

In real robotic systems, mapping enables:
- Autonomous navigation through unknown environments
- Path planning around obstacles
- Localization and positioning
- Spatial reasoning and task planning
- Memory of environment layout for repeated tasks

## Conclusion

Mapping is a fundamental capability for autonomous robots, enabling them to understand and navigate their environment effectively. This conceptual example demonstrates the core principles underlying more sophisticated mapping algorithms used in real robotic systems.