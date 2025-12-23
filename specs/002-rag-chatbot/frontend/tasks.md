# ✅ Frontend Tasks
## RAG Chatbot UI – ChatKit Integration with Docusaurus

---

## **Phase 1: Pre-Flight Checks**
- [x] **T001** Verify Docusaurus book exists in `/docs`
- [x] **T002** Confirm backend running at `http://localhost:8000`
- [x] **T003** Test backend `/chat` endpoint
- [x] **T004** Test backend `/chat/selected-text` endpoint
- [x] **T005** Confirm frontend scope: UI + integration only

---

## **Phase 2: Frontend Setup & Dependencies**

- [x] **T006** Create `frontend/` folder at root
- [x] **T007** Initialize project: `npm init -y`
- [x] **T008** Install ALL dependencies:
  ```bash
  npm install react react-dom @openai/chatkit axios
  npm install -D vite @vitejs/plugin-react
  ```
- [x] **T009** Create `vite.config.js`:
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
        output: { globals: { react: 'React', 'react-dom': 'ReactDOM' } }
      }
    }
  });
  ```
- [x] **T011** Create folders: `components/`, `utils/`, `styles/`
- [x] **T012** Create `.gitignore`: `node_modules/`, `.env.local`, `dist/`
- [x] **T013** Create `.env.local.example`:
  ```
  VITE_BACKEND_URL=http://localhost:8000
  VITE_ENABLE_TRANSLATION=true
  ```
- [x] **T014** Create `.env.local` from example
- [x] **T015** Verify installation: `npm list @openai/chatkit axios`

---

## **Phase 3: Backend API Integration**

- [x] **T016** Create `utils/config.js`:
  ```javascript
  export const config = {
    backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
    enableTranslation: import.meta.env.VITE_ENABLE_TRANSLATION === 'true'
  };
  ```
- [x] **T017** Create `utils/apiClient.js` with:
  - `sendMessage(message)` → calls `POST /chat`
  - `sendSelectedText(text, question)` → calls `POST /chat/selected-text`
  - `translateText(text)` → calls `POST /translate`
  - Error handling with axios
- [x] **T018** Test API client functions

---

## **Phase 4: ChatKit Integration**

- [x] **T019** Create `components/ChatbotWidget.jsx`:
  - Import ChatKit from `@openai/chatkit`
  - Use `chatAPI.sendMessage()` for backend calls
  - Handle loading and error states
  - Manage message history
- [x] **T020** Create `styles/chatbot.css` for styling
- [x] **T021** Test ChatbotWidget rendering
- [x] **T022** Test message sending to backend
- [x] **T023** Test error handling

---

## **Phase 5: Selected Text Handler**

- [x] **T024** Create `components/ContextMenu.jsx`:
  - Show menu at selection position
  - Buttons: "Ask about this", "Translate", "Close"
- [x] **T025** Create `components/SelectedTextHandler.jsx`:
  - Detect text selection (mouseup/touchend events)
  - Show ContextMenu on selection
  - Handle "Ask question" → call `sendSelectedText()`
  - Handle "Translate" → call `translateText()`
  - Display response in modal
- [x] **T026** Create `styles/context-menu.css`
- [x] **T027** Test text selection detection
- [x] **T028** Test context menu positioning
- [x] **T029** Test selected text API calls

---

## **Phase 6: Export Components**

- [x] **T030** Create `components/index.js`:
  ```javascript
  export { ChatbotWidget } from './ChatbotWidget.jsx';
  export { SelectedTextHandler } from './SelectedTextHandler.jsx';
  export { ContextMenu } from './ContextMenu.jsx';
  ```
- [x] **T031** Update `package.json` scripts:
  ```json
  {
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    }
  }
  ```
- [x] **T032** Build library: `npm run build`
- [x] **T033** Verify `dist/` folder created

---

## **Phase 7: Docusaurus Integration**

- [x] **T034** Navigate to `/docs` (Docusaurus root)
- [x] **T035** Link frontend: `npm install ../frontend`
- [x] **T036** Create `docs/src/components/ChatbotWrapper.jsx`:
  ```jsx
  import React from 'react';
  import { ChatbotWidget, SelectedTextHandler } from 'frontend';
  import 'frontend/dist/style.css';

  export default function ChatbotWrapper() {
    return (
      <>
        <ChatbotWidget />
        <SelectedTextHandler />
      </>
    );
  }
  ```
- [x] **T037** Swizzle Docusaurus Layout:
  ```bash
  npm run swizzle @docusaurus/theme-classic Layout -- --wrap
  ```
- [x] **T038** Import ChatbotWrapper in Layout:
  ```jsx
  import Layout from '@theme-original/Layout';
  import ChatbotWrapper from '@site/src/components/ChatbotWrapper';

  export default function LayoutWrapper(props) {
    return (
      <>
        <Layout {...props} />
        <ChatbotWrapper />
      </>
    );
  }
  ```
- [x] **T039** Test chatbot on Docusaurus pages
- [x] **T040** Test on all routes
- [x] **T041** Test mobile responsiveness

---

## **Phase 8: Testing & Validation**

- [x] **T042** Test normal chat questions
- [x] **T043** Test selected-text questions
- [x] **T044** Test translation feature
- [x] **T045** Verify no RAG logic in frontend
- [x] **T046** Test error scenarios (backend down, timeout)
- [x] **T047** Test loading states
- [x] **T048** Cross-browser testing (Chrome, Firefox, Safari)
- [x] **T049** Mobile testing

---

## **Phase 9: Documentation**

- [x] **T050** Create `frontend/README.md`:
  - Setup instructions
  - Environment variables
  - Build commands
  - Integration steps
- [x] **T051** Add code comments
- [x] **T052** Create troubleshooting guide

---

## **Phase 10: Final Checklist**

- [x] **T053** All dependencies installed ✓
- [x] **T054** ChatKit UI working ✓
- [x] **T055** Backend integration working ✓
- [x] **T056** Selected text feature working ✓
- [x] **T057** Translation working ✓
- [x] **T058** Docusaurus integration complete ✓
- [x] **T059** No backend logic in frontend ✓
- [x] **T060** Documentation complete ✓

---

## **Critical Notes**

### Dependency Installation Order:
1. Run `npm install` (T008) BEFORE creating component files
2. Verify with `npm list` (T015) before proceeding

### File Creation Order:
1. Config files first (`vite.config.js`)
2. Utils second (`config.js`, `apiClient.js`)
3. Components third (after dependencies verified)

### Common Issues:
- **Module not found**: Run `npm install <package>`
- **Build fails**: Check `vite.config.js`