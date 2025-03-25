import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Star, Home } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-kid">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-primary p-3 rounded-2xl transform transition-transform group-hover:rotate-12">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-kid-2xl font-bold bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent">
              KidsPlay
            </h1>
          </Link>
          
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link 
                  to="/" 
                  className="kid-button bg-accent-blue text-white flex items-center space-x-2"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/favorites" 
                  className="kid-button bg-accent-pink text-white flex items-center space-x-2"
                >
                  <Star className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}