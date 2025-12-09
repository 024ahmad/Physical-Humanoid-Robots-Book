---
title: "Week 6 Example: Pseudo Physics Scenario"
description: "A conceptual example demonstrating physics principles in humanoid robotics"
tags: [example, module-2, physics, interaction]
gpu: false
os: [Ubuntu 22.04]
---

# Week 6 Example: Pseudo Physics Scenario

## Overview

This conceptual example demonstrates fundamental physics principles that govern humanoid robot interactions with the physical world. We'll explore a scenario where a humanoid robot navigates a challenging terrain with varying friction properties and obstacles.

## The Physics Scenario: Variable Terrain Navigation

Imagine a humanoid robot tasked with walking across a surface that transitions from a high-friction rubber mat to a low-friction icy patch, then to a normal surface. This scenario illustrates several key physics concepts:

### Scenario Setup
- Robot mass: 60 kg
- Foot contact area: 0.02 m²
- Surface 1 (rubber): μ_static = 0.8, μ_kinetic = 0.7
- Surface 2 (ice): μ_static = 0.1, μ_kinetic = 0.08
- Surface 3 (normal): μ_static = 0.6, μ_kinetic = 0.5
- Robot walking speed: 0.5 m/s
- Gravity: 9.81 m/s²

## Conceptual Physics Simulation

