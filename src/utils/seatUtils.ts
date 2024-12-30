import { Seat } from '../types/cinema';

export function getSeatColor(status: Seat['status'], isSelected: boolean): string {
  if (isSelected) {
    return 'bg-blue-600 text-white hover:bg-blue-700';
  }

  switch (status) {
    case 'available':
      return 'bg-gray-100 text-gray-900 hover:bg-gray-200';
    case 'reserved':
      return 'bg-gray-400 text-gray-500';
    default:
      return 'bg-gray-100 text-gray-900';
  }
}

export function calculateTotal(numSeats: number): number {
  const PRICE_PER_SEAT = 12.99;
  return numSeats * PRICE_PER_SEAT;
}