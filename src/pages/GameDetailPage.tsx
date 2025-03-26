import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Clock, Users, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { games } from '../data/games';
import { GameCard } from '../components/GameCard';

export function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const game = games.find(g => g.id === id);

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl text-white">Game not found</h2>
      </div>
    );
  }

  // Select 6 random games excluding the current game
  const randomGames = useMemo(() => {
    // Create a copy of games array excluding the current game
    const otherGames = games.filter(g => g.id !== id);
    
    // Shuffle the array and take the first 6 games
    return [...otherGames]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
  }, [id]);

  return (
    <main className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-white mb-6 hover:text-purple-200 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Games
      </button>

      <div className="bg-white rounded-xl overflow-hidden shadow-xl mb-8">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-800">{game.title}</h1>
              <button 
                onClick={() => id && toggleFavorite(id)}
                className={`p-2 rounded-full ${id && isFavorite(id) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                <Heart className="h-6 w-6" fill={id && isFavorite(id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
              Ages {game.ageRange}
            </span>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Trophy className="h-5 w-5 mr-2" />
              <span>Points Available</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>5-10 mins</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2" />
              <span>Single Player</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{game.description}</p>
        </div>

        <div className="aspect-[16/9] w-full bg-gray-900">
          <iframe
            src={game.src}
            title={game.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
      
      {/* More Games Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">More Games You Might Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {randomGames.map(randomGame => (
            <div key={randomGame.id} className="transform scale-90 origin-top-left">
              <GameCard {...randomGame} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}