```python
# Conceptual Physics Scenario: Variable Terrain Navigation
from typing import Dict, List, Tuple, Any
import math
import time

class PhysicsScenario:
    """
    A conceptual implementation of physics principles in humanoid robotics
    """

    def __init__(self):
        self.robot_mass = 60.0  # kg
        self.gravity = 9.81    # m/s²
        self.robot_velocity = [0.0, 0.0]  # x, y velocity
        self.robot_position = [0.0, 0.0]  # x, y position
        self.robot_orientation = 0.0      # angle in radians
        self.normal_force = self.robot_mass * self.gravity  # N
        self.terrain_properties = self._define_terrain()
        self.current_surface = "rubber"
        self.contact_status = True  # True if in contact with ground

    def _define_terrain(self) -> Dict[str, Dict[str, float]]:
        """
        Define the properties of different terrain surfaces
        """
        return {
            "rubber": {
                "static_friction": 0.8,
                "kinetic_friction": 0.7,
                "description": "High friction surface, excellent grip"
            },
            "ice": {
                "static_friction": 0.1,
                "kinetic_friction": 0.08,
                "description": "Low friction surface, slippery"
            },
            "normal": {
                "static_friction": 0.6,
                "kinetic_friction": 0.5,
                "description": "Standard friction surface"
            }
        }

    def get_surface_at_position(self, x: float) -> str:
        """
        Determine which surface type is at the given x position
        """
        if x < 2.0:
            return "rubber"
        elif x < 4.0:
            return "ice"
        else:
            return "normal"

    def calculate_friction_force(self, applied_force: float, direction: str = "horizontal") -> float:
        """
        Calculate the friction force based on surface properties and applied force
        """
        # Get current surface properties
        surface_type = self.get_surface_at_position(self.robot_position[0])
        self.current_surface = surface_type
        surface_props = self.terrain_properties[surface_type]

        # Calculate maximum static friction
        max_static_friction = surface_props["static_friction"] * self.normal_force

        # If applied force exceeds static friction, kinetic friction applies
        if abs(applied_force) > max_static_friction:
            friction_force = math.copysign(surface_props["kinetic_friction"] * self.normal_force, -applied_force)
            print(f"  Transitioned to kinetic friction on {surface_type} surface")
        else:
            # Static friction opposes the applied force up to the maximum
            friction_force = -applied_force
            if abs(friction_force) > max_static_friction:
                friction_force = math.copysign(max_static_friction, -applied_force)
            print(f"  Static friction active on {surface_type} surface")

        print(f"  Surface: {surface_type} (μs={surface_props['static_friction']}, μk={surface_props['kinetic_friction']})")
        print(f"  Normal force: {self.normal_force:.2f} N")
        print(f"  Applied force: {applied_force:.2f} N")
        print(f"  Friction force: {friction_force:.2f} N")

        return friction_force

    def calculate_ground_reaction_forces(self, external_forces: Dict[str, float]) -> Dict[str, float]:
        """
        Calculate ground reaction forces based on external forces
        """
        # Vertical component: normal force balances weight and vertical forces
        vertical_force = external_forces.get('vertical', 0.0)
        normal_force = self.robot_mass * self.gravity + vertical_force

        # Horizontal component: friction opposes horizontal motion
        horizontal_force = external_forces.get('horizontal', 0.0)
        friction_force = self.calculate_friction_force(horizontal_force)

        # Moment component: forces that create rotational effects
        moment_arm = external_forces.get('moment_arm', 0.0)  # distance from center of pressure
        moment_force = external_forces.get('moment', 0.0)
        moment_reaction = -moment_force  # Ground provides equal and opposite moment

        print(f"  Moment force: {moment_force:.2f} N·m, Reaction: {moment_reaction:.2f} N·m")

        return {
            'normal': normal_force,
            'friction': friction_force,
            'moment': moment_reaction
        }

    def simulate_step(self, step_force: float) -> Dict[str, Any]:
        """
        Simulate one step of the robot's interaction with the ground
        """
        print(f"\n--- Physics Simulation Step ---")
        print(f"Robot position: ({self.robot_position[0]:.2f}, {self.robot_position[1]:.2f}) m")
        print(f"Robot velocity: ({self.robot_velocity[0]:.2f}, {self.robot_velocity[1]:.2f}) m/s")

        # Calculate external forces acting on the robot
        external_forces = {
            'vertical': 0.0,  # No external vertical force in this simple model
            'horizontal': step_force,  # Force applied by the robot to move forward
            'moment_arm': 0.05,  # Small moment arm
            'moment': step_force * 0.05  # Moment created by horizontal force
        }

        # Calculate ground reaction forces
        reaction_forces = self.calculate_ground_reaction_forces(external_forces)

        # Apply Newton's second law to calculate acceleration
        total_horizontal_force = external_forces['horizontal'] + reaction_forces['friction']
        acceleration_x = total_horizontal_force / self.robot_mass

        # Update velocity and position
        self.robot_velocity[0] += acceleration_x * 0.01  # 0.01s time step
        self.robot_position[0] += self.robot_velocity[0] * 0.01

        print(f"  Acceleration: {acceleration_x:.3f} m/s²")
        print(f"  New velocity: ({self.robot_velocity[0]:.3f}, {self.robot_velocity[1]:.3f}) m/s")
        print(f"  New position: ({self.robot_position[0]:.3f}, {self.robot_position[1]:.3f}) m")

        # Check for slipping (if friction force is less than maximum)
        surface_props = self.terrain_properties[self.current_surface]
        max_static_friction = surface_props["static_friction"] * self.normal_force
        applied_force = external_forces['horizontal']

        if abs(applied_force) > max_static_friction:
            print(f"  ⚠️  SLIPPING: Applied force ({abs(applied_force):.2f} N) > Max static friction ({max_static_friction:.2f} N)")
        else:
            print(f"  ✅ STABLE: Sufficient friction to prevent slipping")

        return {
            'position': self.robot_position.copy(),
            'velocity': self.robot_velocity.copy(),
            'forces': reaction_forces,
            'surface': self.current_surface,
            'slipping': abs(applied_force) > max_static_friction
        }

    def calculate_stability_metrics(self) -> Dict[str, float]:
        """
        Calculate stability metrics for the robot
        """
        # Zero Moment Point (ZMP) calculation (simplified)
        # ZMP_x = x_com - (h/g) * a_x, where h is height of CoM
        height_com = 0.8  # height of center of mass in meters
        acceleration_x = self.robot_velocity[0] * 10  # rough estimate of acceleration

        zmp_x = self.robot_position[0] - (height_com / self.gravity) * acceleration_x

        # Support polygon (simplified as a rectangle under the foot)
        foot_length = 0.2  # 20cm foot length
        foot_width = 0.1   # 10cm foot width

        # Calculate if ZMP is within support polygon
        x_foot_center = self.robot_position[0]
        y_foot_center = self.robot_position[1]

        zmp_in_support = (
            abs(zmp_x - x_foot_center) <= foot_length / 2
        )

        return {
            'zmp_x': zmp_x,
            'zmp_in_support': zmp_in_support,
            'center_of_mass_x': self.robot_position[0],
            'stability_margin': abs(foot_length/2 - abs(zmp_x - x_foot_center)) if zmp_in_support else -abs(zmp_x - x_foot_center)
        }

    def simulate_terrain_crossing(self) -> List[Dict[str, Any]]:
        """
        Simulate the robot crossing different terrain types
        """
        print("Starting terrain crossing simulation...")
        print("Terrain sequence: Rubber (high friction) → Ice (low friction) → Normal (medium friction)")
        print(f"Robot mass: {self.robot_mass} kg, Weight: {self.normal_force:.2f} N")

        results = []
        step_force = 50  # Constant forward force for simplicity

        # Simulate 500 steps to cross all terrain types
        for step in range(500):
            result = self.simulate_step(step_force)
            stability = self.calculate_stability_metrics()

            result['stability'] = stability
            results.append(result)

            # Adjust step force based on surface conditions
            if result['slipping']:
                step_force *= 0.8  # Reduce force if slipping
                print(f"  Adjusted step force due to slipping: {step_force:.2f} N")
            elif result['surface'] == 'ice':
                step_force = 20  # Use lower force on ice
            else:
                step_force = 50  # Normal force on other surfaces

            # Small delay to simulate real-time operation
            if step % 50 == 0:  # Print every 50 steps
                print(f"Step {step}: Position x={self.robot_position[0]:.2f}m, Surface: {result['surface']}")

        return results

def main():
    """
    Main function demonstrating the physics scenario
    """
    print("=== Humanoid Robot Physics Scenario Simulation ===")
    print("This example demonstrates how physics principles govern humanoid-terrain interactions\n")

    # Create physics scenario
    scenario = PhysicsScenario()

    # Run the simulation
    results = scenario.simulate_terrain_crossing()

    # Analyze results
    print(f"\n=== Simulation Results ===")
    print(f"Total steps simulated: {len(results)}")
    print(f"Final position: ({results[-1]['position'][0]:.2f}, {results[-1]['position'][1]:.2f}) m")
    print(f"Final surface: {results[-1]['surface']}")

    # Count slipping events
    slipping_events = sum(1 for r in results if r['slipping'])
    print(f"Total slipping events: {slipping_events}")

    # Analyze stability
    unstable_steps = sum(1 for r in results if not r['stability']['zmp_in_support'])
    print(f"Steps with ZMP outside support: {unstable_steps}")

    print(f"\nKey Physics Concepts Demonstrated:")
    print("1. Friction force varies with surface properties")
    print("2. Static vs kinetic friction transition")
    print("3. Ground reaction forces balance applied forces")
    print("4. Zero Moment Point (ZMP) for stability analysis")
    print("5. How robots adapt behavior based on surface conditions")

if __name__ == "__main__":
    main()
```

## Key Learning Points

This conceptual example illustrates several important physics concepts in humanoid robotics:

1. **Friction Variation**: How friction coefficients change across different surfaces and affect robot locomotion.

2. **Force Balance**: How ground reaction forces balance the robot's weight and applied forces.

3. **Static vs Kinetic Friction**: The transition between static and kinetic friction when applied forces exceed the static limit.

4. **Stability Analysis**: How the Zero Moment Point (ZMP) indicates stability margins.

5. **Adaptive Control**: How robots must adjust their behavior based on surface conditions.

## Practical Applications

In real humanoid robots, physics simulations like this enable:
- Predictive control for stable locomotion
- Adaptive gait patterns for different surfaces
- Safe interaction with varying environmental conditions
- Recovery strategies for unexpected disturbances

## Conclusion

This pseudo physics scenario demonstrates how fundamental physics principles govern the interaction between humanoid robots and their environment. Understanding these principles is essential for creating robots that can navigate diverse terrains safely and efficiently.