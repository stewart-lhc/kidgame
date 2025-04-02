import React from 'react';
import { Link } from 'react-router-dom';
import { SiteMap } from './SiteMap';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm py-8 w-full">
      <div className="container mx-auto px-4">
        <SiteMap />
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-white/10 pt-4">
          <div className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {currentYear} OGame.Guru - Free online games for kids ages 3-10
          </div>
          
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}