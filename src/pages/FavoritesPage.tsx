import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameCard } from '../components/GameCard';
import { games } from '../data/games';
import { SEO } from '../components/SEO';
import { ChevronUp } from 'lucide-react';

const GAMES_PER_PAGE = 30;

export function FavoritesPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const favoriteGames = games.filter(game => favorites.includes(game.id));
  
  const displayedGames = useMemo(() => {
    return favoriteGames.slice(0, page * GAMES_PER_PAGE);
  }, [favoriteGames, page]);
  
  const hasMore = displayedGames.length < favoriteGames.length;

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    });
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver]);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const today = new Date().toISOString().split('T')[0];

  return (
    <main className="container mx-auto px-4 py-8">
      <SEO 
        title="My Favorites" 
        description="View your collection of favorite kids games, including educational games, puzzle games, action games, and more - ready to play anytime!"
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Favorites</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
        >
          Back to Home
        </button>
      </div>

      {favoriteGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedGames.map(game => (
            <GameCard 
              key={game.id} 
              id={game.id}
              title={game.title}
              description={game.description}
              imageUrl={game.imageUrl}
              category={game.category}
              ageRange={game.ageRange}
              heat={game.heat || 0}
              releaseDate={game.releaseDate || today}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-white text-xl mb-4">You haven't added any games to your favorites yet</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
          >
            Browse Games
          </button>
        </div>
      )}
      
      {hasMore && (
        <div 
          ref={loaderRef} 
          className="flex justify-center p-4 mt-8"
        >
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-purple-500/50 backdrop-blur-sm hover:bg-purple-600/70 text-white rounded-full shadow-xl transition-all duration-300 z-10"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </main>
  );
}