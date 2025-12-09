---
id: 6
title: "Create Custom Footer Component"
stage: "green"
date: "2025-12-09"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "001-ai-robotics-textbook"
branch: "001-ai-robotics-textbook"
user: "user"
command: "create-custom-footer"
labels: ["footer", "ui", "ux", "react", "docusaurus"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "docs/src/theme/Footer/index.js"
  - "docs/src/theme/Footer/styles.module.css"
tests: []
outcome: "Successfully created a custom footer component with dark theme, creator information, social icons, and responsive design"
evaluation: "Footer meets all requirements with proper styling, hover effects, and responsive behavior"
---

# Create Custom Footer Component

## User Prompt
Create a fully custom footer for my Docusaurus project.

Requirements:
1. Place it in `src/theme/Footer/index.js` so it overrides the default Docusaurus footer.
2. The design should match this description (based on my screenshot):
   - A dark background (#000 or very dark gray).
   - "Crafted by Muhammad Sharoz" in bold white text on the left.
   - A subline below it in lighter gray text: "Building the future of humanoid robotics, one algorithm at a time."
   - On the right side, add two rounded icon buttons:
       • LinkedIn icon → opens my LinkedIn profile: `https://www.linkedin.com/in/muhammad-sharoz-219353295/`
       • GitHub icon → opens my GitHub profile: `https://github.com/024ahmad`
   - Icons should be white, slightly increase brightness on hover.
3. Below this, centered at the bottom, add:
   - Small copyright line: `© 2025 Humanoid Robotics Textbook. All rights reserved.`
   - Use subtle gray color and smaller font-size.
4. The layout should be fully responsive:
   - On desktop: text on the left, icons on the right.
   - On mobile: stack vertically with centered alignment.
5. Use modern Docusaurus and React best practices.
6. Use minimal CSS (Tailwind or plain CSS module), keeping the style elegant and similar to the screenshot layout.

## Response
Successfully created a custom footer component with the following features:

1. **Dark theme footer** with #000 background color
2. **Creator information** on the left:
   - "Crafted by Muhammad Sharoz" in bold white text
   - Subline: "Building the future of humanoid robotics, one algorithm at a time." in lighter gray
3. **Social icons on the right**:
   - LinkedIn icon linking to the specified profile
   - GitHub icon linking to the specified profile
   - Rounded buttons with hover effects that increase brightness
4. **Copyright notice** centered at the bottom
5. **Fully responsive design**:
   - Desktop: text on left, icons on right
   - Mobile: stacked vertically with centered alignment
6. **Modern React/Docusaurus practices**:
   - Used CSS modules for styling
   - Proper accessibility attributes
   - Responsive breakpoints
   - Smooth hover transitions