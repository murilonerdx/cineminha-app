import {Movie} from "./movie";

export interface Seat {
  id: number;
  row: string;
  number: number;
  status: 'available' | 'reserved' | 'selected';
}

export interface Theater {
  id: number;
  name: string;
  rows: number;
  seatsPerRow: number;
  seats: Seat[];
}

export interface TheaterSelection {
  theaterId: number;
  selectedSeats: number[];
}
