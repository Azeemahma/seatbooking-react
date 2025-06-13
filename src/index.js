import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// This is the modern way to render in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);