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
  textbookSidebar: [
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
      label: '🤖 Module 1: The Robotic Nervous System (ROS 2)',
      collapsed: false,
      items: [
        'modules/module-1/summary',
        'modules/module-1/chapter-1-introduction-to-physical-ai',
        'modules/module-1/chapter-2-ros2-communication-patterns',
        'modules/module-1/chapter-3-actions-urdf-and-launch-files',
        'modules/module-1/chapter-4-sensor-integration-and-data-processing',
        'modules/module-1/chapter-5-state-estimation-and-localization',
        'modules/module-1/chapter-6-motion-planning-and-control',
      ],
    },
    {
      type: 'category',
      label: '🧠 Module 2: The Digital Twin (Gazebo & Unity)',
      collapsed: false,
      items: [
        'modules/module-2/summary',
        'modules/module-2/chapter-1-gazebo-simulation-fundamentals',
        'modules/module-2/chapter-2-sensor-modeling-and-integration',
        'modules/module-2/chapter-3-unity-integration-and-advanced-simulation',
      ],
    },
    {
      type: 'category',
      label: '👁️ Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
      collapsed: false,
      items: [
        'modules/module-3/summary',
        'modules/module-3/chapter-1-nvidia-isaac-sdk-fundamentals',
        'modules/module-3/chapter-2-ai-perception-and-deep-learning',
        'modules/module-3/chapter-3-reinforcement-learning-sim-to-real',
      ],
    },
    {
      type: 'category',
      label: '⚙️ Module 4: Vision-Language-Action (VLA)',
      collapsed: false,
      items: [
        'modules/module-4/summary',
        'modules/module-4/chapter-1-humanoid-kinematics-and-locomotion',
        'modules/module-4/chapter-2-conversational-ai-and-voice-commands',
        'modules/module-4/chapter-3-vision-language-action-systems',
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
