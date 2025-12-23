---
sidebar_position: 5
---

# Chapter 5 (Week 4): State Estimation and Localization

## Overview

Techniques for estimating robot pose and determining position in known/unknown environments. This chapter covers the fundamental methods for robot localization and state estimation.

## Core Concepts

### State Estimation
- Position, orientation, velocity
- Sensor fusion for accuracy
- Kalman/Particle filters
- Covariance tracking
- Uncertainty quantification
- Process and measurement models
- State vector representation

### Localization Methods
- Absolute: GPS, beacons
- Relative: Odometry, IMU
- Map-based: SLAM, visual odometry
- Landmark-based: Known feature matching
- Monte Carlo: Particle filter approaches
- Extended Kalman: Non-linear state estimation
- Multi-hypothesis: Multiple possible locations

### Kalman Filter Variants
- Extended Kalman Filter (EKF)
- Unscented Kalman Filter (UKF)
- Information Filter
- Particle Filter
- Complementary Filter
- Moving Horizon Estimation

## Essential Code Example

```python
import numpy as np

class SimpleEKF:
    def __init__(self):
        self.state = np.zeros(6)  # [x, y, θ, vx, vy, ω]
        self.covariance = np.eye(6) * 0.1

    def predict(self, dt):
        # State transition
        F = np.eye(6)
        F[0, 3] = dt  # x = x + vx*dt
        F[1, 4] = dt  # y = y + vy*dt
        self.state = F @ self.state
        Q = np.eye(6) * 0.1
        self.covariance = F @ self.covariance @ F.T + Q

    def update(self, measurement, H, R):
        # Measurement update
        y = measurement - H @ self.state  # Innovation
        S = H @ self.covariance @ H.T + R  # Innovation covariance
        K = self.covariance @ H.T @ np.linalg.inv(S)  # Kalman gain
        self.state = self.state + K @ y
        self.covariance = (np.eye(len(self.state)) - K @ H) @ self.covariance

    def get_state(self):
        return self.state.copy()

    def get_covariance(self):
        return self.covariance.copy()
```

## Key Takeaways

1. State estimation combines sensor data
2. Kalman filters for linear systems
3. Particle filters for non-linear systems
4. Uncertainty quantification is essential
5. Sensor fusion improves accuracy

---

