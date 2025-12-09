---
title: "Week 6 Example: Force Control in Robotics"
description: "A conceptual example demonstrating force control principles in humanoid robotics"
tags: [example, module-2, physics, force-control]
gpu: false
os: [Ubuntu 22.04]
---

# Week 6 Example: Force Control in Robotics

## Overview

This conceptual example demonstrates force control principles that are fundamental to humanoid robotics. Force control enables robots to interact safely and effectively with their environment by regulating the forces applied during contact tasks.

## The Force Control Scenario: Safe Object Manipulation

In this scenario, we'll explore how a humanoid robot can safely manipulate objects of different stiffness and fragility using force control principles. The robot must pick up and place objects while maintaining appropriate contact forces to avoid damage.

## Conceptual Force Control Implementation

```python
# Conceptual Force Control Example: Safe Object Manipulation
from typing import Dict, List, Tuple, Any
import math
import time

class ForceController:
    """
    A conceptual implementation of force control for humanoid robotics
    """

    def __init__(self):
        self.robot_mass = 60.0  # kg
        self.gravity = 9.81    # m/s²
        self.current_force = [0.0, 0.0, 0.0]  # x, y, z forces
        self.target_force = [0.0, 0.0, 0.0]
        self.position = [0.0, 0.0, 0.0]
        self.velocity = [0.0, 0.0, 0.0]
        self.stiffness_matrix = [[1000, 0, 0], [0, 1000, 0], [0, 0, 1000]]  # N/m
        self.damping_matrix = [[20, 0, 0], [0, 20, 0], [0, 0, 20]]  # Ns/m
        self.contact_status = False
        self.object_properties = {
            'fragile_glass': {'max_force': 5.0, 'stiffness': 5000},
            'soft_foam': {'max_force': 20.0, 'stiffness': 500},
            'hard_plastic': {'max_force': 50.0, 'stiffness': 10000}
        }

    def impedance_control(self, desired_pos: List[float], stiffness: List[List[float]] = None) -> Dict[str, Any]:
        """
        Implement impedance control to regulate forces during contact
        """
        if stiffness is not None:
            self.stiffness_matrix = stiffness

        # Calculate position error
        pos_error = [
            desired_pos[i] - self.position[i] for i in range(3)
        ]

        # Calculate desired force based on impedance model
        desired_force = [0.0, 0.0, 0.0]
        for i in range(3):
            for j in range(3):
                desired_force[i] += self.stiffness_matrix[i][j] * pos_error[j]

        # Apply damping to reduce oscillations
        damped_force = [
            desired_force[i] - self.damping_matrix[i][i] * self.velocity[i] for i in range(3)
        ]

        return {
            'force_command': damped_force,
            'position_error': pos_error,
            'stiffness': self.stiffness_matrix
        }

    def admittance_control(self, external_force: List[float],
                          admittance: List[List[float]] = None) -> Dict[str, Any]:
        """
        Implement admittance control to allow compliant behavior
        """
        if admittance is None:
            # Default admittance (inverse of stiffness)
            admittance = [[0.001, 0, 0], [0, 0.001, 0], [0, 0, 0.001]]

        # Calculate resulting motion from applied force
        resulting_motion = [0.0, 0.0, 0.0]
        for i in range(3):
            for j in range(3):
                resulting_motion[i] += admittance[i][j] * external_force[j]

        # Update position and velocity
        for i in range(3):
            self.velocity[i] += resulting_motion[i] * 0.01  # 0.01s time step
            self.position[i] += self.velocity[i] * 0.01

        return {
            'motion_response': resulting_motion,
            'new_position': self.position.copy(),
            'new_velocity': self.velocity.copy()
        }

    def force_limiting_control(self, object_type: str) -> Dict[str, Any]:
        """
        Implement force limiting to prevent damage to objects
        """
        object_props = self.object_properties.get(object_type,
                                                 {'max_force': 10.0, 'stiffness': 1000})

        # Current force magnitude
        force_magnitude = math.sqrt(sum(f**2 for f in self.current_force))

        # Check if force exceeds safe limits
        if force_magnitude > object_props['max_force']:
            # Calculate scaling factor
            scale_factor = object_props['max_force'] / force_magnitude

            # Limit forces
            limited_force = [
                self.current_force[i] * scale_factor for i in range(3)
            ]

            print(f"⚠️  Force limiting active: Reduced from {force_magnitude:.2f}N to {object_props['max_force']:.2f}N")
            return {
                'limited': True,
                'original_force': self.current_force.copy(),
                'limited_force': limited_force,
                'scale_factor': scale_factor
            }
        else:
            return {
                'limited': False,
                'force': self.current_force.copy()
            }

    def simulate_object_interaction(self, object_type: str, interaction_type: str) -> Dict[str, Any]:
        """
        Simulate interaction with different object types
        """
        print(f"\n--- Simulating interaction with {object_type} using {interaction_type} control ---")

        object_props = self.object_properties.get(object_type,
                                                 {'max_force': 10.0, 'stiffness': 1000})
        print(f"Object properties: Max force = {object_props['max_force']}N, Stiffness = {object_props['stiffness']} N/m")

        # Set initial position near object
        self.position = [0.5, 0.5, 0.1]  # Above the object
        self.current_force = [0.0, 0.0, 0.0]

        # Simulate approach phase
        print("Approach phase: Moving toward object with low stiffness (compliant)")
        approach_stiffness = [[100, 0, 0], [0, 100, 0], [0, 0, 100]]
        impedance_result = self.impedance_control([0.5, 0.5, 0.05], approach_stiffness)

        # Simulate contact phase
        print("Contact phase: Detecting contact and adjusting control")
        contact_force = [0.0, 0.0, -2.0]  # Initial contact force
        self.current_force = contact_force

        # Apply force limiting if needed
        force_limit_result = self.force_limiting_control(object_type)

        # Simulate manipulation phase based on control type
        if interaction_type == "impedance":
            print("Using impedance control for manipulation")
            manipulation_stiffness = [[500, 0, 0], [0, 500, 0], [0, 0, 500]]
            impedance_result = self.impedance_control([0.6, 0.5, 0.05], manipulation_stiffness)
            final_force = impedance_result['force_command']
        elif interaction_type == "admittance":
            print("Using admittance control for compliant manipulation")
            external_force = [1.0, 0.5, -3.0]  # Force applied by environment
            admittance_result = self.admittance_control(external_force)
            final_force = [0.0, 0.0, -2.5]  # Resulting contact force
        else:  # force control
            print("Using direct force control")
            final_force = [0.5, 0.2, -object_props['max_force']*0.8]  # 80% of max force

        # Update current force
        self.current_force = final_force

        # Check if interaction was safe
        force_magnitude = math.sqrt(sum(f**2 for f in self.current_force))
        safe = force_magnitude <= object_props['max_force']

        print(f"Final applied force: {force_magnitude:.2f}N (Max allowed: {object_props['max_force']:.2f}N)")
        print(f"Interaction safety: {'✅ SAFE' if safe else '❌ UNSAFE'}")

        return {
            'object_type': object_type,
            'interaction_type': interaction_type,
            'applied_force': self.current_force.copy(),
            'force_magnitude': force_magnitude,
            'max_allowed_force': object_props['max_force'],
            'safe': safe,
            'position': self.position.copy(),
            'force_limiting_active': force_limit_result['limited']
        }

    def simulate_multi_contact_scenario(self) -> Dict[str, Any]:
        """
        Simulate a multi-contact scenario (e.g., robot walking on uneven terrain)
        """
        print(f"\n--- Simulating Multi-Contact Scenario ---")
        print("Robot walking with feet on different surfaces")

        # Simulate left foot on soft surface, right foot on hard surface
        left_foot_surface = {'stiffness': 2000, 'friction': 0.6}  # Soft
        right_foot_surface = {'stiffness': 8000, 'friction': 0.8}  # Hard

        print(f"Left foot: Soft surface (stiffness: {left_foot_surface['stiffness']} N/m)")
        print(f"Right foot: Hard surface (stiffness: {right_foot_surface['stiffness']} N/m)")

        # Calculate appropriate forces for each foot based on surface properties
        body_weight = self.robot_mass * self.gravity
        left_force = body_weight * 0.4  # 40% of weight on soft surface
        right_force = body_weight * 0.6  # 60% of weight on hard surface (more stable)

        print(f"Distributed forces - Left: {left_force:.2f}N, Right: {right_force:.2f}N")

        # Simulate balance adjustment
        center_of_pressure = (left_force * 0.0 + right_force * 0.1) / (left_force + right_force)
        print(f"Center of pressure: {center_of_pressure:.3f}m between feet")

        return {
            'left_foot_force': left_force,
            'right_foot_force': right_force,
            'total_weight': body_weight,
            'cop_position': center_of_pressure,
            'surface_properties': {'left': left_foot_surface, 'right': right_foot_surface}
        }

def main():
    """
    Main function demonstrating force control concepts
    """
    print("=== Force Control in Humanoid Robotics ===")
    print("This example demonstrates how robots regulate forces during physical interaction\n")

    # Create force controller
    controller = ForceController()

    # Test different object interactions
    objects = ['fragile_glass', 'soft_foam', 'hard_plastic']
    control_types = ['impedance', 'admittance', 'force']

    results = []
    for obj in objects:
        for ctrl_type in control_types:
            result = controller.simulate_object_interaction(obj, ctrl_type)
            results.append(result)
            print(f"  Applied force: {result['force_magnitude']:.2f}N, Safe: {result['safe']}")

    # Simulate multi-contact scenario
    multi_contact_result = controller.simulate_multi_contact_scenario()

    # Summary
    print(f"\n=== Force Control Summary ===")
    print(f"Total interactions simulated: {len(results)}")

    safe_interactions = sum(1 for r in results if r['safe'])
    print(f"Safe interactions: {safe_interactions}/{len(results)}")

    force_limited = sum(1 for r in results if r['force_limiting_active'])
    print(f"Force limiting activated: {force_limited} times")

    print(f"\nKey Force Control Concepts Demonstrated:")
    print("1. Impedance control - Regulating position based on applied forces")
    print("2. Admittance control - Regulating motion based on applied forces")
    print("3. Force limiting - Preventing damage to objects or robot")
    print("4. Multi-contact force distribution - Managing forces across multiple contact points")
    print("5. Stiffness adaptation - Adjusting robot compliance based on task requirements")

if __name__ == "__main__":
    main()
```

## Key Learning Points

This conceptual example illustrates several important force control concepts in humanoid robotics:

1. **Impedance Control**: How robots can regulate their mechanical impedance (stiffness, damping) to achieve desired interaction behaviors.

2. **Admittance Control**: How robots can be made compliant by regulating motion in response to applied forces.

3. **Force Limiting**: Safety mechanisms that prevent excessive forces during interaction.

4. **Multi-contact Scenarios**: How forces are distributed across multiple contact points.

5. **Stiffness Adaptation**: Adjusting robot compliance based on the task and environment requirements.

## Practical Applications

In real humanoid robots, force control enables:
- Safe manipulation of fragile objects
- Stable walking on uneven terrain
- Compliant interaction with humans
- Precise assembly and manufacturing tasks
- Recovery from external disturbances

## Conclusion

Force control is fundamental to safe and effective humanoid-robot interaction. By carefully regulating the forces applied during contact, robots can interact with their environment in a controlled and predictable manner, adapting their behavior based on the properties of objects and surfaces they encounter.