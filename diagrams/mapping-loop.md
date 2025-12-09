# Diagram #8: Mapping Loop

## Visual Description

```
┌─────────────────────────────────────────────────────────────────┐
│                        REAL WORLD                               │
│                                                                 │
│  ┌─────────┐    ┌──────────┐    ┌─────────────┐              │
│  │  Robot  │    │  Walls   │    │  Furniture  │              │
│  │         │    │          │    │             │              │
│  │  ┌─────┼────┼─┐        │    │             │              │
│  │  │Sen  │    │ │ │      │    │             │              │
│  │  │sors │    │ │ │      │    │             │              │
│  └──┴──┬──┘    └─┼─┘      │    │             │              │
│         │         │        │    │             │              │
└─────────┼─────────┼────────┼──────────────────┼─────────────────┘
          │         │        │                  │
          │         │        │                  │
          │         │        │                  │
    ┌─────▼─────────▼────────▼──────────────────▼─────────────┐
    │                 SENSING & DATA                          │
    │                ACQUISITION                              │
    │  Range sensors, Cameras, LiDAR, IMU, etc.              │
    └─────────────────┬───────────────────────────────────────┘
                      │
                      │
    ┌─────────────────▼───────────────────────────────────────┐
    │                   MAPPING                               │
    │              (Map Building Process)                     │
    │                                                         │
    │  ┌─────────────────────────────────────────────────┐  │
    │  │         OCCUPANCY GRID UPDATE                   │  │
    │  │                                                 │  │
    │  │  • Ray Casting to find hits and misses          │  │
    │  │  • Log-Odds Update for each cell                │  │
    │  │  • Probabilistic combination of measurements    │  │
    │  └─────────────────────────────────────────────────┘  │
    │                                                         │
    │  ┌─────────────────────────────────────────────────┐  │
    │  │        FEATURE EXTRACTION                       │  │
    │  │                                                 │  │
    │  │  • Corner detection                             │  │
    │  │  • Edge detection                               │  │
    │  │  • Landmark identification                      │  │
    │  └─────────────────────────────────────────────────┘  │
    │                                                         │
    │  ┌─────────────────────────────────────────────────┐  │
    │  │         LANDMARK MAPPING                        │  │
    │  │                                                 │  │
    │  │  • Associate observations with existing       │  │
    │  │  • Update landmark positions and uncertainty  │  │
    │  │  • Add new landmarks to map                     │  │
    │  └─────────────────────────────────────────────────┘  │
    └─────────────────┬───────────────────────────────────────┘
                      │
                      │
    ┌─────────────────▼───────────────────────────────────────┐
    │              LOCALIZATION & FUSION                      │
    │                                                         │
    │  ┌─────────────────────────────────────────────────┐  │
    │  │        POSE ESTIMATION                          │  │
    │  │                                                 │  │
    │  │  • Match sensor data to map                     │  │
    │  │  • Estimate robot position and orientation      │  │
    │  │  • Update pose with uncertainty                 │  │
    │  └─────────────────────────────────────────────────┘  │
    │                                                         │
    │  ┌─────────────────────────────────────────────────┐  │
    │  │       DATA ASSOCIATION                          │  │
    │  │                                                 │  │
    │  │  • Match features to known landmarks           │  │
    │  │  • Determine if feature is new or existing     │  │
    │  │  • Update correspondences                       │  │
    │  └─────────────────────────────────────────────────┘  │
    │                                                         │
    │  ┌─────────────────────────────────────────────────┐  │
    │  │       UNCERTAINTY MANAGEMENT                    │  │
    │  │                                                 │  │
    │  │  • Track uncertainty in robot pose             │  │
    │  │  • Maintain covariance of landmark positions    │  │
    │  │  • Propagate uncertainty through time steps     │  │
    │  └─────────────────────────────────────────────────┘  │
    └─────────────────┬───────────────────────────────────────┘
                      │
                      │
                      ▼
            ┌─────────────────┐
            │   MOTION        │
            │                 │
            │ Move to new     │
            │ location for    │
            │ better mapping  │
            └─────────────────┘
                      │
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                        MAP OUTPUT                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                  FINAL MAP                              │  │
│  │                                                         │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         OCCUPANCY GRID                          │  │  │
│  │  │  • Cell-based representation of environment     │  │  │
│  │  │  • Probability of occupancy for each cell       │  │  │
│  │  │  • Used for path planning and navigation        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                         │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         TOPOLOGICAL MAP                         │  │  │
│  │  │  • Graph of places and connections              │  │  │
│  │  │  • Suitable for high-level planning             │  │  │
│  │  │  • Compact representation of large spaces       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                         │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │        METRIC MAP                               │  │  │
│  │  │  • Geometrically accurate representation        │  │  │
│  │  │  • Preserves distances and spatial relationships│  │  │
│  │  │  • Used for precise navigation tasks            │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
`

## Detailed Mapping Loop Stages

### 1. Sensing & Data Acquisition
- **Range Sensors**: LiDAR, depth cameras, ultrasonic sensors providing distance measurements
- **Visual Sensors**: Cameras providing appearance and texture information
- **Inertial Sensors**: IMUs providing motion and orientation data
- **Other Sensors**: GPS, wheel encoders, etc. providing additional context

### 2. Mapping Process
- **Occupancy Grid Update**: Updating probability values in grid cells based on sensor readings
- **Feature Extraction**: Identifying distinctive features like corners, edges, or surfaces
- **Landmark Mapping**: Associating features with persistent landmarks in the environment

### 3. Localization & Fusion
- **Pose Estimation**: Determining the robot's position within the map
- **Data Association**: Matching sensor observations to known landmarks or map features
- **Uncertainty Management**: Tracking and propagating uncertainty in both robot pose and map features

### 4. Motion Planning
- **Exploration Planning**: Deciding where to move next to improve map quality
- **Path Planning**: Finding safe routes to exploration targets
- **Coverage Planning**: Ensuring systematic mapping of the environment

## Key Concepts Illustrated

### Iterative Refinement
The mapping loop operates continuously, with each cycle refining both the map and the robot's understanding of its position within the map.

### Closed-Loop Operation
The process is closed-loop: mapping results influence localization, which influences where the robot moves, which influences what data is sensed, which updates the map.

### Uncertainty Integration
Both map uncertainty and pose uncertainty are explicitly managed and updated throughout the process.

### Multi-Representation Output
The final map may exist in multiple forms (occupancy grid, topological, metric) depending on the intended use.

## Applications in Physical AI

This mapping loop is fundamental to Physical AI as it enables robots to:
- Navigate safely in unknown environments
- Plan and execute complex spatial tasks
- Remember and reuse environmental knowledge
- Interact appropriately with objects and structures in their environment
- Maintain spatial awareness over time and across sessions