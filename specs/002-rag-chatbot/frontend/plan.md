# 🛠️ Frontend Integration Plan

## 🔹 Plan Objective
- Inject chatbot UI using OpenAI ChatKit SDK into existing Docusaurus book
- Enable text-selection based interactions
- Seamless integration with backend RAG APIs

---

## 🔹 Project Structure
```
Root/
├─ docs/          ← Existing Docusaurus Book (unchanged)
├─ backend/       ← RAG Engine (complete)
└─ frontend/      ← Chatbot UI & integration ONLY
```

---

## 🔹 Frontend Folder Structure
```
frontend/
├─ components/
│   ├─ ChatbotWidget.jsx          ← ChatKit integration
│   ├─ SelectedTextHandler.jsx    ← Text selection logic
│   ├─ ContextMenu.jsx            ← Selection menu
│   └─ index.js                   ← Exports
├─ utils/
│   ├─ apiClient.js               ← Backend API calls
│   └─ config.js                  ← Environment config
├─ styles/
│   ├─ chatbot.css
│   └─ context-menu.css
├─ package.json
├─ vite.config.js
├─ .env.local.example
├─ .gitignore
└─ README.md
```

---

## 🔹 Dependency Management

### **CRITICAL RULE**: Install Dependencies BEFORE Creating Filet

---

## 🔹 Build Configuration

### **vite.config.js**:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './components/index.js',
      name: 'PhysicalAIChatbot',
      fileName: (format) => `chatbot.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' }
      }
    }
  }
});
```

**Purpose**: Build as library, externalize React (Docusaurus has it)

---

## 🔹 Environment Configuration
```env
# .env.local
VITE_BACKEND_URL=http://localhost:8000
VITE_ENABLE_TRANSLATION=true
```

**Security**: No API keys in frontend

---

## 🔹 Quality Rules
- ❌ NO RAG logic in frontend
- ✅ Follow backend API contracts strictly
- ✅ Graceful error handling
- ✅ Loading states for async ops
- ✅ Install dependencies BEFORE file creation

---

## 🔹 Testing Strategy

### **Unit Tests**:
- Test `apiClient` functions
- Test component rendering
- Test error handling

### **Integration Tests**:
- ChatKit + Backend
- Text selection flow
- Docusaurus embedding

### **Manual Checklist**:
- [ ] Dependencies installed
- [ ] No import errors
- [ ] Build succeeds
- [ ] Chatbot renders
- [ ] API calls work
- [ ] Selected text works
- [ ] Errors display correctly

---

## 🔹 Troubleshooting

| Issue | Cause | Fix |
|-------|-------alled | `npm install -D vite @vitejs/plugin-react` |

---

## 🔹 Final Output
✅ ChatKit-powered chatbot UI
✅ Docusaurus integration
✅ Selected text interaction
✅ Translation feature
✅ Zero backend logic in frontend
✅ All dependencies installed
✅ Production-ready code