import React from 'react';
import { Clapperboard } from 'lucide-react';

export function Screen() {
  return (
    <div className="relative w-full max-w-4xl mx-auto mb-16">
      {/* Screen Container */}
      <div className="flex flex-col items-center">
        {/* Movie Icon */}
        <Clapperboard className="w-8 h-8 text-blue-600 mb-4" />
        
        {/* Screen */}
        <div className="w-full relative">
          {/* Main Screen */}
          <div className="w-full h-16 bg-gradient-to-b from-white to-gray-200 rounded-t-3xl shadow-lg transform perspective-1000 rotateX-12" />
          
          {/* Screen Glow Effect */}
          <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-b from-blue-100/50 to-transparent" />
          
          {/* Side Supports */}
          <div className="absolute -left-4 top-0 bottom-0 w-2 bg-gradient-to-r from-gray-300 to-gray-200 rounded-l" />
          <div className="absolute -right-4 top-0 bottom-0 w-2 bg-gradient-to-l from-gray-300 to-gray-200 rounded-r" />
        </div>

        {/* Screen Label */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium text-gray-500 tracking-wider">SCREEN</p>
          <div className="mt-1 w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
      </div>
    </div>
  );
}