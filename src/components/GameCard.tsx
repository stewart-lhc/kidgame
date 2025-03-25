import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

interface GameCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  ageRange: string;
}

export function GameCard({ id, title, description, imageUrl, category, ageRange }: GameCardProps) {
  const navigate = useNavigate();

  return (
    <div className="kid-card bg-white">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-accent-purple font-bold px-4 py-2 rounded-full text-sm">
            Ages {ageRange}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-kid-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="bg-primary-light text-primary-dark font-bold px-4 py-2 rounded-full text-sm">
            {category}
          </span>
          <button 
            onClick={() => navigate(`/game/${id}`)}
            className="kid-button bg-secondary text-white flex items-center space-x-2"
          >
            <Play className="h-5 w-5" />
            <span>Play Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}