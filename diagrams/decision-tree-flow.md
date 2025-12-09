# Humanoid Robot Decision Tree Diagram

This diagram illustrates the decision-making process for a humanoid robot when encountering an obstacle during navigation.

## Diagram Description

```
Start: Robot moving toward goal
    ↓
Is path clear?
    ├── Yes → Continue to goal
    └── No → Obstacle detected
              ↓
        Is obstacle static?
            ├── Yes → Plan path around obstacle
            └── No → Dynamic obstacle detected
                      ↓
                Is obstacle moving toward robot?
                    ├── Yes → Wait or find alternative path
                    └── No → Wait for obstacle to pass
                              ↓
                        Reassess path to goal
```

## Implementation Logic

The decision tree represents a hierarchical approach to obstacle handling that considers:
- Path conditions (clear vs obstructed)
- Obstacle characteristics (static vs dynamic)
- Motion prediction (moving toward robot vs other direction)
- Appropriate responses for each scenario

This approach allows the robot to make contextually appropriate decisions based on environmental conditions rather than following a fixed response pattern.