import React from 'react';
import { Flame, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SimpleGameCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  ageRange: string;
  heat: number;
  releaseDate: string;
}

export function SimpleGameCard({ id, title, imageUrl, category, ageRange, heat, releaseDate }: SimpleGameCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="relative bg-white/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg h-full"
    >
      <Link to={`/game/${id}`}>
        <div className="absolute top-2 left-2 flex space-x-2 z-10">
          <div className="flex items-center bg-white/20 backdrop-blur-sm text-orange-500 px-2 py-1 rounded-full">
            <Flame className="h-3 w-3 mr-1" />
            <span className="text-white text-xs">{heat}</span>
          </div>
          <div className="flex items-center bg-white/20 backdrop-blur-sm text-blue-500 px-2 py-1 rounded-full">
            <Calendar className="h-3 w-3 mr-1" />
            <span className="text-white text-xs">{new Date(releaseDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-28 object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
            <span className="inline-block bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
              Ages {ageRange}
            </span>
          </div>
        </div>
        
        <div className="p-2">
          <h3 className="text-white font-semibold text-sm line-clamp-2">{title}</h3>
        </div>
      </Link>
    </motion.div>
  );
}