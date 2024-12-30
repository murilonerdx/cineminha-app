import React from 'react';
import { Theater } from '../../types/cinema';
import { Seat } from './Seat';

interface SeatGridProps {
  theater: Theater;
  selectedSeats: number[];
  onSeatClick: (seatId: number) => void;
}

export function SeatGrid({ theater, selectedSeats, onSeatClick }: SeatGridProps) {
  return (
    <div className="relative overflow-x-auto pb-8">
      <div className="flex justify-center">
        <div className="inline-block">
          {/* Grid Container */}
          <div className="grid gap-y-6 min-w-fit p-8 rounded-lg bg-gray-50/50">
            {Array.from({ length: theater?.rows }).map((_, rowIndex) => {
              const rowLetter = String.fromCharCode(65 + rowIndex);
              return (
                <div key={rowLetter} className="flex items-center gap-4">
                  {/* Row Label Left */}
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 shadow-sm">
                    <span className="text-sm font-semibold text-gray-600">
                      {rowLetter}
                    </span>
                  </div>

                  {/* Seats */}
                  <div className="flex gap-3">
                    {Array.from({ length: theater?.seatsPerRow }).map((_, seatIndex) => {
                      const seat = theater.seats.find(
                        (s) => s.row === rowLetter && s.number === seatIndex + 1
                      );
                      if (!seat) return null;
                      
                      return (
                        <Seat
                          key={seat.id}
                          seat={seat}
                          isSelected={selectedSeats.includes(seat.id)}
                          onClick={() => onSeatClick(seat.id)}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Row Label Right */}
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 shadow-sm">
                    <span className="text-sm font-semibold text-gray-600">
                      {rowLetter}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
