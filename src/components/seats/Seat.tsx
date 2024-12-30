import React from 'react';
import { Seat as SeatType } from '../../types/cinema';

interface SeatProps {
  seat: SeatType;
  isSelected: boolean;
  onClick: () => void;
}

export function Seat({ seat, isSelected, onClick }: SeatProps) {
  const baseStyles = "relative group transition-all duration-300 ease-out";
  const seatStyles = `
    w-12 h-14
    rounded-t-2xl
    flex flex-col items-center justify-center
    cursor-pointer
    transform hover:-translate-y-1
    ${getSeatStyles(seat.status, isSelected)}
  `;

  return (
    <button
      onClick={() => seat.status === 'available' && onClick()}
      disabled={seat.status === 'reserved'}
      className={`${baseStyles} ${seatStyles}`}
      title={`Row ${seat.row} Seat ${seat.number}`}
    >
      {/* Seat Top */}
      <div className="absolute top-0 left-0 right-0 h-3/4 rounded-t-2xl bg-opacity-20 bg-white" />
      
      {/* Seat Number */}
      <span className="relative text-sm font-medium z-10">
        {seat.number}
      </span>
      
      {/* Seat Bottom */}
      <div className="absolute bottom-0 left-1 right-1 h-2 rounded-b-sm bg-black bg-opacity-20" />
      
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute inset-0 rounded-t-2xl ring-2 ring-white ring-opacity-60 animate-pulse" />
      )}
      
      {/* Hover Effect */}
      {seat.status === 'available' && !isSelected && (
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-t-2xl transition-opacity duration-200" />
      )}
    </button>
  );
}

function getSeatStyles(status: SeatType['status'], isSelected: boolean): string {
  if (isSelected) {
    return `
      bg-blue-600 
      text-white 
      shadow-lg 
      shadow-blue-600/30
      hover:shadow-blue-600/40
    `;
  }

  switch (status) {
    case 'available':
      return `
        bg-gray-200 
        text-gray-700
        hover:bg-gray-300
        shadow-md
        hover:shadow-lg
      `;
    case 'reserved':
      return `
        bg-gray-400 
        text-gray-500
        cursor-not-allowed 
        opacity-50
      `;
    default:
      return '';
  }
}