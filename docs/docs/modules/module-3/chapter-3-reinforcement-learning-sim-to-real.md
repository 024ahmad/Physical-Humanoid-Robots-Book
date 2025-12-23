---
sidebar_position: 3
---

# Chapter 3 (Week 10): Reinforcement Learning and Sim-to-Real Transfer

## Overview

Reinforcement Learning enables robots to learn complex tasks through environment interaction with sim-to-real transfer. This chapter explores the fundamentals of RL for robotics and techniques for transferring learned behaviors from simulation to reality.

## Core Concepts

### RL in Robotics
- State space: Sensor readings and environment
- Action space: Motor commands or high-level actions
- Reward function: Feedback for learning
- Policy: State-to-action mapping
- Value functions: State quality assessment
- Exploration vs. exploitation: Learning trade-offs
- Temporal credit assignment: Long-term consequence evaluation

### Transfer Challenges
- Visual differences: Lighting, textures
- Dynamics mismatch: Friction, mass
- Sensor noise: Simulation imperfections
- Actuator differences: Delays, limitations
- Environmental variations: Surface properties
- Hardware limitations: Physical constraints
- Time scaling: Simulation vs. real-time

### Domain Randomization
- Visual domain randomization
- Dynamics randomization
- Sensor noise injection
- Environmental variation
- System identification
- Parameter estimation
- Robustness evaluation

### RL Algorithms
- Deep Q-Networks (DQN): Discrete action spaces
- Actor-Critic methods: Continuous control
- Proximal Policy Optimization (PPO): Stable learning
- Trust Region Policy Optimization (TRPO): Constrained updates
- Soft Actor-Critic (SAC): Maximum entropy learning
- Twin Delayed DDPG (TD3): Deterministic policy gradients
- Asynchronous methods: Parallel exploration

## Essential Code Example

```python
import torch
import torch.nn as nn
import numpy as np

class SimpleActorCritic(nn.Module):
    def __init__(self, state_dim, action_dim, hidden_dim=256):
        super().__init__()

        # Actor network (policy)
        self.actor = nn.Sequential(
            nn.Linear(state_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, action_dim),
            nn.Tanh()  # Actions between -1 and 1
        )

        # Critic network (value function)
        self.critic = nn.Sequential(
            nn.Linear(state_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, 1)
        )

    def forward(self, state):
        action = self.actor(state)
        value = self.critic(state)
        return action, value

    def get_action(self, state):
        action, value = self.forward(state)
        return action.detach().cpu().numpy(), value.detach().cpu().numpy()

class PPOTrainer:
    def __init__(self, policy, learning_rate=3e-4):
        self.policy = policy
        self.optimizer = torch.optim.Adam(policy.parameters(), lr=learning_rate)
        self.eps_clip = 0.2

    def update(self, states, actions, rewards, old_log_probs, advantages):
        # Convert to tensors
        states = torch.FloatTensor(states)
        actions = torch.FloatTensor(actions)
        advantages = torch.FloatTensor(advantages)
        old_log_probs = torch.FloatTensor(old_log_probs)

        # Get new policy outputs
        new_actions, new_values = self.policy(states)

        # Calculate new log probabilities
        new_log_probs = torch.log(torch.clamp(new_actions, 1e-5, 1 - 1e-5))

        # Calculate ratio
        ratio = torch.exp(new_log_probs - old_log_probs.detach())

        # Calculate surrogate objectives
        surr1 = ratio * advantages
        surr2 = torch.clamp(ratio, 1 - self.eps_clip, 1 + self.eps_clip) * advantages

        # PPO loss
        actor_loss = -torch.min(surr1, surr2).mean()
        critic_loss = nn.MSELoss()(new_values.squeeze(), rewards)

        # Total loss
        loss = actor_loss + 0.5 * critic_loss

        # Update policy
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()
```

## Key Takeaways

1. RL enables learning through interaction
2. Sim-to-real transfer requires domain randomization
3. System identification matches simulation to reality
4. PPO provides stable learning performance
5. Exploration strategies are essential for learning

---
