import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Clock, Users, Heart, Maximize, Minimize } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { games } from '../data/games';
import { GameCard } from '../components/GameCard';
import { SimpleGameCard } from '../components/SimpleGameCard';

export function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const game = games.find(g => g.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (!iframe) return;

    if (!isFullscreen) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl text-white">Game not found</h2>
      </div>
    );
  }

  // Select 6 random games excluding the current game
  const randomGames = useMemo(() => {
    const otherGames = games.filter(g => g.id !== id);
    return [...otherGames]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
  }, [id]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-white mb-6 hover:text-purple-200 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Games
      </button>

      {/* Game Info Section */}
      <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-xl mb-6 min-h-0">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold text-white">{game.title}</h1>
          <div className="flex items-center gap-4">
            <span className="bg-purple-100/50 backdrop-blur-sm text-purple-600 px-4 py-1.5 rounded-full text-sm font-medium">
              Ages {game.ageRange}
            </span>
            <button 
              onClick={() => id && toggleFavorite(id)}
              className={`p-2 rounded-full ${id && isFavorite(id) ? 'bg-red-500 text-white' : 'bg-gray-200/50 backdrop-blur-sm text-gray-500'}`}
            >
              <Heart className="h-6 w-6" fill={id && isFavorite(id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
        <p className="text-white/90">{game.description}</p>
      </div>

      {/* Game Frame Section */}
      <div className="bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl mb-12">
        <div className="relative">
          <div className="aspect-[16/9] w-full bg-gray-900">
            <iframe
              id="game-iframe"
              src={game.src}
              title={game.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-white/60 p-2 rounded-lg shadow-lg hover:bg-white/80 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5 text-gray-700" />
            ) : (
              <Maximize className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
      
      {/* More Games Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">More Games You Might Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {randomGames.map(randomGame => (
            <div key={randomGame.id}>
              <SimpleGameCard {...randomGame} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}