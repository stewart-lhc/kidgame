import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { motion } from 'framer-motion';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  ageRange: string;
  heat: number;
  releaseDate: string;
}

export function GameCard({ 
  id, 
  title, 
  description, 
  imageUrl, 
  category, 
  ageRange, 
  heat,
  releaseDate
}: GameCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl h-full"
    >
      <div className="relative">
        <Link to={`/game/${id}`}>
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
        </Link>
        
        <button 
          onClick={() => toggleFavorite(id)}
          className={`absolute top-2 right-2 p-2 rounded-full z-10 ${
            isFavorite(id) 
              ? 'bg-red-500 text-white' 
              : 'bg-white/20 backdrop-blur-sm text-white/70 hover:text-white'
          }`}
        >
          <Heart className="h-4 w-4" fill={isFavorite(id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-base font-bold text-white leading-tight">
            <Link to={`/game/${id}`} className="hover:text-purple-200 transition-colors">
              {title}
            </Link>
          </h3>
          <div className="flex items-center gap-1 ml-1 flex-shrink-0">
            <span className="bg-purple-100/50 backdrop-blur-sm text-purple-600 px-2 py-0.5 rounded-full text-xs font-medium">
              Ages {ageRange}
            </span>
            <span className="bg-blue-100/50 backdrop-blur-sm text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
              {category}
            </span>
          </div>
        </div>
        
        <p className="text-white/80 text-sm mb-4 line-clamp-2">{description}</p>
        
        <Link 
          to={`/game/${id}`} 
          className="block bg-purple-500 text-white text-center py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Play Now
        </Link>
      </div>
    </motion.div>
  );
}