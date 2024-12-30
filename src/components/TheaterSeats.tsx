import React from 'react';
import { Theater } from '../types/cinema';
import { Screen } from './seats/Screen';
import { SeatGrid } from './seats/SeatGrid';
import { SeatLegend } from './seats/SeatLegend';
import { SelectedSeatsInfo } from './seats/SelectedSeatsInfo';

interface TheaterSeatsProps {
  theater: Theater;
  selectedSeats: number[];
  onSeatClick: (seatId: number) => void;
  onReserve: () => void;
  isReserving: boolean;
}

export function TheaterSeats({ theater, selectedSeats, onSeatClick, onReserve, isReserving }: TheaterSeatsProps) {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="space-y-12">
        {/* Dark ambient effect at the top */}
        <div className="h-8 bg-gradient-to-b from-gray-900/5 to-transparent rounded-t-xl" />
        
        <Screen />

        <p className="text-md font-bold text-gray-500 tracking-wider text-center">{theater.name}</p>
        
        <SeatGrid
          theater={theater}
          selectedSeats={selectedSeats}
          onSeatClick={onSeatClick}
        />

        <SeatLegend />

        <SelectedSeatsInfo
          theater={theater}
          selectedSeats={selectedSeats}
          onReserve={onReserve}
          isReserving={isReserving}
        />
      </div>
    </div>
  );
}
