import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { GameDetailPage } from './pages/GameDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500">
        <Header />
        <div className="pt-24"> {/* Add padding to account for fixed header */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<GameDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </div>
    </FavoritesProvider>
  );
}

export default App;