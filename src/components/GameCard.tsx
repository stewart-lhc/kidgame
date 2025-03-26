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
      className="kid-card bg-white overflow-hidden cursor-pointer transition-transform hover:scale-105" 
      onClick={handleNavigate}
    >
      <div className="relative h-full">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button 
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full ${isFavorite(id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-500'}`}
          >
            <Heart className="h-5 w-5" fill={isFavorite(id) ? 'currentColor' : 'none'} />
          </button>
          <span className="bg-white/90 backdrop-blur-sm text-accent-purple font-bold px-4 py-2 rounded-full text-sm">
            Ages {ageRange}
          </span>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4">
          <h3 className="text-kid-xl font-bold text-gray-800 mb-2">{title}</h3>
          
          <div className="flex justify-between items-center">
            <span className="bg-primary-light text-primary-dark font-bold px-4 py-2 rounded-full text-sm">
              {category}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent's onClick
                handleNavigate();
              }}
              className="kid-button bg-secondary text-white flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Play Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}