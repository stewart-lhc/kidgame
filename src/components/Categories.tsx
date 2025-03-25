import React from 'react';
import { Brain, Puzzle, Calculator, Music, Palette, Book, Sparkles } from 'lucide-react';

export const categories = [
  { name: 'All', icon: Sparkles, color: 'bg-accent-purple' },
  { name: 'Logic', icon: Brain, color: 'bg-accent-blue' },
  { name: 'Puzzle', icon: Puzzle, color: 'bg-primary' },
  { name: 'Math', icon: Calculator, color: 'bg-secondary' },
  { name: 'Music', icon: Music, color: 'bg-accent-pink' },
  { name: 'Art', icon: Palette, color: 'bg-primary-dark' },
  { name: 'Reading', icon: Book, color: 'bg-accent-purple' },
];

interface CategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onSelectCategory(category.name)}
          className={`${category.color} p-4 rounded-2xl transition-all duration-200 transform shadow-kid ${
            selectedCategory === category.name
              ? 'ring-4 ring-white ring-opacity-60 scale-105 shadow-kid-lg'
              : 'hover:shadow-kid-lg hover:-translate-y-1'
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <category.icon className="h-8 w-8 text-white" />
            <span className="text-white font-bold">{category.name}</span>
          </div>
        </button>
      ))}
    </div>
  );
}