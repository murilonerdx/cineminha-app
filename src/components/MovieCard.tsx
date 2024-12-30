import React from 'react';
import { Clock, Film } from 'lucide-react';
import { Movie } from '../types/movie';
import { formatDuration } from '../utils/dateUtils';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movieId: string) => void;
}

export function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      onClick={() => onSelect(movie.id)}
    >
      <div className="relative h-[400px]">
        <img 
          src={movie.posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(movie.duration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Film className="w-4 h-4" />
              <span>{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}