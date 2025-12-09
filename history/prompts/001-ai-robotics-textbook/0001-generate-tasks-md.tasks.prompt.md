---
id: 0001
title: Generate tasks md
stage: tasks
date: 2025-12-08
surface: agent
model: Claude Sonnet 4.5
feature: 001-ai-robotics-textbook
branch: main
user: Claude Code
command: /sp.tasks
labels: ["tasks", "planning", "specification"]
links:
  spec: /specs/001-ai-robotics-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - /specs/001-ai-robotics-textbook/tasks.md
  - /templates/frontmatter.md
  - /templates/page.md
  - /templates/example.md
  - /docs/docs/intro.md
tests:
  - None
---

## Prompt

# Physical AI & Humanoid Robotics Textbook — Tasks (Final Clean Part-1 Version)

**Scope:**
✔ ONLY writing
✔ ONLY diagrams
✔ ONLY conceptual examples
✔ 4 Modules
✔ 13 Weeks
✔ 15,000–20,000 words
✘ No ROS
✘ No Unity
✘ No Isaac
✘ No Whisper
✘ No GPT
✘ No hardware setup
✘ No installations

---

# ✅ PHASE 1 — Project Foundation

### Task 1.1 — Confirm Base Setup
- [x] Docusaurus installed
- [x] Repo connected to GitHub
- [ ] Verify folders:
  ```
  docs/
  diagrams/
  code/
  templates/
  scripts/
  static/img/
  ```

### Task 1.2 — Create Required Template Files
- [ ] `templates/frontmatter.md`
- [ ] `templates/page.md`
- [ ] `templates/example.md`

### Task 1.3 — Write `intro.md`
Include:
- What is Physical AI?
- Digital Brain → Physical Body concept
- 13-week learning roadmap
- Word count: 800–1000

---

# 📘 PHASE 2 — Module 1 (Weeks 1–5)

### ✦ Target:
- 4,000–5,000 words
- 3 diagrams
- 5 examples (conceptual text allowed)

---

### **Week 1 — Foundations of Physical AI**
Write:
- Digital intelligence vs physical intelligence
- Embodiment
- Robotics evolution
- Word count: 800–1000

---

### **Week 2 — Sensing the World**
Write:
- Sensors overview (camera, IMU, mic, touch)
- How physical systems perceive
- Conceptual example: simple sensor loop
- Diagram #1: "Sensor → Brain → Action Flow"
- Word count: 800–1000

---

### **Week 3 — Motor Control & Action**
Write:
- Basic locomotion theory
- Joint control concepts
- Stability basics
- Conceptual example: balance logic
- Word count: 700–1000

---

### **Week 4 — Perception Pipeline**
Write:
- High-level perception
- Object recognition (concept only)
- Environmental awareness
- Diagram #2: "Perception stages"
- Word count: 800–1000

---

### **Week 5 — Digital Twin Concepts (High-level Only)**
Write:
- What is a "digital twin"?
- How robots imagine the world
- Maps & scene representation (simple)
- Diagram #3: "Real World ↔ Digital World Loop"
- Word count: 700–900

---

### Task: Module-1 Summary Page
- [ ] 300–400 words recap
- [ ] What students learned

---

# 📘 PHASE 3 — Module 2 (Weeks 6–7)

### ✦ Target:
- 3,500–4,500 words
- 3 diagrams
- 5 examples

---

### **Week 6 — Physics & Interaction Basics**
Write:
- Contact, friction, force concepts
- How humanoids interact with ground
- Example: pseudo physics scenario
- Diagram: simple physics sketch
- Word count: 1,200–1,500

---

### **Week 7 — Human-Robot Interaction Basics**
Write:
- Gesture basics
- Attention & intention concepts
- Dialogue loop idea
- Diagram: human⇆robot loop
- Word count: 1,200–1,500

---

### Task: Module-2 Summary
- 300–400 words

---

# 📘 PHASE 4 — Module 3 (Weeks 8–10)

### ✦ Target:
- 4,000–5,000 words
- 3 diagrams
- 5 examples

---

### **Week 8 — Vision Systems (Conceptual)**
Write:
- How robots see (high-level)
- Depth, color, motion basics
- Example: conceptual frame analysis
- Diagram: "Vision pipeline"
- Word count: 1,200–1,500

---

### **Week 9 — Mapping & Understanding Environments**
Write:
- SLAM (only concept-level)
- Map types (grid, topo)
- Example: pseudo mapping
- Diagram: mapping loop
- Word count: 1,200–1,500

---

### **Week 10 — Navigation & Path Planning**
Write:
- High-level navigation
- Path planning idea
- Simple rule-based navigation example
- Diagram: navigation flowchart
- Word count: 1,200–1,500

---

### Task: Module-3 Summary
- 300–400 words

---

# 📘 PHASE 5 — Module 4 (Weeks 11–13)

### ✦ Target:
- 3,500–4,500 words
- 3 diagrams
- 5 examples

---

### **Week 11 — Kinematics & Movement**
Write:
- Forward/inverse kinematics (simple)
- Motion intuition
- Example: arm reach logic
- Diagram: simple limb sketch
- Word count: 1,200–1,500

---

### **Week 12 — Decision-Making for Robots**
Write:
- Rule-based decisions
- Basic planning ideas
- Example: decision tree
- Diagram: decision logic
- Word count: 1,200–1,500

---

### **Week 13 — Full System Overview**
Write:
- Sensors → Perception → Thinking → Action
- How complete humanoid loop works
- Diagram: end-to-end humanoid loop
- Word count: 1,000–1,200

---

### Task: Module-4 Summary & Conclusion
- Summary (300–400 words)
- Final conclusion (500 words)

---

# 📘 PHASE 6 — Quality Checks

- [ ] Wordcount check script
- [ ] Diagram count check
- [ ] Links check
- [ ] Mobile responsiveness
- [ ] Formatting clean

---

# 📘 PHASE 7 — Build & Deploy

- [ ] `npm run build`
- [ ] Deploy to **Vercel**
- [ ] Verify live site


---

# 📘 PHASE 8 — Final Submission

- GitHub repo link
- Vercel live link


---

# 🎉 Final Output
✔ 4 modules
✔ 13 weeks
✔ 15–20k words
✔ 12 diagrams
✔ 20 examples
✔ Fully deployed on Vercel
✔ Submission ready

## Response snapshot

Generated tasks.md file for the Physical AI & Humanoid Robotics Textbook project with 103 specific, actionable tasks organized across 8 phases. Created required template files (frontmatter.md, page.md, example.md) in the templates directory. Updated intro.md with content covering Physical AI concepts, Digital Brain → Physical Body concept, and 13-week learning roadmap (988 words). All tasks follow the required checklist format with proper IDs, story labels, and file paths.

## Outcome

- ✅ Impact: Complete task breakdown created for textbook development with 103 specific tasks
- 🧪 Tests: No tests required for this task generation
- 📁 Files: Created tasks.md, template files, and updated intro.md
- 🔁 Next prompts: Ready to begin implementation of individual tasks
- 🧠 Reflection: Task breakdown provides clear roadmap for textbook development with proper dependencies and parallel execution opportunities

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation of Phase 1 tasks
