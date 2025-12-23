---
sidebar_position: 4
---

# Chapter 4 (Week 3): Sensor Integration and Data Processing

## Overview

Integrating various sensors into ROS 2 systems and building efficient data processing pipelines. This chapter explores how to handle sensor data effectively in robotic applications.

## Core Concepts

### Sensor Types
- LIDAR: Distance measurements
- Cameras: Visual information
- IMU: Orientation/motion
- Encoders: Joint feedback
- Force/Torque: Physical interaction
- GPS: Global positioning
- Sonar/Ultrasonic: Proximity detection

### Data Processing
- Async data handling
- Filtering/preprocessing
- Multi-sensor fusion
- Real-time processing
- Synchronization strategies
- Data validation and error handling
- Message filtering and transformation

### Sensor Fusion
- Combining multiple sensor modalities
- Uncertainty quantification
- Kalman filtering approaches
- Particle filtering methods
- Data association techniques
- Temporal synchronization
- Spatial calibration

## Essential Code Example

```python
import rclpy
from sensor_msgs.msg import LaserScan, Image, Imu
from cv_bridge import CvBridge
import numpy as np

class SensorProcessor:
    def __init__(self):
        self.bridge = CvBridge()
        # Subscribe to sensors
        self.lidar_sub = self.create_subscription(LaserScan, '/scan', self.lidar_cb, 10)
        self.cam_sub = self.create_subscription(Image, '/camera', self.cam_cb, 10)
        self.imu_sub = self.create_subscription(Imu, '/imu', self.imu_cb, 10)

    def lidar_cb(self, msg):
        # Process LIDAR data
        valid_ranges = [r for r in msg.ranges if r > 0 and r < float('inf')]
        if valid_ranges:
            min_dist = min(valid_ranges)
            print(f'Min distance: {min_dist:.2f}m')

            # Check for obstacles
            obstacles = [r for r in valid_ranges if r < 1.0]
            if obstacles:
                print(f'Obstacles detected: {len(obstacles)} readings < 1m')

    def cam_cb(self, msg):
        # Convert ROS image to OpenCV
        cv_image = self.bridge.imgmsg_to_cv2(msg, desired_encoding='bgr8')

        # Process image (example: edge detection)
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150)

        # Count edges (simplified object detection)
        edge_density = np.sum(edges > 0) / (edges.shape[0] * edges.shape[1])
        print(f'Edge density: {edge_density:.2f}')
```

## Key Takeaways

1. Multiple sensors enhance perception
2. Async processing for real-time systems
3. Filter invalid sensor data
4. Sensor fusion improves reliability
5. Proper synchronization is critical

---
