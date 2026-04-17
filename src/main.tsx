import { Buffer } from 'buffer';
Object.assign(globalThis, { Buffer });

// GitHub Pages SPA routing: restore path from query param
(function () {
  const p = window.location.search.slice(1);
  if (p && p.startsWith('p=')) {
    const path = decodeURIComponent(p.slice(2));
    window.history.replaceState(null, '', path);
  }
})();

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

const root = document.getElementById('root');
if (!root) throw new Error('#root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
