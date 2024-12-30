import React from 'react';
import { Theater } from '../types/cinema';
import { Film } from 'lucide-react';
import {Movie} from "../types/movie";

interface TheaterSelectorProps {
  theaters: Movie[];
  selectedTheaterId: number;
  onTheaterSelect: (theaterId: number) => void;
}

export function TheaterSelector({ theaters, selectedTheaterId, onTheaterSelect }: TheaterSelectorProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Film className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Select Your Movie</h2>
      </div>
      
      <div className="flex justify-center gap-4">
        {theaters.map((theater) => (
          <button
            key={theater.id}
            onClick={() => onTheaterSelect(theater.id)}
            className={`
              px-8 py-4 rounded-xl transition-all duration-200
              font-semibold text-lg shadow-lg
              ${
                selectedTheaterId === theater.id
                  ? 'bg-blue-600 text-white shadow-blue-600/30 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-gray-200/50 hover:scale-102'
              }
            `}
          >
            {theater.title}
              <img src={theater.posterUrl} width="200" />
              {theater.synopsis}
          </button>
        ))}
      </div>
    </div>
  );
}
