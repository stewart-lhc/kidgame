import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GameCard } from '../components/GameCard';
import { games } from '../data/games';
import { SEO } from '../components/SEO';
import { ChevronUp } from 'lucide-react';

const GAMES_PER_PAGE = 30;

export function HomePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const category = searchParams.get('category');
  const age = searchParams.get('age');

  const filteredGames = useMemo(() => {
    let games_filtered = games;
    
    if (category) {
      games_filtered = games_filtered.filter(game => game.category === category);
    }
    
    if (age) {
      games_filtered = games_filtered.filter(game => {
        const [min, max] = age.split('-').map(Number);
        const [gameMin, gameMax] = game.ageRange.split('-').map(Number);
        
        // 检查游戏的年龄范围是否与所选年龄范围重叠
        return (gameMin <= max && gameMax >= min);
      });
    }
    
    return games_filtered;
  }, [category, age]);

  const displayedGames = useMemo(() => {
    return filteredGames.slice(0, page * GAMES_PER_PAGE);
  }, [filteredGames, page]);
  
  const hasMore = displayedGames.length < filteredGames.length;

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

  // Reset pagination when category or age changes
  useEffect(() => {
    setPage(1);
  }, [category, age]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <main className="container mx-auto px-4 py-8">
      <SEO 
        title="Home" 
        description="Discover free online games for children aged 3-10 including educational games, puzzle games, action games and more - no download required, play instantly!"
      />

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