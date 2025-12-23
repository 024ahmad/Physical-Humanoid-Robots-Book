---
sidebar_position: 3
---

# Chapter 3 (Week 2): Actions, URDF, and Launch Files

## Overview

Advanced ROS 2 concepts: actions for long-running tasks, URDF for robot description, launch files for system orchestration. This chapter covers essential tools for building complex robotic applications.

## Core Concepts

### Actions
- Goal-feedback-result pattern
- For long-running operations
- Cancellable tasks
- Progress monitoring
- Asynchronous with feedback
- Preemption capability
- Used for navigation, manipulation, etc.

### URDF (Unified Robot Description Format)
- Robot description format
- Kinematic/dynamic properties
- Visual/collision models
- Joint constraints and limits
- Sensor and actuator specifications
- XML-based representation
- Inertial properties definition

### Launch Files
- Multi-node startup
- Parameter configuration
- System orchestration
- Conditional execution
- Complex system startup
- Remapping capabilities
- Package dependency management

## Essential Code Example

```xml
<robot name="simple_robot">
  <!-- Base link -->
  <link name="base_link">
    <visual>
      <geometry><box size="0.5 0.5 0.2"/></geometry>
      <material name="blue"><color rgba="0 0 1 1"/></material>
    </visual>
    <collision>
      <geometry><box size="0.5 0.5 0.2"/></geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.083" ixy="0.0" ixz="0.0" iyy="0.083" iyz="0.0" izz="0.167"/>
    </inertial>
  </link>

  <!-- Wheel links -->
  <link name="wheel_left">
    <visual>
      <geometry><cylinder radius="0.1" length="0.05"/></geometry>
    </visual>
  </link>
</robot>
```

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_robot_package',
            executable='sensor_publisher',
            name='sensor_publisher',
            parameters=[
                {'use_sim_time': True}
            ],
            output='screen'),
        Node(
            package='my_robot_package',
            executable='controller_node',
            name='controller_node',
            parameters=[
                {'use_sim_time': True}
            ],
            output='screen'),
    ])
```

## Key Takeaways

1. Actions for goal-oriented tasks
2. URDF describes robot structure
3. Launch files simplify system startup
4. URDF enables simulation and motion planning
5. Launch files manage complex system configurations

---
