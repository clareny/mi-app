import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import loadClarity from './clarity';
import { LanguageProvider } from './contexts/LanguageContext';
import reportWebVitals from './reportWebVitals';

if (import.meta.env.PROD) loadClarity();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);

reportWebVitals();
