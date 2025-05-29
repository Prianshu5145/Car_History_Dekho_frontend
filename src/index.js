import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { WalletProvider } from './Contexts/WalletContext';
import { HelmetProvider } from 'react-helmet-async'; // ✅ Import HelmetProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <WalletProvider>
          <App />
        </WalletProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
