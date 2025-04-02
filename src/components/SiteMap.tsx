import React from 'react';
import { Link } from 'react-router-dom';
import { games } from '../data/games';

export function SiteMap() {
  // Get all game categories
  const categories = [...new Set(games.map(game => game.category))];
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-12">
      <h2 className="text-xl font-bold text-white mb-4">Site Navigation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Main Pages</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="text-white/80 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="text-white/80 hover:text-white transition-colors">
                My Favorites
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Game Categories</h3>
          <ul className="space-y-1">
            {categories.map(category => (
              <li key={category}>
                <Link 
                  to={`/?category=${category}`} 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Age Groups</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/?age=3-4" className="text-white/80 hover:text-white transition-colors">
                Ages 3-4
              </Link>
            </li>
            <li>
              <Link to="/?age=5-6" className="text-white/80 hover:text-white transition-colors">
                Ages 5-6
              </Link>
            </li>
            <li>
              <Link to="/?age=7-8" className="text-white/80 hover:text-white transition-colors">
                Ages 7-8
              </Link>
            </li>
            <li>
              <Link to="/?age=9-10" className="text-white/80 hover:text-white transition-colors">
                Ages 9-10
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 