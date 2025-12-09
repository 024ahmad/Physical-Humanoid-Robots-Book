---
title: "Week 6 — Physics & Interaction Basics"
description: "Understanding fundamental and advanced physics concepts that govern humanoid robot interactions with the physical world"
tags: [physics, interaction, humanoid, robotics]
sidebar_position: 1
---

# Week 6 — Physics & Interaction Basics

## Introduction to Physics in Humanoid Robotics

Physics forms the foundation for understanding how humanoid robots interact with the physical world. Unlike purely digital systems, robots must operate within the constraints of physical laws, which govern their movement, stability, and interactions with objects and surfaces. Understanding these fundamental physics concepts is essential for creating robots that can move efficiently, maintain stability, and interact safely with their environment.

The physics of humanoid robotics encompasses several key areas: statics (the study of forces in equilibrium), dynamics (the study of forces and motion), and contact mechanics (the study of interactions between bodies). These areas work together to determine how robots can stand, walk, manipulate objects, and respond to external forces.

Building upon these fundamental concepts, advanced physics principles are crucial for understanding how robots maintain balance during dynamic movements, interact with complex environments, and execute sophisticated tasks that require precise control of forces and motions.

## Contact Mechanics

Contact mechanics is the study of the interaction between solid bodies when they come into contact. In humanoid robotics, this is critical for understanding how robots interact with surfaces, objects, and other entities in their environment.

### Types of Contact

When a humanoid robot interacts with its environment, several types of contact can occur:

**Point Contact**: Occurs when a robot's foot or hand makes contact at a single point. This is common in many robotic systems but can be unstable if not properly controlled.

**Line Contact**: Occurs when a robot's foot or another surface makes contact along a line. This provides more stability than point contact.

**Surface Contact**: Occurs when two surfaces are in full contact. This provides maximum stability but requires precise alignment.

### Normal and Tangential Forces

When two bodies are in contact, forces arise in two primary directions:

**Normal Force**: The force perpendicular to the contact surface. This force prevents objects from passing through each other and is crucial for maintaining contact.

**Tangential Force**: The force parallel to the contact surface. This force allows for sliding, rolling, and other lateral movements.

## Friction Concepts

Friction is a fundamental force that opposes relative motion between surfaces in contact. Understanding friction is crucial for humanoid robotics as it enables walking, grasping, and many other essential behaviors.

### Static Friction

Static friction prevents objects from starting to move relative to each other. The maximum static friction force is given by:

F_static_max = μ_static × N

Where μ_static is the coefficient of static friction and N is the normal force. As long as the applied force is less than this maximum, the objects will remain in static contact.

### Kinetic Friction

Once objects begin sliding relative to each other, kinetic friction applies:

F_kinetic = μ_kinetic × N

Kinetic friction is typically less than static friction, which is why it's easier to keep an object moving than to start it moving.

### Friction in Locomotion

For humanoid robots, friction is essential for locomotion. When walking, robots must generate sufficient friction to prevent slipping while maintaining the ability to break contact when needed. This requires careful control of the forces applied to the ground.

### Advanced Friction Modeling

Advanced friction modeling is essential for complex robotic behaviors. The friction between a robot's feet and the ground determines its ability to generate forces for locomotion and balance.

**Stribeck Model**: Accounts for the transition between static and kinetic friction:

f = f_c + (f_s - f_c) × e^(-(v/v_s)²) + f_v × v

Where f_c is Coulomb friction, f_s is static friction, v_s is Stribeck velocity, and f_v is viscous friction coefficient.

**Lugre Model**: A more sophisticated model that accounts for the microscopic behavior of contacting surfaces:

df/dt = g(v) × (v - f/σ₀) / σ₁

Where σ₀ and σ₁ are stiffness and damping parameters of the contact surface.

## Force Concepts

Forces govern all interactions between a humanoid robot and its environment. Understanding how to apply, measure, and respond to forces is fundamental to creating effective robotic systems.

### Force Control

Robots can control forces in several ways:

**Impedance Control**: The robot behaves like a spring-damper system, where the position is controlled based on applied forces.

**Admittance Control**: The robot's motion is proportional to the applied force, allowing for compliant behavior.

**Force Limiting**: The robot limits the forces it applies to prevent damage to itself or its environment.

### Center of Mass and Stability

The center of mass (CoM) is a critical concept in humanoid robotics. The CoM is the point where the total mass of the robot can be considered to be concentrated. For a humanoid to remain stable, the projection of the CoM onto the ground must remain within the support polygon defined by the contact points.

