import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Clock, Users } from 'lucide-react';
import { games } from '../data/games';

export function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = games.find(g => g.id === Number(id));

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl text-white">Game not found</h2>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-white mb-6 hover:text-purple-200 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Games
      </button>

      <div className="bg-white rounded-xl overflow-hidden shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{game.title}</h1>
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
              Ages {game.ageRange}
            </span>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Trophy className="h-5 w-5 mr-2" />
              <span>Points Available</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>5-10 mins</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2" />
              <span>Single Player</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{game.description}</p>

          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Goals</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Problem-solving skills</li>
              <li>Critical thinking</li>
              <li>Subject mastery</li>
            </ul>
          </div>
        </div>

        <div className="aspect-[16/9] w-full bg-gray-900">
          <iframe
            src={game.src}
            title={game.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </main>
  );
}