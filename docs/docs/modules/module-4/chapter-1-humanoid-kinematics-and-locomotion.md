---
sidebar_position: 1
---

# Chapter 1 (Week 11): Humanoid Kinematics and Locomotion

## Overview

Humanoid robotics requires sophisticated understanding of human-like movement, balance, and interaction. This chapter explores the fundamentals of humanoid kinematics and bipedal locomotion.

## Core Concepts

### Humanoid Anatomy
- Degrees of Freedom: Multiple joints for movement
- Anthropomorphic design: Human-like proportions
- Sensor integration: IMU, force/torque sensors
- Actuator systems: Servos or hydraulic systems
- Limb structure: Arms, legs, torso, head
- Joint constraints: Physical limits and safety
- Redundancy: Multiple solutions for tasks

### Kinematics Fundamentals
- Forward Kinematics: End-effector from joint angles
- Inverse Kinematics: Joint angles from end-effector
- Jacobian Matrix: Joint to end-effector velocities
- Workspace Analysis: Reachable positions
- Denavit-Hartenberg parameters: Joint description
- Kinematic chains: Link and joint relationships
- Redundant manipulators: Multiple solutions

### Locomotion Principles
- Zero Moment Point: Balance control
- Center of Mass: Dynamic balance
- Gait Patterns: Walking, running styles
- Stability Control: Maintaining balance
- Step planning: Foot placement strategies
- Balance recovery: Fall prevention
- Multi-contact dynamics: Complex interactions

### Bipedal Walking
- Single Support Phase: One foot on ground
- Double Support Phase: Both feet on ground
- Swing Phase: Foot in air
- Heel-to-Toe transition: Weight transfer
- Pelvis motion: Trunk stabilization
- Arm swing: Balance assistance
- Ground reaction forces: Support dynamics

## Essential Code Example

```python
import numpy as np
import math

def inverse_kinematics_2d(target_x, target_y, l1, l2):
    """Simple 2D inverse kinematics for leg"""
    # Calculate distance to target
    dist = math.sqrt(target_x**2 + target_y**2)

    # Check if target is reachable
    if dist > l1 + l2:
        # Scale to maximum reach
        target_x *= (l1 + l2) / dist
        target_y *= (l1 + l2) / dist

    # Calculate joint angles using law of cosines
    cos_angle2 = (l1**2 + l2**2 - target_x**2 - target_y**2) / (2*l1*l2)
    angle2 = math.acos(max(-1, min(1, cos_angle2)))

    k1 = l1 + l2 * math.cos(angle2)
    k2 = l2 * math.sin(angle2)
    angle1 = math.atan2(target_y, target_x) - math.atan2(k2, k1)

    return angle1, angle2

def compute_jacobian(theta1, theta2, l1, l2):
    """Compute 2D Jacobian matrix"""
    # Joint angles
    q1, q2 = theta1, theta2

    # End-effector position
    x = l1 * math.cos(q1) + l2 * math.cos(q1 + q2)
    y = l1 * math.sin(q1) + l2 * math.sin(q1 + q2)

    # Jacobian matrix
    j11 = -l1 * math.sin(q1) - l2 * math.sin(q1 + q2)
    j12 = -l2 * math.sin(q1 + q2)
    j21 = l1 * math.cos(q1) + l2 * math.cos(q1 + q2)
    j22 = l2 * math.cos(q1 + q2)

    return np.array([[j11, j12], [j21, j22]])
```

## Key Takeaways

1. Humanoid kinematics involves complex forward/inverse calculations
2. Balance control is essential for stable locomotion
3. ZMP provides framework for balance analysis
4. Jacobian matrices enable velocity control
5. Inverse kinematics enables motion planning

---