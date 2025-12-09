#!/bin/bash

# Quality check script for Physical AI & Humanoid Robotics Textbook
# Verifies word count, diagram count, and other requirements

echo "🔍 Starting quality check for Physical AI & Humanoid Robotics Textbook..."
echo

# Check word count
echo "📝 Checking word count..."
WORD_COUNT=$(find docs/docs/module-* -name "*.md" -exec cat {} \; | wc -w)
echo "Total word count: $WORD_COUNT"
if [ $WORD_COUNT -ge 15000 ] && [ $WORD_COUNT -le 20000 ]; then
    echo "✅ Word count is within required range (15,000–20,000)"
else
    echo "⚠️  Word count is outside required range (15,000–20,000): $WORD_COUNT"
fi
echo

# Check diagram count
echo "🖼️  Checking diagram count..."
DIAGRAM_COUNT=$(ls diagrams/*.md 2>/dev/null | wc -l)
echo "Total diagrams: $DIAGRAM_COUNT"
if [ $DIAGRAM_COUNT -ge 12 ]; then
    echo "✅ Diagram count meets requirement (≥12)"
else
    echo "⚠️  Diagram count is below requirement (≥12): $DIAGRAM_COUNT"
fi
echo

# Check week count
echo "📅 Checking week count..."
WEEK_COUNT=$(find docs/docs -name "week-[0-9]*-[a-z-]*.md" -not -name "*example*" | wc -l)
echo "Total weeks: $WEEK_COUNT"
if [ $WEEK_COUNT -ge 13 ] && [ $WEEK_COUNT -le 13 ]; then
    echo "✅ Week count is correct (13 weeks)"
else
    echo "⚠️  Week count is not correct (expected 13): $WEEK_COUNT"
fi
echo

# Check module count
echo "📚 Checking module count..."
MODULE_COUNT=$(find docs/docs -maxdepth 1 -name "module-*" -type d | wc -l)
echo "Total modules: $MODULE_COUNT"
if [ $MODULE_COUNT -eq 4 ]; then
    echo "✅ Module count is correct (4 modules)"
else
    echo "⚠️  Module count is not correct (expected 4): $MODULE_COUNT"
fi
echo

# Check example count
echo "💡 Checking example count..."
EXAMPLE_COUNT=$(find docs/docs/module-* -name "*example*" -type f | wc -l)
echo "Total examples: $EXAMPLE_COUNT"
if [ $EXAMPLE_COUNT -ge 20 ]; then
    echo "✅ Example count meets requirement (≥20)"
else
    echo "⚠️  Example count is below requirement (≥20): $EXAMPLE_COUNT"
fi
echo

# Check file structure
echo "📂 Checking file structure..."
if [ -d "docs/docs/module-1" ] && [ -d "docs/docs/module-2" ] && [ -d "docs/docs/module-3" ] && [ -d "docs/docs/module-4" ]; then
    echo "✅ All required module directories exist"
else
    echo "❌ Some required module directories are missing"
fi

if [ -f "templates/frontmatter.md" ] && [ -f "templates/page.md" ] && [ -f "templates/example.md" ]; then
    echo "✅ All required template files exist"
else
    echo "❌ Some required template files are missing"
fi
echo

# Check for intro and conclusion
echo "📖 Checking for intro and conclusion..."
if [ -f "docs/docs/intro.md" ] && [ -f "docs/docs/conclusion.md" ]; then
    echo "✅ Both intro and conclusion files exist"
else
    echo "❌ Missing intro or conclusion file"
fi
echo

# Check Docusaurus configuration
echo "⚙️  Checking Docusaurus configuration..."
if [ -f "docs/docusaurus.config.js" ]; then
    echo "✅ Docusaurus configuration exists"
else
    echo "❌ Docusaurus configuration missing"
fi

echo
echo "✅ Quality check completed!"
echo
echo "Summary:"
echo "- Total words: $WORD_COUNT (target: 15,000–20,000)"
echo "- Total diagrams: $DIAGRAM_COUNT (target: ≥12)"
echo "- Total weeks: $WEEK_COUNT (target: 13)"
echo "- Total modules: $MODULE_COUNT (target: 4)"
echo "- Total examples: $EXAMPLE_COUNT (target: ≥20)"