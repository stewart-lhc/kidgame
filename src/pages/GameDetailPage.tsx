import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Clock, Users, Heart, Maximize, Minimize, Flame, Calendar } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { games } from '../data/games';
import { GameCard } from '../components/GameCard';
import { SimpleGameCard } from '../components/SimpleGameCard';
import { SEO } from '../components/SEO';

export function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const game = games.find(g => g.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

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
  };

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl text-white">Game not found</h2>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  const randomGames = useMemo(() => {
    const otherGames = games.filter(g => g.id !== id);
    return [...otherGames]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
  }, [id]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <SEO 
        title={game.title}
        description={`${game.title} - A ${game.category} for children ages ${game.ageRange}, no download required, play instantly!`}
        keywords={`${game.title},${game.category},kids games,online games,free games,games for ages ${game.ageRange}`}
        url={`https://ogame.guru/game/${game.id}`}
      />
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-white mb-6 hover:text-purple-200 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Games
      </button>

      <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-xl mb-6 min-h-0">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-3">
          <h1 className="text-3xl md:text-3xl sm:text-2xl text-xl font-bold text-white">{game.title}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/20 backdrop-blur-sm text-orange-500 px-3 py-1 rounded-full">
              <Flame className="h-4 w-4 mr-1" />
              <span className="text-white">{game.heat || 0} Heat</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm text-blue-500 px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-white">{game.releaseDate || today}</span>
            </div>
            <span className="bg-purple-100/50 backdrop-blur-sm text-purple-600 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
              Ages {game.ageRange}
            </span>
            <button 
              onClick={() => id && toggleFavorite(id)}
              className={`p-1.5 sm:p-2 rounded-full ${id && isFavorite(id) ? 'bg-red-500 text-white' : 'bg-gray-200/50 backdrop-blur-sm text-gray-500'}`}
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" fill={id && isFavorite(id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
        
        <p className="text-white/90">{game.description}</p>
      </div>

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
            className="absolute top-4 right-4 bg-white/60 p-2 rounded-lg shadow-lg hover:bg-white/80 transition-colors z-50"
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
      
      <div className="mt-12">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">More Games You Might Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {randomGames.map(randomGame => (
            <div key={randomGame.id}>
              <SimpleGameCard 
                id={randomGame.id}
                title={randomGame.title}
                imageUrl={randomGame.imageUrl}
                category={randomGame.category}
                ageRange={randomGame.ageRange}
                heat={randomGame.heat || 0}
                releaseDate={randomGame.releaseDate || today}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}