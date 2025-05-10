import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, useLocation } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { WalletProvider } from './Contexts/WalletContext';

// Helper component to conditionally wrap App
const ConditionalWalletProvider = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/Dashboard');

  const content = <App />;

  return isDashboard ? (
    <WalletProvider>{content}</WalletProvider>
  ) : (
    content
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConditionalWalletProvider />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
