# PhysicalAI Chatbot Frontend

A React-based chatbot UI component that integrates with the PhysicalAI RAG backend. This component provides both a chat interface and text selection functionality for contextual questions.

## Features

- **Chat Interface**: Interactive chat widget for asking questions about the Physical AI & Humanoid Robotics textbook
- **Text Selection**: Right-click context menu for asking questions about selected text
- **Translation**: Built-in translation functionality for text content
- **Docusaurus Integration**: Seamlessly integrates with Docusaurus documentation sites

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the frontend root directory with the following variables:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_ENABLE_TRANSLATION=true
```

#### Environment Variables Explanation:

- `VITE_BACKEND_URL`: The URL of the backend API server (default: http://localhost:8000)
- `VITE_ENABLE_TRANSLATION`: Enable/disable translation feature (default: true)

### Build Commands

- **Development**: `npm run dev` - Starts the development server
- **Build**: `npm run build` - Creates a production build
- **Preview**: `npm run preview` - Locally preview the production build

## Integration with Docusaurus

To integrate the chatbot with a Docusaurus site:

1. Install the frontend package in your Docusaurus project:
   ```bash
   npm install ../frontend
   ```

2. Create a wrapper component in your Docusaurus project:
   ```jsx
   // src/components/ChatbotWrapper.jsx
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

3. Swizzle the Docusaurus Layout to wrap with the chatbot:
   ```bash
   npm run swizzle @docusaurus/theme-classic Layout -- --wrap
   ```

4. Import and use the ChatbotWrapper in the swizzled Layout:
   ```jsx
   import React from 'react';
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

## Components

### ChatbotWidget

The main chat interface component that handles:
- Message history display
- User input handling
- API communication with backend
- Loading and error states

### SelectedTextHandler

Handles text selection events and provides:
- Context menu on text selection
- "Ask about this" functionality
- Translation feature for selected text

### ContextMenu

The right-click context menu that appears when text is selected, providing options to:
- Ask a question about selected text
- Translate the selected text
- Close the menu

## API Integration

The frontend communicates with the backend through the following endpoints:

- `POST /chat` - Send chat messages to the backend
- `POST /chat/selected-text` - Send selected text questions
- `POST /translate` - Translate text content

## Styling

The component uses CSS modules for styling. The main styles are located in:
- `styles/chatbot.css` - Chat widget styles
- `styles/context-menu.css` - Context menu styles

## Development

To run the development server:

```bash
npm run dev
```

This will start a Vite development server that can be used to test the components in isolation.

## Building for Production

To create a production build:

```bash
npm run build
```

This creates a `dist/` directory with the compiled components that can be imported as a library.

## Troubleshooting

### Common Issues

1. **Module not found errors**
   - Ensure all dependencies are installed: `npm install`
   - Check that the package.json has correct dependencies
   - For Docusaurus integration, verify webpack aliases are properly configured

2. **Backend connection issues**
   - Verify backend server is running at the configured URL
   - Check CORS settings in the backend
   - Ensure environment variables are set correctly
   - Test backend endpoints independently using tools like Postman or curl

3. **Docusaurus integration issues**
   - Verify the webpack alias is properly configured in `docusaurus.config.js`
   - Check that the frontend package is properly installed in the Docusaurus project
   - Ensure the ChatbotWrapper component is correctly imported and used in the Layout
   - Verify the dist files are accessible from the Docusaurus project

4. **Text selection not working**
   - Ensure the SelectedTextHandler component is rendered in the page
   - Check for conflicting event handlers
   - Verify that the component is properly integrated with the page

5. **Translation feature not working**
   - Note that the translation endpoint might not be implemented in the backend
   - Check the apiClient.js file for the translation function implementation
   - Verify the backend has the required translation endpoints

6. **Build errors**
   - Ensure all required dependencies are installed
   - Check that the Vite configuration is correct
   - Verify that all import paths are correct

### Debugging Tips

- Enable browser developer tools to check network requests
- Check console for any JavaScript errors
- Verify environment variables are loaded correctly
- Test backend endpoints independently using tools like Postman or curl
- Use React Developer Tools to inspect component state and props
- Check the browser's Network tab for API request details
- Verify that the CSS styles are properly loaded and applied

### Error Messages and Solutions

- **"Module not found: Error: Can't resolve 'frontend'"**
  - Solution: Ensure the webpack alias is properly configured in `docusaurus.config.js`
  - Solution: Verify the frontend package is properly installed in the target project

- **"Network Error" or "Failed to fetch"**
  - Solution: Check if the backend server is running
  - Solution: Verify the backend URL in environment variables
  - Solution: Check CORS settings in the backend

- **"Maximum call stack size exceeded"**
  - Solution: Check for infinite loops in component rendering
  - Solution: Verify that state updates are not causing infinite re-renders

- **"Invalid hook call"**
  - Solution: Ensure React components are properly structured
  - Solution: Check that React and ReactDOM versions are compatible

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the ISC License.