Dynamic balance in humanoid robots involves maintaining stability while the robot is in motion. Unlike static balance, which occurs when the robot is stationary, dynamic balance requires continuous adjustment of the body's configuration to maintain the center of mass within the support polygon.

The CoM can be calculated as:

CoM = Σ(m_i × r_i) / Σm_i

Where m_i represents the mass of each body segment and r_i represents the position vector of each segment.

During walking, the CoM follows a complex trajectory that must be planned and controlled. Advanced robots use techniques like Linear Inverted Pendulum Mode (LIPM) to simplify the control problem while maintaining stability.

### Moments and Torques

Moments (or torques) are rotational forces that cause objects to rotate. In humanoid robots, controlling moments is essential for maintaining balance and performing coordinated movements. The moment about a point is given by the cross product of the position vector and the force vector.

### Angular Momentum and Rotation

Angular momentum plays a crucial role in humanoid balance and movement. When a robot needs to recover from a disturbance, it can use angular momentum to generate corrective torques. The total angular momentum of a robot is given by:

H = Σ(r_i × m_i × v_i) + Σ(I_i × ω_i)

Where the first term represents the angular momentum due to linear motion of each segment, and the second term represents the angular momentum due to rotation of each segment, with I_i being the moment of inertia and ω_i being the angular velocity.

## How Humanoids Interact with Ground

Humanoid robots interact with the ground through their feet, and these interactions are governed by the physics principles discussed above. The ground interaction involves complex dynamics that must be carefully managed for stable locomotion.

### Ground Reaction Forces

When a humanoid stands or moves, the ground exerts reaction forces on the robot's feet. These forces must balance the robot's weight and any applied accelerations. The distribution of these forces across the foot affects stability and the robot's ability to maintain balance.

The ground reaction force can be decomposed into three components:
- **Vertical component**: Supports the robot's weight and provides the normal force
- **Horizontal components**: Provide the friction forces that enable movement
- **Moment components**: Create torques that must be managed to maintain balance

### Walking Dynamics

Walking involves a complex sequence of contact and non-contact phases. During walking, the robot must:
- Transfer weight from one foot to the other
- Maintain balance during single-support phases
- Control the impact when the swing foot contacts the ground
- Generate sufficient friction to prevent slipping

The walking cycle can be broken down into:
- **Double support phase**: Both feet are in contact with the ground
- **Single support phase**: Only one foot is in contact with the ground
- **Foot contact phase**: The swing foot makes contact with the ground
- **Foot liftoff phase**: The stance foot leaves the ground

### Stability Margins

Humanoid robots maintain stability margins to handle unexpected disturbances. These margins ensure that the robot can respond to external forces without falling. The size of these margins affects both stability and efficiency.

### Zero Moment Point (ZMP)

The Zero Moment Point is a critical concept in humanoid locomotion. It represents the point on the ground where the sum of all moments due to external forces is zero. For stable walking, the ZMP must remain within the support polygon defined by the feet.

### Capture Point

The capture point is the location where a robot must step to stop its motion. Understanding the capture point is essential for dynamic balance and recovery from disturbances.

### Ground Contact Models

Different models are used to simulate ground contact in humanoid robots:

**Point Contact Model**: Simplest model where contact occurs at a single point. Computationally efficient but less accurate.

**Surface Contact Model**: More realistic model that considers the entire contact area. Provides better accuracy for balance control.

**Soft Contact Model**: Accounts for compliance in the robot's feet and the ground surface. Most accurate but computationally expensive.

### Friction Cones

The friction cone concept describes the limits of friction forces that can be applied at a contact point. The friction cone is defined by the coefficient of friction and limits the ratio of tangential to normal forces that can be sustained without slipping.

### Multi-contact Scenarios

Humanoid robots may have multiple contact points simultaneously, such as:
- Both feet during double support
- Feet and hands during climbing or complex maneuvers
- Feet and external objects during manipulation tasks

Managing multi-contact scenarios requires sophisticated force distribution algorithms to ensure stability while achieving task objectives.

## Impact Dynamics

When a humanoid robot's foot contacts the ground during walking, or when it interacts with objects, impact dynamics become important. These interactions involve rapid changes in momentum and require careful analysis to ensure stable behavior.

### Coefficient of Restitution

The coefficient of restitution (e) describes the energy loss during impact:

e = |v₂ - v₁| / |u₂ - u₁|

Where v₁ and v₂ are the final velocities of the two bodies, and u₁ and u₂ are the initial velocities. For robotic feet interacting with typical surfaces, e is usually small (0.1-0.3), indicating that most impacts are inelastic.

### Impulse and Momentum Transfer

During impact, the impulse-momentum theorem applies:

J = Δp = m(v_f - v_i)

