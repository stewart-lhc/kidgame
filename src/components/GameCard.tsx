import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

interface GameCardProps {
  id: string;
  title: string;
  description: string; // Keeping this in the interface for compatibility with existing code
  imageUrl: string;
  category: string;
  ageRange: string;
}

export function GameCard({ id, title, description, imageUrl, category, ageRange }: GameCardProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const handleNavigate = () => navigate(`/game/${id}`);
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent's onClick
    toggleFavorite(id);
  };

  return (
    <div 
      className="kid-card bg-white overflow-hidden cursor-pointer transition-transform hover:scale-105 h-full" 
      onClick={handleNavigate}
    >
      <div className="relative h-full">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 flex space-x-1">
          <button 
            onClick={handleToggleFavorite}
            className={`p-1.5 rounded-full ${isFavorite(id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-500'}`}
          >
            <Heart className="h-4 w-4" fill={isFavorite(id) ? 'currentColor' : 'none'} />
          </button>
          <span className="bg-white/90 backdrop-blur-sm text-accent-purple font-bold px-3 py-1 rounded-full text-xs">
            Ages {ageRange}
          </span>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3">
          <h3 className="text-lg font-bold text-gray-800 mb-1.5 truncate">{title}</h3>
          
          <div className="flex justify-between items-center">
            <span className="bg-primary-light text-primary-dark font-bold px-3 py-1 rounded-full text-xs">
              {category}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent's onClick
                handleNavigate();
              }}
              className="kid-button bg-secondary text-white flex items-center space-x-1 py-1.5 px-3"
            >
              <Play className="h-4 w-4" />
              <span className="text-sm">Play</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}