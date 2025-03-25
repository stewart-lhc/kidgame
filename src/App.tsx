import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { GameDetailPage } from './pages/GameDetailPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:id" element={<GameDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;