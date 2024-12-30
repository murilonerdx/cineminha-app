import React from 'react';
import { Clock, Film } from 'lucide-react';
import { MovieSession } from '../types/movie';
import { formatTime } from '../utils/dateUtils';

interface SessionListProps {
  sessions: MovieSession[];
  onSelectSession: (sessionId: string) => void;
}

export function SessionList({ sessions, onSelectSession }: SessionListProps) {
  return (
    <div className="space-y-6">
      {sessions.map(session => (
        <div key={session.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{session.movie.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-gray-600">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {session.format}
                </span>
                {session.subtitled && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    Subtitled
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${session.price.standard}
              </div>
              <div className="text-sm text-gray-500">
                Student: ${session.price.student}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Film className="w-4 h-4" />
                <span>{session.language}</span>
              </div>
            </div>
            
            <button
              onClick={() => onSelectSession(session.id)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors font-medium shadow-lg shadow-blue-600/20"
            >
              Select Seats
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}