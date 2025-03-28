import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Heart, Puzzle, Brain, Book, Palette, Calculator } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

interface SimpleGameCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  ageRange: string;
}

// Map of category names to their corresponding icons
const categoryIcons: Record<string, React.ElementType> = {
  'Puzzle': Puzzle,
  'Action': Brain,
  'Adventure': Book,
  'RPG': Palette,
  'Strategy': Calculator,
};

export function SimpleGameCard({ id, title, imageUrl, category, ageRange }: SimpleGameCardProps) {
  const navigate = useNavigate();
  const { isFavorite } = useFavorites();
  
  const handleNavigate = () => navigate(`/game/${id}`);
  
  // We'll use the full age range instead of just extracting the minimum age
  
  // Get the appropriate icon component for the category
  const CategoryIcon = categoryIcons[category] || Puzzle; // Default to Puzzle if category not found

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-kid" 
      onClick={handleNavigate}
    >
      <div className="relative aspect-square">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        
        {/* Favorite indicator */}
        {isFavorite(id) && (
          <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
            <Heart className="h-4 w-4" fill="currentColor" />
          </div>
        )}
        
        {/* Age indicator */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-accent-purple font-bold px-2 py-1 flex items-center justify-center rounded-full text-xs">
          {ageRange}
        </div>
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="bg-secondary rounded-full p-3 transform transition-transform hover:scale-110">
            <Play className="h-6 w-6 text-white" fill="currentColor" />
          </div>
        </div>
        
        {/* Category icon */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm p-2 rounded-full">
          <CategoryIcon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}