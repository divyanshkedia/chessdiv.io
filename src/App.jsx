// src/App.jsx
import React from 'react';
import GamePage from './pages/GamePage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="branding-overlay">
        chessdiv.io
      </div>
      <main className="main-content">
        <GamePage />
      </main>
    </div>
  );
}

export default App;