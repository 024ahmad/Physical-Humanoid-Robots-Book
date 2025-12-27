// Check if we're in a browser environment (Vite) or Node.js environment
let backendUrl, enableTranslation;

if (typeof import.meta !== 'undefined' && import.meta.env) {
  // Browser environment (Vite)
  backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://sharoz024-physical-humanoid-robot.hf.space/';
  enableTranslation = import.meta.env.VITE_ENABLE_TRANSLATION === 'true';
} else {
  // Node.js environment or fallback
  backendUrl = process.env.VITE_BACKEND_URL || 'https://sharoz024-physical-humanoid-robot.hf.space/';
  enableTranslation = process.env.VITE_ENABLE_TRANSLATION === 'true';
}

export const config = {
  backendUrl,
  enableTranslation
};