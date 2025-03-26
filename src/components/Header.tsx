import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Menu, X } from 'lucide-react';
import { categories } from './Categories';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header className={`bg-white shadow-kid fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-primary p-3 rounded-2xl transform transition-transform group-hover:rotate-12">
              <Gamepad2 className={`${scrolled ? 'h-6 w-6' : 'h-8 w-8'} text-white transition-all duration-300`} />
            </div>
            <h1 className={`${scrolled ? 'text-xl' : 'text-kid-2xl'} font-bold bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent transition-all duration-300`}>
              KidsPlay
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.name === 'All' ? '/' : category.name === 'Favorites' ? '/favorites' : `/?category=${category.name}`}
                    className={`${category.color} rounded-xl transition-all duration-300 flex items-center ${scrolled ? 'py-1 px-2' : 'py-2 px-4'}`}
                  >
                    <category.icon className={`${scrolled ? 'h-5 w-5' : 'h-6 w-6'} text-white`} />
                    <span className={`text-white font-bold ml-2 ${scrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'} transition-all duration-300`}>
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full bg-primary text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 mt-4 border-t border-gray-200">
            <ul className="grid grid-cols-3 gap-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.name === 'All' ? '/' : category.name === 'Favorites' ? '/favorites' : `/?category=${category.name}`}
                    className={`${category.color} rounded-xl py-2 px-3 flex flex-col items-center`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <category.icon className="h-5 w-5 text-white" />
                    <span className="text-white text-sm font-bold mt-1">{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}