Where J is the impulse, Δp is the change in momentum, m is the mass, and v_f and v_i are the final and initial velocities respectively. Robots must be designed to handle these impulse forces without damage.

## Multi-body Dynamics

Humanoid robots are complex multi-body systems with many degrees of freedom. Understanding the dynamics of such systems is crucial for control and planning.

### Lagrangian Mechanics

The equations of motion for a multi-body system can be derived using Lagrangian mechanics:

d/dt(∂L/∂q̇) - ∂L/∂q = Q

Where L = T - V is the Lagrangian (T is kinetic energy, V is potential energy), q represents the generalized coordinates, and Q represents the generalized forces.

For a humanoid robot with n joints, this results in n coupled second-order differential equations that describe the system's motion.

### Newton-Euler Formulation

An alternative approach is the Newton-Euler formulation, which applies Newton's laws to each body in the system:

ΣF = ma (for translation)
ΣM = Iα (for rotation)

This approach is often more intuitive for understanding the forces and moments acting on individual body segments.

## Contact Mechanics in Complex Scenarios

Beyond simple point or surface contact, humanoid robots may experience complex contact scenarios that require advanced modeling.

### Rolling Contact

When a robot rolls over objects or uses wheels as part of its design, rolling contact mechanics apply. The rolling condition is:

v_contact = ω × r

Where v_contact is the velocity at the contact point, ω is the angular velocity, and r is the radius vector from the rotation center to the contact point.

### Soft Contact and Compliance

Real surfaces and robot feet are not perfectly rigid. Modeling compliance is important for accurate simulation and control:

F = K × Δx

Where K is the stiffness matrix and Δx is the deformation. For complex surfaces, K may be a function of position, velocity, and contact history.

## Energy Considerations

Efficient energy use is crucial for humanoid robots, especially those with limited power sources.

### Potential and Kinetic Energy

The total mechanical energy of a robot is:

E_total = T + V

Where T is kinetic energy and V is potential energy. During walking, energy is continuously exchanged between potential and kinetic forms.

### Energy Efficiency in Locomotion

Bipedal walking can be made more energy-efficient by:
- Minimizing unnecessary vertical CoM movement
- Exploiting pendulum-like dynamics during single support
- Using compliant elements to store and return energy
- Optimizing step timing and length

## Control Strategies for Dynamic Systems

Controlling dynamic systems like humanoid robots requires sophisticated approaches that account for the complex physics involved.

### Model-Based Control

Model-based controllers use mathematical models of the robot's dynamics to predict and control behavior:

τ = M(q)q̈ + C(q,q̇)q̇ + G(q)

Where τ is the joint torque, M(q) is the mass matrix, C(q,q̇) represents Coriolis and centrifugal forces, and G(q) represents gravitational forces.

### Feedback Linearization

This technique transforms the nonlinear robot dynamics into linear dynamics through feedback:

q̈ = M⁻¹(q)[τ - C(q,q̇)q̇ - G(q)]

This allows for linear control techniques to be applied to inherently nonlinear systems.

## Physics Simulation in Robotics

Modern humanoid robots often use physics simulation to plan and control their movements. These simulations model the physical interactions between the robot and its environment, allowing for predictive control and planning.

### Simulation Accuracy

The accuracy of physics simulations is crucial for effective robot control. Simulations must account for:
- Contact mechanics and friction
- Flexible body dynamics
- Sensor noise and uncertainty
- Environmental variability

### Model Predictive Control

Model predictive control (MPC) uses physics models to predict future robot states and optimize control actions. This approach allows robots to plan ahead and respond proactively to changing conditions.

## Challenges in Physical Interaction

Humanoid robots face several challenges when interacting with the physical world:

### Uncertainty in Environment

Real environments are uncertain and variable. Robots must handle variations in surface properties, object positions, and environmental conditions.

### Real-time Constraints

Physical interactions must be handled in real-time to maintain stability and safety. This requires efficient algorithms and sufficient computational resources.

### Safety Considerations

Robots must ensure safe interactions with humans and the environment, limiting forces and avoiding dangerous behaviors.

## Conclusion

Physics forms the foundation for all interactions between humanoid robots and the physical world. Understanding contact mechanics, friction, force concepts, and advanced dynamics is essential for creating robots that can move efficiently, maintain stability, and interact safely with their environment. As humanoid robotics continues to advance, the integration of accurate physics models with real-time control will become increasingly important for creating truly capable and robust systems. Advanced physics concepts are fundamental to creating capable humanoid robots that can move efficiently and interact safely with their environment, enabling engineers to design robots that can perform complex behaviors while maintaining stability and energy efficiency.