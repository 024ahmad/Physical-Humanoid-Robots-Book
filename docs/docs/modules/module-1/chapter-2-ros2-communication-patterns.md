---
sidebar_position: 2
---

# Chapter 2 (Week 1): ROS 2 Communication Patterns

## Overview

ROS 2 communication patterns enable nodes to interact through topics, services, and actions. This chapter explores the fundamental communication mechanisms that form the backbone of robot software architecture.

Communication in ROS 2 is based on the Data Distribution Service (DDS) middleware, which provides a standardized way for nodes to exchange data. The three main communication patterns - topics, services, and actions - serve different purposes and are used depending on the specific requirements of the robot application.

Topics provide asynchronous, many-to-many communication suitable for continuous data streams like sensor readings. Services offer synchronous request-response communication ideal for discrete operations. Actions provide goal-oriented communication with feedback for long-running tasks.

Understanding these communication patterns is crucial for designing efficient and maintainable robot systems. Each pattern has its own advantages and trade-offs that must be considered when architecting a robotic application.

## Core Concepts

### Topics
- Async pub/sub communication
- Many-to-many messaging
- Decoupled in time/space
- Ideal for continuous data streams
- Quality of Service (QoS) settings for reliability
- Message buffering and history policies
- Reliable and best-effort delivery options
- Durability for late-joining subscribers

### Services
- Sync request/response
- One-time operations
- Blocking communication
- Request/Response message types
- Useful for operations requiring immediate results
- Error handling and response validation
- Timeout mechanisms for fault tolerance
- Synchronous execution model

### Actions
- Goal-feedback-result pattern
- For long-running operations
- Cancellable tasks
- Progress monitoring
- Asynchronous with feedback
- Preemption capability
- Goal status reporting
- Result delivery mechanisms

### Quality of Service (QoS)
- Reliability: Reliable vs. best-effort delivery
- Durability: Volatile vs. transient local durability
- History: Keep last vs. keep all policies
- Lifespan: Duration for message retention
- Deadline: Time bounds for message delivery
- Liveliness: Participant availability monitoring
- Ownership: Exclusive vs. shared ownership
- Deadline: Time bounds for data freshness

## Essential Code Example

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from std_srvs.srv import SetBool
from example_interfaces.action import Fibonacci
from rclpy.qos import QoSProfile, ReliabilityPolicy, DurabilityPolicy

class CommunicationPatternsNode(Node):
    def __init__(self):
        super().__init__('communication_patterns_node')

        # Publisher with custom QoS
        qos_profile = QoSProfile(
            depth=10,
            reliability=ReliabilityPolicy.RELIABLE,
            durability=DurabilityPolicy.VOLATILE
        )
        self.publisher = self.create_publisher(String, 'topic', qos_profile)

        # Subscription with callback
        self.subscription = self.create_subscription(
            String, 'topic', self.topic_callback, qos_profile)

        # Service server
        self.service = self.create_service(
            SetBool, 'service', self.service_callback)

        # Service client
        self.client = self.create_client(SetBool, 'service')
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service not available, waiting...')

        # Timer for periodic publishing
        self.timer = self.create_timer(0.5, self.timer_callback)
        self.i = 0

    def topic_callback(self, msg):
        self.get_logger().info(f'Received topic: {msg.data}')

    def service_callback(self, request, response):
        self.get_logger().info(f'Received service request: {request.data}')
        response.success = True
        response.message = f'Service processed: {request.data}'
        return response

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher.publish(msg)
        self.get_logger().info(f'Published: {msg.data}')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    node = CommunicationPatternsNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Key Takeaways

1. Topics for continuous data streams
2. Services for discrete operations
3. Use appropriate pattern for use case
4. Consider QoS settings for reliability
5. Proper error handling is essential
6. Actions for goal-oriented long-running tasks
7. Communication patterns affect system performance
8. Choose patterns based on timing requirements

---