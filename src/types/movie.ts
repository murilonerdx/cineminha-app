import {Theater} from "./cinema";

export type MovieFormat = '2D' | '3D' | 'IMAX' | 'IMAX 3D' | 'VIP';

export interface Movie {
  id: number;
  title: string;
  duration: number; // in minutes
  posterUrl: string;
  synopsis: string;
  rating: string; // e.g., "PG-13"
  genre: string[];
  theater: Theater[];
}

export interface Session {
  id: number;
  movieId: string;
  theaterId: string;
  format: MovieFormat;
  startTime: string; // ISO string
  endTime: string; // ISO string
  price: {
    standard: number;
    student: number;
  };
  language: string;
  subtitled: boolean;
}

export interface MovieSession extends Session {
  movie: Movie;
}
