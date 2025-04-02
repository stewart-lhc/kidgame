import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FavoritesProvider } from './context/FavoritesContext';
import { GameHeatProvider } from './context/GameHeatContext';
import { HomePage } from './pages/HomePage';
import { GameDetailPage } from './pages/GameDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SEO } from './components/SEO';

function App() {
  return (
    <HelmetProvider>
      <FavoritesProvider>
        <GameHeatProvider>
          <SEO 
            title="首页" 
            description="发现适合3-10岁儿童的免费在线游戏，包括教育游戏、益智游戏、动作游戏等多种类型，无需下载，即刻开玩！"
          />
          <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500">
            <Header />
            <div className="pt-24"> {/* Remove bottom padding since footer is not fixed anymore */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game/:id" element={<GameDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </GameHeatProvider>
      </FavoritesProvider>
    </HelmetProvider>
  );
}

export default App;