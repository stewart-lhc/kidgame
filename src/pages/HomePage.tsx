import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GameCard } from '../components/GameCard';
import { games } from '../data/games';
import { useFavorites } from '../context/FavoritesContext';

export function HomePage() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { favorites } = useFavorites();

  // Parse category from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else if (location.pathname === '/') {
      setSelectedCategory('All');
    }
  }, [location]);

  const filteredGames = selectedCategory === 'All'
    ? games
    : selectedCategory === 'Favorites'
    ? games.filter(game => favorites.includes(game.id))
    : games.filter(game => game.category === selectedCategory);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            {selectedCategory === 'All' ? 'All Games' : `${selectedCategory} Games`}
          </h2>
          <span className="text-white bg-white/20 px-4 py-2 rounded-full">
            {filteredGames.length} {filteredGames.length === 1 ? 'Game' : 'Games'}
          </span>
        </div>
        
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white text-xl">No games found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}