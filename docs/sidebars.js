// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Manual sidebar configuration for Physical AI & Humanoid Robotics Textbook
  tutorialSidebar: [
    {
      type: 'category',
      label: '📘 Introduction',
      collapsed: false,
      items: [
        'intro',
      ],
    },
    {
      type: 'category',
      label: '🤖 Module 1: ROS 2 Concepts',
      collapsed: false,
      items: [
        'module-1/summary',
        'module-1/week-1-foundations-of-physical-ai',
        'module-1/week-1-example-sensor-simulation',
        'module-1/week-2-sensing-the-world',
        'module-1/week-2-example-sensor-loop',
        'module-1/week-2-example-perception-processing',
        'module-1/week-3-motor-control-and-action',
        'module-1/week-3-example-balance-logic',
        'module-1/week-3-example-stability-control',
        'module-1/week-4-perception-pipeline',
        'module-1/week-4-example-perception-simulation',
        'module-1/week-5-digital-twin-concepts',
        'module-1/week-5-example-digital-twin-simulation',
      ],
    },
    {
      type: 'category',
      label: '🧠 Module 2: Digital Twin Concepts',
      collapsed: false,
      items: [
        'module-2/summary',
        'module-2/week-6-physics-interaction-basics',
        'module-2/week-6-example-physics-scenario',
        'module-2/week-6-example-force-control',
        'module-2/week-7-human-robot-interaction-basics',
        'module-2/week-7-example-gesture-recognition',
        'module-2/week-7-example-attention-modeling',
        'module-2/week-7-example-dialogue-management',
      ],
    },
    {
      type: 'category',
      label: '👁️ Module 3: NVIDIA Isaac Concepts',
      collapsed: false,
      items: [
        'module-3/summary',
        'module-3/week-8-vision-systems-conceptual',
        'module-3/week-8-example-depth-perception',
        'module-3/week-8-example-frame-analysis',
        'module-3/week-9-mapping-understanding-environments',
        'module-3/week-9-example-slam-implementation',
        'module-3/week-9-example-pseudo-mapping',
        'module-3/week-10-navigation-path-planning',
        'module-3/week-10-example-navigation-system',
        'module-3/week-10-example-rule-based-navigation',
      ],
    },
    {
      type: 'category',
      label: '⚙️ Module 4: Vision-Language-Action Systems',
      collapsed: false,
      items: [
        'module-4/summary',
        'module-4/week-11-kinematics-movement',
        'module-4/week-11-example-kinematics-solver',
        'module-4/week-12-decision-making',
        'module-4/week-12-example-planning-algorithm',
        'module-4/week-13-full-system-overview',
      ],
    },
    {
      type: 'category',
      label: '📘 Conclusion: Course Wrap-up and Future Directions',
      collapsed: false,
      items: [
        'conclusion',
      ],
    },
  ],
};

export default sidebars;
