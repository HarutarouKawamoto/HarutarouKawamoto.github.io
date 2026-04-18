import { Buffer } from 'buffer';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

Object.assign(globalThis, { Buffer });

// GitHub Pages SPA routing: restore path from query param
const search = window.location.search.slice(1);
if (search.startsWith('p=')) {
  const path = decodeURIComponent(search.slice(2));
  window.history.replaceState(null, '', path);
}

const root = document.getElementById('root');
if (!root) throw new Error('#root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
