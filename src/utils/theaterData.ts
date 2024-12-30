import { Theater } from '../types/cinema';

export function generateTheater(id: string, name: string, rows: number, seatsPerRow: number): Theater {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r);
    for (let s = 1; s <= seatsPerRow; s++) {
      seats.push({
        id: `${id}-${rowLetter}${s}`,
        row: rowLetter,
        number: s,
        status: Math.random() > 0.8 ? 'reserved' : 'available',
      });
    }
  }

  return {
    id,
    name,
    rows,
    seatsPerRow,
    seats,
  };
}

export const theaters = [
  generateTheater('1', 'Theater 1', 8, 12),
  generateTheater('2', 'Theater 2', 10, 14),
  generateTheater('3', 'Theater 3', 12, 16),
];