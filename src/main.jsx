import React from 'react';
import ReactDOM from 'react-dom/client';
import GamePage from './pages/GamePage';
import './index.css'; // This line is the key to the entire fix.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GamePage />
  </React.StrictMode>,
);