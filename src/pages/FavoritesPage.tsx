import React from 'react';
import { GameCard } from '../components/GameCard';
import { games } from '../data/games';
import { useFavorites } from '../context/FavoritesContext';

export function FavoritesPage() {
  const { favorites } = useFavorites();

  const favoriteGames = games.filter(game => favorites.includes(game.id));

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">My Favorite Games</h2>
          <span className="text-white bg-white/20 px-4 py-2 rounded-full">
            {favoriteGames.length} {favoriteGames.length === 1 ? 'Game' : 'Games'}
          </span>
        </div>
        
        {favoriteGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/10 rounded-2xl">
            <p className="text-white text-xl mb-4">You haven't added any favorites yet.</p>
            <p className="text-white">Click the heart icon on any game to add it to your favorites!</p>
          </div>
        )}
      </div>
    </main>
  );
}